import { CaptureContext, SeverityLevel } from '@sentry/types';
import { ISentry } from 'utilities/src/logger/Sentry';
/**
 * Logs an exception to our Sentry Dashboard
 *
 * @param error A custom error message
 * @param context Context from where this method is called
 */
export declare function captureException(error: unknown, captureContext?: CaptureContext): void;
/**
 * Sends a message to our Sentry Dashboard
 *
 * @param level Sentry severity level
 * @param context Context from where this method is called
 * @param message Message
 * @param extraArgs Key/value pairs to enrich logging and allow filtering.
 *                  More info here: https://docs.sentry.io/platforms/react-native/enriching-events/context/
 */
export declare function captureMessage(level: SeverityLevel, context: string, message: string, ...extraArgs: unknown[]): void;
export declare const Sentry: ISentry;
//# sourceMappingURL=Sentry.web.d.ts.map