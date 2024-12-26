import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useCallback, useMemo } from 'react';
import { TokenSelectorList } from 'uniswap/src/components/TokenSelector/TokenSelectorList';
import { useCommonTokensOptionsWithFallback } from 'uniswap/src/components/TokenSelector/hooks/useCommonTokensOptionsWithFallback';
import { useFavoriteTokensOptions } from 'uniswap/src/components/TokenSelector/hooks/useFavoriteTokensOptions';
import { usePopularTokensOptions } from 'uniswap/src/components/TokenSelector/hooks/usePopularTokensOptions';
import { usePortfolioTokenOptions } from 'uniswap/src/components/TokenSelector/hooks/usePortfolioTokenOptions';
import { useRecentlySearchedTokens } from 'uniswap/src/components/TokenSelector/hooks/useRecentlySearchedTokens';
import { TokenOptionSection, } from 'uniswap/src/components/TokenSelector/types';
import { isSwapListLoading, tokenOptionDifference, useTokenOptionsSection, } from 'uniswap/src/components/TokenSelector/utils';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { isTestnetChain } from 'uniswap/src/features/chains/utils';
import { isMobileApp } from 'utilities/src/platform';
function useTokenSectionsForSwapInput({ activeAccountAddress, chainFilter, }) {
    var _a;
    const { defaultChainId, isTestnetModeEnabled } = useEnabledChains();
    const { data: portfolioTokenOptions, error: portfolioTokenOptionsError, refetch: refetchPortfolioTokenOptions, loading: portfolioTokenOptionsLoading, } = usePortfolioTokenOptions(activeAccountAddress, chainFilter);
    const { data: popularTokenOptions, error: popularTokenOptionsError, refetch: refetchPopularTokenOptions, loading: popularTokenOptionsLoading,
    // if there is no chain filter then we show default chain tokens
     } = usePopularTokensOptions(activeAccountAddress, chainFilter !== null && chainFilter !== void 0 ? chainFilter : defaultChainId);
    const { data: favoriteTokenOptions, error: favoriteTokenOptionsError, refetch: refetchFavoriteTokenOptions, loading: favoriteTokenOptionsLoading, } = useFavoriteTokensOptions(activeAccountAddress, chainFilter);
    const { data: commonTokenOptions } = useCommonTokensOptionsWithFallback(activeAccountAddress, chainFilter !== null && chainFilter !== void 0 ? chainFilter : defaultChainId);
    const recentlySearchedTokenOptions = useRecentlySearchedTokens(chainFilter);
    const error = (!portfolioTokenOptions && portfolioTokenOptionsError) ||
        (!popularTokenOptions && popularTokenOptionsError) ||
        (!favoriteTokenOptions && favoriteTokenOptionsError);
    const loading = portfolioTokenOptionsLoading || popularTokenOptionsLoading || favoriteTokenOptionsLoading;
    const refetchAll = useCallback(() => {
        refetchPortfolioTokenOptions === null || refetchPortfolioTokenOptions === void 0 ? void 0 : refetchPortfolioTokenOptions();
        refetchPopularTokenOptions === null || refetchPopularTokenOptions === void 0 ? void 0 : refetchPopularTokenOptions();
        refetchFavoriteTokenOptions === null || refetchFavoriteTokenOptions === void 0 ? void 0 : refetchFavoriteTokenOptions();
    }, [refetchPopularTokenOptions, refetchPortfolioTokenOptions, refetchFavoriteTokenOptions]);
    const isTestnet = chainFilter && isTestnetChain(chainFilter);
    const suggestedSection = useTokenOptionsSection({
        sectionKey: TokenOptionSection.SuggestedTokens,
        tokenOptions: [(_a = (isTestnet ? commonTokenOptions : [])) !== null && _a !== void 0 ? _a : []],
    });
    const portfolioSection = useTokenOptionsSection({
        sectionKey: TokenOptionSection.YourTokens,
        tokenOptions: portfolioTokenOptions,
    });
    const recentSection = useTokenOptionsSection({
        sectionKey: TokenOptionSection.RecentTokens,
        tokenOptions: recentlySearchedTokenOptions,
    });
    const favoriteSection = useTokenOptionsSection({
        sectionKey: TokenOptionSection.FavoriteTokens,
        tokenOptions: favoriteTokenOptions,
    });
    const popularMinusPortfolioTokens = tokenOptionDifference(popularTokenOptions, portfolioTokenOptions);
    const popularSection = useTokenOptionsSection({
        sectionKey: TokenOptionSection.PopularTokens,
        tokenOptions: popularMinusPortfolioTokens,
    });
    const sections = useMemo(() => {
        if (isSwapListLoading(loading, portfolioSection, popularSection)) {
            return undefined;
        }
        if (isTestnetModeEnabled) {
            return [...(suggestedSection !== null && suggestedSection !== void 0 ? suggestedSection : []), ...(portfolioSection !== null && portfolioSection !== void 0 ? portfolioSection : [])];
        }
        return [
            ...(suggestedSection !== null && suggestedSection !== void 0 ? suggestedSection : []),
            ...(portfolioSection !== null && portfolioSection !== void 0 ? portfolioSection : []),
            ...(recentSection !== null && recentSection !== void 0 ? recentSection : []),
            // TODO(WEB-3061): Favorited wallets/tokens
            // Extension & interface do not support favoriting but has a default list, so we can't rely on empty array check
            ...(isMobileApp ? favoriteSection !== null && favoriteSection !== void 0 ? favoriteSection : [] : []),
            ...(popularSection !== null && popularSection !== void 0 ? popularSection : []),
        ];
    }, [
        suggestedSection,
        favoriteSection,
        loading,
        popularSection,
        portfolioSection,
        recentSection,
        isTestnetModeEnabled,
    ]);
    return useMemo(() => ({
        data: sections,
        loading,
        error: error || undefined,
        refetch: refetchAll,
    }), [error, loading, refetchAll, sections]);
}
function _TokenSelectorSwapInputList({ onSelectCurrency, activeAccountAddress, chainFilter, isKeyboardOpen, }) {
    const { data: sections, loading, error, refetch, } = useTokenSectionsForSwapInput({
        activeAccountAddress,
        chainFilter,
    });
    return (_jsx(TokenSelectorList, { chainFilter: chainFilter, hasError: Boolean(error), isKeyboardOpen: isKeyboardOpen, loading: loading, refetch: refetch, sections: sections, showTokenWarnings: true, onSelectCurrency: onSelectCurrency }));
}
export const TokenSelectorSwapInputList = memo(_TokenSelectorSwapInputList);
//# sourceMappingURL=TokenSelectorSwapInputList.js.map