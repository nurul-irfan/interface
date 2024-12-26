import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useCallback, useMemo, useRef } from 'react';
import { Flex } from 'ui/src';
import { TokenSelectorList } from 'uniswap/src/components/TokenSelector/TokenSelectorList';
import { useCommonTokensOptionsWithFallback } from 'uniswap/src/components/TokenSelector/hooks/useCommonTokensOptionsWithFallback';
import { useFavoriteTokensOptions } from 'uniswap/src/components/TokenSelector/hooks/useFavoriteTokensOptions';
import { usePopularTokensOptions } from 'uniswap/src/components/TokenSelector/hooks/usePopularTokensOptions';
import { usePortfolioTokenOptions } from 'uniswap/src/components/TokenSelector/hooks/usePortfolioTokenOptions';
import { useRecentlySearchedTokens } from 'uniswap/src/components/TokenSelector/hooks/useRecentlySearchedTokens';
import { TokenOptionSection, } from 'uniswap/src/components/TokenSelector/types';
import { isSwapListLoading, tokenOptionDifference, useTokenOptionsSection, } from 'uniswap/src/components/TokenSelector/utils';
import { NewTag } from 'uniswap/src/components/pill/NewTag';
import { useBridgingTokensOptions } from 'uniswap/src/features/bridging/hooks/tokens';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { isMobileApp } from 'utilities/src/platform';
// eslint-disable-next-line complexity
function useTokenSectionsForSwapOutput({ activeAccountAddress, chainFilter, input, }) {
    const { defaultChainId, isTestnetModeEnabled } = useEnabledChains();
    const { data: portfolioTokenOptions, error: portfolioTokenOptionsError, refetch: refetchPortfolioTokenOptions, loading: portfolioTokenOptionsLoading, } = usePortfolioTokenOptions(activeAccountAddress, chainFilter);
    const { data: popularTokenOptions, error: popularTokenOptionsError, refetch: refetchPopularTokenOptions, loading: popularTokenOptionsLoading,
    // if there is no chain filter then we show mainnet tokens
     } = usePopularTokensOptions(activeAccountAddress, chainFilter !== null && chainFilter !== void 0 ? chainFilter : defaultChainId);
    const { data: favoriteTokenOptions, error: favoriteTokenOptionsError, refetch: refetchFavoriteTokenOptions, loading: favoriteTokenOptionsLoading, } = useFavoriteTokensOptions(activeAccountAddress, chainFilter);
    const { data: commonTokenOptions, error: commonTokenOptionsError, refetch: refetchCommonTokenOptions, loading: commonTokenOptionsLoading,
    // if there is no chain filter then we show default chain tokens
     } = useCommonTokensOptionsWithFallback(activeAccountAddress, chainFilter !== null && chainFilter !== void 0 ? chainFilter : defaultChainId);
    const { data: bridgingTokenOptions, error: bridgingTokenOptionsError, refetch: refetchBridgingTokenOptions, loading: bridgingTokenOptionsLoading, shouldNest: shouldNestBridgingTokens, } = useBridgingTokensOptions({ input, walletAddress: activeAccountAddress, chainFilter });
    const recentlySearchedTokenOptions = useRecentlySearchedTokens(chainFilter);
    const error = (!portfolioTokenOptions && portfolioTokenOptionsError) ||
        (!popularTokenOptions && popularTokenOptionsError) ||
        (!favoriteTokenOptions && favoriteTokenOptionsError) ||
        (!commonTokenOptions && commonTokenOptionsError) ||
        (!bridgingTokenOptions && bridgingTokenOptionsError);
    const loading = (!portfolioTokenOptions && portfolioTokenOptionsLoading) ||
        (!popularTokenOptions && popularTokenOptionsLoading) ||
        (!favoriteTokenOptions && favoriteTokenOptionsLoading) ||
        (!commonTokenOptions && commonTokenOptionsLoading) ||
        (!bridgingTokenOptions && bridgingTokenOptionsLoading);
    const refetchAllRef = useRef(() => { });
    refetchAllRef.current = () => {
        refetchPortfolioTokenOptions === null || refetchPortfolioTokenOptions === void 0 ? void 0 : refetchPortfolioTokenOptions();
        refetchPopularTokenOptions === null || refetchPopularTokenOptions === void 0 ? void 0 : refetchPopularTokenOptions();
        refetchFavoriteTokenOptions === null || refetchFavoriteTokenOptions === void 0 ? void 0 : refetchFavoriteTokenOptions();
        refetchCommonTokenOptions === null || refetchCommonTokenOptions === void 0 ? void 0 : refetchCommonTokenOptions();
        refetchBridgingTokenOptions === null || refetchBridgingTokenOptions === void 0 ? void 0 : refetchBridgingTokenOptions();
    };
    const refetch = useCallback(() => {
        refetchAllRef.current();
    }, []);
    const newTag = useMemo(() => isMobileApp ? (
    // Hack for vertically centering the new tag with text
    _jsx(Flex, { row: true, pt: 1, children: _jsx(NewTag, {}) })) : (_jsx(NewTag, {})), []);
    // we draw the Suggested pills as a single item of a section list, so `data` is TokenOption[][]
    const suggestedSectionOptions = useMemo(() => [commonTokenOptions !== null && commonTokenOptions !== void 0 ? commonTokenOptions : []], [commonTokenOptions]);
    const suggestedSection = useTokenOptionsSection({
        sectionKey: TokenOptionSection.SuggestedTokens,
        tokenOptions: suggestedSectionOptions,
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
    const popularMinusPortfolioTokens = useMemo(() => tokenOptionDifference(popularTokenOptions, portfolioTokenOptions), [popularTokenOptions, portfolioTokenOptions]);
    const popularSection = useTokenOptionsSection({
        sectionKey: TokenOptionSection.PopularTokens,
        tokenOptions: popularMinusPortfolioTokens,
    });
    const bridgingSectionTokenOptions = useMemo(() => (shouldNestBridgingTokens ? [bridgingTokenOptions !== null && bridgingTokenOptions !== void 0 ? bridgingTokenOptions : []] : bridgingTokenOptions !== null && bridgingTokenOptions !== void 0 ? bridgingTokenOptions : []), [bridgingTokenOptions, shouldNestBridgingTokens]);
    const bridgingSection = useTokenOptionsSection({
        sectionKey: TokenOptionSection.BridgingTokens,
        tokenOptions: bridgingSectionTokenOptions,
        rightElement: newTag,
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
            ...(bridgingSection !== null && bridgingSection !== void 0 ? bridgingSection : []),
            ...(portfolioSection !== null && portfolioSection !== void 0 ? portfolioSection : []),
            ...(recentSection !== null && recentSection !== void 0 ? recentSection : []),
            // TODO(WEB-3061): Favorited wallets/tokens
            // Extension & interface do not support favoriting but has a default list, so we can't rely on empty array check
            ...(isMobileApp ? favoriteSection !== null && favoriteSection !== void 0 ? favoriteSection : [] : []),
            ...(popularSection !== null && popularSection !== void 0 ? popularSection : []),
        ];
    }, [
        loading,
        portfolioSection,
        popularSection,
        suggestedSection,
        bridgingSection,
        recentSection,
        favoriteSection,
        isTestnetModeEnabled,
    ]);
    return useMemo(() => ({
        data: sections,
        loading,
        error: error || undefined,
        refetch,
    }), [error, loading, refetch, sections]);
}
function _TokenSelectorSwapOutputList({ onSelectCurrency, activeAccountAddress, chainFilter, isKeyboardOpen, input, }) {
    const { data: sections, loading, error, refetch, } = useTokenSectionsForSwapOutput({
        activeAccountAddress,
        chainFilter,
        input,
    });
    return (_jsx(TokenSelectorList, { chainFilter: chainFilter, hasError: Boolean(error), isKeyboardOpen: isKeyboardOpen, loading: loading, refetch: refetch, sections: loading ? undefined : sections, showTokenWarnings: true, onSelectCurrency: onSelectCurrency }));
}
export const TokenSelectorSwapOutputList = memo(_TokenSelectorSwapOutputList);
//# sourceMappingURL=TokenSelectorSwapOutputList.js.map