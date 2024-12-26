import { jsx as _jsx } from "react/jsx-runtime";
import { configureStore } from '@reduxjs/toolkit';
import { render as RNRender, renderHook as RNRenderHook, } from '@testing-library/react-native';
import { UnitagUpdaterContextProvider } from 'uniswap/src/features/unitags/context';
import { AutoMockedApolloProvider } from 'uniswap/src/test/mocks';
import { WalletNavigationProvider } from 'wallet/src/contexts/WalletNavigationContext';
import { SharedWalletProvider } from 'wallet/src/providers/SharedWalletProvider';
import { walletRootReducer } from 'wallet/src/state/walletReducer';
const mockNavigationFunctions = {
    navigateToAccountActivityList: jest.fn(),
    navigateToAccountTokenList: jest.fn(),
    navigateToBuyOrReceiveWithEmptyWallet: jest.fn(),
    navigateToExternalProfile: jest.fn(),
    navigateToFiatOnRamp: jest.fn(),
    navigateToNftDetails: jest.fn(),
    navigateToNftCollection: jest.fn(),
    navigateToSwapFlow: jest.fn(),
    navigateToTokenDetails: jest.fn(),
    navigateToReceive: jest.fn(),
    navigateToSend: jest.fn(),
    handleShareNft: jest.fn(),
    handleShareToken: jest.fn(),
};
/**
 *
 * @param ui Component to render
 * @param resolvers Custom resolvers that override the default ones
 * @param preloadedState and store
 * @returns `ui` wrapped with providers
 */
export function renderWithProviders(ui, { cache, resolvers, preloadedState = {}, 
// Automatically create a store instance if no store was passed in
store = configureStore({
    reducer: walletRootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
}), ...renderOptions } = {}) {
    function Wrapper({ children }) {
        return (_jsx(AutoMockedApolloProvider, { cache: cache, resolvers: resolvers, children: _jsx(SharedWalletProvider, { reduxStore: store, children: _jsx(WalletNavigationProvider, { ...mockNavigationFunctions, children: _jsx(UnitagUpdaterContextProvider, { children: children }) }) }) }));
    }
    // Return an object with the store and all of RTL's query functions
    return { store, ...RNRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}
/**
 *
 * @param hook Hook to render
 * @param resolvers Custom resolvers that override the default ones
 * @param preloadedState and store
 * @returns `hook` wrapped with providers
 */
export function renderHookWithProviders(hook, hookOptions) {
    const { cache, resolvers, preloadedState = {}, 
    // Automatically create a store instance if no store was passed in
    store = configureStore({
        reducer: walletRootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    }), ...renderOptions } = (hookOptions !== null && hookOptions !== void 0 ? hookOptions : {});
    function Wrapper({ children }) {
        return (_jsx(AutoMockedApolloProvider, { cache: cache, resolvers: resolvers, children: _jsx(SharedWalletProvider, { reduxStore: store, children: children }) }));
    }
    const options = {
        wrapper: Wrapper,
        ...renderOptions,
    };
    const { rerender, ...rest } = RNRenderHook((args) => hook(...(args !== null && args !== void 0 ? args : [])), options);
    // Return an object with the store and all of RTL's query functions
    return {
        store,
        rerender: rerender,
        ...rest,
    };
}
//# sourceMappingURL=render.js.map