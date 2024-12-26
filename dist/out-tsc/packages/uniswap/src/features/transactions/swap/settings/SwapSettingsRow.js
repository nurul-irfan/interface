import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from 'react';
import { Flex, Text, TouchableArea } from 'ui/src';
import { InfoCircleFilled } from 'ui/src/components/icons/InfoCircleFilled';
import { RotatableChevron } from 'ui/src/components/icons/RotatableChevron';
import { iconSizes } from 'ui/src/theme';
import { InfoTooltip } from 'uniswap/src/components/tooltip/InfoTooltip';
import { WarningMessage } from 'uniswap/src/components/WarningMessage/WarningMessage';
import { SLIPPAGE_CRITICAL_TOLERANCE } from 'uniswap/src/constants/transactions';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { useSlippageSettings } from 'uniswap/src/features/transactions/swap/settings/useSlippageSettings';
import { useTranslation } from 'uniswap/src/i18n';
import { isMobileWeb, isWeb } from 'utilities/src/platform';
export function SwapSettingRow({ setting, setSelectedSetting, customSlippageTolerance, }) {
    const { renderTitle, renderTooltip, Control, Description, Screen, InfoModal, featureFlag } = setting;
    const { autoSlippageTolerance } = useSlippageSettings();
    const { t } = useTranslation();
    const isCriticalSlippage = customSlippageTolerance && customSlippageTolerance >= SLIPPAGE_CRITICAL_TOLERANCE;
    const [showInfoModal, setShowInfoModal] = useState(false);
    const showSlippageWarning = useMemo(() => !!customSlippageTolerance && customSlippageTolerance > autoSlippageTolerance && setting.settingId === 'slippage', [autoSlippageTolerance, customSlippageTolerance, setting.settingId]);
    const onPressControl = useCallback(() => {
        // If the setting has a screen, navigate to it, else inline control will handle the interaction.
        if (Screen) {
            setSelectedSetting(setting);
        }
    }, [Screen, setting, setSelectedSetting]);
    const row = (_jsx(_Fragment, { children: _jsxs(Flex, { children: [_jsxs(Flex, { centered: true, row: true, columnGap: "$spacing16", justifyContent: "space-between", children: [_jsx(TouchableArea, { onPress: () => setShowInfoModal(true), children: _jsxs(Flex, { gap: "$spacing4", justifyContent: "center", minHeight: 48, children: [_jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing4", children: [_jsx(Text, { color: "$neutral1", variant: "subheading2", children: renderTitle(t) }), InfoModal && _jsx(InfoCircleFilled, { color: "$neutral3", size: iconSizes.icon16 }), !!renderTooltip && (_jsx(InfoTooltip, { trigger: _jsx(TouchableArea, { children: _jsx(InfoCircleFilled, { color: "$neutral3", size: iconSizes.icon16 }) }), text: renderTooltip(t) }))] }), Description && (_jsx(Text, { color: "$neutral2", variant: "body3", children: _jsx(Description, {}) })), showSlippageWarning && (_jsx(WarningMessage, { warningMessage: isCriticalSlippage ? t('swap.settings.slippage.warning') : t('swap.settings.slippage.alert'), tooltipText: isWeb && !isMobileWeb ? t('swap.settings.slippage.warning.hover') : undefined, color: isCriticalSlippage ? '$statusCritical' : '$statusWarning' }))] }) }), _jsx(TouchableArea, { flexShrink: 1, onPress: onPressControl, children: _jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing4", justifyContent: "flex-end", children: [_jsx(Control, {}), Screen && _jsx(RotatableChevron, { color: "$neutral3", direction: "right", height: iconSizes.icon24 })] }) })] }), InfoModal && _jsx(InfoModal, { isOpen: showInfoModal, onClose: () => setShowInfoModal(false) })] }) }));
    // Conditional wrapper logic is needed to follow rules of hooks due to optional feature flag
    if (featureFlag) {
        return _jsx(GateWrapper, { featureFlag: featureFlag, children: row });
    }
    else {
        return row;
    }
}
function GateWrapper({ featureFlag, children }) {
    const enabled = useFeatureFlag(featureFlag);
    if (!enabled) {
        return null;
    }
    return _jsx(_Fragment, { children: children });
}
//# sourceMappingURL=SwapSettingsRow.js.map