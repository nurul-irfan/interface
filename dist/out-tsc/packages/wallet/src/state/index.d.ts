import type { Middleware, PreloadedState, Reducer, StoreEnhancer } from '@reduxjs/toolkit';
import { Saga } from 'redux-saga';
import { WalletStateReducersOnly } from 'wallet/src/state/walletReducer';
interface CreateStoreProps {
    reducer: Reducer;
    additionalSagas?: Array<Saga<unknown[]>>;
    enhancers?: Array<StoreEnhancer>;
    middlewareAfter?: Array<Middleware<unknown>>;
    middlewareBefore?: Array<Middleware<unknown>>;
    preloadedState?: PreloadedState<WalletStateReducersOnly>;
}
export declare function createStore({ additionalSagas, middlewareAfter, middlewareBefore, preloadedState, enhancers, reducer, }: CreateStoreProps): import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<any, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<(Middleware<unknown, any, import("redux").Dispatch<import("redux").AnyAction>> | import("redux-saga").SagaMiddleware<{
    signers: import("../features/wallet/signing/SignerManager").SignerManager;
    providers: import("../features/providers/ProviderManager").ProviderManager;
    contracts: import("../features/contracts/ContractManager").ContractManager;
}> | import("@reduxjs/toolkit").ThunkMiddleware<any, import("redux").AnyAction>)[]>>;
export {};
//# sourceMappingURL=index.d.ts.map