import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Flex, Text } from 'ui/src';
import { TokenSelectorList } from 'uniswap/src/components/TokenSelector/TokenSelectorList';
import { useAddToSearchHistory } from 'uniswap/src/components/TokenSelector/hooks/useAddToSearchHistory';
import { useTokenSectionsForSearchResults } from 'uniswap/src/components/TokenSelector/hooks/useTokenSectionsForSearchResults';
import { SectionHeader } from 'uniswap/src/components/TokenSelector/items/TokenSectionHeader';
import { TokenOptionSection } from 'uniswap/src/components/TokenSelector/types';
function EmptyResults({ searchFilter }) {
    return (_jsxs(Flex, { children: [_jsx(SectionHeader, { sectionKey: TokenOptionSection.SearchResults }), _jsx(Text, { color: "$neutral3", mt: "$spacing16", mx: "$spacing16", textAlign: "center", variant: "subheading2", children: _jsx(Trans, { components: { highlight: _jsx(Text, { color: "$neutral1", variant: "subheading2" }) }, i18nKey: "tokens.selector.search.empty", values: { searchText: searchFilter } }) })] }));
}
function _TokenSelectorSearchResultsList({ onSelectCurrency: parentOnSelectCurrency, activeAccountAddress, chainFilter, parsedChainFilter, searchFilter, debouncedSearchFilter, debouncedParsedSearchFilter, isBalancesOnlySearch, isKeyboardOpen, input, }) {
    const { t } = useTranslation();
    const { registerSearch } = useAddToSearchHistory();
    const { data: sections, loading, error, refetch, } = useTokenSectionsForSearchResults(activeAccountAddress, chainFilter !== null && chainFilter !== void 0 ? chainFilter : parsedChainFilter, debouncedParsedSearchFilter !== null && debouncedParsedSearchFilter !== void 0 ? debouncedParsedSearchFilter : debouncedSearchFilter, isBalancesOnlySearch, input);
    const onSelectCurrency = (currencyInfo, section, index) => {
        parentOnSelectCurrency(currencyInfo, section, index);
        registerSearch(currencyInfo);
    };
    const userIsTyping = Boolean(searchFilter && debouncedSearchFilter !== searchFilter);
    const emptyElement = useMemo(() => (debouncedSearchFilter ? _jsx(EmptyResults, { searchFilter: debouncedSearchFilter }) : undefined), [debouncedSearchFilter]);
    return (_jsx(TokenSelectorList, { showTokenAddress: true, chainFilter: chainFilter, emptyElement: emptyElement, errorText: t('token.selector.search.error'), hasError: Boolean(error), isKeyboardOpen: isKeyboardOpen, loading: userIsTyping || loading, refetch: refetch, sections: sections, showTokenWarnings: true, onSelectCurrency: onSelectCurrency }));
}
export const TokenSelectorSearchResultsList = memo(_TokenSelectorSearchResultsList);
//# sourceMappingURL=TokenSelectorSearchResultsList.js.map