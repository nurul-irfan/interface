import { call, put, select } from 'typed-redux-saga';
import { Routing } from 'uniswap/src/data/tradingApi/__generated__/index';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { getChainLabel } from 'uniswap/src/features/chains/utils';
import { DynamicConfigs, MainnetPrivateRpcConfigKey } from 'uniswap/src/features/gating/configs';
import { FeatureFlags, getFeatureFlagName } from 'uniswap/src/features/gating/flags';
import { getDynamicConfigValue } from 'uniswap/src/features/gating/hooks';
import { Statsig } from 'uniswap/src/features/gating/sdk/statsig';
import { WalletEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { makeSelectAddressTransactions } from 'uniswap/src/features/transactions/selectors';
import { transactionActions } from 'uniswap/src/features/transactions/slice';
import { isClassic } from 'uniswap/src/features/transactions/swap/utils/routing';
import { TransactionOriginType, TransactionStatus, TransactionType, isBridgeTypeInfo, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { createTransactionId } from 'uniswap/src/utils/createTransactionId';
import { logger } from 'utilities/src/logger/logger';
import { ONE_MINUTE_MS } from 'utilities/src/time/time';
import { isPrivateRpcSupportedOnChain } from 'wallet/src/features/providers/utils';
import { getSerializableTransactionRequest } from 'wallet/src/features/transactions/utils';
import { getPrivateProvider, getProvider, getSignerManager } from 'wallet/src/features/wallet/context';
import { hexlifyTransaction } from 'wallet/src/utils/transaction';
// This timeout is used to trigger a log event if the transaction is pending for too long
const getTransactionTimeoutMs = (chainId) => {
    if (chainId === UniverseChainId.Mainnet) {
        return 10 * ONE_MINUTE_MS;
    }
    return ONE_MINUTE_MS;
};
// A utility for sagas to send transactions
// All outgoing transactions should go through here
export function* sendTransaction(params) {
    const { chainId, account, options } = params;
    let request = options.request;
    logger.debug('sendTransaction', '', `Sending tx on ${getChainLabel(chainId)} to ${request.to}`);
    if (account.type === AccountType.Readonly) {
        throw new Error('Account must support signing');
    }
    // Register the tx in the store before it's submitted
    let unsubmittedTransaction = yield* call(addUnsubmittedTransaction, params);
    try {
        // Only fetch nonce if it's not already set, or we could be overwriting some custom logic
        // On swapSaga we manually set them for approve+swap to prevent errors in some L2s
        if (!request.nonce) {
            const nonce = yield* call(tryGetNonce, account, chainId);
            if (nonce) {
                request = { ...request, nonce };
            }
        }
        // Sign and send the transaction
        const provider = options.submitViaPrivateRpc
            ? yield* call(getPrivateProvider, chainId, account)
            : yield* call(getProvider, chainId);
        const signerManager = yield* call(getSignerManager);
        const { transactionResponse, populatedRequest } = yield* call(signAndSendTransaction, request, account, provider, signerManager);
        logger.debug('sendTransaction', '', 'Tx submitted:', transactionResponse.hash);
        const { gasEstimates } = unsubmittedTransaction.typeInfo;
        if (gasEstimates) {
            const blockNumber = yield* call([provider, provider.getBlockNumber]);
            unsubmittedTransaction = {
                ...unsubmittedTransaction,
                typeInfo: {
                    ...unsubmittedTransaction.typeInfo,
                    gasEstimates: { ...gasEstimates, blockSubmitted: blockNumber },
                },
            };
        }
        // Update the transaction with the hash and populated request
        yield* call(updateSubmittedTransaction, unsubmittedTransaction, transactionResponse.hash, populatedRequest, params.analytics);
        return { transactionResponse };
    }
    catch (error) {
        // TODO(WALL-5027): Improve error segmentation
        yield* put(transactionActions.finalizeTransaction({ ...unsubmittedTransaction, status: TransactionStatus.Failed }));
        throw error;
    }
}
export async function signAndSendTransaction(request, account, provider, signerManager) {
    const signer = await signerManager.getSignerForAccount(account);
    const connectedSigner = signer.connect(provider);
    const hexRequest = hexlifyTransaction(request);
    const populatedRequest = await connectedSigner.populateTransaction(hexRequest);
    const signedTx = await connectedSigner.signTransaction(populatedRequest);
    const transactionResponse = await provider.sendTransaction(signedTx);
    return { transactionResponse, populatedRequest };
}
function* addUnsubmittedTransaction({ chainId, typeInfo, account, options, txId, transactionOriginType, }) {
    const id = txId !== null && txId !== void 0 ? txId : createTransactionId();
    const transaction = {
        routing: isBridgeTypeInfo(typeInfo) ? Routing.BRIDGE : Routing.CLASSIC,
        id,
        chainId,
        typeInfo,
        from: account.address,
        addedTime: Date.now(),
        status: TransactionStatus.Pending,
        options: {
            ...options,
        },
        transactionOriginType,
    };
    yield* put(transactionActions.addTransaction(transaction));
    logger.debug('sendTransaction', 'addUnsubmittedTransaction', 'Tx added:', { chainId, ...typeInfo });
    return transaction;
}
function* updateSubmittedTransaction(transaction, hash, populatedRequest, analytics) {
    const request = getSerializableTransactionRequest(populatedRequest, transaction.chainId);
    const submittedTimestampMs = Date.now();
    const timeoutTimestampMs = transaction.typeInfo.gasEstimates || transaction.options.submitViaPrivateRpc
        ? submittedTimestampMs + getTransactionTimeoutMs(transaction.chainId)
        : undefined;
    const updatedTransaction = {
        ...transaction,
        hash,
        status: TransactionStatus.Pending,
        options: {
            ...transaction.options,
            request,
            submittedTimestampMs,
            timeoutTimestampMs,
        },
    };
    if (transaction.typeInfo.type === TransactionType.Swap || transaction.typeInfo.type === TransactionType.Bridge) {
        if (!analytics) {
            // Don't expect swaps from WC or Dapps to always provide analytics object
            if (transaction.transactionOriginType === TransactionOriginType.Internal) {
                logger.error(new Error('Missing `analytics` for swap when calling `addTransaction`'), {
                    tags: { file: 'sendTransaction', function: 'addTransaction' },
                    extra: { transaction },
                });
            }
        }
        else {
            const event = {
                transaction_hash: hash,
                ...analytics,
            };
            yield* call(sendAnalyticsEvent, WalletEventName.SwapSubmitted, event);
        }
    }
    yield* put(transactionActions.updateTransaction(updatedTransaction));
    logger.debug('sendTransaction', 'updateSubmittedTransaction', 'Tx updated:', {
        chainId: updatedTransaction.chainId,
        ...updatedTransaction.typeInfo,
    });
}
/**
 * Attempts to fetch the next nonce to be used for a transaction.
 * If the chain supports private RPC, it will use the private RPC provider, in order to account for pending private transactions.
 *
 * @param account - The account to fetch the nonce for.
 * @param chainId - The chain ID to fetch the nonce for.
 * @returns The nonce if it was successfully fetched, otherwise undefined.
 */
export function* tryGetNonce(account, chainId) {
    try {
        const isPrivateRpcEnabled = Statsig.checkGate(getFeatureFlagName(FeatureFlags.PrivateRpc));
        const useFlashbots = getDynamicConfigValue(DynamicConfigs.MainnetPrivateRpc, MainnetPrivateRpcConfigKey.UseFlashbots, false);
        const sendAuthenticationHeader = getDynamicConfigValue(DynamicConfigs.MainnetPrivateRpc, MainnetPrivateRpcConfigKey.SendFlashbotsAuthenticationHeader, false);
        const shouldUseFlashbots = isPrivateRpcEnabled && chainId === UniverseChainId.Mainnet && useFlashbots && sendAuthenticationHeader;
        const provider = shouldUseFlashbots
            ? yield* call(getPrivateProvider, chainId, account)
            : yield* call(getProvider, chainId);
        const nonce = yield* call([provider, provider.getTransactionCount], account.address, 'pending');
        // If we're using Flashbots with authentication header as private RPC, it will already account for pending private transactions. Otherwise, add the local pending private transactions.
        if (!shouldUseFlashbots && isPrivateRpcSupportedOnChain(chainId)) {
            const pendingPrivateTransactionCount = yield* call(getPendingPrivateTxCount, account.address, chainId);
            return nonce + pendingPrivateTransactionCount;
        }
        return nonce;
    }
    catch (error) {
        logger.error(error, {
            tags: { file: 'sendTransaction', function: 'tryGetNonce' },
        });
        return undefined;
    }
}
export function* getPendingPrivateTxCount(address, chainId) {
    const selectAddressTransactions = yield* call(makeSelectAddressTransactions);
    const pendingTransactions = yield* select(selectAddressTransactions, address);
    if (!pendingTransactions) {
        return 0;
    }
    return pendingTransactions.filter((tx) => tx.chainId === chainId &&
        tx.status === TransactionStatus.Pending &&
        isClassic(tx) &&
        Boolean(tx.options.submitViaPrivateRpc) &&
        tx.hash).length;
}
//# sourceMappingURL=sendTransactionSaga.js.map