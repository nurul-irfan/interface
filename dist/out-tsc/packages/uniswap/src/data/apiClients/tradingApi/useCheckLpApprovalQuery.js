import { skipToken, useQuery } from '@tanstack/react-query';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { TRADING_API_CACHE_KEY, checkLpApproval } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
export function useCheckLpApprovalQuery({ params, headers, ...rest }) {
    const queryKey = [TRADING_API_CACHE_KEY, uniswapUrls.tradingApiPaths.lpApproval, params];
    return useQuery({
        queryKey,
        queryFn: params
            ? async () => await checkLpApproval(params, headers)
            : skipToken,
        ...rest,
    });
}
//# sourceMappingURL=useCheckLpApprovalQuery.js.map