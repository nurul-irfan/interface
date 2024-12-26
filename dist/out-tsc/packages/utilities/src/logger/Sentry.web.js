import * as SentryReact from '@sentry/react';
/**
 * Logs an exception to our Sentry Dashboard
 *
 * @param error A custom error message
 * @param context Context from where this method is called
 */
export function captureException(error, captureContext) {
    SentryReact.captureException(error, captureContext);
}
/**
 * Sends a message to our Sentry Dashboard
 *
 * @param level Sentry severity level
 * @param context Context from where this method is called
 * @param message Message
 * @param extraArgs Key/value pairs to enrich logging and allow filtering.
 *                  More info here: https://docs.sentry.io/platforms/react-native/enriching-events/context/
 */
export function captureMessage(level, context, message, ...extraArgs) {
    SentryReact.captureMessage(message, {
        level,
        tags: { webContext: context },
        ...(extraArgs ? { extra: { data: extraArgs } } : {}),
    });
}
function addBreadCrumb(breadCrumb) {
    SentryReact.addBreadcrumb(breadCrumb);
}
function setTag(key, value) {
    SentryReact.setTag(key, value);
}
export const Sentry = {
    captureException,
    captureMessage,
    addBreadCrumb,
    setTag,
};
//# sourceMappingURL=Sentry.web.js.map