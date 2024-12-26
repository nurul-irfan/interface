import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Text, TouchableArea } from 'ui/src';
import { currencyInfosToTokenOptions } from 'uniswap/src/components/TokenSelector/hooks/useCurrencyInfosToTokenOptions';
import { useRecentlySearchedTokens } from 'uniswap/src/components/TokenSelector/hooks/useRecentlySearchedTokens';
import { TokenOptionSection } from 'uniswap/src/components/TokenSelector/types';
import { useTokenOptionsSection } from 'uniswap/src/components/TokenSelector/utils';
import { gqlTokenToCurrencyInfo } from 'uniswap/src/features/dataApi/utils';
import { clearSearchHistory } from 'uniswap/src/features/search/searchHistorySlice';
import { usePopularTokens } from 'uniswap/src/features/tokens/hooks';
function ClearAll({ onPress }) {
    const { t } = useTranslation();
    return (_jsx(TouchableArea, { onPress: onPress, children: _jsx(Text, { color: "$accent1", variant: "buttonLabel3", children: t('tokens.selector.button.clear') }) }));
}
export function useTokenSectionsForEmptySearch(chainFilter) {
    const dispatch = useDispatch();
    const { popularTokens, loading } = usePopularTokens();
    const recentlySearchedTokenOptions = useRecentlySearchedTokens(chainFilter);
    // it's a dependency of useMemo => useCallback
    const onPressClearSearchHistory = useCallback(() => {
        dispatch(clearSearchHistory());
    }, [dispatch]);
    const recentSection = useTokenOptionsSection({
        sectionKey: TokenOptionSection.RecentTokens,
        tokenOptions: recentlySearchedTokenOptions,
        endElement: _jsx(ClearAll, { onPress: onPressClearSearchHistory }),
    });
    const popularSection = useTokenOptionsSection({
        sectionKey: TokenOptionSection.PopularTokens,
        tokenOptions: currencyInfosToTokenOptions(popularTokens === null || popularTokens === void 0 ? void 0 : popularTokens.map(gqlTokenToCurrencyInfo)),
    });
    const sections = useMemo(() => [...(recentSection !== null && recentSection !== void 0 ? recentSection : []), ...(popularSection !== null && popularSection !== void 0 ? popularSection : [])], [popularSection, recentSection]);
    return useMemo(() => ({
        data: sections,
        loading,
    }), [loading, sections]);
}
//# sourceMappingURL=useTokenSectionsForEmptySearch.js.map