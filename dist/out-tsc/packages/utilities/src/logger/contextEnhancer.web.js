import { addSentryContextBreadcrumb } from 'utilities/src/logger/breadcrumbs';
export function logContextUpdate(contextName, newState, _isDatadogEnabled) {
    if (__DEV__) {
        return;
    }
    addSentryContextBreadcrumb(contextName, newState);
}
//# sourceMappingURL=contextEnhancer.web.js.map