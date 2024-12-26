import { createAction, createReducer, } from '@reduxjs/toolkit';
import { call, delay, put, race, take } from 'typed-redux-saga';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType } from 'uniswap/src/features/notifications/types';
import { errorToString } from 'utilities/src/errors';
import { logger } from 'utilities/src/logger/logger';
const DEFAULT_TIMEOUT = 90 * 1000; // 1.5 minutes
export var SagaStatus;
(function (SagaStatus) {
    SagaStatus["Started"] = "SagaStarted";
    SagaStatus["Success"] = "SagaSuccess";
    SagaStatus["Failure"] = "SagaFailure";
})(SagaStatus || (SagaStatus = {}));
/**
 * A convenience utility to create a wrapped saga that handles common concerns like
 * trigger watching, cancel watching, timeout, progress updates, and success/fail updates.
 * Use to create complex sagas that need more coordination with the UI.
 * Note: the wrapped saga and reducer this returns must be added to rootSaga.ts
 */
export function createMonitoredSaga(saga, name, options) {
    const triggerAction = createAction(`${name}/trigger`);
    const cancelAction = createAction(`${name}/cancel`);
    const statusAction = createAction(`${name}/progress`);
    const errorAction = createAction(`${name}/error`);
    const resetAction = createAction(`${name}/reset`);
    const reducer = createReducer({ status: null, error: null }, (builder) => builder
        .addCase(statusAction, (state, action) => {
        state.status = action.payload;
        state.error = null;
    })
        .addCase(errorAction, (state, action) => {
        state.status = SagaStatus.Failure;
        state.error = action.payload;
    })
        .addCase(resetAction, (state) => {
        state.status = null;
        state.error = null;
    }));
    const wrappedSaga = function* () {
        var _a;
        while (true) {
            try {
                const trigger = yield* take(triggerAction.type);
                logger.debug('saga', 'monitoredSaga', `${name} triggered`);
                yield* put(statusAction(SagaStatus.Started));
                const { result, cancel, timeout } = yield* race({
                    // Note: Use fork here instead if parallelism is required for the saga
                    result: call(saga, trigger.payload),
                    cancel: take(cancelAction.type),
                    timeout: delay((options === null || options === void 0 ? void 0 : options.timeoutDuration) || DEFAULT_TIMEOUT),
                });
                if (cancel) {
                    logger.debug('saga', 'monitoredSaga', `${name} canceled`);
                    yield* put(errorAction('Action was cancelled.'));
                    continue;
                }
                if (timeout) {
                    logger.warn('saga', 'monitoredSaga', `${name} timed out`);
                    throw new Error('Action timed out.');
                }
                if (result === false) {
                    logger.warn('saga', 'monitoredSaga', `${name} returned failure result`);
                    throw new Error('Action returned failure result.');
                }
                yield* put(statusAction(SagaStatus.Success));
                logger.debug('saga', 'monitoredSaga', `${name} finished`);
            }
            catch (error) {
                const errorMessage = errorToString(error);
                if (!((_a = options === null || options === void 0 ? void 0 : options.doNotLogErrors) === null || _a === void 0 ? void 0 : _a.includes(errorMessage))) {
                    logger.error(error, {
                        tags: { file: 'utils/saga', function: 'createMonitoredSaga' },
                        extra: { sagaName: name },
                    });
                }
                yield* put(errorAction(errorMessage));
                if ((options === null || options === void 0 ? void 0 : options.showErrorNotification) === undefined || (options === null || options === void 0 ? void 0 : options.showErrorNotification)) {
                    yield* put(pushNotification({
                        type: AppNotificationType.Error,
                        errorMessage,
                    }));
                }
            }
        }
    };
    return {
        name,
        wrappedSaga,
        reducer,
        actions: {
            trigger: triggerAction,
            cancel: cancelAction,
            progress: statusAction,
            error: errorAction,
            reset: resetAction,
        },
    };
}
//# sourceMappingURL=saga.js.map