import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePortfolioBalancesForAddressById } from 'uniswap/src/components/TokenSelector/hooks/usePortfolioBalancesForAddressById';
import { usePortfolioTokenOptions } from 'uniswap/src/components/TokenSelector/hooks/usePortfolioTokenOptions';
import { TokenOptionSection } from 'uniswap/src/components/TokenSelector/types';
import { formatSearchResults, mergeSearchResultsWithBridgingTokens, useTokenOptionsSection, } from 'uniswap/src/components/TokenSelector/utils';
import { useBridgingTokensOptions } from 'uniswap/src/features/bridging/hooks/tokens';
import { getChainLabel } from 'uniswap/src/features/chains/utils';
import { useSearchTokens } from 'uniswap/src/features/dataApi/searchTokens';
export function useTokenSectionsForSearchResults(address, chainFilter, searchFilter, isBalancesOnlySearch, input) {
    const { t } = useTranslation();
    const { data: portfolioBalancesById, error: portfolioBalancesByIdError, refetch: refetchPortfolioBalances, loading: portfolioBalancesByIdLoading, } = usePortfolioBalancesForAddressById(address);
    const { data: portfolioTokenOptions, error: portfolioTokenOptionsError, refetch: refetchPortfolioTokenOptions, loading: portfolioTokenOptionsLoading, } = usePortfolioTokenOptions(address, chainFilter, searchFilter !== null && searchFilter !== void 0 ? searchFilter : undefined);
    // Bridging tokens are only shown if input is provided
    const { data: bridgingTokenOptions, error: bridgingTokenOptionsError, refetch: refetchBridgingTokenOptions, loading: bridgingTokenOptionsLoading, } = useBridgingTokensOptions({ input, walletAddress: address, chainFilter });
    // Only call search endpoint if isBalancesOnlySearch is false
    const { data: searchResultCurrencies, error: searchTokensError, refetch: refetchSearchTokens, loading: searchTokensLoading, } = useSearchTokens(searchFilter, chainFilter, /*skip*/ isBalancesOnlySearch);
    const searchResults = useMemo(() => {
        return formatSearchResults(searchResultCurrencies, portfolioBalancesById, searchFilter);
    }, [searchResultCurrencies, portfolioBalancesById, searchFilter]);
    const loading = portfolioTokenOptionsLoading ||
        portfolioBalancesByIdLoading ||
        (!isBalancesOnlySearch && searchTokensLoading) ||
        bridgingTokenOptionsLoading;
    const searchResultsSections = useTokenOptionsSection({
        sectionKey: TokenOptionSection.SearchResults,
        // Use local search when only searching balances
        tokenOptions: isBalancesOnlySearch ? portfolioTokenOptions : searchResults,
    });
    // If there are bridging options, we need to extract them from the search results and then prepend them as a new section above.
    // The remaining non-bridging search results will be shown in a section with a different name
    const networkName = chainFilter ? getChainLabel(chainFilter) : undefined;
    const searchResultsSectionHeader = networkName
        ? t('tokens.selector.section.otherSearchResults', { network: networkName })
        : undefined;
    const sections = mergeSearchResultsWithBridgingTokens(searchResultsSections, bridgingTokenOptions, searchResultsSectionHeader);
    const error = (!bridgingTokenOptions && bridgingTokenOptionsError) ||
        (!portfolioBalancesById && portfolioBalancesByIdError) ||
        (!portfolioTokenOptions && portfolioTokenOptionsError) ||
        (!isBalancesOnlySearch && !searchResults && searchTokensError);
    const refetchAll = useCallback(() => {
        refetchPortfolioBalances === null || refetchPortfolioBalances === void 0 ? void 0 : refetchPortfolioBalances();
        refetchSearchTokens === null || refetchSearchTokens === void 0 ? void 0 : refetchSearchTokens();
        refetchPortfolioTokenOptions === null || refetchPortfolioTokenOptions === void 0 ? void 0 : refetchPortfolioTokenOptions();
        refetchBridgingTokenOptions === null || refetchBridgingTokenOptions === void 0 ? void 0 : refetchBridgingTokenOptions();
    }, [refetchBridgingTokenOptions, refetchPortfolioBalances, refetchPortfolioTokenOptions, refetchSearchTokens]);
    return useMemo(() => ({
        data: sections,
        loading,
        error: error || undefined,
        refetch: refetchAll,
    }), [error, loading, refetchAll, sections]);
}
//# sourceMappingURL=useTokenSectionsForSearchResults.js.map