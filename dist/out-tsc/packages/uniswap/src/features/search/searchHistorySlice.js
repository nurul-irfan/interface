import { createSlice } from '@reduxjs/toolkit';
import { SearchResultType } from 'uniswap/src/features/search/SearchResult';
const SEARCH_HISTORY_LENGTH = 5;
// eslint-disable-next-line consistent-return
export function searchResultId(searchResult) {
    switch (searchResult.type) {
        case SearchResultType.Token:
            return `token-${searchResult.chainId}-${searchResult.address}`;
        case SearchResultType.ENSAddress:
            return `ens-${searchResult.address}`;
        case SearchResultType.Unitag:
            return `unitag-${searchResult.address}`;
        case SearchResultType.WalletByAddress:
            return `wallet-${searchResult.address}`;
        case SearchResultType.Etherscan:
            return `etherscan-${searchResult.address}`;
        case SearchResultType.NFTCollection:
            return `nftCollection-${searchResult.chainId}-${searchResult.address}`;
    }
}
export const initialSearchHistoryState = {
    results: [],
};
const slice = createSlice({
    name: 'searchHistory',
    initialState: initialSearchHistoryState,
    reducers: {
        addToSearchHistory: (state, action) => {
            const { searchResult } = action.payload;
            // Store search results with a standard searchId to prevent duplicates
            const searchId = searchResultId(searchResult);
            // Optimistically push search result to array
            state.results.unshift({ ...searchResult, searchId });
            // Filter out to only uniques & keep size under SEARCH_HISTORY_LENGTH
            state.results = state.results
                .filter((result, index, self) => index === self.findIndex((value) => value.searchId === result.searchId))
                .slice(0, SEARCH_HISTORY_LENGTH);
        },
        clearSearchHistory: (state) => {
            state.results = [];
        },
    },
});
export const { addToSearchHistory, clearSearchHistory } = slice.actions;
export const { reducer: searchHistoryReducer } = slice;
//# sourceMappingURL=searchHistorySlice.js.map