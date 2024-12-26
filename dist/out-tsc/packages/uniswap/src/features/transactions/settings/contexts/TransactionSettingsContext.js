import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProtocolItems } from 'uniswap/src/data/tradingApi/__generated__';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { selectTransactionSettings } from 'uniswap/src/features/transactions/settings/selectors';
import { setTransactionSettings, } from 'uniswap/src/features/transactions/settings/slice';
import { logContextUpdate } from 'utilities/src/logger/contextEnhancer';
export const TransactionSettingsContext = createContext(undefined);
export function TransactionSettingsContextProvider({ settingKey, children, autoSlippageTolerance, }) {
    const appDispatch = useDispatch();
    const transactionSettings = useSelector(selectTransactionSettings(settingKey));
    const datadogEnabled = useFeatureFlag(FeatureFlags.Datadog);
    const updateTransactionSettings = useCallback((newState) => {
        appDispatch(setTransactionSettings({ settingKey, ...newState }));
    }, [settingKey, appDispatch]);
    useEffect(() => {
        logContextUpdate('TransactionSettingsContext', transactionSettings, datadogEnabled);
    }, [transactionSettings, datadogEnabled]);
    useEffect(() => {
        updateTransactionSettings({ autoSlippageTolerance });
    }, [autoSlippageTolerance, updateTransactionSettings]);
    const state = useMemo(() => ({
        ...transactionSettings,
        updateTransactionSettings,
        selectedProtocols: transactionSettings.isOnlyV2Allowed
            ? [ProtocolItems.V2]
            : transactionSettings.selectedProtocols,
        isOnlyV2Allowed: transactionSettings.isOnlyV2Allowed,
    }), [transactionSettings, updateTransactionSettings]);
    return _jsx(TransactionSettingsContext.Provider, { value: state, children: children });
}
export const useTransactionSettingsContext = () => {
    const swapContext = useContext(TransactionSettingsContext);
    if (swapContext === undefined) {
        throw new Error('`useTransactionSettingsContext` must be used inside of `TransactionSettingsContextProvider`');
    }
    return swapContext;
};
//# sourceMappingURL=TransactionSettingsContext.js.map