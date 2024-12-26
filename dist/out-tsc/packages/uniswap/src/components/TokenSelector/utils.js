import { useMemo } from 'react';
import { TokenOptionSection, TokenSelectorFlow, } from 'uniswap/src/components/TokenSelector/types';
import { tradingApiSwappableTokenToCurrencyInfo } from 'uniswap/src/data/apiClients/tradingApi/utils/tradingApiSwappableTokenToCurrencyInfo';
import { SafetyLevel as GqlSafetyLevel } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { SafetyLevel } from 'uniswap/src/data/tradingApi/__generated__';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { areCurrencyIdsEqual } from 'uniswap/src/utils/currencyId';
import { differenceWith } from 'utilities/src/primitives/array';
export function createEmptyBalanceOption(currencyInfo) {
    return {
        currencyInfo,
        balanceUSD: null,
        quantity: null,
    };
}
export function createEmptyTokenOptionFromBridgingToken(token) {
    const currencyInfo = tradingApiSwappableTokenToCurrencyInfo(token);
    if (!currencyInfo) {
        return undefined;
    }
    return {
        currencyInfo,
        balanceUSD: null,
        quantity: null,
    };
}
export function toGqlSafetyLevel(safetyLevel) {
    switch (safetyLevel) {
        case SafetyLevel.BLOCKED:
            return GqlSafetyLevel.Blocked;
        case SafetyLevel.MEDIUM_WARNING:
            return GqlSafetyLevel.MediumWarning;
        case SafetyLevel.STRONG_WARNING:
            return GqlSafetyLevel.StrongWarning;
        case SafetyLevel.VERIFIED:
            return GqlSafetyLevel.Verified;
        default:
            return null;
    }
}
// get items in `currencies` that are not in `without`
// e.g. difference([B, C, D], [A, B, C]) would return ([D])
export function tokenOptionDifference(currencies, without) {
    if (!currencies) {
        return undefined;
    }
    return differenceWith(currencies, without !== null && without !== void 0 ? without : [], tokenOptionComparator);
}
function tokenOptionComparator(tokenOption, otherTokenOption) {
    return areCurrencyIdsEqual(tokenOption.currencyInfo.currencyId, otherTokenOption.currencyInfo.currencyId);
}
export function formatSearchResults(searchResultCurrencies, portfolioBalancesById, searchFilter) {
    if (!searchResultCurrencies) {
        return undefined;
    }
    const formattedOptions = searchResultCurrencies.map((currencyInfo) => {
        const portfolioBalanceResult = portfolioBalancesById === null || portfolioBalancesById === void 0 ? void 0 : portfolioBalancesById[currencyInfo.currencyId];
        // Use currencyInfo from Search Results because the search query fetches protectionInfo but portfolioBalances does not
        return portfolioBalanceResult ? { ...portfolioBalanceResult, currencyInfo } : createEmptyBalanceOption(currencyInfo);
    });
    // Sort to bring exact matches to the top
    formattedOptions.sort((res1, res2) => {
        const res1Match = isExactTokenOptionMatch(res1, searchFilter || '');
        const res2Match = isExactTokenOptionMatch(res2, searchFilter || '');
        if (res1Match && !res2Match) {
            return -1;
        }
        else if (!res1Match && res2Match) {
            return 1;
        }
        else {
            return 0;
        }
    });
    return formattedOptions;
}
/**
 * Utility to merge the search results with the bridging tokens.
 * Also updates the search results section name accordingly
 */
export function mergeSearchResultsWithBridgingTokens(searchResults, bridgingTokens, sectionHeaderString) {
    if (!searchResults || !bridgingTokens || bridgingTokens.length === 0) {
        return searchResults;
    }
    const extractedBridgingTokens = [];
    const extractedSearchResults = searchResults.map((section) => {
        const sectionResults2D = [];
        const sectionResults = [];
        section.data.forEach((token) => {
            if (isTokenOptionArray(token)) {
                // 2D array is for horizontal token list sections, which is not applicable for search results
                sectionResults2D.push(token);
                return;
            }
            const isBridgingToken = bridgingTokens.some((bridgingToken) => areCurrencyIdsEqual(token.currencyInfo.currencyId, bridgingToken.currencyInfo.currencyId));
            if (isBridgingToken) {
                extractedBridgingTokens.push(token);
            }
            else {
                sectionResults.push(token);
            }
        });
        return {
            ...section,
            data: sectionResults2D.length > 0 ? sectionResults2D : sectionResults,
        };
    });
    const bridgingSection = {
        sectionKey: TokenOptionSection.BridgingTokens,
        data: extractedBridgingTokens,
    };
    // Update the search results section name to "Other tokens on {{network}}" if there is a valid bridging section
    const searchResultsSection = extractedSearchResults.find((section) => section.sectionKey === TokenOptionSection.SearchResults);
    if (bridgingSection.data.length > 0 && searchResultsSection && sectionHeaderString) {
        searchResultsSection.name = sectionHeaderString;
    }
    // Remove empty sections
    return [bridgingSection, ...extractedSearchResults].filter((section) => section.data.length > 0);
}
export function isTokenOptionArray(option) {
    return Array.isArray(option);
}
function isExactTokenOptionMatch(searchResult, query) {
    var _a, _b;
    return (((_a = searchResult.currencyInfo.currency.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === query.toLowerCase() ||
        ((_b = searchResult.currencyInfo.currency.symbol) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === query.toLowerCase());
}
export function useTokenOptionsSection({ sectionKey, tokenOptions, rightElement, endElement, name, }) {
    return useMemo(() => {
        if (!tokenOptions) {
            return undefined;
        }
        // If it is a 2D array, check if any of the inner arrays are not empty
        // Otherwise, check if the array is not empty
        const is2DArray = (tokenOptions === null || tokenOptions === void 0 ? void 0 : tokenOptions.length) > 0 && Array.isArray(tokenOptions[0]);
        const hasData = is2DArray
            ? tokenOptions.some((item) => isTokenOptionArray(item) && item.length > 0)
            : tokenOptions.length > 0;
        return hasData
            ? [
                {
                    sectionKey,
                    data: tokenOptions,
                    name,
                    rightElement,
                    endElement,
                },
            ]
            : undefined;
    }, [name, rightElement, endElement, sectionKey, tokenOptions]);
}
export function isSwapListLoading(loading, portfolioSection, popularSection) {
    return loading && (!portfolioSection || !popularSection);
}
export function flowToModalName(flow) {
    switch (flow) {
        case TokenSelectorFlow.Swap:
            return ModalName.Swap;
        case TokenSelectorFlow.Send:
            return ModalName.Send;
        default:
            return undefined;
    }
}
//# sourceMappingURL=utils.js.map