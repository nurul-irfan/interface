import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Switch, Text } from 'ui/src';
import { selectAllowAnalytics } from 'wallet/src/features/telemetry/selectors';
import { setAllowAnalytics } from 'wallet/src/features/telemetry/slice';
export function AnalyticsToggleLineSwitch() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const analyticsAllowed = useSelector(selectAllowAnalytics);
    const onChangeAllowAnalytics = (enabled) => {
        dispatch(setAllowAnalytics({ enabled }));
    };
    return (_jsxs(Flex, { row: true, gap: "$spacing12", m: "$spacing24", children: [_jsxs(Flex, { shrink: true, gap: "$spacing4", children: [_jsx(Text, { variant: "body2", children: t('settings.setting.privacy.analytics.title') }), _jsx(Text, { color: "$neutral2", variant: "body3", children: t('settings.setting.privacy.analytics.description') })] }), _jsx(Switch, { checked: analyticsAllowed, variant: "branded", onCheckedChange: onChangeAllowAnalytics })] }));
}
//# sourceMappingURL=AnalyticsToggleLineSwitch.js.map