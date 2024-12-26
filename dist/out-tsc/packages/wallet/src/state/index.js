import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { walletContextValue } from 'wallet/src/features/wallet/context';
import { rootWalletSaga } from 'wallet/src/state/saga';
// Disable eslint rule to infer return type from the returned value
// (it is complex and not worth the effort to type it manually)
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createStore({ additionalSagas = [], middlewareAfter = [], middlewareBefore = [], preloadedState = {}, enhancers = [], reducer, }) {
    const sagaMiddleware = createSagaMiddleware({
        context: {
            signers: walletContextValue.signers,
            providers: walletContextValue.providers,
            contracts: walletContextValue.contracts,
        },
    });
    const store = configureStore({
        reducer,
        preloadedState,
        enhancers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            // required for rtk-query
            thunk: true,
            // turn off since it slows down for dev and also doesn't run in prod
            // TODO: [MOB-641] figure out why this is slow
            serializableCheck: false,
            invariantCheck: {
                warnAfter: 256,
            },
            // slows down dev build considerably
            immutableCheck: false,
        })
            .prepend(middlewareBefore)
            .concat(sagaMiddleware)
            .concat(middlewareAfter),
        devTools: __DEV__,
    });
    sagaMiddleware.run(rootWalletSaga);
    additionalSagas.forEach((saga) => sagaMiddleware.run(saga));
    return store;
}
//# sourceMappingURL=index.js.map