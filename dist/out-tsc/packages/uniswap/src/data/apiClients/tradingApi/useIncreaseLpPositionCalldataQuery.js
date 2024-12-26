import { skipToken, useQuery } from '@tanstack/react-query';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { TRADING_API_CACHE_KEY, increaseLpPosition } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
import { getTradeSettingsDeadline } from 'uniswap/src/data/apiClients/tradingApi/utils/getTradeSettingsDeadline';
export function useIncreaseLpPositionCalldataQuery({ params, deadlineInMinutes, ...rest }) {
    const queryKey = [TRADING_API_CACHE_KEY, uniswapUrls.tradingApiPaths.increaseLp, params];
    const deadline = getTradeSettingsDeadline(deadlineInMinutes);
    const paramsWithDeadline = { ...params, deadline };
    return useQuery({
        queryKey,
        queryFn: params
            ? async () => await increaseLpPosition(paramsWithDeadline)
            : skipToken,
        ...rest,
    });
}
//# sourceMappingURL=useIncreaseLpPositionCalldataQuery.js.map