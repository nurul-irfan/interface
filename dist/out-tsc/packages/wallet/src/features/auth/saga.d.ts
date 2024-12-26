import { LockParams, UnlockParams } from 'wallet/src/features/auth/types';
export declare const authSagaName: string, authSaga: () => Generator<unknown, any, unknown>, authReducer: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<import("wallet/src/utils/saga").SagaState>, authActions: {
    trigger: import("@reduxjs/toolkit").ActionCreatorWithPayload<UnlockParams | LockParams, string>;
    cancel: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    progress: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("wallet/src/utils/saga").SagaStatus, string>;
    error: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
    reset: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
};
//# sourceMappingURL=saga.d.ts.map