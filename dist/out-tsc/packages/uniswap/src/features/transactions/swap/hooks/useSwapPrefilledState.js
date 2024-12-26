import { useMemo } from 'react';
import { getNativeAddress } from 'uniswap/src/constants/addresses';
import { AssetType } from 'uniswap/src/entities/assets';
import { DEFAULT_PROTOCOL_OPTIONS } from 'uniswap/src/features/transactions/swap/utils/protocols';
import { CurrencyField } from 'uniswap/src/types/currency';
import { areAddressesEqual } from 'uniswap/src/utils/addresses';
export function useSwapPrefilledState(initialState) {
    const swapPrefilledState = useMemo(() => {
        var _a, _b, _c, _d;
        return initialState
            ? {
                exactAmountFiat: initialState.exactAmountFiat,
                exactAmountToken: initialState.exactAmountToken,
                exactCurrencyField: initialState.exactCurrencyField,
                filteredChainIds: {
                    [CurrencyField.INPUT]: (_a = initialState.output) === null || _a === void 0 ? void 0 : _a.chainId,
                    [CurrencyField.OUTPUT]: (_b = initialState.input) === null || _b === void 0 ? void 0 : _b.chainId,
                },
                focusOnCurrencyField: getFocusOnCurrencyFieldFromInitialState(initialState),
                input: (_c = initialState.input) !== null && _c !== void 0 ? _c : undefined,
                output: (_d = initialState.output) !== null && _d !== void 0 ? _d : undefined,
                selectingCurrencyField: initialState.selectingCurrencyField,
                txId: initialState.txId,
                isFiatMode: false,
                isSubmitting: false,
            }
            : undefined;
    }, [initialState]);
    return swapPrefilledState;
}
export function getFocusOnCurrencyFieldFromInitialState({ focusOnCurrencyField, input, output, exactCurrencyField, }) {
    if (focusOnCurrencyField) {
        return focusOnCurrencyField;
    }
    if (input && exactCurrencyField === CurrencyField.INPUT) {
        return CurrencyField.INPUT;
    }
    if (output && exactCurrencyField === CurrencyField.OUTPUT) {
        return CurrencyField.OUTPUT;
    }
    return undefined;
}
export function getSwapPrefilledState({ currencyAddress, currencyChainId, currencyField, }) {
    const nativeTokenAddress = getNativeAddress(currencyChainId);
    const nativeToken = {
        address: nativeTokenAddress,
        chainId: currencyChainId,
        type: AssetType.Currency,
    };
    const chosenToken = {
        address: currencyAddress,
        chainId: currencyChainId,
        type: AssetType.Currency,
    };
    const opposedToken = areAddressesEqual(nativeTokenAddress, currencyAddress) ? null : nativeToken;
    const swapFormState = {
        exactCurrencyField: currencyField,
        exactAmountToken: '',
        [CurrencyField.INPUT]: currencyField === CurrencyField.INPUT ? chosenToken : opposedToken,
        [CurrencyField.OUTPUT]: currencyField === CurrencyField.OUTPUT ? chosenToken : opposedToken,
        selectedProtocols: DEFAULT_PROTOCOL_OPTIONS,
    };
    return swapFormState;
}
//# sourceMappingURL=useSwapPrefilledState.js.map