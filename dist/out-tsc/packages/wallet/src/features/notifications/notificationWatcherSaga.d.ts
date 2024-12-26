import { AppNotification } from 'uniswap/src/features/notifications/types';
import { finalizeTransaction } from 'uniswap/src/features/transactions/slice';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function notificationWatcher(): Generator<import("redux-saga/effects").ForkEffect<never>, void, unknown>;
export declare function pushTransactionNotification(action: ReturnType<typeof finalizeTransaction>): Generator<import("redux-saga/effects").PutEffect<{
    payload: AppNotification;
    type: "notifications/pushNotification";
}> | import("redux-saga/effects").SelectEffect, void, unknown>;
export declare function shouldSuppressNotification({ tx, existingNotifications, }: {
    tx: TransactionDetails;
    existingNotifications?: AppNotification[];
}): string | boolean;
//# sourceMappingURL=notificationWatcherSaga.d.ts.map