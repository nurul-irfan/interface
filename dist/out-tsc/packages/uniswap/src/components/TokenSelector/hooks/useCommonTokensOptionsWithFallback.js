import { useCommonTokensOptions } from 'uniswap/src/components/TokenSelector/hooks/useCommonTokensOptions';
import { currencyInfosToTokenOptions } from 'uniswap/src/components/TokenSelector/hooks/useCurrencyInfosToTokenOptions';
import { COMMON_BASES } from 'uniswap/src/constants/routing';
export function useCommonTokensOptionsWithFallback(address, chainFilter) {
    const { data, error, refetch, loading } = useCommonTokensOptions(address, chainFilter);
    const commonBases = chainFilter ? currencyInfosToTokenOptions(COMMON_BASES[chainFilter]) : undefined;
    const shouldFallback = !loading && (data === null || data === void 0 ? void 0 : data.length) === 0 && (commonBases === null || commonBases === void 0 ? void 0 : commonBases.length);
    return {
        data: shouldFallback ? commonBases : data,
        error: shouldFallback ? undefined : error,
        refetch,
        loading,
    };
}
//# sourceMappingURL=useCommonTokensOptionsWithFallback.js.map