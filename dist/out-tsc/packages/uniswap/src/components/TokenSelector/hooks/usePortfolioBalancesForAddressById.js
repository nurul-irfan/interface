import { usePortfolioBalances } from 'uniswap/src/features/dataApi/balances';
export function usePortfolioBalancesForAddressById(address) {
    const { data: portfolioBalancesById, error, refetch, loading, } = usePortfolioBalances({
        address,
        fetchPolicy: 'cache-first', // we want to avoid re-renders when token selector is opening
    });
    return {
        data: portfolioBalancesById,
        error,
        refetch,
        loading,
    };
}
//# sourceMappingURL=usePortfolioBalancesForAddressById.js.map