import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { makeSelectTransaction, useSelectAddressTransactions } from 'uniswap/src/features/transactions/selectors';
import { finalizeTransaction } from 'uniswap/src/features/transactions/slice';
import { isBridge, isClassic, isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { QueuedOrderStatus, TransactionStatus, TransactionType, isFinalizedTx, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { ensureLeading0x } from 'uniswap/src/utils/addresses';
import { areCurrencyIdsEqual, buildCurrencyId } from 'uniswap/src/utils/currencyId';
import { createSwapFormFromTxDetails, createWrapFormFromTxDetails, } from 'wallet/src/features/transactions/swap/createSwapFormFromTxDetails';
import { useActiveAccountAddressWithThrow } from 'wallet/src/features/wallet/hooks';
export function usePendingTransactions(address, ignoreTransactionTypes = []) {
    const transactions = useSelectAddressTransactions(address);
    return useMemo(() => {
        if (!transactions) {
            return undefined;
        }
        return transactions.filter((tx) => tx.status === TransactionStatus.Pending && !ignoreTransactionTypes.includes(tx.typeInfo.type));
    }, [ignoreTransactionTypes, transactions]);
}
const ERRORED_QUEUE_STATUSES = [
    QueuedOrderStatus.AppClosed,
    QueuedOrderStatus.ApprovalFailed,
    QueuedOrderStatus.WrapFailed,
    QueuedOrderStatus.SubmissionFailed,
    QueuedOrderStatus.Stale,
];
function isErroredQueuedOrder(tx) {
    return Boolean(isUniswapX(tx) &&
        tx.status === TransactionStatus.Pending &&
        tx.queueStatus &&
        ERRORED_QUEUE_STATUSES.some((status) => status === tx.queueStatus));
}
export function useErroredQueuedOrders(address) {
    const transactions = useSelectAddressTransactions(address);
    return useMemo(() => {
        if (!transactions) {
            return undefined;
        }
        const erroredQueuedOrders = [];
        for (const tx of transactions) {
            if (isErroredQueuedOrder(tx)) {
                erroredQueuedOrders.push(tx);
            }
        }
        return erroredQueuedOrders.sort((a, b) => b.addedTime - a.addedTime);
    }, [transactions]);
}
// sorted oldest to newest
export function useSortedPendingTransactions(address) {
    const transactions = usePendingTransactions(address);
    return useMemo(() => {
        if (!transactions) {
            return undefined;
        }
        return transactions.sort((a, b) => a.addedTime - b.addedTime);
    }, [transactions]);
}
export function useSelectTransaction(address, chainId, txId) {
    const selectTransaction = useMemo(makeSelectTransaction, []);
    return useSelector((state) => selectTransaction(state, { address, chainId, txId }));
}
export function useCreateSwapFormState(address, chainId, txId) {
    const transaction = useSelectTransaction(address, chainId, txId);
    const inputCurrencyId = (transaction === null || transaction === void 0 ? void 0 : transaction.typeInfo.type) === TransactionType.Swap || (transaction === null || transaction === void 0 ? void 0 : transaction.typeInfo.type) === TransactionType.Bridge
        ? transaction.typeInfo.inputCurrencyId
        : undefined;
    const outputCurrencyId = (transaction === null || transaction === void 0 ? void 0 : transaction.typeInfo.type) === TransactionType.Swap || (transaction === null || transaction === void 0 ? void 0 : transaction.typeInfo.type) === TransactionType.Bridge
        ? transaction.typeInfo.outputCurrencyId
        : undefined;
    const inputCurrencyInfo = useCurrencyInfo(inputCurrencyId);
    const outputCurrencyInfo = useCurrencyInfo(outputCurrencyId);
    return useMemo(() => {
        if (!chainId || !txId || !transaction) {
            return undefined;
        }
        return createSwapFormFromTxDetails({
            transactionDetails: transaction,
            inputCurrency: inputCurrencyInfo === null || inputCurrencyInfo === void 0 ? void 0 : inputCurrencyInfo.currency,
            outputCurrency: outputCurrencyInfo === null || outputCurrencyInfo === void 0 ? void 0 : outputCurrencyInfo.currency,
        });
    }, [chainId, inputCurrencyInfo, outputCurrencyInfo, transaction, txId]);
}
export function useCreateWrapFormState(address, chainId, txId, inputCurrency, outputCurrency) {
    const transaction = useSelectTransaction(address, chainId, txId);
    return useMemo(() => {
        if (!chainId || !txId || !transaction) {
            return undefined;
        }
        return createWrapFormFromTxDetails({
            transactionDetails: transaction,
            inputCurrency,
            outputCurrency,
        });
    }, [chainId, inputCurrency, outputCurrency, transaction, txId]);
}
/**
 * Merge local and remote transactions. If duplicated hash found use data from local store.
 */
export function useMergeLocalAndRemoteTransactions(address, remoteTransactions) {
    const dispatch = useDispatch();
    const localTransactions = useSelectAddressTransactions(address);
    const { chains } = useEnabledChains();
    // Merge local and remote txs into one array and reconcile data discrepancies
    return useMemo(() => {
        if (!(remoteTransactions === null || remoteTransactions === void 0 ? void 0 : remoteTransactions.length)) {
            return localTransactions;
        }
        if (!(localTransactions === null || localTransactions === void 0 ? void 0 : localTransactions.length)) {
            return remoteTransactions;
        }
        // This map enables `getTrackingHash` to deduplicate UniswapX orders in the event that one source
        // has a filled order (orderHash + txHash), while the other has it pending (orderHash only).
        const orderHashToTxHashMap = new Map();
        function populateOrderHashToTxHashMap(tx) {
            if (isUniswapX(tx) && tx.hash && tx.orderHash) {
                const txHash = ensureLeading0x(tx.hash.toLowerCase());
                const orderHash = ensureLeading0x(tx.orderHash.toLowerCase());
                orderHashToTxHashMap.set(orderHash, txHash);
            }
        }
        remoteTransactions.forEach(populateOrderHashToTxHashMap);
        localTransactions.forEach(populateOrderHashToTxHashMap);
        /** Returns the hash that should be used to deduplicate transactions. */
        function getTrackingHash(tx) {
            var _a;
            if (tx.hash) {
                return ensureLeading0x(tx.hash.toLowerCase());
            }
            else if (isUniswapX(tx) && tx.orderHash) {
                const orderHash = ensureLeading0x(tx.orderHash.toLowerCase());
                return (_a = orderHashToTxHashMap.get(orderHash)) !== null && _a !== void 0 ? _a : orderHash;
            }
            return undefined;
        }
        const hashes = new Set();
        const offChainFiatOnRampTxs = new Map();
        const unsubmittedTxs = [];
        function addToMap(map, tx) {
            // If the FOR tx was done on a disabled chain, then omit it
            if (!chains.includes(tx.chainId)) {
                return map;
            }
            const hash = getTrackingHash(tx);
            if (hash) {
                map.set(hash, tx);
                hashes.add(hash);
            }
            else if (tx.typeInfo.type === TransactionType.OnRampPurchase ||
                tx.typeInfo.type === TransactionType.OnRampTransfer) {
                offChainFiatOnRampTxs.set(tx.id, tx);
            }
            else if (isBridge(tx) || isClassic(tx)) {
                unsubmittedTxs.push(tx);
            }
            return map;
        }
        // First iterate over remote transactions, then local transactions
        // This ensures that local transactions overwrite remote transactions
        const remoteTxMap = remoteTransactions.reduce(addToMap, new Map());
        const localTxMap = localTransactions.reduce(addToMap, new Map());
        const deDupedTxs = [...offChainFiatOnRampTxs.values(), ...unsubmittedTxs];
        for (const hash of [...hashes]) {
            const remoteTx = remoteTxMap.get(hash);
            const localTx = localTxMap.get(hash);
            if (!localTx) {
                if (!remoteTx) {
                    throw new Error('No local or remote tx, which is not possible');
                }
                deDupedTxs.push(remoteTx);
                continue;
            }
            // If the tx was done on a disabled chain, then omit it
            if (!chains.includes(localTx.chainId)) {
                continue;
            }
            // If the BE hasn't detected the tx, then use local data
            if (!remoteTx) {
                deDupedTxs.push(localTx);
                continue;
            }
            // If the local tx is not finalized and remote is, then finalize local state so confirmation toast is sent
            // TODO(MOB-1573): This should be done further upstream when parsing data not in a display hook
            if (!isFinalizedTx(localTx)) {
                const mergedTx = { ...localTx, status: remoteTx.status, networkFee: remoteTx.networkFee };
                if (isFinalizedTx(mergedTx)) {
                    dispatch(finalizeTransaction(mergedTx));
                }
            }
            // If the tx isn't successful, then prefer local data
            const isSuccessful = remoteTx.status === TransactionStatus.Success;
            // If the local tx is canceled and the remote tx is successful, the transaction is a cancellation,
            // and we have better data about the user's intent locally
            const isCancellation = localTx.status === TransactionStatus.Canceled && remoteTx.status === TransactionStatus.Success;
            if (!isSuccessful || isCancellation) {
                const mergedTx = {
                    ...localTx,
                    networkFee: remoteTx.networkFee,
                };
                deDupedTxs.push(mergedTx);
                continue;
            }
            // If the tx was done via WC, then add the dapp info from WC to the remote data
            if (localTx.typeInfo.type === TransactionType.WCConfirm) {
                const externalDappInfo = { ...localTx.typeInfo.dapp };
                const mergedTx = { ...remoteTx, typeInfo: { ...remoteTx.typeInfo, externalDappInfo } };
                deDupedTxs.push(mergedTx);
                continue;
            }
            // Remote data should be better parsed in all other instances
            deDupedTxs.push(remoteTx);
        }
        return deDupedTxs.sort((a, b) => {
            // If inclusion times are equal, then sequence approve txs before swap txs
            if (a.addedTime === b.addedTime) {
                if (a.typeInfo.type === TransactionType.Approve && b.typeInfo.type === TransactionType.Swap) {
                    const aCurrencyId = buildCurrencyId(a.chainId, a.typeInfo.tokenAddress);
                    const bCurrencyId = b.typeInfo.inputCurrencyId;
                    if (areCurrencyIdsEqual(aCurrencyId, bCurrencyId)) {
                        return 1;
                    }
                }
                if (a.typeInfo.type === TransactionType.Swap && b.typeInfo.type === TransactionType.Approve) {
                    const aCurrencyId = a.typeInfo.inputCurrencyId;
                    const bCurrencyId = buildCurrencyId(b.chainId, b.typeInfo.tokenAddress);
                    if (areCurrencyIdsEqual(aCurrencyId, bCurrencyId)) {
                        return -1;
                    }
                }
            }
            return a.addedTime > b.addedTime ? -1 : 1;
        });
    }, [dispatch, localTransactions, remoteTransactions, chains]);
}
function useLowestPendingNonce() {
    const activeAccountAddress = useActiveAccountAddressWithThrow();
    const pending = usePendingTransactions(activeAccountAddress);
    return useMemo(() => {
        let min;
        if (!pending) {
            return undefined;
        }
        pending.map((txn) => {
            var _a, _b;
            if (isClassic(txn)) {
                const currentNonce = (_b = (_a = txn.options) === null || _a === void 0 ? void 0 : _a.request) === null || _b === void 0 ? void 0 : _b.nonce;
                min = min ? (currentNonce ? (min < currentNonce ? min : currentNonce) : min) : currentNonce;
            }
        });
        return min;
    }, [pending]);
}
export function useIsQueuedTransaction(tx) {
    var _a, _b;
    const lowestPendingNonce = useLowestPendingNonce();
    if (isUniswapX(tx)) {
        return false;
    }
    const nonce = (_b = (_a = tx === null || tx === void 0 ? void 0 : tx.options) === null || _a === void 0 ? void 0 : _a.request) === null || _b === void 0 ? void 0 : _b.nonce;
    return nonce && lowestPendingNonce ? nonce > lowestPendingNonce : false;
}
//# sourceMappingURL=hooks.js.map