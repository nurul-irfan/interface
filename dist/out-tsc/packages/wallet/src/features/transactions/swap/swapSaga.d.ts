import { SignerMnemonicAccountMeta } from 'uniswap/src/features/accounts/types';
import { getBaseTradeAnalyticsProperties } from 'uniswap/src/features/transactions/swap/analytics';
import { ValidatedSwapTxContext } from 'uniswap/src/features/transactions/swap/types/swapTxAndGasInfo';
export type SwapParams = {
    txId?: string;
    account: SignerMnemonicAccountMeta;
    analytics: ReturnType<typeof getBaseTradeAnalyticsProperties>;
    swapTxContext: ValidatedSwapTxContext;
    onSuccess: () => void;
    onFailure: () => void;
};
export declare function approveAndSwap(params: SwapParams): Generator<import("redux-saga/effects").PutEffect<{
    payload: import("uniswap/src/features/notifications/types").AppNotification;
    type: "notifications/pushNotification";
}> | import("redux-saga/effects").CallEffect<boolean> | import("redux-saga/effects").CallEffect<void> | import("redux-saga/effects").CallEffect<number | undefined> | import("redux-saga/effects").CallEffect<{
    transactionResponse: import("@ethersproject/abstract-provider").TransactionResponse;
}>, void, unknown>;
export declare const swapSagaName: string, swapSaga: () => Generator<unknown, any, unknown>, swapReducer: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<import("wallet/src/utils/saga").SagaState>, swapActions: {
    trigger: import("@reduxjs/toolkit").ActionCreatorWithPayload<SwapParams, string>;
    cancel: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    progress: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("wallet/src/utils/saga").SagaStatus, string>;
    error: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
    reset: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
};
export declare function shouldSubmitViaPrivateRpc(chainId: number): Generator<import("redux-saga/effects").SelectEffect, boolean, unknown>;
//# sourceMappingURL=swapSaga.d.ts.map