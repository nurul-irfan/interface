import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MAX_RECENT_SEARCH_RESULTS } from 'uniswap/src/components/TokenSelector/constants';
import { currencyInfosToTokenOptions } from 'uniswap/src/components/TokenSelector/hooks/useCurrencyInfosToTokenOptions';
import { SafetyLevel } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { buildCurrency, buildCurrencyInfo } from 'uniswap/src/features/dataApi/utils';
import { SearchResultType } from 'uniswap/src/features/search/SearchResult';
import { selectSearchHistory } from 'uniswap/src/features/search/selectSearchHistory';
import { currencyId } from 'uniswap/src/utils/currencyId';
export function useRecentlySearchedTokens(chainFilter) {
    const searchHistory = useSelector(selectSearchHistory);
    return useMemo(() => currencyInfosToTokenOptions(searchHistory
        .filter((searchResult) => searchResult.type === SearchResultType.Token)
        .filter((searchResult) => (chainFilter ? searchResult.chainId === chainFilter : true))
        .slice(0, MAX_RECENT_SEARCH_RESULTS)
        .map(searchResultToCurrencyInfo)), [chainFilter, searchHistory]);
}
function searchResultToCurrencyInfo({ chainId, address, symbol, name, logoUrl, safetyLevel, safetyInfo, feeData, }) {
    const currency = buildCurrency({
        chainId: chainId,
        address,
        decimals: 0, // this does not matter in a context of CurrencyInfo here, as we do not provide any balance
        symbol,
        name,
        buyFeeBps: feeData === null || feeData === void 0 ? void 0 : feeData.buyFeeBps,
        sellFeeBps: feeData === null || feeData === void 0 ? void 0 : feeData.sellFeeBps,
    });
    if (!currency) {
        return null;
    }
    return buildCurrencyInfo({
        currency,
        currencyId: currencyId(currency),
        logoUrl,
        safetyLevel: safetyLevel !== null && safetyLevel !== void 0 ? safetyLevel : SafetyLevel.StrongWarning,
        // defaulting to not spam, as user has searched and chosen this token before
        isSpam: false,
        safetyInfo,
    });
}
//# sourceMappingURL=useRecentlySearchedTokens.js.map