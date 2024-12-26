import { StoreEnhancerStoreCreator } from 'redux';
import { LogLevel, LoggerErrorContext } from 'utilities/src/logger/types';
export declare function setupDatadog(envNameFunc: () => string): void;
export declare function logToDatadog(message: string, { level, ...options }: {
    level: LogLevel;
    args: unknown[];
    fileName: string;
    functionName: string;
}): void;
export declare function logWarningToDatadog(message: string, options: {
    level: LogLevel;
    args: unknown[];
    fileName: string;
    functionName: string;
}): void;
export declare function logErrorToDatadog(error: Error, context?: LoggerErrorContext): void;
export declare function attachUnhandledRejectionHandler(): void;
export declare function setAttributesToDatadog(_attributes: {
    [key: string]: unknown;
}): Promise<void>;
export declare function createDatadogReduxEnhancer({ shouldLogReduxState, }: {
    shouldLogReduxState: (state: any) => boolean;
}): (next: StoreEnhancerStoreCreator) => StoreEnhancerStoreCreator;
//# sourceMappingURL=Datadog.web.d.ts.map