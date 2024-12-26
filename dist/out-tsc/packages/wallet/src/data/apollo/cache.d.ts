import { InMemoryCache } from '@apollo/client';
import { PersistentStorage } from 'apollo3-cache-persist/lib/types';
/**
 * Initializes and persists/rehydrates cache
 */
export declare function initAndPersistCache({ storage, maxCacheSizeInBytes, }: {
    storage: PersistentStorage<string>;
    maxCacheSizeInBytes: number;
}): Promise<InMemoryCache>;
//# sourceMappingURL=cache.d.ts.map