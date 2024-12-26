import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import { TokenSelectorModal, TokenSelectorVariation, } from 'uniswap/src/components/TokenSelector/TokenSelector';
import { TokenSelectorFlow } from 'uniswap/src/components/TokenSelector/types';
import { useAccountMeta, useUniswapContext } from 'uniswap/src/contexts/UniswapContext';
import { AssetType } from 'uniswap/src/entities/assets';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { useTokenProjects } from 'uniswap/src/features/dataApi/tokenProjects';
import { useTransactionModalContext } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalContext';
import { useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { getShouldResetExactAmountToken } from 'uniswap/src/features/transactions/swap/form/utils';
import { maybeLogFirstSwapAction } from 'uniswap/src/features/transactions/swap/utils/maybeLogFirstSwapAction';
import { CurrencyField } from 'uniswap/src/types/currency';
import { areCurrencyIdsEqual, currencyAddress, currencyId } from 'uniswap/src/utils/currencyId';
import { useValueAsRef } from 'utilities/src/react/useValueAsRef';
import { useTrace } from 'utilities/src/telemetry/trace/TraceContext';
export function SwapTokenSelector({ isModalOpen }) {
    var _a;
    const { onCurrencyChange } = useTransactionModalContext();
    const swapContext = useSwapFormContext();
    const traceRef = useValueAsRef(useTrace());
    const swapContextRef = useValueAsRef(swapContext);
    const activeAccountAddress = (_a = useAccountMeta()) === null || _a === void 0 ? void 0 : _a.address;
    const { isTestnetModeEnabled, defaultChainId } = useEnabledChains();
    const { setIsSwapTokenSelectorOpen } = useUniswapContext();
    const { updateSwapForm, selectingCurrencyField, output, input, filteredChainIds } = swapContext;
    if (isModalOpen && !selectingCurrencyField) {
        throw new Error('TokenSelector rendered without `selectingCurrencyField`');
    }
    const onHideTokenSelector = useCallback(() => {
        updateSwapForm({ selectingCurrencyField: undefined });
        setIsSwapTokenSelectorOpen(false); // resets force flag for web on close as cleanup
    }, [setIsSwapTokenSelectorOpen, updateSwapForm]);
    const inputTokenProjects = useTokenProjects(input ? [currencyId(input)] : []);
    const outputTokenProjects = useTokenProjects(output ? [currencyId(output)] : []);
    const onSelectCurrency = useCallback((currency, field, isBridgePair) => {
        var _a, _b;
        const swapCtx = swapContextRef.current;
        const tradeableAsset = {
            address: currencyAddress(currency),
            chainId: currency.chainId,
            type: AssetType.Currency,
        };
        const newState = {};
        const otherField = field === CurrencyField.INPUT ? CurrencyField.OUTPUT : CurrencyField.INPUT;
        const otherFieldTradeableAsset = field === CurrencyField.INPUT ? swapCtx.output : swapCtx.input;
        const otherFieldTokenProjects = otherField === CurrencyField.INPUT ? inputTokenProjects : outputTokenProjects;
        let otherCurrency = (_a = otherFieldTokenProjects === null || otherFieldTokenProjects === void 0 ? void 0 : otherFieldTokenProjects.data) === null || _a === void 0 ? void 0 : _a.find((project) => (project === null || project === void 0 ? void 0 : project.currency.chainId) === currency.chainId);
        // swap order if tokens are the same
        if (otherFieldTradeableAsset && areCurrencyIdsEqual(currencyId(currency), currencyId(otherFieldTradeableAsset))) {
            const previouslySelectedTradableAsset = field === CurrencyField.INPUT ? swapCtx.input : swapCtx.output;
            // Given that we're swapping the order of tokens, we should also swap the `exactCurrencyField` and update the `focusOnCurrencyField` to make sure the correct input field is focused.
            newState.exactCurrencyField =
                swapCtx.exactCurrencyField === CurrencyField.INPUT ? CurrencyField.OUTPUT : CurrencyField.INPUT;
            newState.focusOnCurrencyField = newState.exactCurrencyField;
            newState[otherField] = previouslySelectedTradableAsset;
        }
        else if (currency.chainId !== (otherFieldTradeableAsset === null || otherFieldTradeableAsset === void 0 ? void 0 : otherFieldTradeableAsset.chainId) && !isBridgePair) {
            // if new token chain changes, try to find the other token's match on the new chain
            otherCurrency = (_b = otherFieldTokenProjects === null || otherFieldTokenProjects === void 0 ? void 0 : otherFieldTokenProjects.data) === null || _b === void 0 ? void 0 : _b.find((project) => (project === null || project === void 0 ? void 0 : project.currency.chainId) === currency.chainId);
            const otherTradeableAsset = otherCurrency && {
                address: currencyAddress(otherCurrency === null || otherCurrency === void 0 ? void 0 : otherCurrency.currency),
                chainId: otherCurrency.currency.chainId,
                type: AssetType.Currency,
            };
            newState[otherField] =
                otherTradeableAsset && otherCurrency && !areCurrencyIdsEqual(currencyId(currency), otherCurrency.currencyId)
                    ? otherTradeableAsset
                    : undefined;
        }
        if (!isBridgePair) {
            // If selecting output, set the input and output chainIds
            // If selecting input and output is already selected, also set the input chainId
            if (field === CurrencyField.OUTPUT || !!swapCtx.output) {
                swapCtx.filteredChainIds[CurrencyField.INPUT] = currency.chainId;
                swapCtx.filteredChainIds[CurrencyField.OUTPUT] = currency.chainId;
                // If selecting input, only set the output chainId
            }
            else {
                swapCtx.filteredChainIds[CurrencyField.OUTPUT] = currency.chainId;
            }
            newState.filteredChainIds = swapCtx.filteredChainIds;
        }
        newState[field] = tradeableAsset;
        if (getShouldResetExactAmountToken(swapCtx, newState)) {
            newState.exactAmountToken = '';
        }
        const currencyState = {
            inputCurrency: CurrencyField.INPUT === field ? currency : otherCurrency === null || otherCurrency === void 0 ? void 0 : otherCurrency.currency,
            outputCurrency: CurrencyField.OUTPUT === field ? currency : otherCurrency === null || otherCurrency === void 0 ? void 0 : otherCurrency.currency,
        };
        onHideTokenSelector();
        updateSwapForm(newState);
        maybeLogFirstSwapAction(traceRef.current);
        onCurrencyChange === null || onCurrencyChange === void 0 ? void 0 : onCurrencyChange(currencyState);
    }, 
    // We want to be very careful about how often this function is re-created because it causes the entire token selector list to re-render.
    // This is why we use `swapContextRef` so that we can access the latest swap context without causing a re-render.
    // Do not add new dependencies to this function unless you are sure this won't degrade perf.
    [
        swapContextRef,
        onHideTokenSelector,
        updateSwapForm,
        onCurrencyChange,
        traceRef,
        inputTokenProjects,
        outputTokenProjects,
    ]);
    const getChainId = () => {
        var _a, _b;
        const selectedChainId = filteredChainIds[selectingCurrencyField !== null && selectingCurrencyField !== void 0 ? selectingCurrencyField : CurrencyField.INPUT];
        // allow undefined for prod networks
        if (selectedChainId || !isTestnetModeEnabled) {
            return selectedChainId;
        }
        // should never be undefined for testnets
        return (_b = (_a = filteredChainIds[CurrencyField.INPUT]) !== null && _a !== void 0 ? _a : input === null || input === void 0 ? void 0 : input.chainId) !== null && _b !== void 0 ? _b : defaultChainId;
    };
    const props = {
        isModalOpen,
        activeAccountAddress,
        chainId: getChainId(),
        input,
        // token selector modal will only open on currency field selection; casting to satisfy typecheck here - we should consider refactoring the types here to avoid casting
        currencyField: selectingCurrencyField,
        flow: TokenSelectorFlow.Swap,
        variation: selectingCurrencyField === CurrencyField.INPUT
            ? TokenSelectorVariation.SwapInput
            : TokenSelectorVariation.SwapOutput,
        onClose: onHideTokenSelector,
        onSelectCurrency,
    };
    return _jsx(TokenSelectorModal, { ...props });
}
//# sourceMappingURL=SwapTokenSelector.js.map