import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getNativeAddress } from 'uniswap/src/constants/addresses';
import { AssetType } from 'uniswap/src/entities/assets';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { useSwapAnalytics } from 'uniswap/src/features/transactions/swap/analytics';
import { useDerivedSwapInfo } from 'uniswap/src/features/transactions/swap/hooks/useDerivedSwapInfo';
import { CurrencyField } from 'uniswap/src/types/currency';
import { currencyId } from 'uniswap/src/utils/currencyId';
import { logContextUpdate } from 'utilities/src/logger/contextEnhancer';
import { usePrevious } from 'utilities/src/react/hooks';
import { useDebounceWithStatus } from 'utilities/src/time/timing';
const SWAP_FORM_DEBOUNCE_TIME_MS = 250;
function getDefaultInputCurrency(chainId) {
    return {
        address: getNativeAddress(chainId),
        chainId,
        type: AssetType.Currency,
    };
}
export const getDefaultState = (defaultChainId) => ({
    exactAmountFiat: undefined,
    exactAmountToken: '',
    exactCurrencyField: CurrencyField.INPUT,
    focusOnCurrencyField: CurrencyField.INPUT,
    filteredChainIds: {},
    input: getDefaultInputCurrency(defaultChainId),
    output: undefined,
    isFiatMode: false,
    isSubmitting: false,
});
export const SwapFormContext = createContext(undefined);
export function SwapFormContextProvider({ children, hideFooter, hideSettings, prefilledState, }) {
    var _a, _b;
    const amountUpdatedTimeRef = useRef(0);
    const exactAmountFiatRef = useRef('');
    const exactAmountTokenRef = useRef('');
    const { defaultChainId } = useEnabledChains();
    const defaultState = useMemo(() => getDefaultState(defaultChainId), [defaultChainId]);
    const [swapForm, setSwapForm] = useState(prefilledState !== null && prefilledState !== void 0 ? prefilledState : defaultState);
    const datadogEnabled = useFeatureFlag(FeatureFlags.Datadog);
    // prefilled state may load in -- i.e. `outputCurrency` URL param pulling from gql
    const previousInitialInputCurrency = usePrevious(prefilledState === null || prefilledState === void 0 ? void 0 : prefilledState.input);
    const previousInitialOutputCurrency = usePrevious(prefilledState === null || prefilledState === void 0 ? void 0 : prefilledState.output);
    useEffect(() => {
        const previousInputCurrencyId = previousInitialInputCurrency && currencyId(previousInitialInputCurrency);
        const previousOutputCurrencyId = previousInitialOutputCurrency && currencyId(previousInitialOutputCurrency);
        if (previousInputCurrencyId !== ((prefilledState === null || prefilledState === void 0 ? void 0 : prefilledState.input) && currencyId(prefilledState.input)) ||
            previousOutputCurrencyId !== ((prefilledState === null || prefilledState === void 0 ? void 0 : prefilledState.output) && currencyId(prefilledState.output))) {
            setSwapForm(prefilledState !== null && prefilledState !== void 0 ? prefilledState : defaultState);
        }
    }, [prefilledState, previousInitialInputCurrency, previousInitialOutputCurrency, defaultState]);
    // Enable launching the output token selector through a change to the prefilled state
    useEffect(() => {
        // Only rerender the swap form value when true, not when false/undefined
        if (prefilledState === null || prefilledState === void 0 ? void 0 : prefilledState.selectingCurrencyField) {
            setSwapForm((oldVal) => {
                return {
                    ...oldVal,
                    selectingCurrencyField: prefilledState === null || prefilledState === void 0 ? void 0 : prefilledState.selectingCurrencyField,
                };
            });
        }
    }, [prefilledState === null || prefilledState === void 0 ? void 0 : prefilledState.selectingCurrencyField]);
    const updateSwapForm = useCallback((newState) => {
        var _a, _b;
        if ('exactAmountFiat' in newState || 'exactAmountToken' in newState) {
            amountUpdatedTimeRef.current = Date.now();
        }
        if ('exactAmountFiat' in newState) {
            exactAmountFiatRef.current = (_a = newState.exactAmountFiat) !== null && _a !== void 0 ? _a : '';
        }
        if ('exactAmountToken' in newState) {
            exactAmountTokenRef.current = (_b = newState.exactAmountToken) !== null && _b !== void 0 ? _b : '';
        }
        setSwapForm((prevState) => {
            const updatedState = { ...prevState, ...newState };
            logContextUpdate('SwapFormContext', updatedState, datadogEnabled);
            return updatedState;
        });
    }, [setSwapForm, datadogEnabled]);
    const [debouncedExactAmountToken, isDebouncingExactAmountToken] = useDebounceWithStatus(swapForm.exactAmountToken, SWAP_FORM_DEBOUNCE_TIME_MS);
    const [debouncedExactAmountFiat, isDebouncingExactAmountFiat] = useDebounceWithStatus(swapForm.exactAmountFiat, SWAP_FORM_DEBOUNCE_TIME_MS);
    const derivedSwapInfo = useDerivedSwapInfo({
        txId: swapForm.txId,
        [CurrencyField.INPUT]: (_a = swapForm.input) !== null && _a !== void 0 ? _a : null,
        [CurrencyField.OUTPUT]: (_b = swapForm.output) !== null && _b !== void 0 ? _b : null,
        exactCurrencyField: swapForm.exactCurrencyField,
        exactAmountToken: debouncedExactAmountToken !== null && debouncedExactAmountToken !== void 0 ? debouncedExactAmountToken : '',
        exactAmountFiat: debouncedExactAmountFiat,
        focusOnCurrencyField: swapForm.focusOnCurrencyField,
        selectingCurrencyField: swapForm.selectingCurrencyField,
        isDebouncing: isDebouncingExactAmountToken || isDebouncingExactAmountFiat,
    });
    useSwapAnalytics(derivedSwapInfo);
    const state = useMemo(() => ({
        amountUpdatedTimeRef,
        derivedSwapInfo,
        exactAmountFiat: swapForm.exactAmountFiat,
        exactAmountFiatRef,
        exactAmountToken: swapForm.exactAmountToken,
        exactAmountTokenRef,
        exactCurrencyField: swapForm.exactCurrencyField,
        focusOnCurrencyField: swapForm.focusOnCurrencyField,
        filteredChainIds: swapForm.filteredChainIds,
        input: swapForm.input,
        isFiatMode: swapForm.isFiatMode,
        isSubmitting: swapForm.isSubmitting,
        output: swapForm.output,
        selectingCurrencyField: swapForm.selectingCurrencyField,
        txId: swapForm.txId,
        hideFooter,
        hideSettings,
        updateSwapForm,
        prefilledCurrencies: [prefilledState === null || prefilledState === void 0 ? void 0 : prefilledState.input, prefilledState === null || prefilledState === void 0 ? void 0 : prefilledState.output].filter((asset) => Boolean(asset)),
    }), [
        swapForm.exactAmountFiat,
        swapForm.exactAmountToken,
        swapForm.exactCurrencyField,
        swapForm.focusOnCurrencyField,
        swapForm.filteredChainIds,
        swapForm.input,
        swapForm.isFiatMode,
        swapForm.isSubmitting,
        swapForm.output,
        swapForm.selectingCurrencyField,
        swapForm.txId,
        derivedSwapInfo,
        hideSettings,
        hideFooter,
        updateSwapForm,
        prefilledState,
    ]);
    return _jsx(SwapFormContext.Provider, { value: state, children: children });
}
export const useSwapFormContext = () => {
    const swapContext = useContext(SwapFormContext);
    if (swapContext === undefined) {
        throw new Error('`useSwapFormContext` must be used inside of `SwapFormContextProvider`');
    }
    return swapContext;
};
//# sourceMappingURL=SwapFormContext.js.map