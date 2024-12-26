import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect } from 'react';
import { useAccountMeta } from 'uniswap/src/contexts/UniswapContext';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { useSwapTxAndGasInfo } from 'uniswap/src/features/transactions/swap/hooks/useSwapTxAndGasInfo';
import { logContextUpdate } from 'utilities/src/logger/contextEnhancer';
export const SwapTxContext = createContext(undefined);
export function SwapTxContextProviderTradingApi({ children }) {
    const account = useAccountMeta();
    const { derivedSwapInfo } = useSwapFormContext();
    const swapTxContext = useSwapTxAndGasInfo({ derivedSwapInfo, account });
    const datadogEnabled = useFeatureFlag(FeatureFlags.Datadog);
    useEffect(() => {
        logContextUpdate('SwapTxContext', swapTxContext, datadogEnabled);
    }, [swapTxContext, datadogEnabled]);
    return _jsx(SwapTxContext.Provider, { value: swapTxContext, children: children });
}
export const useSwapTxContext = () => {
    const swapContext = useContext(SwapTxContext);
    if (swapContext === undefined) {
        throw new Error('`useSwapTxContext` must be used inside of `SwapTxContextProvider`');
    }
    return swapContext;
};
//# sourceMappingURL=SwapTxContext.js.map