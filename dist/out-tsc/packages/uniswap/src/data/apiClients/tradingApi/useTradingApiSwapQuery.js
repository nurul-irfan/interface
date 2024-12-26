import { skipToken } from '@tanstack/react-query';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { useQueryWithImmediateGarbageCollection } from 'uniswap/src/data/apiClients/hooks/useQueryWithImmediateGarbageCollection';
import { TRADING_API_CACHE_KEY, fetchSwap } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
export function useTradingApiSwapQuery({ params, ...rest }) {
    const queryKey = [TRADING_API_CACHE_KEY, uniswapUrls.tradingApiPaths.swap, params];
    return useQueryWithImmediateGarbageCollection({
        queryKey,
        queryFn: params ? async () => await fetchSwap(params) : skipToken,
        ...rest,
    });
}
//# sourceMappingURL=useTradingApiSwapQuery.js.map