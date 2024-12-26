import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Input, Text } from 'ui/src';
import { useSlippageSettings } from 'uniswap/src/features/transactions/swap/settings/useSlippageSettings';
import { getSlippageWarningColor } from 'uniswap/src/features/transactions/swap/utils/styleHelpers';
const INPUT_MIN_WIDTH = 44;
export function SlippageControl({ saveOnBlur }) {
    const { t } = useTranslation();
    const inputRef = useRef(null);
    const [inputWidth, setInputWidth] = useState(0);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const { isEditingSlippage, autoSlippageEnabled, inputSlippageTolerance, autoSlippageTolerance, inputAnimatedStyle, onPressAutoSlippage, onChangeSlippageInput, onFocusSlippageInput, onBlurSlippageInput, } = useSlippageSettings(saveOnBlur);
    useEffect(() => {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
    }, [isLayoutReady]);
    function onInputTextLayout(event) {
        setInputWidth(event.nativeEvent.layout.width);
        setIsLayoutReady(true);
    }
    const backgroundColor = isEditingSlippage ? '$surface2' : '$surface1';
    const inputValue = autoSlippageEnabled ? autoSlippageTolerance.toFixed(2).toString() : inputSlippageTolerance;
    const parsedInputValue = parseFloat(inputValue);
    const inputValueTextColor = useMemo(() => getSlippageWarningColor(parsedInputValue, autoSlippageTolerance, autoSlippageEnabled ? '$neutral2' : '$neutral1'), [parsedInputValue, autoSlippageEnabled, autoSlippageTolerance]);
    return (_jsx(Flex, { row: true, alignItems: "center", justifyContent: "space-between", children: _jsxs(Flex, { row: true, backgroundColor: backgroundColor, borderColor: isEditingSlippage ? '$DEP_accentSoft' : '$surface3', borderRadius: "$rounded16", borderWidth: 1, gap: "$spacing8", p: "$spacing4", pr: "$spacing8", style: inputAnimatedStyle, children: [_jsx(Flex, { centered: true, backgroundColor: autoSlippageEnabled ? '$accent2' : '$surface3', borderRadius: "$roundedFull", px: "$spacing8", onPress: onPressAutoSlippage, children: _jsx(Text, { color: autoSlippageEnabled ? '$accent1' : '$neutral2', variant: "buttonLabel3", children: t('swap.settings.slippage.control.auto') }) }), _jsxs(Flex, { row: true, alignItems: "center", paddingEnd: "$spacing12", paddingStart: "$spacing4", children: [_jsxs(Flex, { style: { position: 'relative' }, children: [_jsx(Input, { ref: inputRef, backgroundColor: backgroundColor, color: inputValueTextColor, editable: true, fontFamily: "$subHeading", fontSize: "$small", height: "100%", outlineColor: "$transparent", p: "$none", paddingEnd: "$spacing4", textAlign: "right", value: inputValue, width: inputWidth, onBlur: onBlurSlippageInput, onChangeText: onChangeSlippageInput, onFocus: onFocusSlippageInput }), _jsx(Text, { minWidth: INPUT_MIN_WIDTH, opacity: 0, px: "$spacing4", style: { position: 'absolute' }, variant: "subheading2", zIndex: -1, onLayout: onInputTextLayout, children: inputValue })] }), _jsx(Text, { color: inputValueTextColor, variant: "subheading2", children: "%" })] })] }) }));
}
//# sourceMappingURL=SlippageControl.js.map