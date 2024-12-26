/// <reference types="chrome" />
type AreaName = keyof Pick<typeof chrome.storage, 'sync' | 'local' | 'managed' | 'session'>;
export declare const prefix = "com.uniswap.web";
export declare const ENCRYPTION_KEY_STORAGE_KEY = "com.uniswap.web.encryptionKey";
/**
 * Chrome storage wrapper
 * @implements {redux-persist#Storage}
 *
 * NOTE: class avoids dependency on redux-persist by not explicity defining implements
 * */
export declare class PersistedStorage {
    private area;
    constructor(area?: AreaName);
    getItem(key: string): Promise<string | undefined>;
    getAll(): Promise<Record<string, string>>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string | string[]): Promise<void>;
    clear(): Promise<void>;
}
export {};
//# sourceMappingURL=persistedStorage.d.ts.map