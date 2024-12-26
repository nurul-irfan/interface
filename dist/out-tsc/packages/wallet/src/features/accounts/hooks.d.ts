import { NetworkStatus, WatchQueryFetchPolicy } from '@apollo/client';
import { AccountListQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { GqlResult } from 'uniswap/src/data/types';
export declare function useAccountList({ addresses, fetchPolicy, notifyOnNetworkStatusChange, }: {
    addresses: Address[];
    fetchPolicy?: WatchQueryFetchPolicy;
    notifyOnNetworkStatusChange?: boolean | undefined;
}): GqlResult<AccountListQuery> & {
    startPolling: (pollInterval: number) => void;
    stopPolling: () => void;
    networkStatus: NetworkStatus;
    refetch: () => void;
};
//# sourceMappingURL=hooks.d.ts.map