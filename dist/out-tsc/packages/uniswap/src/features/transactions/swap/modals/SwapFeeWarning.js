import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Text, TouchableArea, isWeb, useSporeColors } from 'ui/src';
import { AlertCircleFilled } from 'ui/src/components/icons/AlertCircleFilled';
import { iconSizes } from 'ui/src/theme';
import { WarningInfo } from 'uniswap/src/components/modals/WarningModal/WarningInfo';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { openUri } from 'uniswap/src/utils/linking';
export function SwapFeeWarning({ noFee, children }) {
    const colors = useSporeColors();
    const { t } = useTranslation();
    const onPressLearnMore = async () => {
        await openUri(uniswapUrls.helpArticleUrls.swapFeeInfo);
    };
    const caption = noFee ? t('swap.warning.uniswapFee.message.default') : t('swap.warning.uniswapFee.message.included');
    return (_jsx(WarningInfo, { infoButton: _jsx(TouchableArea, { onPress: onPressLearnMore, children: _jsx(Text, { color: "$accent1", variant: isWeb ? 'body4' : 'buttonLabel2', children: t('common.button.learn') }) }), modalProps: {
            icon: _jsx(AlertCircleFilled, { color: "$neutral1", size: iconSizes.icon20 }),
            backgroundIconColor: colors.surface2.get(),
            captionComponent: (_jsx(Text, { color: "$neutral2", textAlign: isWeb ? 'left' : 'center', variant: isWeb ? 'body4' : 'body2', children: caption })),
            rejectText: t('common.button.close'),
            modalName: ModalName.NetworkFeeInfo,
            severity: WarningSeverity.None,
            title: t('swap.warning.uniswapFee.title'),
        }, tooltipProps: { text: caption, placement: 'top' }, children: children }));
}
//# sourceMappingURL=SwapFeeWarning.js.map