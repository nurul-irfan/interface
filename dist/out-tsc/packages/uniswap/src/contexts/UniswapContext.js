import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo, useState } from 'react';
export const UniswapContext = createContext(null);
export function UniswapProvider({ children, account, connector, navigateToBuyOrReceiveWithEmptyWallet, navigateToFiatOnRamp, onSwapChainsChanged, signer, useProviderHook, onConnectWallet, }) {
    const [swapInputChainId, setSwapInputChainId] = useState();
    const [isSwapTokenSelectorOpen, setIsSwapTokenSelectorOpen] = useState(false);
    const value = useMemo(() => ({
        account,
        connector,
        navigateToBuyOrReceiveWithEmptyWallet,
        onSwapChainsChanged: ({ chainId, prevChainId, outputChainId, }) => {
            onSwapChainsChanged({ chainId, prevChainId, outputChainId });
            setSwapInputChainId(chainId);
        },
        signer,
        useProviderHook,
        navigateToFiatOnRamp,
        onConnectWallet,
        swapInputChainId,
        isSwapTokenSelectorOpen,
        setIsSwapTokenSelectorOpen: (open) => setIsSwapTokenSelectorOpen(open),
    }), [
        account,
        connector,
        navigateToBuyOrReceiveWithEmptyWallet,
        signer,
        useProviderHook,
        navigateToFiatOnRamp,
        onConnectWallet,
        swapInputChainId,
        onSwapChainsChanged,
        isSwapTokenSelectorOpen,
        setIsSwapTokenSelectorOpen,
    ]);
    return _jsx(UniswapContext.Provider, { value: value, children: children });
}
/** Cross-platform util for getting items/utils that exist on all apps. */
export function useUniswapContext() {
    const context = useContext(UniswapContext);
    if (!context) {
        throw new Error('useUniswapContext must be used within a UniswapProvider');
    }
    return context;
}
/** Cross-platform util for getting metadata for the active account/wallet, regardless of platform/environment. */
export function useAccountMeta() {
    return useUniswapContext().account;
}
/** Cross-platform util for getting connector for the active account/wallet, only applicable to web, other platforms are undefined. */
export function useConnector() {
    return useUniswapContext().connector;
}
/** Cross-platform util for getting an RPC provider for the given `chainId`, regardless of platform/environment. */
export function useProvider(chainId) {
    return useUniswapContext().useProviderHook(chainId);
}
/** Cross-platform util for getting a signer for the active account/wallet, regardless of platform/environment. */
export function useSigner() {
    return useUniswapContext().signer;
}
//# sourceMappingURL=UniswapContext.js.map