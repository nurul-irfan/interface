import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { t } from 'i18next';
import { useMemo } from 'react';
import { Trans } from 'react-i18next';
import { Flex, Text, TouchableArea, UniswapXText, isWeb, useSporeColors } from 'ui/src';
import { OrderRouting } from 'ui/src/components/icons/OrderRouting';
import { RouterLabel } from 'uniswap/src/components/RouterLabel/RouterLabel';
import RoutingDiagram from 'uniswap/src/components/RoutingDiagram/RoutingDiagram';
import { WarningInfo } from 'uniswap/src/components/modals/WarningModal/WarningInfo';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { useUSDValueOfGasFee } from 'uniswap/src/features/gas/hooks';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { useSwapTxContext } from 'uniswap/src/features/transactions/swap/contexts/SwapTxContext';
import { isClassic, isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import getRoutingDiagramEntries from 'uniswap/src/utils/getRoutingDiagramEntries';
import { openUri } from 'uniswap/src/utils/linking';
import { NumberType } from 'utilities/src/format/types';
export function RoutingInfo({ chainId, gasFee, }) {
    var _a;
    const colors = useSporeColors();
    const { trade } = useSwapTxContext();
    const { convertFiatAmountFormatted } = useLocalizationContext();
    const { value: gasFeeUSD } = useUSDValueOfGasFee(chainId, (_a = gasFee.displayValue) !== null && _a !== void 0 ? _a : undefined);
    const gasFeeFormatted = gasFeeUSD !== undefined ? convertFiatAmountFormatted(gasFeeUSD, NumberType.FiatGasPrice) : undefined;
    const routes = useMemo(() => (trade && isClassic(trade) ? getRoutingDiagramEntries(trade) : []), [trade]);
    const v4Enabled = useFeatureFlag(FeatureFlags.V4Swap);
    const isMaybeV4 = trade && v4Enabled && isClassic(trade);
    const caption = useMemo(() => {
        if (!trade) {
            return null;
        }
        const textVariant = isWeb ? 'body4' : 'body2';
        const textAlign = isWeb ? 'left' : 'center';
        if (isUniswapX(trade)) {
            return (_jsx(Text, { variant: textVariant, textAlign: textAlign, color: "$neutral2", children: _jsx(Trans, { i18nKey: "uniswapX.aggregatesLiquidity", components: {
                        logo: (_jsx(_Fragment, { children: _jsx(UniswapXText, { variant: textVariant, children: "Uniswap X" }) })),
                    } }) }));
        }
        const bestRouteText = gasFeeFormatted
            ? t('swap.bestRoute.cost', {
                gasPrice: gasFeeFormatted,
            })
            : undefined;
        const bestRouteTextV4 = gasFeeFormatted
            ? t('swap.bestRoute.cost.v4', {
                gasPrice: gasFeeFormatted,
            })
            : undefined;
        if (isClassic(trade)) {
            return (_jsxs(Flex, { gap: "$spacing12", children: [isWeb && (_jsx(RoutingDiagram, { routes: routes, currencyIn: trade.inputAmount.currency, currencyOut: trade.outputAmount.currency })), _jsxs(Text, { variant: textVariant, textAlign: textAlign, color: "$neutral2", children: [isMaybeV4 ? bestRouteTextV4 : bestRouteText, t('swap.route.optimizedGasCost')] })] }));
        }
        return null;
    }, [trade, routes, gasFeeFormatted, isMaybeV4]);
    const InfoButton = useMemo(() => {
        if (!trade) {
            return null;
        }
        if (!isMaybeV4 && !isUniswapX(trade)) {
            return null;
        }
        const helpCenterUrl = isUniswapX(trade)
            ? uniswapUrls.helpArticleUrls.uniswapXInfo
            : uniswapUrls.helpArticleUrls.v4RoutingInfo;
        return (_jsx(TouchableArea, { onPress: async () => {
                await openUri(helpCenterUrl);
            }, children: _jsx(Text, { color: "$accent1", variant: isWeb ? 'body4' : 'buttonLabel2', children: t('common.button.learn') }) }));
    }, [trade, isMaybeV4]);
    return (_jsxs(Flex, { row: true, alignItems: "center", justifyContent: "space-between", children: [_jsx(WarningInfo, { infoButton: InfoButton, modalProps: {
                    modalName: ModalName.SwapReview,
                    captionComponent: caption,
                    rejectText: t('common.button.close'),
                    icon: _jsx(OrderRouting, { color: colors.neutral1.val, size: 24 }),
                    severity: WarningSeverity.None,
                    title: t('swap.tradeRoutes'),
                }, tooltipProps: { text: caption, placement: 'top', maxWidth: trade && isClassic(trade) ? 400 : undefined }, children: _jsx(Flex, { centered: true, row: true, gap: "$spacing4", children: _jsx(Text, { color: "$neutral2", variant: "body3", children: t('swap.orderRouting') }) }) }), _jsx(Flex, { row: true, shrink: true, justifyContent: "flex-end", children: _jsx(Text, { adjustsFontSizeToFit: true, color: "$neutral1", variant: "body3", children: _jsx(RouterLabel, {}) }) })] }));
}
//# sourceMappingURL=RoutingInfo.js.map