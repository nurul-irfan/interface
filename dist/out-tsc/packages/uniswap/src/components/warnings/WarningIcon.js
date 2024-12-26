import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from 'ui/src';
import { getWarningIcon, getWarningIconColors, safetyLevelToWarningSeverity, } from 'uniswap/src/components/warnings/utils';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
export default function WarningIcon({ safetyLevel, severity, strokeColorOverride, heroIcon, ...rest }) {
    const tokenProtectionEnabled = useFeatureFlag(FeatureFlags.TokenProtection);
    const severityToUse = severity !== null && severity !== void 0 ? severity : safetyLevelToWarningSeverity(safetyLevel);
    const { color: defaultIconColor, backgroundColor } = getWarningIconColors(severityToUse);
    const color = strokeColorOverride !== null && strokeColorOverride !== void 0 ? strokeColorOverride : defaultIconColor;
    const Icon = getWarningIcon(severityToUse, tokenProtectionEnabled);
    const icon = Icon ? _jsx(Icon, { color: color, ...rest }) : null;
    return heroIcon ? (_jsx(Flex, { borderRadius: "$rounded12", p: "$spacing12", backgroundColor: backgroundColor, children: icon })) : (icon);
}
//# sourceMappingURL=WarningIcon.js.map