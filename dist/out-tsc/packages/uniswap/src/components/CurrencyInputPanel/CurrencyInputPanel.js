import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Flex, Text, TouchableArea, isWeb, useIsShortMobileDevice, useSporeColors } from 'ui/src';
import { errorShakeAnimation } from 'ui/src/animations/errorShakeAnimation';
import { AnimatedFlex } from 'ui/src/components/layout/AnimatedFlex';
import { useDynamicFontSizing } from 'ui/src/hooks/useDynamicFontSizing';
import { fonts, spacing } from 'ui/src/theme';
import { AmountInput } from 'uniswap/src/components/CurrencyInputPanel/AmountInput';
import { MaxAmountButton } from 'uniswap/src/components/CurrencyInputPanel/MaxAmountButton';
import { SelectTokenButton } from 'uniswap/src/components/CurrencyInputPanel/SelectTokenButton';
import { MAX_FIAT_INPUT_DECIMALS } from 'uniswap/src/constants/transactions';
import { useAccountMeta } from 'uniswap/src/contexts/UniswapContext';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { useAppFiatCurrencyInfo } from 'uniswap/src/features/fiatCurrency/hooks';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useTokenAndFiatDisplayAmounts } from 'uniswap/src/features/transactions/hooks/useTokenAndFiatDisplayAmounts';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { CurrencyField } from 'uniswap/src/types/currency';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { isDetoxBuild } from 'utilities/src/environment/constants';
import { NumberType } from 'utilities/src/format/types';
import { usePrevious } from 'utilities/src/react/hooks';
import { ONE_SECOND_MS } from 'utilities/src/time/time';
const MAX_INPUT_FONT_SIZE = 36;
const MIN_INPUT_FONT_SIZE = 24;
// if font changes from `fontFamily.sansSerif.regular` or `MAX_INPUT_FONT_SIZE`
// changes from 36 then width value must be adjusted
const MAX_CHAR_PIXEL_WIDTH = 23;
export const CurrencyInputPanel = memo(forwardRef(function _CurrencyInputPanel(props, forwardedRef) {
    var _a;
    const { autoFocus, currencyAmount, currencyBalance, currencyField, currencyInfo, focus, isFiatMode = false, onPressIn, onSelectionChange: selectionChange, onSetExactAmount, onSetMax, onShowTokenSelector, onToggleIsFiatMode, showSoftInputOnFocus = false, resetSelection, disabled = false, onPressDisabled, enableInputOnly, headerLabel, ...rest } = props;
    const colors = useSporeColors();
    const account = useAccountMeta();
    const isShortMobileDevice = useIsShortMobileDevice();
    const { formatCurrencyAmount } = useLocalizationContext();
    const indicativeQuotesEnabled = useFeatureFlag(FeatureFlags.IndicativeSwapQuotes);
    const indicativeDisplay = useIndicativeTextDisplay(props);
    const legacyDisplay = useLegacyTextDisplay(props);
    const { isTestnetModeEnabled } = useEnabledChains();
    const display = indicativeQuotesEnabled ? indicativeDisplay : legacyDisplay;
    const { value, color, usdValue } = display;
    const inputRef = useRef(null);
    const shakeValue = useSharedValue(0);
    const shakeStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shakeValue.value }],
    }), [shakeValue.value]);
    const triggerShakeAnimation = useCallback(() => {
        shakeValue.value = errorShakeAnimation(shakeValue);
    }, [shakeValue]);
    useImperativeHandle(forwardedRef, () => ({
        textInputRef: inputRef,
        triggerShakeAnimation,
    }));
    const isOutput = currencyField === CurrencyField.OUTPUT;
    const showInsufficientBalanceWarning = !isOutput && !!currencyBalance && !!currencyAmount && currencyBalance.lessThan(currencyAmount);
    const _onToggleIsFiatMode = useCallback(() => {
        onToggleIsFiatMode(currencyField);
    }, [currencyField, onToggleIsFiatMode]);
    // For native mobile, given that we're using a custom `DecimalPad`,
    // the input's focus state can sometimes be out of sync with the controlled `focus` prop.
    // When this happens, we want to sync the input's focus state by either auto-focusing or blurring it.
    const isTextInputRefActuallyFocused = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.isFocused();
    useEffect(() => {
        var _a, _b, _c;
        if (isWeb) {
            // We do not want to force-focus the `input` on web.
            // This is only needed when using native mobile's custom `DecimalPad`.
            return;
        }
        if (focus === undefined) {
            // Ignore this effect unless `focus` is explicitly set to a boolean.
            return;
        }
        if (focus && !isTextInputRefActuallyFocused) {
            resetSelection === null || resetSelection === void 0 ? void 0 : resetSelection({
                start: (_a = value === null || value === void 0 ? void 0 : value.length) !== null && _a !== void 0 ? _a : 0,
                end: (_b = value === null || value === void 0 ? void 0 : value.length) !== null && _b !== void 0 ? _b : 0,
                currencyField,
            });
            setTimeout(() => {
                var _a;
                // We need to wait for the token selector sheet to fully close before triggering this or else it won't work.
                (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }, ONE_SECOND_MS / 2);
        }
        else if (!focus && isTextInputRefActuallyFocused) {
            (_c = inputRef.current) === null || _c === void 0 ? void 0 : _c.blur();
        }
    }, [currencyField, focus, isTextInputRefActuallyFocused, resetSelection, value === null || value === void 0 ? void 0 : value.length]);
    const { onLayout, fontSize, onSetFontSize } = useDynamicFontSizing(MAX_CHAR_PIXEL_WIDTH, MAX_INPUT_FONT_SIZE, MIN_INPUT_FONT_SIZE);
    const lineHeight = fontSize * 1.2;
    // This is needed to ensure that the text resizes when modified from outside the component (e.g. custom numpad)
    useEffect(() => {
        if (value) {
            onSetFontSize(value);
            // Always set font size if focused to format placeholder size, we need to pass in a non-empty string to avoid formatting crash
        }
        else if (focus) {
            onSetFontSize('0');
        }
    }, [focus, onSetFontSize, value]);
    const onSelectionChange = useCallback(({ nativeEvent: { selection: { start, end }, }, }) => selectionChange === null || selectionChange === void 0 ? void 0 : selectionChange(start, end), [selectionChange]);
    // Hide balance if panel is output, and no balance
    const hideCurrencyBalance = (isOutput && (currencyBalance === null || currencyBalance === void 0 ? void 0 : currencyBalance.equalTo(0))) || !account;
    const showMaxButton = !isOutput && account;
    // In fiat mode, show equivalent token amount. In token mode, show equivalent fiat amount
    const inputPanelFormattedValue = useTokenAndFiatDisplayAmounts({
        value,
        currencyInfo,
        currencyAmount,
        usdValue,
        isFiatMode,
    });
    const onPressDisabledWithShakeAnimation = useCallback(() => {
        onPressDisabled === null || onPressDisabled === void 0 ? void 0 : onPressDisabled();
        triggerShakeAnimation();
    }, [onPressDisabled, triggerShakeAnimation]);
    const { symbol: fiatCurrencySymbol } = useAppFiatCurrencyInfo();
    const handleSetMax = useCallback((amount) => {
        onSetMax === null || onSetMax === void 0 ? void 0 : onSetMax(amount, currencyField);
    }, [currencyField, onSetMax]);
    const refetchAnimationStyle = useRefetchAnimationStyle(props);
    return (_jsx(TouchableArea, { disabled: enableInputOnly, disabledStyle: {
            cursor: 'default',
        }, onPress: disabled ? onPressDisabledWithShakeAnimation : currencyInfo ? onPressIn : onShowTokenSelector, children: _jsxs(Flex, { ...rest, overflow: "hidden", px: "$spacing16", py: isShortMobileDevice ? '$spacing8' : '$spacing16', children: [headerLabel && (_jsx(Text, { color: "$neutral2", variant: "subheading2", fontSize: "$micro", children: headerLabel })), _jsxs(AnimatedFlex, { row: true, alignItems: "center", justifyContent: !currencyInfo ? 'flex-end' : 'space-between', py: "$spacing8", minHeight: MAX_INPUT_FONT_SIZE * 1.2 + 2 * spacing.spacing8, style: shakeStyle, children: [isFiatMode && (_jsx(Text, { allowFontScaling: true, color: showInsufficientBalanceWarning ? '$statusCritical' : color, fontSize: fontSize, lineHeight: lineHeight, mr: isWeb && '$spacing2', children: fiatCurrencySymbol })), _jsx(AnimatedFlex, { fill: true, grow: true, row: true, alignItems: "center", height: MAX_INPUT_FONT_SIZE, mr: "$spacing8", overflow: "hidden", style: refetchAnimationStyle, onLayout: onLayout, children: currencyInfo ? (_jsxs(Flex, { grow: true, flexShrink: isWeb ? 1 : 0, children: [disabled && (
                                    // Invisible TouchableArea overlay to capture onPress events and trigger the shake animation when the input is disabled
                                    _jsx(TouchableArea, { style: { position: 'absolute', width: '100%', height: '100%', zIndex: 1 }, onPress: onPressDisabledWithShakeAnimation })), _jsx(AmountInput, { ref: inputRef, autoFocus: autoFocus !== null && autoFocus !== void 0 ? autoFocus : focus, backgroundColor: "$transparent", borderWidth: 0, color: showInsufficientBalanceWarning ? '$statusCritical' : color, disabled: disabled || !currencyInfo, flex: 1, focusable: !disabled && Boolean(currencyInfo), fontFamily: "$heading", 
                                        // This is a hacky workaround for Android to prevent text from being cut off
                                        // (the text input height is greater than the font size and the input is
                                        // centered vertically, so the caret is cut off but the text is not)
                                        fontSize: fontSize, lineHeight: lineHeight, fontWeight: "$book", maxDecimals: isFiatMode ? MAX_FIAT_INPUT_DECIMALS : currencyInfo.currency.decimals, maxFontSizeMultiplier: fonts.heading2.maxFontSizeMultiplier, minHeight: lineHeight, overflow: "visible", placeholder: "0", placeholderTextColor: colors.neutral3.val, borderRadius: 0, px: "$none", py: "$none", returnKeyType: showSoftInputOnFocus ? 'done' : undefined, showSoftInputOnFocus: showSoftInputOnFocus, testID: isOutput ? TestID.AmountInputOut : TestID.AmountInputIn, value: value, onChangeText: onSetExactAmount, onPressIn: onPressIn, onSelectionChange: onSelectionChange })] })) : (_jsx(TouchableArea, { onPress: onShowTokenSelector, children: _jsx(Text, { color: "$neutral3", fontSize: fontSize, variant: "heading2", style: { lineHeight: fontSize }, children: "0" }) })) }), _jsx(Flex, { row: true, alignItems: "center", children: _jsx(SelectTokenButton, { selectedCurrencyInfo: currencyInfo, testID: currencyField === CurrencyField.INPUT ? TestID.ChooseInputToken : TestID.ChooseOutputToken, onPress: onShowTokenSelector }) })] }), currencyInfo && (_jsxs(Flex, { row: true, gap: "$spacing8", justifyContent: "space-between", children: [_jsx(TouchableArea, { flexShrink: 1, onPress: disabled || isTestnetModeEnabled ? onPressDisabledWithShakeAnimation : _onToggleIsFiatMode, children: !isTestnetModeEnabled && (_jsx(Flex, { centered: true, row: true, shrink: true, gap: "$spacing4", children: _jsx(Text, { color: "$neutral2", numberOfLines: 1, variant: "body3", children: inputPanelFormattedValue }) })) }), _jsxs(Flex, { row: true, centered: true, gap: "$spacing4", justifyContent: "flex-end", children: [!hideCurrencyBalance && (_jsxs(Text, { color: showInsufficientBalanceWarning ? '$statusCritical' : '$neutral2', variant: "body3", children: [formatCurrencyAmount({
                                            value: currencyBalance,
                                            type: NumberType.TokenNonTx,
                                        }), ' ', getSymbolDisplayText(currencyInfo.currency.symbol)] })), showMaxButton && onSetMax && (_jsx(MaxAmountButton, { currencyAmount: currencyAmount, currencyBalance: currencyBalance, currencyField: currencyField, onSetMax: handleSetMax }))] })] }))] }) }));
}));
/**
 * Controls the display value and color upon indicative vs full quote input.
 *
 * Rules:
 * * If the value goes from indicative to full, show the indicative value for another 200ms in neutral2 before changing.
 * * If the value is undefined, but there is input, continue to show the previous value until it gets replaced by a new quote.
 */
