import { skipToken } from '@tanstack/react-query';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { useQueryWithImmediateGarbageCollection } from 'uniswap/src/data/apiClients/hooks/useQueryWithImmediateGarbageCollection';
import { TRADING_API_CACHE_KEY, fetchCheckApproval } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
export function useCheckApprovalQuery({ params, ...rest }) {
    const queryKey = [TRADING_API_CACHE_KEY, uniswapUrls.tradingApiPaths.approval, params];
    return useQueryWithImmediateGarbageCollection({
        queryKey,
        queryFn: params ? async () => await fetchCheckApproval(params) : skipToken,
        ...rest,
    });
}
//# sourceMappingURL=useCheckApprovalQuery.js.map