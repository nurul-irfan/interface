import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { call, getContext } from 'typed-redux-saga';
import { logger } from 'utilities/src/logger/logger';
import { ContractManager } from 'wallet/src/features/contracts/ContractManager';
import { ProviderManager } from 'wallet/src/features/providers/ProviderManager';
import { SignerManager } from 'wallet/src/features/wallet/signing/SignerManager';
export const walletContextValue = {
    contracts: new ContractManager(),
    providers: new ProviderManager(),
    signers: new SignerManager(),
};
export const WalletContext = createContext({
    value: walletContextValue,
    version: 0,
});
export function WalletContextProvider({ children }) {
    // This state allows the managers to trigger re-renders when relevant values change (i.e. new provider ready)
    // Probably not strictly necessary but more robust than relying on 'organic' re-renders
    const [contextVersion, updateContextVersion] = useState(0);
    const incrementContextVersion = useCallback(() => {
        logger.debug('walletContext', 'WalletContextProvider', `Context update count: ${contextVersion + 1}`);
        updateContextVersion(contextVersion + 1);
    }, [contextVersion, updateContextVersion]);
    useEffect(() => {
        walletContextValue.providers.setOnUpdate(incrementContextVersion);
    }, [incrementContextVersion]);
    return (_jsx(WalletContext.Provider, { value: { value: walletContextValue, version: contextVersion }, children: children }));
}
export function useWalletSigners() {
    return useContext(WalletContext).value.signers;
}
export function* getSignerManager() {
    var _a;
    return yield* (_a = getContext('signers')) !== null && _a !== void 0 ? _a : walletContextValue.signers;
}
export function useProviderManager() {
    return useContext(WalletContext).value.providers;
}
export function useProvider(chainId) {
    return useProviderManager().tryGetProvider(chainId);
}
export function* getProviderManager() {
    var _a;
    // TODO: is there a better way to handle when execution context is not react?
    return (_a = (yield* getContext('providers'))) !== null && _a !== void 0 ? _a : walletContextValue.providers;
}
export function* getProvider(chainId) {
    const providerManager = yield* call(getProviderManager);
    // Note, unlike useWalletProvider above, this throws on missing provider
    return providerManager.getProvider(chainId);
}
export function* getPrivateProvider(chainId, account) {
    let signer;
    if (account) {
        const signerManager = yield* call(getSignerManager);
        signer = yield* call([signerManager, signerManager.getSignerForAccount], account);
    }
    const providerManager = yield* call(getProviderManager);
    return yield* call([providerManager, providerManager.getPrivateProvider], chainId, signer);
}
/**
 * Non-generator version of getProvider
 */
export function getProviderSync(chainId) {
    return walletContextValue.providers.getProvider(chainId);
}
export function useContractManager() {
    var _a;
    return (_a = useContext(WalletContext).value.contracts) !== null && _a !== void 0 ? _a : walletContextValue.contracts;
}
export function* getContractManager() {
    const contracts = yield* getContext('contracts');
    return contracts;
}
//# sourceMappingURL=context.js.map