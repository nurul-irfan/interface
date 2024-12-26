import { skipToken, useQuery } from '@tanstack/react-query';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { UNISWAP_API_CACHE_KEY, fetchTrmScreen, } from 'uniswap/src/data/apiClients/uniswapApi/UniswapApiClient';
export function useTrmScreenQuery({ params, ...rest }) {
    const queryKey = [UNISWAP_API_CACHE_KEY, uniswapUrls.trmPath, params];
    return useQuery({
        queryKey,
        queryFn: params ? async () => await fetchTrmScreen(params) : skipToken,
        ...rest,
    });
}
//# sourceMappingURL=useTrmScreenQuery.js.map