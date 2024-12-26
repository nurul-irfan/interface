import { StoreEnhancerStoreCreator } from 'redux';
import { LogLevel, LoggerErrorContext } from 'utilities/src/logger/types';
interface Config {
    shouldLogReduxState: (state: any) => boolean;
}
export declare function createDatadogReduxEnhancer({ shouldLogReduxState, }: Config): (next: StoreEnhancerStoreCreator) => StoreEnhancerStoreCreator;
export declare function logErrorToDatadog(error: Error, context: LoggerErrorContext): void;
export declare function logWarningToDatadog(message: string, { level, ...options }: {
    level: LogLevel;
    args: unknown[];
    fileName: string;
    functionName: string;
}): void;
export declare function logToDatadog(message: string, { level, ...options }: {
    level: LogLevel;
    args: unknown[];
    fileName: string;
    functionName: string;
}): void;
export declare function attachUnhandledRejectionHandler(): void;
export declare function setAttributesToDatadog(attributes: {
    [key: string]: unknown;
}): Promise<void>;
export {};
//# sourceMappingURL=Datadog.native.d.ts.map