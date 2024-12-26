import { combineReducers } from '@reduxjs/toolkit';
import { spawn } from 'typed-redux-saga';
import { notificationWatcher } from 'wallet/src/features/notifications/notificationWatcherSaga';
import { initProviders } from 'wallet/src/features/providers/saga';
import { sendTokenActions, sendTokenReducer, sendTokenSaga, sendTokenSagaName, } from 'wallet/src/features/transactions/send/sendTokenSaga';
// Sagas that are spawned at startup
const walletSagas = [initProviders, notificationWatcher];
export function getMonitoredSagaReducers(monitoredSagas) {
    return combineReducers(Object.keys(monitoredSagas).reduce((acc, sagaName) => {
        // Safe non-null assertion because key `sagaName` comes from `Object.keys(monitoredSagas)`
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        acc[sagaName] = monitoredSagas[sagaName].reducer;
        return acc;
    }, {}));
}
export const walletMonitoredSagas = {
    [sendTokenSagaName]: {
        name: sendTokenSagaName,
        wrappedSaga: sendTokenSaga,
        reducer: sendTokenReducer,
        actions: sendTokenActions,
    },
};
export function* rootWalletSaga() {
    for (const s of walletSagas) {
        yield* spawn(s);
    }
    for (const m of Object.values(walletMonitoredSagas)) {
        yield* spawn(m.wrappedSaga);
    }
}
//# sourceMappingURL=saga.js.map