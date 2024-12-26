export const prefix = 'com.uniswap.web';
export const ENCRYPTION_KEY_STORAGE_KEY = `${prefix}.encryptionKey`;
/**
 * Chrome storage wrapper
 * @implements {redux-persist#Storage}
 *
 * NOTE: class avoids dependency on redux-persist by not explicity defining implements
 * */
export class PersistedStorage {
    constructor(area = 'local') {
        this.area = area;
    }
    async getItem(key) {
        const result = await chrome.storage[this.area].get(key);
        const item = result[key];
        return typeof item === 'string' ? item : undefined;
    }
    async getAll() {
        const result = await chrome.storage[this.area].get(null);
        return result !== null && result !== void 0 ? result : {};
    }
    setItem(key, value) {
        return chrome.storage[this.area].set({ [key]: value });
    }
    removeItem(key) {
        return chrome.storage[this.area].remove(key);
    }
    clear() {
        return chrome.storage[this.area].clear();
    }
}
//# sourceMappingURL=persistedStorage.js.map