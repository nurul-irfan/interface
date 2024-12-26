import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Trans, useTranslation } from 'react-i18next';
import { Flex, Separator, Text, UniswapXText, isWeb, useSporeColors } from 'ui/src';
import { AlertTriangleFilled } from 'ui/src/components/icons/AlertTriangleFilled';
import { Gas } from 'ui/src/components/icons/Gas';
import { NATIVE_LINE_HEIGHT_SCALE, fonts } from 'ui/src/theme';
import { UniswapXFee } from 'uniswap/src/components/gas/NetworkFee';
import { WarningInfo } from 'uniswap/src/components/modals/WarningModal/WarningInfo';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { LearnMoreLink } from 'uniswap/src/components/text/LearnMoreLink';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { isInterface, isMobileApp } from 'utilities/src/platform';
export function NetworkFeeWarning({ gasFeeHighRelativeToValue, children, tooltipTrigger, placement = 'top', uniswapXGasFeeInfo, }) {
    const colors = useSporeColors();
    const { t } = useTranslation();
    const showHighGasFeeUI = gasFeeHighRelativeToValue && !uniswapXGasFeeInfo && !isInterface; // Avoid high gas UI on interface
    return (_jsx(WarningInfo, { infoButton: uniswapXGasFeeInfo ? (_jsx(UniswapXFeeContent, { uniswapXGasFeeInfo: uniswapXGasFeeInfo })) : (_jsx(LearnMoreLink, { textVariant: isWeb ? 'body4' : undefined, url: uniswapUrls.helpArticleUrls.networkFeeInfo })), modalProps: {
            backgroundIconColor: showHighGasFeeUI ? colors.statusCritical2.get() : colors.surface2.get(),
            captionComponent: (_jsx(NetworkFeeText, { showHighGasFeeUI: showHighGasFeeUI, uniswapXGasFeeInfo: uniswapXGasFeeInfo })),
            rejectText: t('common.button.close'),
            icon: showHighGasFeeUI ? (_jsx(AlertTriangleFilled, { color: "$statusCritical", size: "$icon.24" })) : (_jsx(Gas, { color: "$neutral2", size: "$icon.24" })),
            modalName: ModalName.NetworkFeeInfo,
            severity: WarningSeverity.None,
            title: showHighGasFeeUI ? t('transaction.networkCost.veryHigh.label') : t('transaction.networkCost.label'),
        }, tooltipProps: {
            text: _jsx(NetworkFeeText, { showHighGasFeeUI: showHighGasFeeUI, uniswapXGasFeeInfo: uniswapXGasFeeInfo }),
            placement,
            icon: null,
        }, trigger: tooltipTrigger, children: children }));
}
function NetworkFeeText({ showHighGasFeeUI, uniswapXGasFeeInfo, }) {
    const { t } = useTranslation();
    const variant = isWeb ? 'body4' : 'body2';
    // we need to remove `NATIVE_LINE_HEIGHT_SCALE` if we switch to a button label font
    const lineHeight = fonts[variant].lineHeight / (isWeb ? 1 : NATIVE_LINE_HEIGHT_SCALE);
    if (uniswapXGasFeeInfo) {
        return (_jsx(Text, { color: "$neutral2", textAlign: "center", variant: variant, children: _jsx(Trans
            // TODO(WEB-4313): Remove need to manually adjust the height of the UniswapXText component for mobile.
            // TODO(WALL-5311): Investigate Trans component vertical alignment on android
            , { 
                // TODO(WEB-4313): Remove need to manually adjust the height of the UniswapXText component for mobile.
                // TODO(WALL-5311): Investigate Trans component vertical alignment on android
                components: {
                    gradient: _jsx(UniswapXText, { height: lineHeight, variant: variant }),
                }, i18nKey: "swap.warning.networkFee.message.uniswapX" }) }));
    }
    return (_jsx(Text, { color: "$neutral2", textAlign: "center", variant: variant, children: showHighGasFeeUI ? t('swap.warning.networkFee.highRelativeToValue') : t('swap.warning.networkFee.message') }));
}
function UniswapXFeeContent({ uniswapXGasFeeInfo }) {
    const { approvalFeeFormatted, wrapFeeFormatted, swapFeeFormatted, inputTokenSymbol } = uniswapXGasFeeInfo;
    const { t } = useTranslation();
    return (_jsxs(Flex, { gap: "$spacing12", children: [_jsx(Flex, { row: true, centered: isMobileApp, width: "100%", children: _jsx(LearnMoreLink, { textVariant: isWeb ? 'body4' : undefined, url: uniswapUrls.helpArticleUrls.uniswapXInfo }) }), _jsx(Separator, {}), wrapFeeFormatted && (_jsxs(Flex, { row: true, justifyContent: "space-between", width: "100%", children: [_jsx(Text, { color: "$neutral2", variant: "body4", children: t('swap.warning.networkFee.wrap') }), _jsx(Text, { variant: "body4", children: wrapFeeFormatted })] })), approvalFeeFormatted && (_jsxs(Flex, { row: true, justifyContent: "space-between", width: "100%", children: [_jsx(Text, { color: "$neutral2", variant: "body4", children: t('swap.warning.networkFee.allow', { inputTokenSymbol }) }), _jsx(Text, { variant: "body4", children: approvalFeeFormatted })] })), _jsxs(Flex, { row: true, justifyContent: "space-between", width: "100%", children: [_jsx(Text, { color: "$neutral2", variant: "body4", children: t('common.button.swap') }), _jsx(UniswapXFee, { gasFee: swapFeeFormatted })] })] }));
}
//# sourceMappingURL=NetworkFeeWarning.js.map