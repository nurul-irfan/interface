import { useMemo } from 'react';
import { useTokenQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { currencyIdToContractInput, gqlTokenToCurrencyInfo } from 'uniswap/src/features/dataApi/utils';
import { buildNativeCurrencyId, buildWrappedNativeCurrencyId } from 'uniswap/src/utils/currencyId';
export function useCurrencyInfo(_currencyId, options) {
    const { data } = useTokenQuery({
        variables: currencyIdToContractInput(_currencyId !== null && _currencyId !== void 0 ? _currencyId : ''),
        skip: !_currencyId || (options === null || options === void 0 ? void 0 : options.skip),
        fetchPolicy: (options === null || options === void 0 ? void 0 : options.refetch) ? 'cache-and-network' : 'cache-first',
    });
    return useMemo(() => {
        if (!(data === null || data === void 0 ? void 0 : data.token) || !_currencyId) {
            return undefined;
        }
        return gqlTokenToCurrencyInfo(data.token);
    }, [data, _currencyId]);
}
export function useNativeCurrencyInfo(chainId) {
    const nativeCurrencyId = buildNativeCurrencyId(chainId);
    return useCurrencyInfo(nativeCurrencyId);
}
export function useWrappedNativeCurrencyInfo(chainId) {
    const wrappedCurrencyId = buildWrappedNativeCurrencyId(chainId);
    return useCurrencyInfo(wrappedCurrencyId);
}
//# sourceMappingURL=useCurrencyInfo.js.map