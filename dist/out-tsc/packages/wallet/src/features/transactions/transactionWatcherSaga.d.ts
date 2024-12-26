import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { SwapEventName } from '@uniswap/analytics-events';
import { BigNumberish, providers } from 'ethers';
import { SwapStatus } from 'uniswap/src/data/tradingApi/__generated__';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { FiatOnRampTransactionDetails } from 'uniswap/src/features/fiatOnRamp/types';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { transactionActions } from 'uniswap/src/features/transactions/slice';
import { FinalizedTransactionDetails, TransactionDetails, TransactionStatus } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare const SWAP_STATUS_TO_TX_STATUS: {
    [key in SwapStatus]: TransactionStatus;
};
export declare function transactionWatcher({ apolloClient }: {
    apolloClient: ApolloClient<NormalizedCacheObject>;
}): Generator<import("redux-saga/effects").TakeEffect | import("redux-saga/effects").PutEffect<{
    payload: import("uniswap/src/features/notifications/types").AppNotification;
    type: "notifications/pushNotification";
}> | import("redux-saga/effects").SelectEffect | import("redux-saga/effects").ForkEffect<Generator<unknown, any, unknown>> | import("redux-saga/effects").PutEffect<{
    payload: TransactionDetails;
    type: "transactions/updateTransaction";
}>, void, unknown>;
export declare function fetchUpdatedFiatOnRampTransaction(transaction: FiatOnRampTransactionDetails, forceFetch: boolean): Generator<import("redux-saga/effects").CallEffect<FiatOnRampTransactionDetails | undefined>, FiatOnRampTransactionDetails | undefined, unknown>;
export declare function watchFiatOnRampTransaction(transaction: FiatOnRampTransactionDetails): Generator<import("redux-saga/effects").CallEffect<void> | import("redux-saga/effects").CallEffect<FiatOnRampTransactionDetails | undefined> | import("redux-saga/effects").PutEffect<{
    payload: FiatOnRampTransactionDetails;
    type: "transactions/upsertFiatOnRampTransaction";
}> | import("redux-saga/effects").PutEffect<{
    payload: {
        address: string;
        hasNotifications: boolean;
    };
    type: "notifications/setNotificationStatus";
}> | import("redux-saga/effects").RaceEffect<import("typed-redux-saga").SagaGenerator<true, import("redux-saga/effects").CallEffect<true>> | import("typed-redux-saga").SagaGenerator<{
    payload: undefined;
    type: "transactions/forceFetchFiatOnRampTransactions";
}, import("redux-saga/effects").TakeEffect>>, void, unknown>;
export declare function watchTransaction({ transaction, apolloClient, }: {
    transaction: TransactionDetails;
    apolloClient: ApolloClient<NormalizedCacheObject>;
}): Generator<unknown>;
export declare function waitForReceipt(hash: string, provider: providers.Provider): Promise<providers.TransactionReceipt>;
/**
 * Monitor for transactions with the same nonce as the current transaction. If any duplicate is finalized, it means
 * the current transaction has been invalidated and wont be picked up on chain.
 */
export declare function waitForTxnInvalidated(chainId: UniverseChainId, id: string, nonce: BigNumberish | undefined): Generator<import("redux-saga/effects").RaceEffect<import("typed-redux-saga").SagaGenerator<boolean, import("redux-saga/effects").CallEffect<boolean>>>, boolean, unknown>;
export declare function waitForSameNonceFinalized(chainId: UniverseChainId, id: string, nonce: BigNumberish | undefined): Generator<import("redux-saga/effects").TakeEffect, boolean, unknown>;
/**
 * When we're canceling a bridge tx, we should invalidate the cancel tx as soon as the send part
 * of the bridge is confirmed on chain, instead of waiting for the full completion of the bridge.
 */
export declare function waitForBridgeSendCompleted(chainId: UniverseChainId, id: string, nonce: BigNumberish | undefined): Generator<import("redux-saga/effects").TakeEffect, boolean, unknown>;
/**
 * Send analytics events for finalized transactions
 */
export declare function logTransactionEvent(actionData: ReturnType<typeof transactionActions.finalizeTransaction>): void;
export declare function finalizeTransaction({ apolloClient, transaction, }: {
    apolloClient: ApolloClient<NormalizedCacheObject>;
    transaction: FinalizedTransactionDetails;
}): Generator<import("redux-saga/effects").CallEffect<true> | import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<{
    payload: FinalizedTransactionDetails;
    type: "transactions/finalizeTransaction";
}> | import("redux-saga/effects").PutEffect<{
    payload: {
        address: string;
        hasNotifications: boolean;
    };
    type: "notifications/setNotificationStatus";
}> | import("redux-saga/effects").CallEffect<unknown[]>, void, unknown>;
/**
 * Delete transaction from state. Should be called when a transaction should no longer
 * be monitored. Often used when txn is replaced or cancelled.
 * @param transaction txn to delete from state
 */
export declare function deleteTransaction(transaction: TransactionDetails): Generator<import("redux-saga/effects").PutEffect<{
    payload: import("uniswap/src/features/transactions/types/transactionDetails").TransactionId & {
        address: string;
    };
    type: "transactions/deleteTransaction";
}>, void, unknown>;
export declare function watchTransactionEvents(): Generator<import("redux-saga/effects").ForkEffect<never>, void, unknown>;
export declare function logSwapSuccess(analyticsProps: Parameters<typeof sendAnalyticsEvent<SwapEventName.SWAP_TRANSACTION_COMPLETED>>[1]): void;
//# sourceMappingURL=transactionWatcherSaga.d.ts.map