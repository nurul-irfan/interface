import { 
// eslint-disable-next-line no-restricted-imports
useAccountListQuery, } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
// eslint-disable-next-line no-restricted-imports
import { usePortfolioValueModifiers } from 'uniswap/src/features/dataApi/balances';
export function useAccountList({ addresses, fetchPolicy, notifyOnNetworkStatusChange, }) {
    const { gqlChains } = useEnabledChains();
    const valueModifiers = usePortfolioValueModifiers(addresses);
    const { data, loading, networkStatus, refetch, startPolling, stopPolling } = useAccountListQuery({
        variables: { addresses, valueModifiers, chains: gqlChains },
        notifyOnNetworkStatusChange,
        fetchPolicy,
    });
    return {
        data,
        loading,
        networkStatus,
        refetch,
        startPolling,
        stopPolling,
    };
}
//# sourceMappingURL=hooks.js.map