import { useDispatch } from 'react-redux';
import { getNativeAddress } from 'uniswap/src/constants/addresses';
import { SearchResultType } from 'uniswap/src/features/search/SearchResult';
import { addToSearchHistory } from 'uniswap/src/features/search/searchHistorySlice';
import { tokenAddressOrNativeAddress } from 'uniswap/src/features/search/utils';
export function useAddToSearchHistory() {
    const dispatch = useDispatch();
    const registerSearch = (currencyInfo) => {
        dispatch(addToSearchHistory({
            searchResult: currencyInfoToTokenSearchResult(currencyInfo),
        }));
    };
    return { registerSearch };
}
function currencyInfoToTokenSearchResult(currencyInfo) {
    var _a, _b, _c, _d, _e, _f;
    const address = currencyInfo.currency.isToken
        ? currencyInfo.currency.address
        : getNativeAddress(currencyInfo.currency.chainId);
    return {
        type: SearchResultType.Token,
        chainId: currencyInfo.currency.chainId,
        address: tokenAddressOrNativeAddress(address, currencyInfo.currency.chainId),
        name: (_a = currencyInfo.currency.name) !== null && _a !== void 0 ? _a : null,
        symbol: (_b = currencyInfo.currency.symbol) !== null && _b !== void 0 ? _b : '',
        logoUrl: (_c = currencyInfo.logoUrl) !== null && _c !== void 0 ? _c : null,
        safetyLevel: (_d = currencyInfo.safetyLevel) !== null && _d !== void 0 ? _d : null,
        safetyInfo: currencyInfo.safetyInfo,
        feeData: currencyInfo.currency.isToken
            ? {
                buyFeeBps: ((_e = currencyInfo.currency.buyFeeBps) === null || _e === void 0 ? void 0 : _e.gt(0)) ? currencyInfo.currency.buyFeeBps.toString() : undefined,
                sellFeeBps: ((_f = currencyInfo.currency.sellFeeBps) === null || _f === void 0 ? void 0 : _f.gt(0)) ? currencyInfo.currency.sellFeeBps.toString() : undefined,
            }
            : null,
    };
}
//# sourceMappingURL=useAddToSearchHistory.js.map