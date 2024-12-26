import { useMemo } from 'react';
import { getWrappedNativeAddress } from 'uniswap/src/constants/addresses';
import { Chain, useSearchPopularTokensQuery, } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { areAddressesEqual } from 'uniswap/src/utils/addresses';
// Popular tokens by top Uniswap trading volume
export function usePopularTokens() {
    // Load popular tokens by top Uniswap trading volume
    const { data, loading } = useSearchPopularTokensQuery();
    const { defaultChainId } = useEnabledChains();
    const popularTokens = useMemo(() => {
        var _a, _b;
        if (!data || !data.topTokens) {
            return undefined;
        }
        // special case to replace weth with eth because the backend does not return eth data
        // eth will be defined only if all the required data is available
        // when eth data is not fully available, we do not replace weth with eth
        const eth = (data === null || data === void 0 ? void 0 : data.eth) && (data === null || data === void 0 ? void 0 : data.eth.length) > 0 && ((_b = (_a = data === null || data === void 0 ? void 0 : data.eth) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.project) ? data.eth[0] : null;
        const wethAddress = getWrappedNativeAddress(defaultChainId);
        return data.topTokens
            .map((token) => {
            if (!token) {
                return undefined;
            }
            const isWeth = areAddressesEqual(token.address, wethAddress) && (token === null || token === void 0 ? void 0 : token.chain) === Chain.Ethereum;
            // manually replace weth with eth given backend only returns eth data as a proxy for eth
            if (isWeth && eth) {
                return eth;
            }
            return token;
        })
            .filter((t) => Boolean(t));
    }, [data, defaultChainId]);
    return { popularTokens, loading };
}
//# sourceMappingURL=hooks.js.map