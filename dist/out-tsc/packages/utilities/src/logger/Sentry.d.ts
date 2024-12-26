import { Primitive, SeverityLevel } from '@sentry/types';
import { LoggerErrorContext } from 'utilities/src/logger/types';
export type BreadCrumb = {
    message: string;
    category: string;
    level: SeverityLevel;
    data: {
        [key: string]: string | number | boolean | undefined;
    };
};
/** Dummy Sentry logging class. Overridden by mobile or extension related code. */
export interface ISentry {
    captureException(error: unknown, captureContext: LoggerErrorContext): void;
    captureMessage(level: SeverityLevel, context: string, message: string, ...extraArgs: unknown[]): void;
    addBreadCrumb(breadCrumb: BreadCrumb): void;
    setTag(key: string, value: Primitive): void;
}
/** This will be overridden by the compiler with platform-specific Sentry file. */
export declare const Sentry: ISentry;
//# sourceMappingURL=Sentry.d.ts.map