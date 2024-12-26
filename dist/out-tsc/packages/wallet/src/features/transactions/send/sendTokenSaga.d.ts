import { providers } from 'ethers';
import { SendTokenParams } from 'wallet/src/features/transactions/send/types';
type Params = {
    sendTokenParams: SendTokenParams;
    txRequest: providers.TransactionRequest;
};
export declare function sendToken(params: Params): Generator<import("redux-saga/effects").CallEffect<void> | import("redux-saga/effects").CallEffect<{
    transactionResponse: providers.TransactionResponse;
}>, void, unknown>;
export declare const sendTokenSagaName: string, sendTokenSaga: () => Generator<unknown, any, unknown>, sendTokenReducer: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<import("wallet/src/utils/saga").SagaState>, sendTokenActions: {
    trigger: import("@reduxjs/toolkit").ActionCreatorWithPayload<Params, string>;
    cancel: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    progress: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("wallet/src/utils/saga").SagaStatus, string>;
    error: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
    reset: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
};
export {};
//# sourceMappingURL=sendTokenSaga.d.ts.map