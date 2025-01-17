import { persistCache } from 'apollo3-cache-persist';
import { setupWalletCache } from 'uniswap/src/data/cache';
import { logger } from 'utilities/src/logger/logger';
/**
 * Initializes and persists/rehydrates cache
 */
export async function initAndPersistCache({ storage, maxCacheSizeInBytes, }) {
    const cache = setupWalletCache();
    try {
        await persistCache({
            cache,
            storage,
            maxSize: maxCacheSizeInBytes,
        });
    }
    catch (error) {
        logger.error(error, { tags: { file: 'cache', function: 'initAndPersistCache' } });
    }
    return cache;
}
//# sourceMappingURL=cache.js.map