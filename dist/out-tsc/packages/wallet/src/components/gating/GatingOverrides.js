import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Accordion, Button, Flex, Input, Separator, Switch, Text } from 'ui/src';
import { RotatableChevron } from 'ui/src/components/icons';
import { Experiments } from 'uniswap/src/features/gating/experiments';
import { WALLET_FEATURE_FLAG_NAMES, getFeatureFlagName } from 'uniswap/src/features/gating/flags';
import { useFeatureFlagWithExposureLoggingDisabled } from 'uniswap/src/features/gating/hooks';
import { Statsig, useExperiment } from 'uniswap/src/features/gating/sdk/statsig';
export function GatingOverrides() {
    const featureFlagRows = [];
    for (const [flag, flagName] of WALLET_FEATURE_FLAG_NAMES.entries()) {
        featureFlagRows.push(_jsx(FeatureFlagRow, { flag: flag }, flagName));
    }
    const experimentRows = [];
    for (const experiment of Object.values(Experiments)) {
        experimentRows.push(_jsx(ExperimentRow, { experiment: experiment }, experiment));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Text, { variant: "heading3", children: "Gating" }), _jsxs(Accordion.Item, { value: "feature-flags", children: [_jsx(AccordionHeader, { title: "\u26F3\uFE0F Feature Flags" }), _jsxs(Accordion.Content, { children: [_jsx(Button, { p: "$spacing4", theme: "tertiary", onPress: () => Statsig.removeGateOverride(), children: _jsx(Text, { variant: "body2", children: "Clear all local feature gate overrides" }) }), _jsx(Flex, { gap: "$spacing12", mt: "$spacing12", children: featureFlagRows })] })] }), _jsxs(Accordion.Item, { value: "experiments", children: [_jsx(AccordionHeader, { title: "\uD83D\uDD2C Experiments" }), _jsxs(Accordion.Content, { children: [_jsx(Button, { p: "$spacing4", theme: "tertiary", onPress: () => Statsig.removeConfigOverride(), children: _jsx(Text, { variant: "body2", children: "Clear all local experiment/config overrides" }) }), _jsx(Flex, { gap: "$spacing12", mt: "$spacing12", children: experimentRows })] })] }), _jsx(Button, { mt: "$spacing12", p: "$spacing4", theme: "tertiary", onPress: () => {
                    Statsig.removeGateOverride();
                    Statsig.removeConfigOverride();
                    Statsig.removeLayerOverride();
                }, children: _jsx(Text, { variant: "body2", children: "Clear all gating overrides" }) })] }));
}
export function AccordionHeader({ title }) {
    return (_jsx(Accordion.Header, { mt: "$spacing12", children: _jsx(Accordion.Trigger, { width: "100%", children: ({ open }) => (_jsx(_Fragment, { children: _jsxs(Flex, { row: true, justifyContent: "space-between", children: [_jsx(Text, { variant: "subheading1", children: title }), _jsx(RotatableChevron, { direction: open ? 'up' : 'down' })] }) })) }) }));
}
function FeatureFlagRow({ flag }) {
    const status = useFeatureFlagWithExposureLoggingDisabled(flag);
    const name = getFeatureFlagName(flag);
    return (_jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing16", justifyContent: "space-between", children: [_jsx(Text, { variant: "body1", children: name }), _jsx(Switch, { checked: status, variant: "branded", onCheckedChange: (newValue) => {
                    Statsig.overrideGate(name, newValue);
                } })] }));
}
function ExperimentRow({ experiment }) {
    const { config } = useExperiment(experiment);
    const paramRows = Object.entries(config.value).map(([key, value]) => {
        let valueElement;
        if (typeof value === 'boolean') {
            valueElement = (_jsx(Switch, { checked: value, variant: "branded", onCheckedChange: (newValue) => {
                    Statsig.overrideConfig(experiment, {
                        ...config.value,
                        [key]: newValue,
                    });
                } }));
        }
        else if (typeof value === 'number') {
            valueElement = (_jsx(Input, { value: value.toString(), onChangeText: (newValue) => {
                    Statsig.overrideConfig(experiment, {
                        ...config.value,
                        [key]: Number(newValue),
                    });
                } }));
        }
        else if (typeof value === 'string') {
            valueElement = (_jsx(Input, { value: value, onChangeText: (newValue) => {
                    Statsig.overrideConfig(experiment, {
                        ...config.value,
                        [key]: newValue,
                    });
                } }));
        }
        return (valueElement && (_jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing16", justifyContent: "space-between", children: [_jsx(Text, { variant: "body1", children: key }), valueElement] }, key)));
    });
    return (_jsxs(_Fragment, { children: [_jsx(Separator, {}), _jsxs(Flex, { children: [_jsx(Text, { variant: "body1", children: experiment }), _jsx(Flex, { children: _jsx(Flex, { gap: "$spacing8", paddingStart: "$spacing8", children: paramRows }, experiment) })] })] }));
}
//# sourceMappingURL=GatingOverrides.js.map