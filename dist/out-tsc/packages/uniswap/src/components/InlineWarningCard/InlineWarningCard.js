import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SharedEventName } from '@uniswap/analytics-events';
import { useState } from 'react';
import { Flex, InlineCard, LabeledCheckbox, Text } from 'ui/src';
import { InfoCircleFilled } from 'ui/src/components/icons/InfoCircleFilled';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { getWarningIcon, getWarningIconColors } from 'uniswap/src/components/warnings/utils';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { ElementName } from 'uniswap/src/features/telemetry/constants/trace';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { useTrace } from 'utilities/src/telemetry/trace/TraceContext';
export function InlineWarningCard({ severity, heading, description, checkboxLabel, heroIcon, onPressCtaButton, checked, setChecked, hideCtaIcon, headingTestId, descriptionTestId, analyticsProperties, }) {
    const tokenProtectionEnabled = useFeatureFlag(FeatureFlags.TokenProtection);
    const [checkedFallback, setCheckedFallback] = useState(false);
    const { color, textColor, backgroundColor } = getWarningIconColors(severity);
    const WarningIcon = getWarningIcon(severity, tokenProtectionEnabled);
    const shouldShowCtaIcon = !hideCtaIcon && severity !== WarningSeverity.Low && severity !== WarningSeverity.None;
    const trace = useTrace();
    const onCheckPressed = (isChecked) => {
        if (setChecked) {
            setChecked(!isChecked);
        }
        else {
            setCheckedFallback(!isChecked);
        }
        sendAnalyticsEvent(SharedEventName.ELEMENT_CLICKED, {
            ...trace,
            ...analyticsProperties,
            checked: !isChecked,
            element: ElementName.InlineWarningCardCheckbox,
        });
    };
    if (severity === WarningSeverity.None || !WarningIcon) {
        // !WarningIcon for typecheck; should only be null if WarningSeverity == None
        return null;
    }
    const checkboxElement = checkboxLabel ? (_jsx(LabeledCheckbox, { checked: checked !== null && checked !== void 0 ? checked : checkedFallback, gap: "$spacing8", px: "$none", size: "$icon.16", text: _jsx(Text, { color: "$neutral2", variant: "buttonLabel3", children: checkboxLabel }), onCheckPressed: onCheckPressed })) : null;
    return (_jsx(InlineCard, { CtaButtonIcon: shouldShowCtaIcon ? InfoCircleFilled : undefined, Icon: WarningIcon, color: textColor, description: _jsxs(Flex, { gap: "$spacing8", children: [_jsx(Text, { color: "$neutral2", variant: "body3", testID: descriptionTestId, children: description }), checkboxElement] }), heading: heading && (_jsx(Text, { color: textColor, variant: "body3", testID: headingTestId, children: heading })), iconBackgroundColor: heroIcon ? backgroundColor : undefined, iconColor: color, onPressCtaButton: onPressCtaButton }));
}
//# sourceMappingURL=InlineWarningCard.js.map