import { getFeatureFlagName } from 'uniswap/src/features/gating/flags';
import { Statsig, useConfig, useExperiment, useExperimentWithExposureLoggingDisabled, useGate, useGateWithExposureLoggingDisabled, } from 'uniswap/src/features/gating/sdk/statsig';
export function useFeatureFlag(flag) {
    const name = getFeatureFlagName(flag);
    const { value } = useGate(name);
    return value;
}
export function useFeatureFlagWithLoading(flag) {
    const name = getFeatureFlagName(flag);
    const { value, isLoading } = useGate(name);
    return { value, isLoading };
}
export function getFeatureFlag(flag) {
    const name = getFeatureFlagName(flag);
    return Statsig.checkGate(name);
}
export function useFeatureFlagWithExposureLoggingDisabled(flag) {
    const name = getFeatureFlagName(flag);
    const { value } = useGateWithExposureLoggingDisabled(name);
    return value;
}
export function getFeatureFlagWithExposureLoggingDisabled(flag) {
    const name = getFeatureFlagName(flag);
    return Statsig.checkGateWithExposureLoggingDisabled(name);
}
export function useExperimentGroupName(experiment) {
    const statsigExperiment = useExperiment(experiment).config;
    return statsigExperiment.getGroupName();
}
export function useExperimentGroupNameWithLoading(experiment) {
    const statsigExperiment = useExperiment(experiment);
    return { value: statsigExperiment.config.getGroupName(), isLoading: statsigExperiment.isLoading };
}
function getValueFromConfig(config, param, defaultValue, customTypeGuard) {
    return config.get(param, defaultValue, (value) => {
        if (customTypeGuard) {
            return customTypeGuard(value);
        }
        else {
            return typeof value === typeof defaultValue;
        }
    });
}
export function useExperimentValue(experiment, param, defaultValue, customTypeGuard) {
    const statsigExperiment = useExperiment(experiment).config;
    return getValueFromConfig(statsigExperiment, param, defaultValue, customTypeGuard);
}
export function getExperimentValue(experiment, param, defaultValue, customTypeGuard) {
    const statsigExperiment = Statsig.getExperiment(experiment);
    return getValueFromConfig(statsigExperiment, param, defaultValue, customTypeGuard);
}
export function useExperimentValueWithExposureLoggingDisabled(experiment, param, defaultValue, customTypeGuard) {
    const statsigExperiment = useExperimentWithExposureLoggingDisabled(experiment).config;
    return getValueFromConfig(statsigExperiment, param, defaultValue, customTypeGuard);
}
export function getExperimentValueWithExposureLoggingDisabled(experiment, param, defaultValue, customTypeGuard) {
    const statsigExperiment = Statsig.getExperimentWithExposureLoggingDisabled(experiment);
    return getValueFromConfig(statsigExperiment, param, defaultValue, customTypeGuard);
}
export function useDynamicConfigValue(config, key, defaultValue, customTypeGuard) {
    const { config: dynamicConfig } = useConfig(config);
    return getValueFromConfig(dynamicConfig, key, defaultValue, customTypeGuard);
}
export function getDynamicConfigValue(config, key, defaultValue, customTypeGuard) {
    const dynamicConfig = Statsig.getConfig(config);
    return getValueFromConfig(dynamicConfig, key, defaultValue, customTypeGuard);
}
//# sourceMappingURL=hooks.js.map