import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TradeType } from '@uniswap/sdk-core';
import { useTranslation } from 'react-i18next';
import { Flex, isWeb, Text, TouchableArea, useSporeColors } from 'ui/src';
import { AlertTriangleFilled } from 'ui/src/components/icons/AlertTriangleFilled';
import { Settings } from 'ui/src/components/icons/Settings';
import { IndicativeLoadingWrapper } from 'uniswap/src/components/misc/IndicativeLoadingWrapper';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { WarningInfo } from 'uniswap/src/components/modals/WarningModal/WarningInfo';
import { LearnMoreLink } from 'uniswap/src/components/text/LearnMoreLink';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { BridgeTrade } from 'uniswap/src/features/transactions/swap/types/trade';
import { slippageToleranceToPercent } from 'uniswap/src/features/transactions/swap/utils/format';
import { NumberType } from 'utilities/src/format/types';
import { isMobileApp } from 'utilities/src/platform';
export function MaxSlippageRow({ acceptedDerivedSwapInfo, autoSlippageTolerance, customSlippageTolerance, }) {
    var _a;
    const { t } = useTranslation();
    const formatter = useLocalizationContext();
    const { formatPercent } = formatter;
    const acceptedTrade = (_a = acceptedDerivedSwapInfo.trade.trade) !== null && _a !== void 0 ? _a : acceptedDerivedSwapInfo.trade.indicativeTrade;
    if (!acceptedTrade) {
        throw new Error('Invalid render of `MaxSlippageInfo` with no `trade`');
    }
    if (acceptedTrade instanceof BridgeTrade) {
        throw new Error('Invalid render of `MaxSlippageInfo` for bridge trade');
    }
    // If we don't have a custom slippage tolerance set, we won't have a tolerance to display for an indicative quote,
    // since only the full quote has a slippage tolerance. In this case, we display a loading state until the full quote is received.
    const showLoadingState = acceptedTrade.indicative && !acceptedTrade.slippageTolerance;
    // Make text the warning color if user is setting custom slippage higher than auto slippage value
    const showSlippageWarning = acceptedTrade.slippageTolerance && autoSlippageTolerance
        ? acceptedTrade.slippageTolerance > autoSlippageTolerance
        : false;
    return (_jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing12", justifyContent: "space-between", children: [_jsx(SlippageWarningContent, { autoSlippageTolerance: autoSlippageTolerance, isCustomSlippage: !!customSlippageTolerance, trade: acceptedTrade, children: _jsx(TouchableArea, { flexShrink: 1, children: _jsx(Flex, { row: true, alignItems: "center", gap: "$spacing4", children: _jsx(Text, { color: "$neutral2", numberOfLines: 3, variant: "body3", children: t('swap.details.slippage') }) }) }) }), _jsx(IndicativeLoadingWrapper, { loading: showLoadingState, children: _jsxs(Flex, { centered: true, row: true, gap: "$spacing8", children: [!customSlippageTolerance ? (_jsx(Flex, { centered: true, backgroundColor: "$surface3", borderRadius: "$roundedFull", px: "$spacing4", py: "$spacing2", children: _jsx(Text, { color: "$neutral2", variant: "buttonLabel3", children: t('swap.settings.slippage.control.auto') }) })) : null, _jsx(Text, { color: showSlippageWarning ? '$DEP_accentWarning' : '$neutral1', variant: "body3", children: formatPercent(acceptedTrade === null || acceptedTrade === void 0 ? void 0 : acceptedTrade.slippageTolerance) })] }) })] }));
}
// eslint-disable-next-line complexity
export function SlippageWarningContent({ children, trade, isCustomSlippage, autoSlippageTolerance, }) {
    const { t } = useTranslation();
    const colors = useSporeColors();
    const { formatCurrencyAmount, formatPercent } = useLocalizationContext();
    // Avoid showing min out / max in UI when on an indicative quote.
    if (trade.indicative) {
        return _jsx(_Fragment, { children: children });
    }
    const { slippageTolerance, tradeType } = trade;
    const showSlippageWarning = autoSlippageTolerance && slippageTolerance > autoSlippageTolerance;
    const slippageTolerancePercent = slippageToleranceToPercent(slippageTolerance);
    const amount = formatCurrencyAmount({
        value: trade.tradeType === TradeType.EXACT_INPUT
            ? trade.minimumAmountOut(slippageTolerancePercent)
            : trade.maximumAmountIn(slippageTolerancePercent),
        type: NumberType.TokenTx,
    });
    const tokenSymbol = trade.tradeType === TradeType.EXACT_INPUT ? trade.outputAmount.currency.symbol : trade.inputAmount.currency.symbol;
    const captionContent = (_jsxs(Flex, { gap: "$spacing12", width: "100%", children: [_jsxs(Text, { color: "$neutral2", textAlign: isWeb ? 'left' : 'center', variant: isWeb ? 'body4' : 'body2', children: [tradeType === TradeType.EXACT_INPUT
                        ? t('swap.settings.slippage.input.message')
                        : t('swap.settings.slippage.output.message'), ' ', isWeb && (_jsx(Flex, { display: "inline-flex", children: _jsx(LearnMoreLink, { url: uniswapUrls.helpArticleUrls.swapSlippage, textVariant: "body4", textColor: "white" }) }))] }), showSlippageWarning && isWeb ? (_jsxs(Flex, { centered: true, row: true, gap: "$spacing8", children: [_jsx(AlertTriangleFilled, { color: "$statusWarning", size: "$icon.16" }), _jsx(Text, { color: "$statusWarning", variant: "body4", children: t('swap.settings.slippage.warning.message') })] })) : null, _jsxs(Flex, { backgroundColor: "$surface2", borderRadius: isWeb ? '$rounded8' : '$rounded20', gap: "$spacing8", px: isWeb ? '$spacing8' : '$spacing16', py: isWeb ? '$spacing8' : '$spacing12', width: "100%", children: [isMobileApp && (_jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing12", justifyContent: "space-between", children: [_jsx(Text, { color: "$neutral2", flexShrink: 1, numberOfLines: 3, variant: isWeb ? 'buttonLabel1' : 'body2', children: t('swap.slippage.settings.title') }), _jsxs(Flex, { row: true, gap: "$spacing8", children: [!isCustomSlippage ? (_jsx(Flex, { centered: true, backgroundColor: "$accent2", borderRadius: "$roundedFull", px: "$spacing8", children: _jsx(Text, { color: "$accent1", variant: "buttonLabel3", children: t('swap.settings.slippage.control.auto') }) })) : null, _jsx(Text, { color: showSlippageWarning ? '$statusWarning' : '$neutral1', variant: "subheading2", children: formatPercent(slippageTolerance) })] })] })), _jsxs(Flex, { row: true, alignItems: "center", gap: isWeb ? '$spacing8' : '$spacing12', justifyContent: "space-between", children: [_jsx(Text, { color: "$neutral2", flexShrink: 1, numberOfLines: 3, variant: isWeb ? 'body4' : 'body2', children: tradeType === TradeType.EXACT_INPUT
                                    ? t('swap.settings.slippage.input.receive.title')
                                    : t('swap.settings.slippage.output.spend.title') }), _jsxs(Text, { color: "$neutral1", textAlign: "center", variant: isWeb ? 'body4' : 'subheading2', children: [amount, " ", tokenSymbol] })] })] }), showSlippageWarning && isMobileApp ? (_jsxs(Flex, { centered: true, row: true, gap: "$spacing8", children: [!isWeb && _jsx(AlertTriangleFilled, { color: "$statusWarning", size: "$icon.16" }), _jsx(Text, { color: "$statusWarning", variant: isWeb ? 'buttonLabel2' : 'body2', children: t('swap.settings.slippage.warning.message') })] })) : null] }));
    return (_jsx(WarningInfo, { infoButton: isMobileApp ? _jsx(LearnMoreLink, { url: uniswapUrls.helpArticleUrls.swapSlippage }) : null, modalProps: {
            backgroundIconColor: colors.surface2.get(),
            captionComponent: captionContent,
            rejectText: t('common.button.close'),
            icon: _jsx(Settings, { color: "$neutral2", size: "$icon.28" }),
            modalName: ModalName.SlippageInfo,
            severity: WarningSeverity.None,
            title: t('swap.slippage.settings.title'),
        }, tooltipProps: {
            text: captionContent,
            maxWidth: 272,
            placement: 'top',
        }, children: children }));
}
//# sourceMappingURL=MaxSlippageRow.js.map