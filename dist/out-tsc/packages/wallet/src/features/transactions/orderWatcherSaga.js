import { call, delay, fork, select, take } from 'typed-redux-saga';
import { fetchOrders } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
import { OrderStatus } from 'uniswap/src/data/tradingApi/__generated__/index';
import { makeSelectUniswapXOrder } from 'uniswap/src/features/transactions/selectors';
import { updateTransaction } from 'uniswap/src/features/transactions/slice';
import { isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { QueuedOrderStatus, TransactionStatus, isFinalizedTxStatus, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { logger } from 'utilities/src/logger/logger';
import { ONE_SECOND_MS } from 'utilities/src/time/time';
const ORDER_STATUS_TO_TX_STATUS = {
    [OrderStatus.CANCELLED]: TransactionStatus.Canceled,
    [OrderStatus.ERROR]: TransactionStatus.Failed,
    [OrderStatus.EXPIRED]: TransactionStatus.Expired,
    [OrderStatus.FILLED]: TransactionStatus.Success,
    [OrderStatus.INSUFFICIENT_FUNDS]: TransactionStatus.InsufficientFunds,
    [OrderStatus.OPEN]: TransactionStatus.Pending,
    [OrderStatus.UNVERIFIED]: TransactionStatus.Unknown,
};
// If the backend cannot provide a status for an order, we can assume after a certain threshold the submission failed.
const ORDER_TIMEOUT_BUFFER = 20 * ONE_SECOND_MS;
export async function getOrders(orderIds) {
    return await fetchOrders({ orderIds });
}
export class OrderWatcher {
    static *initialize() {
        OrderWatcher.index++;
        yield* fork(OrderWatcher.poll, OrderWatcher.index);
    }
    static *poll(index) {
        var _a, _b;
        if (index !== OrderWatcher.index) {
            return;
        }
        yield* delay(2000); // Poll at 2s intervals
        const orderHashes = Object.keys(OrderWatcher.listeners);
        if (!orderHashes.length) {
            yield* fork(OrderWatcher.poll, index);
            return;
        }
        try {
            const data = yield* call(getOrders, orderHashes);
            const remoteOrderMap = new Map(data.orders.map((order) => [order.orderId, order]));
            for (const localOrderHash of orderHashes) {
                const remoteOrder = remoteOrderMap.get(localOrderHash);
                const selectUniswapXOrder = yield* call(makeSelectUniswapXOrder);
                const localOrder = yield* select(selectUniswapXOrder, { orderHash: localOrderHash });
                if (!(localOrder === null || localOrder === void 0 ? void 0 : localOrder.orderHash)) {
                    continue;
                }
                // If submission fails, stop polling for this order.
                if (localOrder.queueStatus === QueuedOrderStatus.SubmissionFailed) {
                    delete OrderWatcher.listeners[localOrder.orderHash];
                    continue;
                }
                // If the backend does not have data for an order marked locally as submitted and enough time has
                // passed, we can assume the submission call to the tradingAPI failed and update state accordingly
                if (!remoteOrder) {
                    if (Date.now() - localOrder.addedTime > ORDER_TIMEOUT_BUFFER) {
                        (_a = OrderWatcher.listeners[localOrderHash]) === null || _a === void 0 ? void 0 : _a.updateOrderStatus({
                            ...localOrder,
                            queueStatus: QueuedOrderStatus.SubmissionFailed,
                        });
                        delete OrderWatcher.listeners[localOrder.orderHash];
                    }
                    continue;
                }
                const updatedStatus = ORDER_STATUS_TO_TX_STATUS[remoteOrder.orderStatus];
                const isUnchanged = updatedStatus === (localOrder === null || localOrder === void 0 ? void 0 : localOrder.status);
                const isFinal = isFinalizedTxStatus(updatedStatus);
                // Ignore non-final order statuses if the tx is being cancelled locally; the backend is not yet aware of cancellation
                const isOngoingCancel = !isFinal && (localOrder === null || localOrder === void 0 ? void 0 : localOrder.status) === TransactionStatus.Cancelling;
                if (isUnchanged || isOngoingCancel) {
                    continue;
                }
                (_b = OrderWatcher.listeners[localOrder.orderHash]) === null || _b === void 0 ? void 0 : _b.updateOrderStatus({
                    ...localOrder,
                    status: updatedStatus,
                    hash: remoteOrder.txHash,
                });
                delete OrderWatcher.listeners[localOrder.orderHash];
            }
        }
        catch (error) {
            logger.error(error, {
                tags: {
                    file: 'orderWatcherSaga',
                    function: 'orderWatcher',
                },
            });
        }
        yield* fork(OrderWatcher.poll, index);
    }
    static *waitForOrderStatus(orderHash, queueStatus) {
        var _a;
        // Avoid polling until the order has been submitted
        if (queueStatus !== QueuedOrderStatus.Submitted) {
            while (true) {
                const { payload } = yield* take(updateTransaction.type);
                if (isUniswapX(payload) &&
                    payload.orderHash === orderHash &&
                    payload.queueStatus === QueuedOrderStatus.Submitted) {
                    break;
                }
            }
        }
        const existingListenerPromise = (_a = OrderWatcher.listeners[orderHash]) === null || _a === void 0 ? void 0 : _a.promise;
        if (existingListenerPromise) {
            return yield* call(() => existingListenerPromise);
        }
        let resolvePromise;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Must appease typechecker since resolvePromise is assigned inside promise scope
        OrderWatcher.listeners[orderHash] = { updateOrderStatus: resolvePromise, promise };
        return yield* call(() => promise);
    }
}
OrderWatcher.listeners = {};
// There is an issue on extension where the sagas are initialized multiple times.
// The first instance of this polling utility will not have access to the latest store.
// As a temporary fix, we can use an index to track & cancel the previous instance of the polling utility.
OrderWatcher.index = 0;
//# sourceMappingURL=orderWatcherSaga.js.map