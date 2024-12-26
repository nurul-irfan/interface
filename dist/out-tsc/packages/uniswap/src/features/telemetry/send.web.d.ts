import { AppsFlyerEventProperties, UniverseEventProperties } from 'uniswap/src/features/telemetry/types';
export declare function sendAnalyticsEvent<EventName extends keyof UniverseEventProperties>(...args: undefined extends UniverseEventProperties[EventName] ? [EventName] | [EventName, UniverseEventProperties[EventName]] : [EventName, UniverseEventProperties[EventName]]): void;
export declare function sendAppsFlyerEvent<EventName extends keyof AppsFlyerEventProperties>(...args: undefined extends AppsFlyerEventProperties[EventName] ? [EventName] | [EventName, AppsFlyerEventProperties[EventName]] : [EventName, AppsFlyerEventProperties[EventName]]): Promise<void>;
//# sourceMappingURL=send.web.d.ts.map