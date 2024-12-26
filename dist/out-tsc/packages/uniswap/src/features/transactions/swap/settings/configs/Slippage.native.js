import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TradeType } from '@uniswap/sdk-core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text, TouchableArea, isWeb, useSporeColors } from 'ui/src';
import { PlusMinusButton, PlusMinusButtonType } from 'ui/src/components/button/PlusMinusButton';
import { AlertTriangleFilled } from 'ui/src/components/icons';
import { AnimatedFlex } from 'ui/src/components/layout/AnimatedFlex';
import { fonts, iconSizes, spacing } from 'ui/src/theme';
import { BottomSheetTextInput } from 'uniswap/src/components/modals/Modal';
import { LearnMoreLink } from 'uniswap/src/components/text/LearnMoreLink';
import { MAX_AUTO_SLIPPAGE_TOLERANCE, MAX_CUSTOM_SLIPPAGE_TOLERANCE, SLIPPAGE_CRITICAL_TOLERANCE, } from 'uniswap/src/constants/transactions';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useTransactionSettingsContext } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
import { useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { useSlippageSettings } from 'uniswap/src/features/transactions/swap/settings/useSlippageSettings';
import { BridgeTrade } from 'uniswap/src/features/transactions/swap/types/trade';
import { slippageToleranceToPercent } from 'uniswap/src/features/transactions/swap/utils/format';
import { getSlippageWarningColor } from 'uniswap/src/features/transactions/swap/utils/styleHelpers';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { NumberType } from 'utilities/src/format/types';
export const Slippage = {
    renderTitle: (t) => t('swap.slippage.settings.title'),
    Control() {
        var _a;
        const { t } = useTranslation();
        const { formatPercent } = useLocalizationContext();
        const { derivedSwapInfo } = useSwapFormContext();
        const { autoSlippageTolerance, customSlippageTolerance } = useTransactionSettingsContext();
        const isCustomSlippage = !!customSlippageTolerance;
        let currentSlippage = (_a = customSlippageTolerance !== null && customSlippageTolerance !== void 0 ? customSlippageTolerance : autoSlippageTolerance) !== null && _a !== void 0 ? _a : MAX_AUTO_SLIPPAGE_TOLERANCE;
        if (autoSlippageTolerance && currentSlippage === 0) {
            currentSlippage = autoSlippageTolerance;
        }
        const isBridgeTrade = derivedSwapInfo.trade.trade instanceof BridgeTrade;
        if (isBridgeTrade) {
            currentSlippage = 0;
        }
        return (_jsxs(Flex, { row: true, gap: "$spacing8", children: [!isCustomSlippage && !isBridgeTrade ? (_jsx(Flex, { centered: true, backgroundColor: "$accent2", borderRadius: "$roundedFull", px: "$spacing8", children: _jsx(Text, { color: "$accent1", variant: "buttonLabel3", children: t('swap.settings.slippage.control.auto') }) })) : null, _jsx(Text, { color: "$neutral2", variant: "subheading2", children: formatPercent(currentSlippage) })] }));
    },
    Screen() {
        const { t } = useTranslation();
        const colors = useSporeColors();
        const { derivedSwapInfo: { trade: { trade }, }, } = useSwapFormContext();
        const { isEditingSlippage, autoSlippageEnabled, showSlippageWarning, inputSlippageTolerance, inputWarning, autoSlippageTolerance, currentSlippageTolerance, inputAnimatedStyle, onPressAutoSlippage, onChangeSlippageInput, onFocusSlippageInput, onBlurSlippageInput, onPressPlusMinusButton, } = useSlippageSettings();
        const isBridgeTrade = trade instanceof BridgeTrade;
        const inputValueTextColor = useMemo(() => getSlippageWarningColor(currentSlippageTolerance, autoSlippageTolerance), [currentSlippageTolerance, autoSlippageTolerance]);
        const slippageMessage = useMemo(() => {
            if (isBridgeTrade) {
                return _jsx(WarningMessage, { text: t('swap.slippage.bridging'), color: "$neutral2" });
            }
            else {
                return (_jsx(SlippageMessage, { inputWarning: inputWarning, showSlippageWarning: showSlippageWarning, slippageTolerance: currentSlippageTolerance, trade: trade, color: inputValueTextColor }));
            }
        }, [currentSlippageTolerance, inputWarning, isBridgeTrade, showSlippageWarning, t, trade, inputValueTextColor]);
        return (_jsxs(Flex, { centered: true, gap: "$spacing16", children: [!isBridgeTrade && (_jsx(Text, { color: "$neutral2", textAlign: "center", variant: "body2", children: t('swap.settings.slippage.description') })), !isBridgeTrade && _jsx(LearnMoreLink, { url: uniswapUrls.helpArticleUrls.swapSlippage }), _jsxs(Flex, { gap: "$spacing12", children: [_jsxs(Flex, { centered: true, row: true, gap: "$spacing16", mt: "$spacing12", children: [_jsx(PlusMinusButton, { disabled: currentSlippageTolerance === 0 || isBridgeTrade, type: PlusMinusButtonType.Minus, onPress: onPressPlusMinusButton }), _jsxs(AnimatedFlex, { row: true, alignItems: "center", backgroundColor: isEditingSlippage || isBridgeTrade ? '$surface2' : '$surface1', borderColor: "$surface3", borderRadius: "$roundedFull", borderWidth: 1, gap: "$spacing12", p: "$spacing16", style: inputAnimatedStyle, children: [_jsx(TouchableArea, { onPress: isBridgeTrade ? undefined : onPressAutoSlippage, children: _jsx(Text, { color: "$accent1", variant: "buttonLabel2", children: t('swap.settings.slippage.control.auto') }) }), isBridgeTrade ? (_jsx(Text, { color: "$neutral2", textAlign: "center", variant: "subheading1", children: "0.00" })) : (_jsx(BottomSheetTextInput, { keyboardType: "numeric", style: {
                                                color: currentSlippageTolerance >= SLIPPAGE_CRITICAL_TOLERANCE
                                                    ? colors.statusCritical.val
                                                    : colors.neutral1.val,
                                                fontSize: fonts.subheading1.fontSize,
                                                width: fonts.subheading1.fontSize * 4,
                                                padding: spacing.none,
                                                ...(!isWeb && {
                                                    fontFamily: fonts.subheading1.family,
                                                }),
                                            }, textAlign: "center", value: autoSlippageEnabled ? autoSlippageTolerance.toFixed(2).toString() : inputSlippageTolerance, onBlur: onBlurSlippageInput, onChangeText: onChangeSlippageInput, onFocus: onFocusSlippageInput })), _jsx(Flex, { width: iconSizes.icon28, children: _jsx(Text, { color: "$neutral2", textAlign: "center", variant: "subheading1", children: "%" }) })] }), _jsx(PlusMinusButton, { disabled: currentSlippageTolerance === MAX_CUSTOM_SLIPPAGE_TOLERANCE || isBridgeTrade, type: PlusMinusButtonType.Plus, onPress: onPressPlusMinusButton })] }), slippageMessage] })] }));
    },
};
function SlippageMessage({ inputWarning, trade, slippageTolerance, showSlippageWarning, showEmpty = true, color = '$statusWarning', }) {
    const { t } = useTranslation();
    const { formatCurrencyAmount } = useLocalizationContext();
    const slippageTolerancePercent = slippageToleranceToPercent(slippageTolerance);
    if (inputWarning) {
        return _jsx(WarningMessage, { showAlert: true, text: inputWarning, color: color });
    }
    return trade ? (_jsxs(Flex, { centered: true, gap: "$spacing8", py: "$spacing4", children: [_jsxs(Text, { color: "$neutral2", textAlign: "center", variant: "body2", children: [trade.tradeType === TradeType.EXACT_INPUT
                        ? t('swap.settings.slippage.input.receive.title')
                        : t('swap.settings.slippage.output.spend.title'), ' ', formatCurrencyAmount({
                        value: trade.minimumAmountOut(slippageTolerancePercent),
                        type: NumberType.TokenTx,
                    }), ' ', getSymbolDisplayText(trade.tradeType === TradeType.EXACT_INPUT
                        ? trade.outputAmount.currency.symbol
                        : trade.inputAmount.currency.symbol)] }), showSlippageWarning ? (_jsxs(Flex, { centered: true, row: true, gap: "$spacing8", children: [_jsx(AlertTriangleFilled, { color: color, size: "$icon.16" }), _jsx(Text, { color: "$DEP_accentWarning", variant: "body2", children: t('swap.settings.slippage.warning.message') })] })) : null] })) : showEmpty ? (_jsx(Flex, { height: fonts.body2.lineHeight })) : null;
}
function WarningMessage({ text, color, showAlert = false, }) {
    return (_jsxs(Flex, { row: true, centered: true, px: "$spacing12", gap: "$spacing8", height: fonts.body3.lineHeight * 2 + spacing.spacing8, children: [showAlert && _jsx(AlertTriangleFilled, { color: color, size: "$icon.16" }), _jsx(Text, { color: color, textAlign: "center", variant: "body3", children: text })] }));
}
//# sourceMappingURL=Slippage.native.js.map