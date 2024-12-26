import { RefObject } from 'react';
export declare function usePrevious<T>(value: T): T | undefined;
export declare function useAsyncData<T>(asyncCallback: () => Promise<T> | undefined, onCancel?: () => void): {
    isLoading: boolean;
    data: T | undefined;
    error?: Error;
};
export declare function useMemoCompare<T>(next: () => T, compare: (a: T | undefined, b: T) => boolean): T;
export declare function useOnClickOutside<T extends HTMLElement>(node: RefObject<T | undefined>, handler: undefined | (() => void), ignoredNodes?: Array<RefObject<T | undefined>>): void;
//# sourceMappingURL=hooks.d.ts.map