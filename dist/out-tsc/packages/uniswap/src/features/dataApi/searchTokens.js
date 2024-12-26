import { useCallback, useMemo } from 'react';
import { useSearchTokensQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { toGraphQLChain } from 'uniswap/src/features/chains/utils';
import { gqlTokenToCurrencyInfo, usePersistedError } from 'uniswap/src/features/dataApi/utils';
export function useSearchTokens(searchQuery, chainFilter, skip) {
    const gqlChainFilter = chainFilter ? toGraphQLChain(chainFilter) : null;
    const { gqlChains } = useEnabledChains();
    const { data, loading, error, refetch } = useSearchTokensQuery({
        variables: {
            searchQuery: searchQuery !== null && searchQuery !== void 0 ? searchQuery : '',
            chains: gqlChainFilter ? [gqlChainFilter] : gqlChains,
        },
        skip: skip || !searchQuery,
    });
    const persistedError = usePersistedError(loading, error);
    const formattedData = useMemo(() => {
        if (!data || !data.searchTokens) {
            return undefined;
        }
        return data.searchTokens
            .map((token) => {
            if (!token) {
                return null;
            }
            return gqlTokenToCurrencyInfo(token);
        })
            .filter((c) => Boolean(c));
    }, [data]);
    const retry = useCallback(() => !skip && refetch({ searchQuery: searchQuery !== null && searchQuery !== void 0 ? searchQuery : '' }), [refetch, searchQuery, skip]);
    return useMemo(() => ({ data: formattedData, loading, error: persistedError, refetch: retry }), [formattedData, loading, retry, persistedError]);
}
//# sourceMappingURL=searchTokens.js.map