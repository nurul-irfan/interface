import { useCallback } from 'react';
import { useCurrencyInfosToTokenOptions } from 'uniswap/src/components/TokenSelector/hooks/useCurrencyInfosToTokenOptions';
import { usePortfolioBalancesForAddressById } from 'uniswap/src/components/TokenSelector/hooks/usePortfolioBalancesForAddressById';
import { usePopularTokens as usePopularTokensGql } from 'uniswap/src/features/dataApi/topTokens';
export function usePopularTokensOptions(address, chainFilter) {
    const { data: portfolioBalancesById, error: portfolioBalancesByIdError, refetch: portfolioBalancesByIdRefetch, loading: loadingPorfolioBalancesById, } = usePortfolioBalancesForAddressById(address);
    const { data: popularTokens, error: popularTokensError, refetch: refetchPopularTokens, loading: loadingPopularTokens, } = usePopularTokensGql(chainFilter);
    const popularTokenOptions = useCurrencyInfosToTokenOptions({
        currencyInfos: popularTokens,
        portfolioBalancesById,
        sortAlphabetically: true,
    });
    const refetch = useCallback(() => {
        portfolioBalancesByIdRefetch === null || portfolioBalancesByIdRefetch === void 0 ? void 0 : portfolioBalancesByIdRefetch();
        refetchPopularTokens === null || refetchPopularTokens === void 0 ? void 0 : refetchPopularTokens();
    }, [portfolioBalancesByIdRefetch, refetchPopularTokens]);
    const error = (!portfolioBalancesById && portfolioBalancesByIdError) || (!popularTokenOptions && popularTokensError);
    return {
        data: popularTokenOptions,
        refetch,
        error: error || undefined,
        loading: loadingPorfolioBalancesById || loadingPopularTokens,
    };
}
//# sourceMappingURL=usePopularTokensOptions.js.map