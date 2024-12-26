/* eslint-disable @typescript-eslint/no-explicit-any */
import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';
import { isTestEnv } from 'utilities/src/environment/env';
import { NotImplementedError } from 'utilities/src/errors';
import { isExtension } from 'utilities/src/platform';
import { v4 as uuidv4 } from 'uuid';
// setup user information
const USER_ID_KEY = 'datadog-user-id';
export function setupDatadog(envNameFunc) {
    if (isTestEnv()) {
        return;
    }
    if (!process.env.REACT_APP_DATADOG_CLIENT_TOKEN) {
        // eslint-disable-next-line no-console
        console.error(`No datadog client token, disabling`);
        return;
    }
    datadogLogs.init({
        clientToken: process.env.REACT_APP_DATADOG_CLIENT_TOKEN,
        site: 'datadoghq.com',
        forwardErrorsToLogs: true,
    });
    let userId = localStorage.getItem(USER_ID_KEY);
    if (!userId) {
        localStorage.setItem(USER_ID_KEY, (userId = uuidv4()));
    }
    datadogLogs.setUser({
        id: userId,
    });
    datadogLogs.setUserProperty('env', envNameFunc());
    datadogLogs.setUserProperty('version', process.env.REACT_APP_GIT_COMMIT_HASH);
}
export function logToDatadog(message, { level, ...options }) {
    if (isTestEnv()) {
        return;
    }
    if (isExtension) {
        datadogLogs.logger[level](message, { ...options, reduxState });
    }
    else {
        datadogLogs.logger[level](message, options);
    }
}
export function logWarningToDatadog(message, options) {
    datadogLogs.logger.warn(message, { ...options, ...(isExtension ? { reduxState } : {}) });
}
export function logErrorToDatadog(error, context) {
    if (isTestEnv()) {
        return;
    }
    if (isExtension) {
        datadogRum.addError(error, { ...context, reduxState });
        return;
    }
    if (error instanceof Error) {
        datadogLogs.logger.error(error.message, {
            error: {
                kind: error.name,
                stack: error.stack,
            },
            ...context,
        });
    }
    else {
        datadogLogs.logger.error(error, {
            error: {
                stack: new Error().stack,
            },
            ...context,
        });
    }
}
export function attachUnhandledRejectionHandler() {
    throw new NotImplementedError('attachUnhandledRejectionHandler');
}
export async function setAttributesToDatadog(_attributes) {
    throw new NotImplementedError('setAttributes');
}
let reduxState;
// Inspired by Sentry createReduxEnhancer
// https://github.com/getsentry/sentry-javascript/blob/master/packages/react/src/redux.ts
export function createDatadogReduxEnhancer({ shouldLogReduxState, }) {
    return (next) => (reducer, initialState) => {
        const enhancedReducer = (state, action) => {
            const newState = reducer(state, action);
            reduxState = shouldLogReduxState(newState) ? newState : undefined;
            /* Log action to Datadog */
            if (typeof action !== 'undefined' && action !== null) {
                datadogRum.addAction(`Redux Action: ${action.type}`, action);
            }
            return newState;
        };
        return next(enhancedReducer, initialState);
    };
}
//# sourceMappingURL=Datadog.web.js.map