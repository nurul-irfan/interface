import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { providers } from 'ethers';
import { AccountMeta } from 'uniswap/src/features/accounts/types';
import { GasFeeEstimates } from 'uniswap/src/features/transactions/types/transactionDetails';
export type WrapParams = {
    txId?: string;
    swapTxId?: string;
    txRequest: providers.TransactionRequest;
    account: AccountMeta;
    inputCurrencyAmount: CurrencyAmount<Currency>;
    skipPushNotification?: boolean;
    gasEstimates?: GasFeeEstimates;
};
export declare function wrap(params: WrapParams): Generator<import("redux-saga/effects").PutEffect<{
    payload: import("uniswap/src/features/notifications/types").AppNotification;
    type: "notifications/pushNotification";
}> | import("redux-saga/effects").CallEffect<{
    transactionResponse: providers.TransactionResponse;
}>, {
    transactionResponse: providers.TransactionResponse;
} | undefined, unknown>;
export declare const tokenWrapSagaName: string, tokenWrapSaga: () => Generator<unknown, any, unknown>, tokenWrapReducer: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<import("wallet/src/utils/saga").SagaState>, tokenWrapActions: {
    trigger: import("@reduxjs/toolkit").ActionCreatorWithPayload<WrapParams, string>;
    cancel: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    progress: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("wallet/src/utils/saga").SagaStatus, string>;
    error: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
    reset: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
};
//# sourceMappingURL=wrapSaga.d.ts.map