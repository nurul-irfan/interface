import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, PayloadActionCreator } from '@reduxjs/toolkit';
import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
export declare enum SagaStatus {
    Started = "SagaStarted",
    Success = "SagaSuccess",
    Failure = "SagaFailure"
}
export interface SagaState {
    status: Nullable<SagaStatus>;
    error: Nullable<string>;
}
interface MonitoredSagaOptions {
    timeoutDuration?: number;
    showErrorNotification?: boolean;
    doNotLogErrors?: Array<string>;
}
/**
 * A convenience utility to create a wrapped saga that handles common concerns like
 * trigger watching, cancel watching, timeout, progress updates, and success/fail updates.
 * Use to create complex sagas that need more coordination with the UI.
 * Note: the wrapped saga and reducer this returns must be added to rootSaga.ts
 */
export declare function createMonitoredSaga<SagaParams, SagaYieldType, SagaResultType>(saga: (params: SagaParams) => Generator<SagaYieldType, SagaResultType, unknown>, name: string, options?: MonitoredSagaOptions): {
    name: string;
    wrappedSaga: () => Generator;
    reducer: ReducerWithInitialState<SagaState>;
    actions: {
        trigger: PayloadActionCreator<SagaParams>;
        cancel: ActionCreatorWithoutPayload;
        progress: ActionCreatorWithPayload<SagaStatus, string>;
        error: ActionCreatorWithPayload<string, string>;
        reset: ActionCreatorWithoutPayload;
    };
};
export {};
//# sourceMappingURL=saga.d.ts.map