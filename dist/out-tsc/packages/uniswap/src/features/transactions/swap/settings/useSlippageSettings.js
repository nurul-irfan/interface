import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { errorShakeAnimation } from 'ui/src/animations/errorShakeAnimation';
import { PlusMinusButtonType } from 'ui/src/components/button/PlusMinusButton';
import { MAX_AUTO_SLIPPAGE_TOLERANCE, MAX_CUSTOM_SLIPPAGE_TOLERANCE, SLIPPAGE_CRITICAL_TOLERANCE, } from 'uniswap/src/constants/transactions';
import { useTransactionSettingsContext } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
const SLIPPAGE_INCREMENT = 0.1;
export function useSlippageSettings(saveOnBlur) {
    var _a, _b;
    const { t } = useTranslation();
    const { customSlippageTolerance, autoSlippageTolerance: derivedAutoSlippageTolerance, updateTransactionSettings, } = useTransactionSettingsContext();
    const [isEditingSlippage, setIsEditingSlippage] = useState(false);
    const [autoSlippageEnabled, setAutoSlippageEnabled] = useState(!customSlippageTolerance);
    const [inputSlippageTolerance, setInputSlippageTolerance] = useState((_b = (_a = customSlippageTolerance === null || customSlippageTolerance === void 0 ? void 0 : customSlippageTolerance.toFixed(2)) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '');
    const [inputWarning, setInputWarning] = useState();
    // Fall back to default slippage if there is no trade specified.
    // Separate from inputSlippageTolerance since autoSlippage updates when the trade quote updates
    const autoSlippageTolerance = derivedAutoSlippageTolerance !== null && derivedAutoSlippageTolerance !== void 0 ? derivedAutoSlippageTolerance : MAX_AUTO_SLIPPAGE_TOLERANCE;
    // Determine numerical currentSlippage value to use based on inputSlippageTolerance string value
    // ex. if inputSlippageTolerance is '' or '.', currentSlippage is set to autoSlippageTolerance
    const parsedInputSlippageTolerance = parseFloat(inputSlippageTolerance);
    const currentSlippageToleranceNum = isNaN(parsedInputSlippageTolerance)
        ? autoSlippageTolerance
        : parsedInputSlippageTolerance;
    // Make input text the warning color if user is setting custom slippage higher than auto slippage value or 0
    const showSlippageWarning = parsedInputSlippageTolerance > autoSlippageTolerance;
    const inputShakeX = useSharedValue(0);
    const inputAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: inputShakeX.value }],
    }), [inputShakeX]);
    const onPressAutoSlippage = () => {
        setAutoSlippageEnabled(true);
        setInputWarning(undefined);
        setInputSlippageTolerance('');
        updateTransactionSettings({ customSlippageTolerance: undefined });
    };
    const updateInputWarning = useCallback((parsedValue) => {
        const overMaxTolerance = parsedValue > MAX_CUSTOM_SLIPPAGE_TOLERANCE;
        const overWarningTolerance = parsedValue > autoSlippageTolerance;
        const overCriticalTolerance = parsedValue >= SLIPPAGE_CRITICAL_TOLERANCE;
        const isZero = parsedValue === 0;
        if (isZero) {
            return setInputWarning(t('swap.settings.slippage.warning.min'));
        }
        else if (overMaxTolerance) {
            return setInputWarning(t('swap.settings.slippage.warning.max', {
                maxSlippageTolerance: MAX_CUSTOM_SLIPPAGE_TOLERANCE,
            }));
        }
        else if (overCriticalTolerance) {
            return setInputWarning(t('swap.settings.slippage.warning'));
        }
        else if (overWarningTolerance) {
            return setInputWarning(t('swap.settings.slippage.alert'));
        }
        return setInputWarning(undefined);
    }, [autoSlippageTolerance, t]);
    const onChangeSlippageInput = useCallback(async (value) => {
        setAutoSlippageEnabled(false);
        setInputWarning(undefined);
        // Handle keyboards that use `,` as decimal separator
        value = value.replace(',', '.');
        // Allow empty input value and single decimal point
        if (value === '' || value === '.') {
            setInputSlippageTolerance(value);
            return;
        }
        const parsedValue = parseFloat(value);
        // Validate input and prevent invalid updates with animation
        const isInvalidNumber = isNaN(parsedValue);
        const overMaxTolerance = parsedValue > MAX_CUSTOM_SLIPPAGE_TOLERANCE;
        const decimalParts = value.split('.');
        const moreThanOneDecimalSymbol = decimalParts.length > 2;
        const moreThanTwoDecimals = (decimalParts === null || decimalParts === void 0 ? void 0 : decimalParts[1]) && (decimalParts === null || decimalParts === void 0 ? void 0 : decimalParts[1].length) > 2;
        const isZero = parsedValue === 0;
        updateInputWarning(parsedValue);
        /* Prevent invalid updates to input value with animation and haptic
         * isZero is intentionally left out here because the user should be able to type "0"
         * without the input shaking (ex. typing 0.x shouldn't shake after typing char)
         */
        if (isZero || isInvalidNumber || overMaxTolerance || moreThanOneDecimalSymbol || moreThanTwoDecimals) {
            inputShakeX.value = errorShakeAnimation(inputShakeX);
            return;
        }
        setInputSlippageTolerance(value);
        if (!saveOnBlur) {
            updateTransactionSettings({ customSlippageTolerance: parsedValue });
        }
    }, [updateInputWarning, saveOnBlur, inputShakeX, updateTransactionSettings]);
    const onFocusSlippageInput = useCallback(() => {
        setIsEditingSlippage(true);
        // Clear the input if auto slippage is enabled
        if (autoSlippageEnabled) {
            setAutoSlippageEnabled(false);
            setInputSlippageTolerance('');
        }
    }, [autoSlippageEnabled]);
    const onBlurSlippageInput = useCallback(() => {
        setIsEditingSlippage(false);
        // Set autoSlippageEnabled to true if input is invalid (ex. '' or '.')
        if (isNaN(parsedInputSlippageTolerance)) {
            setAutoSlippageEnabled(true);
            updateTransactionSettings({ customSlippageTolerance: undefined });
            return;
        }
        setInputSlippageTolerance(parsedInputSlippageTolerance.toFixed(2));
        if (saveOnBlur) {
            updateTransactionSettings({ customSlippageTolerance: parsedInputSlippageTolerance });
        }
    }, [parsedInputSlippageTolerance, updateTransactionSettings, saveOnBlur]);
    const onPressPlusMinusButton = useCallback((type) => {
        if (autoSlippageEnabled) {
            setAutoSlippageEnabled(false);
        }
        const newSlippage = currentSlippageToleranceNum + (type === PlusMinusButtonType.Plus ? SLIPPAGE_INCREMENT : -SLIPPAGE_INCREMENT);
        const constrainedNewSlippage = type === PlusMinusButtonType.Plus
            ? Math.min(newSlippage, MAX_CUSTOM_SLIPPAGE_TOLERANCE)
            : Math.max(newSlippage, 0);
        updateInputWarning(constrainedNewSlippage);
        setInputSlippageTolerance(constrainedNewSlippage.toFixed(2).toString());
        updateTransactionSettings({ customSlippageTolerance: constrainedNewSlippage });
    }, [autoSlippageEnabled, currentSlippageToleranceNum, updateInputWarning, updateTransactionSettings]);
    return {
        isEditingSlippage,
        autoSlippageEnabled,
        showSlippageWarning,
        inputSlippageTolerance,
        inputWarning,
        autoSlippageTolerance,
        currentSlippageTolerance: currentSlippageToleranceNum,
        inputAnimatedStyle,
        onPressAutoSlippage,
        onChangeSlippageInput,
        onFocusSlippageInput,
        onBlurSlippageInput,
        onPressPlusMinusButton,
    };
}
//# sourceMappingURL=useSlippageSettings.js.map