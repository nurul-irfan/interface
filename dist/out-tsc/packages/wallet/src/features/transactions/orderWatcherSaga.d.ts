import { GetOrdersResponse } from 'uniswap/src/data/tradingApi/__generated__/index';
import { QueuedOrderStatus, UniswapXOrderDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function getOrders(orderIds: string[]): Promise<GetOrdersResponse>;
export declare class OrderWatcher {
    private static listeners;
    private static index;
    static initialize(): Generator<unknown>;
    private static poll;
    static waitForOrderStatus(orderHash: string, queueStatus: QueuedOrderStatus): Generator<import("redux-saga/effects").TakeEffect | import("redux-saga/effects").CallEffect<UniswapXOrderDetails>, UniswapXOrderDetails, unknown>;
}
//# sourceMappingURL=orderWatcherSaga.d.ts.map