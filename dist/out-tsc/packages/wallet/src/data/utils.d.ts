import { ApolloClient, NetworkStatus, NormalizedCacheObject } from '@apollo/client';
import { OnRampTransactionsAuth } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { AuthData } from 'wallet/src/data/types';
import { Account } from 'wallet/src/features/wallet/accounts/types';
import { SignerManager } from 'wallet/src/features/wallet/signing/SignerManager';
export declare const ON_RAMP_AUTH_MAX_LIMIT = 100;
export declare const ON_RAMP_AUTH_MIN_LIMIT = 1;
export declare function isNonPollingRequestInFlight(networkStatus: NetworkStatus): boolean;
export declare function isWarmLoadingStatus(networkStatus: NetworkStatus): boolean;
/**
 * Consider a query in an error state for UI purposes if query has no data, and
 * query has been loading at least once.
 */
export declare function isError(networkStatus: NetworkStatus, hasData: boolean): boolean;
export declare function useRefetchQueries(): (include?: Parameters<ApolloClient<NormalizedCacheObject>['refetchQueries']>[0]['include']) => void;
export declare function createSignedRequestBody<T>(data: T, account: Account, signerManager: SignerManager): Promise<{
    requestBody: T & AuthData;
    signature: string;
}>;
export declare function createSignedRequestParams<T>(params: T, account: Account, signerManager: SignerManager): Promise<{
    requestParams: T & AuthData;
    signature: string;
}>;
export declare function createOnRampTransactionsAuth(limit: number, account: Account, signerManager: SignerManager): Promise<OnRampTransactionsAuth>;
//# sourceMappingURL=utils.d.ts.map