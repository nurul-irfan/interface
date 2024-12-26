import { StoreEnhancerStoreCreator } from 'redux';
import { LogLevel, LoggerErrorContext } from 'utilities/src/logger/types';
interface Config {
    shouldLogReduxState: (state: any) => boolean;
}
export declare function setupDatadog(_envNameFunc: () => string): void;
export declare function createDatadogReduxEnhancer(_config: Config): (next: StoreEnhancerStoreCreator) => StoreEnhancerStoreCreator;
export declare function logToDatadog(_message: string, _options: {
    level: LogLevel;
    args: unknown[];
    fileName: string;
    functionName: string;
}): void;
export declare function logWarningToDatadog(_message: string, _options: {
    level: LogLevel;
    args: unknown[];
    fileName: string;
    functionName: string;
}): void;
export declare function logErrorToDatadog(_error: Error, _context?: LoggerErrorContext): void;
export declare function attachUnhandledRejectionHandler(): void;
export declare function setAttributesToDatadog(_attributes: {
    [key: string]: unknown;
}): Promise<void>;
export {};
//# sourceMappingURL=Datadog.d.ts.map