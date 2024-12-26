import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { isWeb, Text, TouchableArea, useSporeColors } from 'ui/src';
import { ChartBar } from 'ui/src/components/icons/ChartBar';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { WarningInfo } from 'uniswap/src/components/modals/WarningModal/WarningInfo';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { openUri } from 'uniswap/src/utils/linking';
export function MarketPriceImpactWarning({ children }) {
    const colors = useSporeColors();
    const { t } = useTranslation();
    const onPressLearnMore = async () => {
        await openUri(uniswapUrls.helpArticleUrls.swapFeeInfo);
    };
    const caption = t('swap.impactOfTrade');
    return (_jsx(WarningInfo, { infoButton: _jsx(TouchableArea, { onPress: onPressLearnMore, children: _jsx(Text, { color: "$accent1", variant: isWeb ? 'body4' : 'buttonLabel2', children: t('common.button.learn') }) }), modalProps: {
            hideIcon: isWeb,
            icon: _jsx(ChartBar, { color: colors.neutral1.val, size: 18 }),
            backgroundIconColor: colors.surface2.get(),
            captionComponent: (_jsx(Text, { color: "$neutral2", textAlign: isWeb ? 'left' : 'center', variant: isWeb ? 'body4' : 'body2', children: caption })),
            rejectText: t('common.button.close'),
            modalName: ModalName.NetworkFeeInfo,
            severity: WarningSeverity.None,
            title: t('swap.priceImpact'),
        }, tooltipProps: { text: caption, placement: 'top' }, children: children }));
}
//# sourceMappingURL=MarketPriceImpactWarning.js.map