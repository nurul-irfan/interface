import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, HeightAnimator, Text, TouchableArea } from 'ui/src';
import { getAlertColor } from 'uniswap/src/components/modals/WarningModal/getAlertColor';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import Trace from 'uniswap/src/features/telemetry/Trace';
import { ElementName } from 'uniswap/src/features/telemetry/constants';
import { TransactionDetails } from 'uniswap/src/features/transactions/TransactionDetails/TransactionDetails';
import { useParsedSwapWarnings } from 'uniswap/src/features/transactions/swap/hooks/useSwapWarnings';
import { AcrossRoutingInfo } from 'uniswap/src/features/transactions/swap/modals/AcrossRoutingInfo';
import { MarketPriceImpactWarning } from 'uniswap/src/features/transactions/swap/modals/MarketPriceImpactWarning';
import { RoutingInfo } from 'uniswap/src/features/transactions/swap/modals/RoutingInfo';
import { EstimatedTime } from 'uniswap/src/features/transactions/swap/review/EstimatedTime';
import { MaxSlippageRow } from 'uniswap/src/features/transactions/swap/review/MaxSlippageRow';
import { SwapRateRatio } from 'uniswap/src/features/transactions/swap/review/SwapRateRatio';
import { getSwapFeeUsdFromDerivedSwapInfo } from 'uniswap/src/features/transactions/swap/utils/getSwapFeeUsd';
import { isBridge } from 'uniswap/src/features/transactions/swap/utils/routing';
import { CurrencyField } from 'uniswap/src/types/currency';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { normalizePriceImpact } from 'utilities/src/format/normalizePriceImpact';
import { NumberType } from 'utilities/src/format/types';
import { isMobileApp, isMobileWeb } from 'utilities/src/platform';
export function SwapDetails({ acceptedDerivedSwapInfo, autoSlippageTolerance, customSlippageTolerance, derivedSwapInfo, feeOnTransferProps, tokenWarningProps, tokenWarningChecked, gasFee, uniswapXGasBreakdown, newTradeRequiresAcceptance, warning, onAcceptTrade, onShowWarning, setTokenWarningChecked, txSimulationErrors, }) {
    var _a, _b, _c, _d;
    const v4Enabled = useFeatureFlag(FeatureFlags.V4Swap);
    const { t } = useTranslation();
    const isBridgeTrade = derivedSwapInfo.trade.trade && isBridge(derivedSwapInfo.trade.trade);
    const trade = (_a = derivedSwapInfo.trade.trade) !== null && _a !== void 0 ? _a : derivedSwapInfo.trade.indicativeTrade;
    const acceptedTrade = (_b = acceptedDerivedSwapInfo.trade.trade) !== null && _b !== void 0 ? _b : acceptedDerivedSwapInfo.trade.indicativeTrade;
    const swapFeeUsd = getSwapFeeUsdFromDerivedSwapInfo(derivedSwapInfo);
    if (!trade) {
        throw new Error('Invalid render of `SwapDetails` with no `trade`');
    }
    if (!acceptedTrade) {
        throw new Error('Invalid render of `SwapDetails` with no `acceptedTrade`');
    }
    const estimatedBridgingTime = useMemo(() => {
        var _a;
        const tradeQuote = (_a = derivedSwapInfo.trade.trade) === null || _a === void 0 ? void 0 : _a.quote;
        if (!tradeQuote || !isBridge(tradeQuote)) {
            return undefined;
        }
        return tradeQuote.quote.estimatedFillTimeMs;
    }, [(_c = derivedSwapInfo.trade.trade) === null || _c === void 0 ? void 0 : _c.quote]);
    const priceImpactPercentage = (_d = acceptedDerivedSwapInfo.trade.trade) === null || _d === void 0 ? void 0 : _d.priceImpact;
    const { priceImpactWarning } = useParsedSwapWarnings();
    const priceImpactWarningColor = getAlertColor(priceImpactWarning === null || priceImpactWarning === void 0 ? void 0 : priceImpactWarning.severity).text;
    return (_jsx(HeightAnimatorWrapper, { children: _jsxs(TransactionDetails, { isSwap: true, banner: newTradeRequiresAcceptance && (_jsx(AcceptNewQuoteRow, { acceptedDerivedSwapInfo: acceptedDerivedSwapInfo, derivedSwapInfo: derivedSwapInfo, onAcceptTrade: onAcceptTrade })), chainId: acceptedTrade.inputAmount.currency.chainId, feeOnTransferProps: feeOnTransferProps, tokenWarningProps: tokenWarningProps, tokenWarningChecked: tokenWarningChecked, setTokenWarningChecked: setTokenWarningChecked, gasFee: gasFee, swapFee: acceptedTrade.swapFee, swapFeeUsd: swapFeeUsd, indicative: acceptedTrade.indicative, outputCurrency: acceptedTrade.outputAmount.currency, showExpandedChildren: !!customSlippageTolerance, showWarning: warning && !newTradeRequiresAcceptance, transactionUSDValue: derivedSwapInfo.currencyAmountsUSDValue[CurrencyField.OUTPUT], uniswapXGasBreakdown: uniswapXGasBreakdown, warning: warning, estimatedBridgingTime: estimatedBridgingTime, isBridgeTrade: isBridgeTrade !== null && isBridgeTrade !== void 0 ? isBridgeTrade : false, txSimulationErrors: txSimulationErrors, onShowWarning: onShowWarning, children: [_jsxs(Flex, { row: true, alignItems: "center", justifyContent: "space-between", children: [_jsx(Text, { color: "$neutral2", variant: "body3", children: t('swap.details.rate') }), _jsx(Flex, { row: true, shrink: true, justifyContent: "flex-end", children: _jsx(SwapRateRatio, { trade: trade }) })] }), isBridgeTrade && _jsx(EstimatedTime, { visibleIfLong: false, timeMs: estimatedBridgingTime }), isBridgeTrade && _jsx(AcrossRoutingInfo, {}), !isBridgeTrade && (_jsx(MaxSlippageRow, { acceptedDerivedSwapInfo: acceptedDerivedSwapInfo, autoSlippageTolerance: autoSlippageTolerance, customSlippageTolerance: customSlippageTolerance })), !isBridgeTrade && v4Enabled && (_jsx(RoutingInfo, { gasFee: gasFee, chainId: acceptedTrade.inputAmount.currency.chainId })), !isBridgeTrade && v4Enabled && priceImpactPercentage ? (_jsxs(Flex, { row: true, alignItems: "center", justifyContent: "space-between", children: [_jsx(MarketPriceImpactWarning, { children: _jsx(Flex, { centered: true, row: true, gap: "$spacing4", children: _jsx(Text, { color: "$neutral2", variant: "body3", children: t('swap.priceImpact') }) }) }), _jsx(Flex, { row: true, shrink: true, justifyContent: "flex-end", children: _jsxs(Text, { adjustsFontSizeToFit: true, color: priceImpactWarningColor, variant: "body3", children: [normalizePriceImpact(priceImpactPercentage), "%"] }) })] })) : null] }) }));
}
function AcceptNewQuoteRow({ acceptedDerivedSwapInfo, derivedSwapInfo, onAcceptTrade, }) {
    var _a;
    const { t } = useTranslation();
    const { formatCurrencyAmount } = useLocalizationContext();
    const derivedCurrencyField = derivedSwapInfo.exactCurrencyField === CurrencyField.INPUT ? CurrencyField.OUTPUT : CurrencyField.INPUT;
    const derivedAmount = derivedSwapInfo.currencyAmounts[derivedCurrencyField];
    const derivedSymbol = getSymbolDisplayText((_a = derivedSwapInfo.currencies[derivedCurrencyField]) === null || _a === void 0 ? void 0 : _a.currency.symbol);
    const formattedDerivedAmount = formatCurrencyAmount({
        value: derivedAmount,
        type: NumberType.TokenTx,
    });
    const percentageDifference = calculatePercentageDifference({
        derivedSwapInfo,
        acceptedDerivedSwapInfo,
    });
    return (_jsxs(Flex, { row: true, shrink: true, alignItems: "center", borderColor: "$surface3", borderRadius: "$rounded16", borderWidth: 1, gap: "$spacing12", justifyContent: "space-between", pl: "$spacing12", pr: "$spacing8", py: "$spacing8", children: [_jsxs(Flex, { fill: true, children: [_jsx(Text, { color: "$neutral2", variant: "body3", children: derivedSwapInfo.exactCurrencyField === CurrencyField.INPUT
                            ? t('swap.details.newQuote.output')
                            : t('swap.details.newQuote.input') }), _jsx(Flex, { row: true, alignItems: "center", children: _jsxs(Text, { adjustsFontSizeToFit: true, color: "$neutral1", numberOfLines: 1, textAlign: "center", variant: "body3", children: [formattedDerivedAmount, " ", derivedSymbol, " ", _jsxs(Text, { color: "$neutral2", children: ["(", percentageDifference, "%)"] })] }) })] }), _jsx(Flex, { children: _jsx(Trace, { logPress: true, element: ElementName.AcceptNewRate, children: _jsx(TouchableArea, { backgroundColor: "$accent2", borderRadius: "$rounded12", px: "$spacing8", py: "$spacing4", onPress: onAcceptTrade, children: _jsx(Text, { color: "$accent1", variant: "buttonLabel2", children: t('common.button.accept') }) }) }) })] }));
}
// We don't need to animate the height on mobile because bottom sheet already handles the animation.
function HeightAnimatorWrapper({ children }) {
    if (isMobileApp || isMobileWeb) {
        return _jsx(_Fragment, { children: children });
    }
    else {
        return _jsx(HeightAnimator, { animation: "fast", children: children });
    }
}
function calculatePercentageDifference({ derivedSwapInfo, acceptedDerivedSwapInfo, }) {
    var _a, _b;
    const derivedCurrencyField = derivedSwapInfo.exactCurrencyField === CurrencyField.INPUT ? CurrencyField.OUTPUT : CurrencyField.INPUT;
    // It's important to convert these to fractions before doing math on them in order to preserve full precision on each step.
    const newAmount = (_a = derivedSwapInfo.currencyAmounts[derivedCurrencyField]) === null || _a === void 0 ? void 0 : _a.asFraction;
    const acceptedAmount = (_b = acceptedDerivedSwapInfo.currencyAmounts[derivedCurrencyField]) === null || _b === void 0 ? void 0 : _b.asFraction;
    if (!newAmount || !acceptedAmount) {
        return null;
    }
    const percentage = newAmount.subtract(acceptedAmount).divide(acceptedAmount).multiply(100);
    return `${percentage.greaterThan(0) ? '+' : ''}${percentage.toFixed(2)}`;
}
//# sourceMappingURL=SwapDetails.js.map