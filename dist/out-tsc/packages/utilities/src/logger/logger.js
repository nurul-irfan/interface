import { datadogEnabled, localDevDatadogEnabled } from 'utilities/src/environment/constants';
import { logErrorToDatadog, logToDatadog, logWarningToDatadog } from 'utilities/src/logger/Datadog';
import { Sentry } from 'utilities/src/logger/Sentry';
import { isInterface, isMobileApp, isWeb } from 'utilities/src/platform';
const SENTRY_CHAR_LIMIT = 8192;
let walletDatadogEnabled = false;
/**
 * Logs a message to console. Additionally sends log to Sentry and Datadog if using 'error', 'warn', or 'info'.
 * Use `logger.debug` for development only logs.
 *
 * ex. `logger.warn('myFile', 'myFunc', 'Some warning', myArray)`
 *
 * @param fileName Name of file where logging from
 * @param functionName Name of function where logging from
 * @param message Message to log
 * @param args Additional values to log
 */
export const logger = {
    debug: (fileName, functionName, message, ...args) => logMessage('debug', fileName, functionName, message, ...args),
    info: (fileName, functionName, message, ...args) => logMessage('info', fileName, functionName, message, ...args),
    warn: (fileName, functionName, message, ...args) => logMessage('warn', fileName, functionName, message, ...args),
    error: (error, captureContext) => logException(error, captureContext),
    setWalletDatadogEnabled: (enabled) => {
        walletDatadogEnabled = enabled || localDevDatadogEnabled;
    },
};
function logMessage(level, fileName, functionName, message, ...args // arbitrary extra data - ideally formatted as key value pairs
) {
    // Log to console directly for dev builds or interface for debugging
    if (__DEV__ || isInterface) {
        if (isMobileApp && ['log', 'debug', 'warn'].includes(level)) {
            // `log`, `debug`, and `warn` are all logged with `console.log` on mobile
            // because `console.debug` and `console.warn` only support one single argument in Reactotron.
            // Alternatively, we could improve this in the future by removing the Reactotron log plugin and instead
            // manually call `Reactotron.display(...)` here with some custom formatting.
            // eslint-disable-next-line no-console
            console.log(...formatMessage(level, fileName, functionName, message), ...args);
        }
        else {
            // eslint-disable-next-line no-console
            console[level](...formatMessage(level, fileName, functionName, message), ...args);
        }
    }
    if (!datadogEnabled) {
        return;
    }
    if (level === 'warn') {
        if (!isMobileApp) {
            Sentry.captureMessage('warning', `${fileName}#${functionName}`, message, ...args);
        }
        if (walletDatadogEnabled) {
            logWarningToDatadog(message, {
                level,
                args,
                functionName,
                fileName,
            });
        }
    }
    else if (level === 'info') {
        if (!isMobileApp) {
            Sentry.captureMessage('info', `${fileName}#${functionName}`, message, ...args);
        }
        if (walletDatadogEnabled) {
            logToDatadog(message, {
                level,
                args,
                functionName,
                fileName,
            });
        }
    }
    if (isInterface) {
        logToDatadog(message, {
            level,
            args,
            functionName,
            fileName,
        });
    }
}
function logException(error, captureContext) {
    const updatedContext = addErrorExtras(error, captureContext);
    // Log to console directly for dev builds or interface for debugging
    if (__DEV__ || isInterface) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
    if (!datadogEnabled) {
        return;
    }
    // Limit character length for string tags to the max Sentry allows
    for (const contextProp of Object.keys(updatedContext.tags)) {
        const prop = contextProp;
        const contextValue = updatedContext.tags[prop];
        if (typeof contextValue === 'string') {
            updatedContext.tags[prop] = contextValue.slice(0, SENTRY_CHAR_LIMIT);
        }
    }
    if (!isMobileApp) {
        Sentry.captureException(error, updatedContext);
    }
    if (isInterface || walletDatadogEnabled) {
        logErrorToDatadog(error instanceof Error ? error : new Error(`${error}`), updatedContext);
    }
}
// Adds extra fields from errors provided by React Native
export function addErrorExtras(error, captureContext) {
    if (error instanceof Error) {
        const updatedContext = { ...captureContext };
        const extras = {};
        const { nativeStackAndroid, userInfo } = error;
        if (Array.isArray(nativeStackAndroid) && nativeStackAndroid.length > 0) {
            extras.nativeStackAndroid = nativeStackAndroid;
        }
        if (userInfo) {
            extras.userInfo = userInfo;
        }
        updatedContext.extra = { ...updatedContext.extra, ...extras };
        if (doesOverrideFingerprint(error)) {
            updatedContext.fingerprint = ['{{ default }}', ...error.getFingerprint()];
        }
        return updatedContext;
    }
    return captureContext;
}
function doesOverrideFingerprint(error) {
    return (typeof error === 'object' &&
        error !== null &&
        typeof error.getFingerprint === 'function');
}
function pad(n, amount = 2) {
    return n.toString().padStart(amount, '0');
}
function formatMessage(level, fileName, functionName, message) {
    const t = new Date();
    const timeString = `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}.${pad(t.getMilliseconds(), 3)}`;
    if (isWeb) {
        // Simpler printing for web logging
        return [
            level.toUpperCase(),
            {
                context: {
                    time: timeString,
                    fileName,
                    functionName,
                },
            },
            message,
        ];
    }
    else {
        // Specific printing style for mobile logging
        return [`${timeString}::${fileName}#${functionName}`, message];
    }
}
//# sourceMappingURL=logger.js.map