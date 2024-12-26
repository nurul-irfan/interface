import { jsx as _jsx } from "react/jsx-runtime";
import { SwapEventName } from '@uniswap/analytics-events';
import { memo, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableArea } from 'ui/src';
import { useMaxAmountSpend } from 'uniswap/src/features/gas/useMaxAmountSpend';
import Trace from 'uniswap/src/features/telemetry/Trace';
import { ElementName } from 'uniswap/src/features/telemetry/constants';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { CurrencyField } from 'uniswap/src/types/currency';
export function MaxAmountButton({ currencyAmount, currencyBalance, onSetMax, currencyField, transactionType, }) {
    const maxInputAmount = useMaxAmountSpend(currencyBalance, transactionType);
    // Disable max button if max already set or when balance is not sufficient
    const disableMaxButton = !maxInputAmount || !maxInputAmount.greaterThan(0) || (currencyAmount === null || currencyAmount === void 0 ? void 0 : currencyAmount.toExact()) === maxInputAmount.toExact();
    const maxInputAmountRef = useRef(maxInputAmount);
    maxInputAmountRef.current = maxInputAmount;
    const onPress = useCallback((event) => {
        event.stopPropagation();
        if (!disableMaxButton && maxInputAmountRef.current) {
            // We use `maxInputAmountRef` instead of `maxInputAmount` so that we can get the latest value
            // and avoid this callback function having to depend on `maxInputAmount` because that would mean
            // it would recreate this function on every render (which would cause the button to re-render and ignore the `memo`).
            onSetMax(maxInputAmountRef.current.toExact());
        }
    }, [disableMaxButton, onSetMax]);
    // We split this out into 2 components so it can be efficiently memoized.
    return _jsx(MaxButtonContent, { disabled: disableMaxButton, currencyField: currencyField, onPress: onPress });
}
const MaxButtonContent = memo(function _MaxButtonContent({ disabled, onPress, currencyField, }) {
    const { t } = useTranslation();
    const hoverStyle = useMemo(() => ({ backgroundColor: disabled ? '$surface3' : '$accent2Hovered' }), [disabled]);
    return (_jsx(Trace, { logPress: true, eventOnTrigger: SwapEventName.SWAP_MAX_TOKEN_AMOUNT_SELECTED, element: currencyField === CurrencyField.INPUT ? ElementName.SetMaxInput : ElementName.SetMaxOutput, children: _jsx(TouchableArea, { backgroundColor: disabled ? '$surface3' : '$accent2', borderRadius: "$rounded12", opacity: disabled ? 0.5 : 1, px: "$spacing6", py: "$spacing4", testID: currencyField === CurrencyField.INPUT ? TestID.SetMaxInput : TestID.SetMaxOutput, scaleTo: 0.98, hoverStyle: hoverStyle, onPress: onPress, children: _jsx(Text, { color: disabled ? '$neutral2' : '$accent1', variant: "buttonLabel4", children: t('swap.button.max') }) }) }));
});
//# sourceMappingURL=MaxAmountButton.js.map