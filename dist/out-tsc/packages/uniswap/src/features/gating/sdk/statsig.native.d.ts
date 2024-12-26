/// <reference types="react" />
import { Statsig } from 'statsig-react-native';
declare const statsig: typeof Statsig;
declare const statsigContext: import("react").Context<import("statsig-react/dist/StatsigContext").TStatsigContext>;
export { DynamicConfig, StatsigOptions, StatsigOverrides, StatsigProvider, StatsigUser, useConfig, useExperiment, useExperimentWithExposureLoggingDisabled, useGate, useGateWithExposureLoggingDisabled, } from 'statsig-react-native';
export { statsig as Statsig, statsigContext as StatsigContext };
//# sourceMappingURL=statsig.native.d.ts.map