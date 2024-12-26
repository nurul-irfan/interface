import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, isWeb, Popover, Text, Tooltip, TouchableArea } from 'ui/src';
import { Settings } from 'ui/src/components/icons/Settings';
import { SettingsWarning } from 'ui/src/components/icons/SettingsWarning';
import { SLIPPAGE_CRITICAL_TOLERANCE } from 'uniswap/src/constants/transactions';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useSlippageSettings } from 'uniswap/src/features/transactions/swap/settings/useSlippageSettings';
import { getSlippageWarningColor } from 'uniswap/src/features/transactions/swap/utils/styleHelpers';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
const getSettingsIconBackgroundColor = (autoSlippageTolerance, slippageTolerance) => {
    if (!slippageTolerance) {
        return '$transparent';
    }
    if (slippageTolerance >= SLIPPAGE_CRITICAL_TOLERANCE) {
        return '$statusCritical2';
    }
    if (slippageTolerance > autoSlippageTolerance) {
        return '$statusWarning2';
    }
    return '$surface3';
};
export function SwapFormSettingsButton({ showCustomSlippage, showTooltip, customSlippageTolerance, onPress, iconColor, iconSize, }) {
    const { t } = useTranslation();
    const { formatPercent } = useLocalizationContext();
    const { autoSlippageTolerance } = useSlippageSettings();
    // Icon settings (background color, content color, and component) based on slippage tolerance
    const { backgroundColor, contentColor, IconComponent } = useMemo(() => {
        const iconBackgroundColor = getSettingsIconBackgroundColor(autoSlippageTolerance, customSlippageTolerance);
        const fillColor = getSlippageWarningColor(customSlippageTolerance !== null && customSlippageTolerance !== void 0 ? customSlippageTolerance : 0, autoSlippageTolerance, iconColor);
        const SettingsIconComponent = customSlippageTolerance && customSlippageTolerance > SLIPPAGE_CRITICAL_TOLERANCE ? SettingsWarning : Settings;
        return { backgroundColor: iconBackgroundColor, contentColor: fillColor, IconComponent: SettingsIconComponent };
    }, [customSlippageTolerance, iconColor, autoSlippageTolerance]);
    const content = (_jsx(Popover.Trigger, { children: _jsx(TouchableArea, { testID: TestID.SwapSettings, onPress: onPress, children: _jsxs(Flex, { centered: true, row: true, backgroundColor: backgroundColor, borderRadius: "$roundedFull", gap: "$spacing4", px: showCustomSlippage ? '$spacing8' : '$spacing4', py: "$spacing4", children: [showCustomSlippage && (_jsx(Text, { color: contentColor, variant: "buttonLabel3", children: formatPercent(customSlippageTolerance) })), _jsx(IconComponent, { color: contentColor, size: iconSize !== null && iconSize !== void 0 ? iconSize : (isWeb ? 20 : 24) })] }) }) }));
    if (showTooltip) {
        return (_jsxs(Tooltip, { children: [_jsx(Tooltip.Trigger, { children: content }), _jsx(Tooltip.Content, { children: _jsx(Text, { variant: "body4", children: t('swap.settings.slippage.warning.hover') }) })] }));
    }
    return content;
}
//# sourceMappingURL=SwapFormSettingsButton.js.map