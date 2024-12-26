import { SwapEventName } from '@uniswap/analytics-events';
import { TradeType } from '@uniswap/sdk-core';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { call, delay, fork, put, race, select, take, takeEvery } from 'typed-redux-saga';
import { PollingInterval } from 'uniswap/src/constants/misc';
import { fetchSwaps } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
import { SwapStatus } from 'uniswap/src/data/tradingApi/__generated__';
import { getGasPrice } from 'uniswap/src/features/gas/types';
import { findLocalGasStrategy } from 'uniswap/src/features/gas/utils';
import { DynamicConfigs, MainnetPrivateRpcConfigKey } from 'uniswap/src/features/gating/configs';
import { getDynamicConfigValue } from 'uniswap/src/features/gating/hooks';
import { pushNotification, setNotificationStatus } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType } from 'uniswap/src/features/notifications/types';
import { MobileAppsFlyerEvents, WalletEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent, sendAppsFlyerEvent } from 'uniswap/src/features/telemetry/send';
import { NativeCurrency } from 'uniswap/src/features/tokens/NativeCurrency';
import { refetchGQLQueries } from 'uniswap/src/features/transactions/refetchGQLQueriesSaga';
import { makeSelectTransaction, selectIncompleteTransactions, selectSwapTransactionsCount, } from 'uniswap/src/features/transactions/selectors';
import { addTransaction, cancelTransaction, forceFetchFiatOnRampTransactions, replaceTransaction, transactionActions, updateTransaction, upsertFiatOnRampTransaction, } from 'uniswap/src/features/transactions/slice';
import { tradeRoutingToFillType } from 'uniswap/src/features/transactions/swap/analytics';
import { SwapEventType, timestampTracker } from 'uniswap/src/features/transactions/swap/utils/SwapEventTimestampTracker';
import { isBridge, isClassic, isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { toTradingApiSupportedChainId } from 'uniswap/src/features/transactions/swap/utils/tradingApi';
import { QueuedOrderStatus, TransactionStatus, TransactionType, isFinalizedTx, } from 'uniswap/src/features/transactions/types/transactionDetails';
import i18n from 'uniswap/src/i18n/i18n';
import { currencyIdToChain } from 'uniswap/src/utils/currencyId';
import { logger } from 'utilities/src/logger/logger';
import { ONE_SECOND_MS } from 'utilities/src/time/time';
import { fetchFiatOnRampTransaction } from 'wallet/src/features/fiatOnRamp/api';
import { attemptCancelTransaction } from 'wallet/src/features/transactions/cancelTransactionSaga';
import { OrderWatcher } from 'wallet/src/features/transactions/orderWatcherSaga';
import { attemptReplaceTransaction } from 'wallet/src/features/transactions/replaceTransactionSaga';
import { getDiff, getFinalizedTransactionStatus, getPercentageError, isOnRampTransaction, receiptFromEthersReceipt, } from 'wallet/src/features/transactions/utils';
import { getProvider } from 'wallet/src/features/wallet/context';
import { selectActiveAccountAddress } from 'wallet/src/features/wallet/selectors';
export const SWAP_STATUS_TO_TX_STATUS = {
    [SwapStatus.PENDING]: TransactionStatus.Pending,
    [SwapStatus.SUCCESS]: TransactionStatus.Success,
    [SwapStatus.NOT_FOUND]: TransactionStatus.Unknown,
    [SwapStatus.FAILED]: TransactionStatus.Failed,
    [SwapStatus.EXPIRED]: TransactionStatus.Expired,
};
const FINALIZED_BRIDGE_SWAP_STATUS = [SwapStatus.SUCCESS, SwapStatus.FAILED, SwapStatus.EXPIRED];
const MIN_BRIDGE_WAIT_TIME = ONE_SECOND_MS * 3;
export function* transactionWatcher({ apolloClient }) {
    logger.debug('transactionWatcherSaga', 'transactionWatcher', 'Starting tx watcher');
    // Start the order watcher to allow off-chain order updates to propagate to watchTransaction
    yield* fork(OrderWatcher.initialize);
    // First, fork off watchers for any incomplete txs that are already in store
    // This allows us to detect completions if a user closed the app before a tx finished
    const incompleteTransactions = yield* select(selectIncompleteTransactions);
    for (const transaction of incompleteTransactions) {
        if (isOnRampTransaction(transaction)) {
            yield* fork(watchFiatOnRampTransaction, transaction);
        }
        else {
            // If the transaction was a queued UniswapX order that never became submitted, update UI to show failure
            if (isUniswapX(transaction) && transaction.queueStatus === QueuedOrderStatus.Waiting) {
                const updatedOrder = { ...transaction, queueStatus: QueuedOrderStatus.AppClosed };
                yield* put(transactionActions.updateTransaction(updatedOrder));
                continue;
            }
            yield* fork(watchTransaction, { transaction, apolloClient });
        }
    }
    // Next, start watching for new or updated transactions dispatches
    while (true) {
        const { payload: transaction } = yield* take([
            addTransaction.type,
            updateTransaction.type,
        ]);
        try {
            if (isOnRampTransaction(transaction)) {
                yield* fork(watchFiatOnRampTransaction, transaction);
            }
            else {
                yield* fork(watchTransaction, { transaction, apolloClient });
            }
        }
        catch (error) {
            logger.error(error, {
                tags: {
                    file: 'transactionWatcherSaga',
                    function: 'watchTransaction',
                },
                extra: { txHash: transaction.hash },
            });
            yield* put(pushNotification({
                type: AppNotificationType.Error,
                address: transaction.from,
                errorMessage: i18n.t('transaction.watcher.error.status'),
            }));
        }
    }
}
export function* fetchUpdatedFiatOnRampTransaction(transaction, forceFetch) {
    return yield* call(fetchFiatOnRampTransaction, transaction, forceFetch);
}
export function* watchFiatOnRampTransaction(transaction) {
    const { id } = transaction;
    let forceFetch = false;
    logger.debug('transactionWatcherSaga', 'watchFiatOnRampTransaction', 'Watching for updates for fiat onramp tx:', id);
    try {
        while (true) {
            const updatedTransaction = yield* fetchUpdatedFiatOnRampTransaction(transaction, forceFetch);
            forceFetch = false;
            // We've got an invalid response from backend
            if (!updatedTransaction) {
                return;
            }
            // Stale transaction, never found on backend
            if (updatedTransaction.status === TransactionStatus.Unknown) {
                yield* call(deleteTransaction, transaction);
                return; // stop polling
            }
            // Transaction has been found
            if (updatedTransaction.typeInfo.type !== TransactionType.LocalOnRamp) {
                logger.debug('transactionWatcherSaga', 'watchFiatOnRampTransaction', `Updating transaction with id ${id} from status ${transaction.status} to ${updatedTransaction.status}`);
            }
            // Update transaction
            yield* put(upsertFiatOnRampTransaction(updatedTransaction));
            // Finished transaction
            if (updatedTransaction.status === TransactionStatus.Failed ||
                updatedTransaction.status === TransactionStatus.Success) {
                // Show notification badge
                yield* put(setNotificationStatus({ address: transaction.from, hasNotifications: true }));
                return; // stop polling
            }
            // at this point, we received a response from backend
            // however, we didn't have enough information to act
            // try again after a waiting period or when we've come back WebView
            const raceResult = yield* race({
                forceFetch: take(forceFetchFiatOnRampTransactions),
                timeout: delay(PollingInterval.Fast),
            });
            if (raceResult.forceFetch) {
                forceFetch = true;
            }
        }
    }
    catch (error) {
        logger.error(error, {
            tags: { file: 'transactionWatcherSaga', function: 'watchFiatOnRampTransaction' },
        });
    }
}
export function* watchTransaction({ transaction, apolloClient, }) {
    const { chainId, id, hash } = transaction;
    logger.debug('transactionWatcherSaga', 'watchTransaction', 'Watching for updates for tx:', hash);
    const provider = yield* call(getProvider, chainId);
    const options = isUniswapX(transaction) ? undefined : transaction.options;
    const { updatedTransaction, cancel, replace, invalidated, timeout } = yield* race({
        updatedTransaction: call(waitForRemoteUpdate, transaction, provider),
        cancel: call(waitForCancellation, chainId, id),
        replace: call(waitForReplacement, chainId, id),
        invalidated: call(waitForTxnInvalidated, chainId, id, options === null || options === void 0 ? void 0 : options.request.nonce),
        ...((options === null || options === void 0 ? void 0 : options.timeoutTimestampMs) ? { timeout: call(waitForTimeout, options.timeoutTimestampMs) } : {}),
    });
    // `cancel` and `updatedTransaction` conditions apply to both Classic and UniswapX transactions
    if (cancel) {
        // reset watcher for the current txn, as it can still be mined (or invalidated by the new txn)
        yield* fork(watchTransaction, { transaction, apolloClient });
        // Cancel the current txn, which submits a new txn on chain and monitored in state
        yield* call(attemptCancelTransaction, transaction, cancel);
        return;
    }
    if (updatedTransaction) {
        if (isFinalizedTx(updatedTransaction)) {
            // Update the store with tx receipt details
            yield* call(finalizeTransaction, { transaction: updatedTransaction, apolloClient });
            return;
        }
        else {
            yield* put(transactionActions.updateTransaction(updatedTransaction));
            // reset watcher for the current txn, as new statuses can be received for the pending order
            yield* fork(watchTransaction, { transaction: updatedTransaction, apolloClient });
        }
    }
    // `replace` and `invalidated` conditions do not apply to UniswapX orders
    if (isUniswapX(transaction)) {
        return;
    }
    if (replace) {
        // Same logic as cancelation, but skip directly to replacement
        yield* fork(watchTransaction, { transaction, apolloClient });
        yield* call(attemptReplaceTransaction, transaction, replace.newTxParams);
        return;
    }
    if (invalidated) {
        yield* call(deleteTransaction, transaction);
        // Show popup if invalidated cancelation - was not mined before original txn
        if (transaction.status === TransactionStatus.Cancelling) {
            yield* put(pushNotification({
                type: AppNotificationType.Error,
                address: transaction.from,
                errorMessage: i18n.t('transaction.watcher.error.cancel'),
            }));
        }
        return;
    }
    if (timeout && transaction.status === TransactionStatus.Pending) {
        logger.warn('transactionWatcherSaga', 'watchTransaction', 'Timeout for pending tx', {
            hash,
            chainId,
            id,
        });
        yield* call(logTransactionTimeout, transaction);
        yield* call(maybeLogGasEstimateAccuracy, transaction);
        return;
    }
}
export async function waitForReceipt(hash, provider) {
    const txReceipt = await provider.waitForTransaction(hash);
    if (txReceipt) {
        logger.debug('transactionWatcherSaga', 'waitForTransactionReceipt', 'Tx receipt received', hash);
    }
    return txReceipt;
}
function* waitForTimeout(timeoutTimestampMs) {
    const currentTime = Date.now();
    const delayTime = timeoutTimestampMs - currentTime;
    if (delayTime <= 0) {
        return true;
    }
    yield* delay(delayTime);
    return true;
}
function* waitForRemoteUpdate(transaction, provider) {
    var _a;
    let hash = transaction.hash;
    let status = transaction.status;
    // For UniswapX orders, we need to wait for the order to be filled before we can get the hash
    if (isUniswapX(transaction) && transaction.orderHash && transaction.queueStatus) {
        const updatedOrder = yield* call(OrderWatcher.waitForOrderStatus, transaction.orderHash, transaction.queueStatus);
        hash = updatedOrder.hash;
        status = updatedOrder.status;
        // Return early if a new status is received, but no hash is provided (meaning the order is not filled)
        if (!updatedOrder.hash) {
            return updatedOrder;
        }
    }
    if ((isBridge(transaction) || isClassic(transaction)) && !((_a = transaction.options) === null || _a === void 0 ? void 0 : _a.submittedTimestampMs)) {
        // Transaction was not submitted yet, ignore it for now
        // Once it's submitted, it'll be updated and the watcher will pick it up
        return undefined;
    }
    // At this point, the tx should either be a classic / bridge tx or a filled order, both of which have hashes
    if (!hash) {
        logger.error(new Error('Watching for tx with no hash'), {
            tags: {
                file: 'transactionWatcherSaga',
                function: 'watchTransaction',
            },
            extra: { transaction },
        });
        return undefined;
    }
    const ethersReceipt = yield* call(waitForReceipt, hash, provider);
    const receipt = receiptFromEthersReceipt(ethersReceipt);
    const nativeCurrency = NativeCurrency.onChain(transaction.chainId);
    const networkFee = {
        quantity: formatEther(ethersReceipt.effectiveGasPrice.mul(ethersReceipt.gasUsed)),
        tokenSymbol: nativeCurrency.symbol,
        tokenAddress: nativeCurrency.address,
        chainId: transaction.chainId,
    };
    if (isBridge(transaction) &&
        getFinalizedTransactionStatus(transaction.status, ethersReceipt === null || ethersReceipt === void 0 ? void 0 : ethersReceipt.status) === TransactionStatus.Success) {
        // Only the send part was successful, wait for receive part to be confirmed on chain.
        // Bridge swaps become non-cancellable after the send transaction is confirmed on chain.
        if (!transaction.sendConfirmed) {
            const updatedTransaction = {
                ...transaction,
                sendConfirmed: true,
                networkFee,
            };
            yield* put(transactionActions.updateTransaction(updatedTransaction));
            // Updating the transaction will trigger a new watch.
            // Return undefined to break out of the current watcher.
            return undefined;
        }
        // Send part was successful, poll for bridging status from BE
        status = yield* call(waitForBridgingStatus, transaction);
    }
    // Classic transaction status is based on receipt, while UniswapX status is based backend response.
    if (isClassic(transaction)) {
        status = getFinalizedTransactionStatus(transaction.status, ethersReceipt === null || ethersReceipt === void 0 ? void 0 : ethersReceipt.status);
    }
    return { ...transaction, status, receipt, hash, networkFee };
}
function* waitForBridgingStatus(transaction) {
    var _a, _b;
    const txHash = transaction.hash;
    const chainId = toTradingApiSupportedChainId(transaction.chainId);
    if (!txHash || !chainId) {
        return TransactionStatus.Unknown;
    }
    let swapStatus;
    const initialPollIntervalMs = 500;
    const maxRetries = 10; // 500 ms, 1 second, 2 seconds...
    const backoffFactor = 2; // Each retry will double the wait time
    let pollIndex = 0;
    yield* delay(MIN_BRIDGE_WAIT_TIME); // Wait minimum of 3 seconds before polling
    while (pollIndex < maxRetries) {
        const currentPollInterval = initialPollIntervalMs * Math.pow(backoffFactor, pollIndex);
        logger.debug('transactionWatcherSaga', `[${txHash}] waitForBridgingStatus`, 'polling for status', {
            pollIndex,
            currentPollInterval,
        });
        yield* delay(currentPollInterval);
        const data = yield* call(fetchSwaps, {
            txHashes: [txHash],
            chainId,
        });
        const currentSwapStatus = (_b = (_a = data.swaps) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.status;
        logger.debug('transactionWatcherSaga', `[${txHash}] waitForBridgingStatus`, 'currentSwapStatus:', currentSwapStatus);
        if (currentSwapStatus && FINALIZED_BRIDGE_SWAP_STATUS.includes(currentSwapStatus)) {
            swapStatus = currentSwapStatus;
            break;
        }
        // Check if the redux store has been updated with a new status
        const selectTransactionById = yield* call(makeSelectTransaction);
        const updatedTransaction = yield* select(selectTransactionById, {
            address: transaction.from,
            chainId: transaction.chainId,
            txId: transaction.id,
        });
        if (updatedTransaction &&
            updatedTransaction.status !== TransactionStatus.Pending &&
            updatedTransaction.typeInfo.type === TransactionType.Bridge) {
            logger.debug('transactionWatcherSaga', `[${transaction.id}] waitForBridgingStatus`, 'Local update found: ', updatedTransaction.status);
            return updatedTransaction === null || updatedTransaction === void 0 ? void 0 : updatedTransaction.status;
        }
        pollIndex++;
    }
    logger.debug('transactionWatcherSaga', `[${transaction.id}] waitForBridgingStatus`, 'final swapStatus:', swapStatus);
    // If we didn't get a status after polling, assume it's failed
    return swapStatus ? SWAP_STATUS_TO_TX_STATUS[swapStatus] : TransactionStatus.Failed;
}
function* waitForCancellation(chainId, id) {
    while (true) {
        const { payload } = yield* take(cancelTransaction.type);
        if (payload.cancelRequest && payload.chainId === chainId && payload.id === id) {
            return payload.cancelRequest;
        }
    }
}
function* waitForReplacement(chainId, id) {
    while (true) {
        const { payload } = yield* take(replaceTransaction.type);
        if (payload.chainId === chainId && payload.id === id) {
            return payload;
        }
    }
}
/**
 * Monitor for transactions with the same nonce as the current transaction. If any duplicate is finalized, it means
 * the current transaction has been invalidated and wont be picked up on chain.
 */
export function* waitForTxnInvalidated(chainId, id, nonce) {
    yield* race({
        sameNonceFinalized: call(waitForSameNonceFinalized, chainId, id, nonce),
        bridgeSendCompleted: call(waitForBridgeSendCompleted, chainId, id, nonce),
    });
    return true;
}
export function* waitForSameNonceFinalized(chainId, id, nonce) {
    while (true) {
        const { payload } = yield* take(transactionActions.finalizeTransaction.type);
        if (!isUniswapX(payload) && // UniswapX transactions are submitted by a filler, so they cannot invalidate a transaction sent by a user.
            payload.chainId === chainId &&
            payload.id !== id &&
            payload.options.request.nonce === nonce) {
            return true;
        }
    }
}
/**
 * When we're canceling a bridge tx, we should invalidate the cancel tx as soon as the send part
 * of the bridge is confirmed on chain, instead of waiting for the full completion of the bridge.
 */
export function* waitForBridgeSendCompleted(chainId, id, nonce) {
    while (true) {
        const { payload } = yield* take(transactionActions.updateTransaction.type);
        if (isBridge(payload) &&
            payload.sendConfirmed &&
            payload.chainId === chainId &&
            payload.id !== id &&
            payload.options.request.nonce === nonce) {
            return true;
        }
    }
}
/**
 * Send analytics events for finalized transactions
 */
export function logTransactionEvent(actionData) {
    const { payload } = actionData;
    const { hash, chainId, addedTime, from, typeInfo, receipt, status, transactionOriginType } = payload;
    const { gasUsed, effectiveGasPrice, confirmedTime } = receipt !== null && receipt !== void 0 ? receipt : {};
    const { type } = typeInfo;
    // Send analytics event for swap success and failure
    if (type === TransactionType.Swap || type === TransactionType.Bridge) {
        const { quoteId, gasUseEstimate, inputCurrencyId, outputCurrencyId, transactedUSDValue } = typeInfo;
        const swapProperties = type === TransactionType.Swap
            ? {
                tradeType: typeInfo.tradeType === TradeType.EXACT_INPUT ? 'EXACT_INPUT' : 'EXACT_OUTPUT',
                slippageTolerance: typeInfo.slippageTolerance,
                route: typeInfo.routeString,
                protocol: typeInfo.protocol,
                simulation_failure_reasons: typeInfo.simulationFailureReasons,
            }
            : undefined;
        const bridgeProperties = {
            chain_id_in: chainId,
            chain_id_out: (type === TransactionType.Bridge && currencyIdToChain(typeInfo.outputCurrencyId)) || chainId,
        };
        const baseProperties = {
            routing: tradeRoutingToFillType({ routing: payload.routing, indicative: false }),
            hash,
            transactionOriginType,
            address: from,
            chain_id: chainId,
            added_time: addedTime,
            confirmed_time: confirmedTime,
            gas_used: gasUsed,
            effective_gas_price: effectiveGasPrice,
            inputCurrencyId,
            outputCurrencyId,
            gasUseEstimate,
            quoteId,
            submitViaPrivateRpc: isUniswapX(payload) ? false : payload.options.submitViaPrivateRpc,
            transactedUSDValue,
            ...swapProperties,
            ...bridgeProperties,
        };
        if (isUniswapX(payload)) {
            const { orderHash } = payload;
            // All local uniswapx swaps should be tracked in redux with an orderHash .
            if (!orderHash) {
                logger.error(new Error('Attempting to log uniswapx swap event without a orderHash'), {
                    tags: {
                        file: 'transactionWatcherSaga',
                        function: 'logTransactionEvent',
                    },
                    extra: { payload },
                });
                return;
            }
            if (status === TransactionStatus.Success) {
                const properties = { ...baseProperties, order_hash: orderHash, hash };
                logSwapSuccess(properties);
            }
            else {
                const properties = { ...baseProperties, order_hash: orderHash };
                sendAnalyticsEvent(SwapEventName.SWAP_TRANSACTION_FAILED, properties);
            }
        }
        else {
            // All successful classic swaps should be tracked in redux with a tx hash.
            if (status !== TransactionStatus.Failed && !hash) {
                logger.error(new Error('Attempting to log swap event without a hash'), {
                    tags: {
                        file: 'transactionWatcherSaga',
                        function: 'logTransactionEvent',
                    },
                    extra: { payload },
                });
                return;
            }
            if (status === TransactionStatus.Success) {
                logSwapSuccess({ ...baseProperties, hash });
            }
            else {
                sendAnalyticsEvent(SwapEventName.SWAP_TRANSACTION_FAILED, { ...baseProperties, hash });
            }
        }
    }
    // Log metrics for confirmed transfers
    if (type === TransactionType.Send) {
        const { tokenAddress, recipient: toAddress, currencyAmountUSD } = typeInfo;
        const amountUSD = currencyAmountUSD ? parseFloat(currencyAmountUSD === null || currencyAmountUSD === void 0 ? void 0 : currencyAmountUSD.toFixed(2)) : undefined;
        sendAnalyticsEvent(WalletEventName.TransferCompleted, {
            chainId,
            tokenAddress,
            toAddress,
            amountUSD,
        });
    }
    maybeLogGasEstimateAccuracy(payload);
}
function logTransactionTimeout(transaction) {
    var _a;
    const useFlashbots = getDynamicConfigValue(DynamicConfigs.MainnetPrivateRpc, MainnetPrivateRpcConfigKey.UseFlashbots, false);
    const sendAuthenticationHeader = getDynamicConfigValue(DynamicConfigs.MainnetPrivateRpc, MainnetPrivateRpcConfigKey.SendFlashbotsAuthenticationHeader, false);
    sendAnalyticsEvent(WalletEventName.PendingTransactionTimeout, {
        use_flashbots: useFlashbots,
        send_authentication_header: sendAuthenticationHeader,
        chain_id: transaction.chainId,
        tx_hash: transaction.hash,
        private_rpc: (_a = (isClassic(transaction) && transaction.options.submitViaPrivateRpc)) !== null && _a !== void 0 ? _a : false,
    });
}
function maybeLogGasEstimateAccuracy(transaction) {
    var _a, _b, _c, _d, _e, _f, _g;
    const { gasEstimates } = transaction.typeInfo;
    if (!gasEstimates) {
        return;
    }
    const transactionGasLimit = 'options' in transaction ? transaction.options.request.gasLimit : undefined;
    const out_of_gas = !!transaction.receipt &&
        !!transactionGasLimit &&
        transaction.status === TransactionStatus.Failed &&
        BigNumber.from(transactionGasLimit).toString() === ((_a = transaction.receipt) === null || _a === void 0 ? void 0 : _a.gasUsed.toString());
    const timed_out = !transaction.receipt &&
        'options' in transaction &&
        !!transaction.options.timeoutTimestampMs &&
        Date.now() > transaction.options.timeoutTimestampMs;
    for (const estimate of [gasEstimates.activeEstimate, ...(gasEstimates.shadowEstimates || [])]) {
        const gasUseDiff = getDiff(estimate.gasLimit, (_b = transaction.receipt) === null || _b === void 0 ? void 0 : _b.gasUsed);
        const gasPriceDiff = getDiff(getGasPrice(estimate), (_c = transaction.receipt) === null || _c === void 0 ? void 0 : _c.effectiveGasPrice);
        const localGasStrategy = findLocalGasStrategy(estimate, transaction.typeInfo.type === TransactionType.Swap ? 'swap' : 'general');
        sendAnalyticsEvent(WalletEventName.GasEstimateAccuracy, {
            tx_hash: transaction.hash,
            transaction_type: transaction.typeInfo.type,
            chain_id: transaction.chainId,
            final_status: transaction.status,
            time_to_confirmed_ms: getDiff(Date.now(), transaction.addedTime),
            blocks_to_confirmed: getDiff((_d = transaction.receipt) === null || _d === void 0 ? void 0 : _d.blockNumber, gasEstimates.blockSubmitted),
            gas_use_diff: gasUseDiff,
            gas_use_diff_percentage: getPercentageError(gasUseDiff, estimate.gasLimit),
            gas_used: (_e = transaction.receipt) === null || _e === void 0 ? void 0 : _e.gasUsed,
            gas_price_diff: gasPriceDiff,
            gas_price_diff_percentage: getPercentageError(gasPriceDiff, getGasPrice(estimate)),
            gas_price: (_f = transaction.receipt) === null || _f === void 0 ? void 0 : _f.effectiveGasPrice,
            max_priority_fee_per_gas: 'maxPriorityFeePerGas' in estimate ? estimate.maxPriorityFeePerGas : undefined,
            out_of_gas,
            private_rpc: isClassic(transaction) ? (_g = transaction.options.submitViaPrivateRpc) !== null && _g !== void 0 ? _g : false : false,
            is_shadow: estimate !== gasEstimates.activeEstimate,
            name: localGasStrategy === null || localGasStrategy === void 0 ? void 0 : localGasStrategy.conditions.name,
            display_limit_inflation_factor: localGasStrategy === null || localGasStrategy === void 0 ? void 0 : localGasStrategy.strategy.displayLimitInflationFactor,
            timed_out,
        });
    }
}
export function* finalizeTransaction({ apolloClient, transaction, }) {
    yield* put(transactionActions.finalizeTransaction(transaction));
    // Flip status to true so we can render Notification badge on home
    yield* put(setNotificationStatus({ address: transaction.from, hasNotifications: true }));
    // Refetch data when a local tx has confirmed
    const activeAddress = yield* select(selectActiveAccountAddress);
    yield* refetchGQLQueries({
        transaction,
        apolloClient,
        activeAddress,
    });
    if (transaction.typeInfo.type === TransactionType.Swap || transaction.typeInfo.type === TransactionType.Bridge) {
        const hasDoneOneSwap = (yield* select(selectSwapTransactionsCount)) === 1;
        if (hasDoneOneSwap) {
            // Only log event if it's a user's first ever swap
            // TODO: Add $ amount to swap event once transaction type supports it
            yield* call(sendAppsFlyerEvent, MobileAppsFlyerEvents.SwapCompleted);
        }
    }
}
/**
 * Delete transaction from state. Should be called when a transaction should no longer
 * be monitored. Often used when txn is replaced or cancelled.
 * @param transaction txn to delete from state
 */
export function* deleteTransaction(transaction) {
    yield* put(transactionActions.deleteTransaction({
        address: transaction.from,
        id: transaction.id,
        chainId: transaction.chainId,
    }));
}
export function* watchTransactionEvents() {
    // Watch for finalized transactions to send analytics events
    yield* takeEvery(transactionActions.finalizeTransaction.type, logTransactionEvent);
}
export function logSwapSuccess(analyticsProps) {
    const hasSetSwapSuccess = timestampTracker.hasTimestamp(SwapEventType.FirstSwapSuccess);
    const elapsedTime = timestampTracker.setElapsedTime(SwapEventType.FirstSwapSuccess);
    sendAnalyticsEvent(SwapEventName.SWAP_TRANSACTION_COMPLETED, {
        ...analyticsProps,
        // We only log the time-to-swap metric for the first swap of a session,
        // so if it was previously set we log undefined here.
        time_to_swap: hasSetSwapSuccess ? undefined : elapsedTime,
        time_to_swap_since_first_input: hasSetSwapSuccess
            ? undefined
            : timestampTracker.getElapsedTime(SwapEventType.FirstSwapSuccess, SwapEventType.FirstSwapAction),
    });
}
//# sourceMappingURL=transactionWatcherSaga.js.map