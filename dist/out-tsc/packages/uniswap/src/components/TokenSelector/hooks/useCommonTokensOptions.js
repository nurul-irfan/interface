import { useCallback, useMemo } from 'react';
import { filter } from 'uniswap/src/components/TokenSelector/filter';
import { useAllCommonBaseCurrencies } from 'uniswap/src/components/TokenSelector/hooks/useAllCommonBaseCurrencies';
import { useCurrencyInfosToTokenOptions } from 'uniswap/src/components/TokenSelector/hooks/useCurrencyInfosToTokenOptions';
import { usePortfolioBalancesForAddressById } from 'uniswap/src/components/TokenSelector/hooks/usePortfolioBalancesForAddressById';
export function useCommonTokensOptions(address, chainFilter) {
    const { data: portfolioBalancesById, error: portfolioBalancesByIdError, refetch: portfolioBalancesByIdRefetch, loading: loadingPorfolioBalancesById, } = usePortfolioBalancesForAddressById(address);
    const { data: commonBaseCurrencies, error: commonBaseCurrenciesError, refetch: refetchCommonBaseCurrencies, loading: loadingCommonBaseCurrencies, } = useAllCommonBaseCurrencies();
    const commonBaseTokenOptions = useCurrencyInfosToTokenOptions({
        currencyInfos: commonBaseCurrencies,
        portfolioBalancesById,
    });
    const refetch = useCallback(() => {
        portfolioBalancesByIdRefetch === null || portfolioBalancesByIdRefetch === void 0 ? void 0 : portfolioBalancesByIdRefetch();
        refetchCommonBaseCurrencies === null || refetchCommonBaseCurrencies === void 0 ? void 0 : refetchCommonBaseCurrencies();
    }, [portfolioBalancesByIdRefetch, refetchCommonBaseCurrencies]);
    const error = (!portfolioBalancesById && portfolioBalancesByIdError) || (!commonBaseCurrencies && commonBaseCurrenciesError);
    const filteredCommonBaseTokenOptions = useMemo(() => commonBaseTokenOptions && filter(commonBaseTokenOptions, chainFilter), [chainFilter, commonBaseTokenOptions]);
    return {
        data: filteredCommonBaseTokenOptions,
        refetch,
        error: error || undefined,
        loading: loadingPorfolioBalancesById || loadingCommonBaseCurrencies,
    };
}
//# sourceMappingURL=useCommonTokensOptions.js.map