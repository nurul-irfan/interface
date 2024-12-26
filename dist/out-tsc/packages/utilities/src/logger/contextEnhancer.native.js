import { DdRum, RumActionType } from '@datadog/mobile-react-native';
export function logContextUpdate(contextName, newState, _isDatadogEnabled) {
    if (__DEV__) {
        return;
    }
    DdRum.addAction(RumActionType.CUSTOM, `${contextName} Update`, {
        newState,
    }).catch(() => undefined);
}
//# sourceMappingURL=contextEnhancer.native.js.map