function useIndicativeTextDisplay({ currencyAmount, focus, isLoading, usdValue, value, valueIsIndicative, }) {
    const lastDisplayRef = useRef({ value, color: '$neutral3', usdValue });
    const hasInput = Boolean(isLoading || currencyAmount);
    // Clear the lastDisplayRef if input is cleared, so that it is not used upon subsequent input
    useEffect(() => {
        if (!hasInput) {
            lastDisplayRef.current = { value: undefined, color: '$neutral3' };
        }
    }, [hasInput]);
    return useMemo(() => {
        // Ignore all indicative treatment when the field is focused
        if (focus) {
            return { value, color: '$neutral1', usdValue };
        }
        if (!value) {
            return hasInput ? lastDisplayRef.current : { value, color: '$neutral3' };
        }
        const color = valueIsIndicative ? '$neutral3' : '$neutral1';
        const display = { value, color, usdValue };
        lastDisplayRef.current = display;
        return display;
    }, [focus, value, usdValue, hasInput, valueIsIndicative]);
}
// TODO(WEB-4805): Remove once legacy hook once indicative quotes are fully rolled out and tested
/** Controls the display value and color according to legacy, pre-indicative-quotes logic. */
function useLegacyTextDisplay({ isLoading, value, usdValue }) {
    // We need to store the previous value, because new quote request resets `Trade`, and this value, to undefined
    const previousValue = usePrevious(value);
    return useMemo(() => {
        // when there is no input value, the color should be lighter to account for $ sign when in fiat input mode
        const color = !value ? '$neutral3' : '$neutral1';
        const loadingTextValue = previousValue && previousValue !== '' ? previousValue : '0';
        return { value: isLoading ? loadingTextValue : value, usdValue, color };
    }, [isLoading, previousValue, value, usdValue]);
}
/** Returns an animated opacity based on current indicative and full quote state  */
function useRefetchAnimationStyle({ currencyAmount, isLoading, isIndicativeLoading, valueIsIndicative, }) {
    const indicativeQuotesEnabled = useFeatureFlag(FeatureFlags.IndicativeSwapQuotes);
    const loadingFlexProgress = useSharedValue(1);
    // disables looping animation during detox e2e tests which was preventing js thread from idle
    if (!isDetoxBuild) {
        loadingFlexProgress.value = withRepeat(withSequence(withTiming(0.4, { duration: 400, easing: Easing.ease }), withTiming(1, { duration: 400, easing: Easing.ease })), -1, true);
    }
    const previousAmount = usePrevious(currencyAmount);
    const amountIsTheSame = currencyAmount && (previousAmount === null || previousAmount === void 0 ? void 0 : previousAmount.equalTo(currencyAmount));
    const noIndicativeUI = !isIndicativeLoading && !valueIsIndicative;
    // The component is 'refetching' the full quote when the amount hasn't changed, and there is no indicative UI being displayed.
    const isRefetching = isLoading && amountIsTheSame && noIndicativeUI;
    // If Indicative quotes are disabled, we should animate the loading flex whenever the quote is loading.
    const shouldAnimate = isRefetching || (!indicativeQuotesEnabled && isLoading);
    return useAnimatedStyle(() => ({
        opacity: shouldAnimate ? loadingFlexProgress.value : 1,
    }), [shouldAnimate, loadingFlexProgress]);
}
//# sourceMappingURL=CurrencyInputPanel.js.map