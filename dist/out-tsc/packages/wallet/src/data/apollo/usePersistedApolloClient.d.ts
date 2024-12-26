import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PersistentStorage } from 'apollo3-cache-persist/lib/types';
import { CustomEndpoint } from 'uniswap/src/data/links';
type ApolloClientRef = {
    current: ApolloClient<NormalizedCacheObject> | null;
    onReady: () => Promise<ApolloClient<NormalizedCacheObject>>;
};
export declare const apolloClientRef: ApolloClientRef;
export declare const usePersistedApolloClient: ({ storageWrapper, maxCacheSizeInBytes, customEndpoint, }: {
    storageWrapper: PersistentStorage<string>;
    maxCacheSizeInBytes: number;
    customEndpoint?: CustomEndpoint | undefined;
}) => ApolloClient<NormalizedCacheObject> | undefined;
export {};
//# sourceMappingURL=usePersistedApolloClient.d.ts.map