import { Reducer } from '@reduxjs/toolkit';
import { SagaState } from 'wallet/src/utils/saga';
export interface MonitoredSaga {
    [key: string]: any;
}
export type MonitoredSagaReducer = Reducer<Record<string, SagaState>>;
export declare function getMonitoredSagaReducers(monitoredSagas: Record<string, MonitoredSaga>): MonitoredSagaReducer;
export declare const walletMonitoredSagas: Record<string, MonitoredSaga>;
export declare function rootWalletSaga(): Generator<import("redux-saga/effects").ForkEffect<unknown>, void, unknown>;
//# sourceMappingURL=saga.d.ts.map