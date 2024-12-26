import { Account } from 'wallet/src/features/wallet/accounts/types';
export interface CreateAccountsParams {
    accounts: Account[];
}
export declare function createAccounts({ accounts }: CreateAccountsParams): Generator<import("redux-saga/effects").PutEffect<{
    payload: Account[];
    type: "wallet/addAccounts";
}> | import("redux-saga/effects").PutEffect<{
    payload: string;
    type: "wallet/setAccountAsActive";
}>, void, unknown>;
export declare const createAccountsSagaName: string, createAccountsSaga: () => Generator<unknown, any, unknown>, createAccountsReducer: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<import("wallet/src/utils/saga").SagaState>, createAccountsActions: {
    trigger: import("@reduxjs/toolkit").ActionCreatorWithPayload<CreateAccountsParams, string>;
    cancel: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    progress: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("wallet/src/utils/saga").SagaStatus, string>;
    error: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
    reset: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
};
//# sourceMappingURL=createAccountsSaga.d.ts.map