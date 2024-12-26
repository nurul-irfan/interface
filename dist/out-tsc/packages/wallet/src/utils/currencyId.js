import { getNativeAddress, getWrappedNativeAddress } from 'uniswap/src/constants/addresses';
import { DEFAULT_NATIVE_ADDRESS } from 'uniswap/src/features/chains/chainInfo';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { toSupportedChainId } from 'uniswap/src/features/chains/utils';
import { areAddressesEqual } from 'uniswap/src/utils/addresses';
export function currencyId(currency) {
    return buildCurrencyId(currency.chainId, currencyAddress(currency));
}
export function buildCurrencyId(chainId, address) {
    return `${chainId}-${address}`;
}
export function buildNativeCurrencyId(chainId) {
    return buildCurrencyId(chainId, getNativeAddress(chainId));
}
export function buildWrappedNativeCurrencyId(chainId) {
    return buildCurrencyId(chainId, getWrappedNativeAddress(chainId));
}
export function areCurrencyIdsEqual(id1, id2) {
    return id1.toLowerCase() === id2.toLowerCase();
}
export function currencyAddress(currency) {
    if (currency.isNative) {
        return getNativeAddress(currency.chainId);
    }
    return currency.address;
}
export const NATIVE_ANALYTICS_ADDRESS_VALUE = 'NATIVE';
export function getCurrencyAddressForAnalytics(currency) {
    if (currency.isNative) {
        return NATIVE_ANALYTICS_ADDRESS_VALUE;
    }
    return currency.address;
}
export const isNativeCurrencyAddress = (chainId, address) => {
    if (!address) {
        return true;
    }
    return areAddressesEqual(address, getNativeAddress(chainId));
};
// Currency ids are formatted as `chainId-tokenaddress`
export function currencyIdToAddress(_currencyId) {
    const currencyIdParts = _currencyId.split('-');
    if (!currencyIdParts[1]) {
        throw new Error(`Invalid currencyId format: ${_currencyId}`);
    }
    return currencyIdParts[1];
}
function isPolygonChain(chainId) {
    return chainId === UniverseChainId.Polygon;
}
function isCeloChain(chainId) {
    return chainId === UniverseChainId.Celo;
}
// Similar to `currencyIdToAddress`, except native addresses are `null`.
export function currencyIdToGraphQLAddress(_currencyId) {
    if (!_currencyId) {
        return null;
    }
    const address = currencyIdToAddress(_currencyId);
    const chainId = currencyIdToChain(_currencyId);
    if (!chainId) {
        return null;
    }
    // backend only expects `null` for the native asset, except Polygon & Celo
    if (isNativeCurrencyAddress(chainId, address) && !isPolygonChain(chainId) && !isCeloChain(chainId)) {
        return null;
    }
    return address.toLowerCase();
}
export function currencyIdToChain(_currencyId) {
    return toSupportedChainId(_currencyId.split('-')[0]);
}
export function isDefaultNativeAddress(address) {
    return areAddressesEqual(address, DEFAULT_NATIVE_ADDRESS);
}
//# sourceMappingURL=currencyId.js.map