import { skipToken } from '@tanstack/react-query';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { useQueryWithImmediateGarbageCollection } from 'uniswap/src/data/apiClients/hooks/useQueryWithImmediateGarbageCollection';
import { UNISWAP_API_CACHE_KEY, fetchGasFee } from 'uniswap/src/data/apiClients/uniswapApi/UniswapApiClient';
export function useGasFeeQuery({ params, ...rest }) {
    const queryKey = [UNISWAP_API_CACHE_KEY, uniswapUrls.gasServicePath, params];
    return useQueryWithImmediateGarbageCollection({
        queryKey,
        queryFn: params ? async () => await fetchGasFee(params) : skipToken,
        ...rest,
    });
}
//# sourceMappingURL=useGasFeeQuery.js.map