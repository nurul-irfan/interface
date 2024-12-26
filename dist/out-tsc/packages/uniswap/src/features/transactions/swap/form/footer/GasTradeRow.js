import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, Flex, Text } from 'ui/src';
import { AlertTriangleFilled } from 'ui/src/components/icons/AlertTriangleFilled';
import { Gas } from 'ui/src/components/icons/Gas';
import { RotatableChevron } from 'ui/src/components/icons/RotatableChevron';
import { iconSizes } from 'ui/src/theme';
import { UniswapXFee } from 'uniswap/src/components/gas/NetworkFee';
import { WarningInfo } from 'uniswap/src/components/modals/WarningModal/WarningInfo';
import { getAlertColor } from 'uniswap/src/components/modals/WarningModal/getAlertColor';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { useFormattedUniswapXGasFeeInfo, useGasFeeFormattedDisplayAmounts, useGasFeeHighRelativeToValue, } from 'uniswap/src/features/gas/hooks';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { useSwapTxContext } from 'uniswap/src/features/transactions/swap/contexts/SwapTxContext';
import { NetworkFeeWarning } from 'uniswap/src/features/transactions/swap/modals/NetworkFeeWarning';
import { SwapRateRatio } from 'uniswap/src/features/transactions/swap/review/SwapRateRatio';
import { isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { CurrencyField } from 'uniswap/src/types/currency';
import { isInterface, isMobileApp } from 'utilities/src/platform';
import { usePrevious } from 'utilities/src/react/hooks';
export function useDebouncedGasInfo() {
    const { derivedSwapInfo: { chainId, currencyAmountsUSDValue, trade, currencyAmounts, exactCurrencyField }, } = useSwapFormContext();
    const inputUSDValue = currencyAmountsUSDValue[CurrencyField.INPUT];
    const outputUSDValue = currencyAmountsUSDValue[CurrencyField.OUTPUT];
    const swapTxContext = useSwapTxContext();
    const { gasFee } = swapTxContext;
    const uniswapXGasFeeInfo = useFormattedUniswapXGasFeeInfo(isUniswapX(swapTxContext) ? swapTxContext.gasFeeBreakdown : undefined, chainId);
    const { gasFeeFormatted, gasFeeUSD } = useGasFeeFormattedDisplayAmounts({
        gasFee,
        chainId,
        placeholder: undefined,
    });
    const isHighRelativeToValue = useGasFeeHighRelativeToValue(gasFeeUSD, outputUSDValue !== null && outputUSDValue !== void 0 ? outputUSDValue : inputUSDValue);
    const amountChanged = usePrevious(currencyAmounts[exactCurrencyField]) !== currencyAmounts[exactCurrencyField];
    const tradeChanged = usePrevious(trade.trade) !== trade.trade && Boolean(trade.trade);
    const tradeLoadingOrRefetching = Boolean(trade.isLoading || trade.isFetching);
    const gasLoading = Boolean(gasFee.isLoading || (gasFee.value && !gasFeeUSD));
    const isLoading = tradeLoadingOrRefetching || gasLoading || amountChanged || tradeChanged;
    const [info, setInfo] = useState({ gasFee, isHighRelativeToValue, uniswapXGasFeeInfo, isLoading });
    useEffect(() => {
        if (isLoading) {
            setInfo((prev) => ({ ...prev, isLoading }));
        }
        else {
            setInfo({
                gasFee,
                fiatPriceFormatted: gasFeeFormatted !== null && gasFeeFormatted !== void 0 ? gasFeeFormatted : undefined,
                isHighRelativeToValue,
                uniswapXGasFeeInfo,
                isLoading,
            });
        }
    }, [gasFee, gasFeeFormatted, isHighRelativeToValue, isLoading, uniswapXGasFeeInfo]);
    return info;
}
function useDebouncedTrade() {
    const { derivedSwapInfo: { trade }, } = useSwapFormContext();
    const [debouncedTrade, setDebouncedTrade] = useState();
    useEffect(() => {
        if (trade.trade) {
            setDebouncedTrade(trade.trade);
        }
        else if (trade.indicativeTrade) {
            setDebouncedTrade(trade.indicativeTrade);
        }
        else if (!trade.isLoading) {
            setDebouncedTrade(undefined);
        }
    }, [trade.indicativeTrade, trade.isLoading, trade.trade]);
    return debouncedTrade;
}
function GasRow({ gasInfo, hidden }) {
    var _a;
    if (gasInfo.fiatPriceFormatted) {
        const color = gasInfo.isHighRelativeToValue && !isInterface ? '$statusCritical' : '$neutral2'; // Avoid high gas UI on interface
        const uniswapXSavings = (_a = gasInfo.uniswapXGasFeeInfo) === null || _a === void 0 ? void 0 : _a.preSavingsGasFeeFormatted;
        const body = uniswapXSavings ? (_jsx(UniswapXFee, { gasFee: gasInfo.fiatPriceFormatted, preSavingsGasFee: uniswapXSavings })) : (_jsxs(_Fragment, { children: [_jsx(Gas, { color: color, size: "$icon.16" }), _jsx(Text, { color: color, variant: "body3", children: gasInfo.fiatPriceFormatted })] }));
        return (_jsx(Flex, { centered: true, row: true, animation: "quick", enterStyle: { opacity: 0 }, opacity: hidden ? 0 : gasInfo.isLoading ? 0.6 : 1, children: _jsx(NetworkFeeWarning, { gasFeeHighRelativeToValue: gasInfo.isHighRelativeToValue, placement: isInterface ? 'right' : 'bottom', tooltipTrigger: _jsx(Flex, { centered: true, row: true, gap: "$spacing4", children: body }), uniswapXGasFeeInfo: gasInfo.uniswapXGasFeeInfo }) }));
    }
    else {
        return null;
    }
}
// GasTradeRow take `gasInfo` as a prop (rather than directly using useDebouncedGasInfo) because on mobile,
// the parent needs to check whether to render an empty row based on `gasInfo` fields first.
export function GasTradeRow({ gasInfo, warning, }) {
    // Debounce the trade to prevent flickering on input
    const debouncedTrade = useDebouncedTrade();
    const warningColor = getAlertColor(warning === null || warning === void 0 ? void 0 : warning.severity);
    const { isTestnetModeEnabled } = useEnabledChains();
    if (isTestnetModeEnabled) {
        return null;
    }
    if (isMobileApp) {
        return _jsx(GasRow, { gasInfo: gasInfo });
    }
    return (_jsxs(Flex, { centered: true, row: true, children: [_jsxs(Flex, { fill: true, children: [debouncedTrade && !warning && (_jsx(SwapRateRatio, { initialInverse: true, styling: "secondary", trade: debouncedTrade })), warning && (_jsx(TradeWarning, { warning: warning, children: _jsxs(Flex, { row: true, centered: true, gap: "$gap8", children: [_jsx(AlertTriangleFilled, { color: warningColor.text, size: "$icon.20" }), _jsx(Text, { color: warningColor.text, variant: "body3", children: warning.title })] }) }))] }), debouncedTrade ? (_jsx(Accordion.Trigger, { p: "$none", style: { background: '$surface1' }, focusStyle: { background: '$surface1' }, hoverStyle: { background: '$surface1' }, children: ({ open }) => (_jsxs(Flex, { row: true, gap: "$spacing4", alignItems: "center", children: [_jsx(GasRow, { gasInfo: gasInfo, hidden: open }), _jsx(RotatableChevron, { animation: "fast", width: iconSizes.icon16, height: iconSizes.icon16, direction: open ? 'up' : 'down', color: "$neutral3" })] })) })) : (_jsx(GasRow, { gasInfo: gasInfo }))] }));
}
export function TradeWarning({ children, warning }) {
    var _a;
    const { t } = useTranslation();
    const caption = warning.message;
    return (_jsx(Flex, { animation: "quick", enterStyle: { opacity: 0 }, children: _jsx(WarningInfo, { modalProps: {
                caption,
                rejectText: t('common.button.close'),
                modalName: ModalName.SwapWarning,
                severity: warning.severity,
                title: (_a = warning.title) !== null && _a !== void 0 ? _a : '',
                icon: _jsx(AlertTriangleFilled, { color: "$statusCritical", size: "$icon.16" }),
            }, tooltipProps: { text: caption !== null && caption !== void 0 ? caption : '', placement: 'bottom' }, trigger: children }) }));
}
//# sourceMappingURL=GasTradeRow.js.map