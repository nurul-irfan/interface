import { skipToken, useQuery } from '@tanstack/react-query';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { TRADING_API_CACHE_KEY, decreaseLpPosition } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
import { getTradeSettingsDeadline } from 'uniswap/src/data/apiClients/tradingApi/utils/getTradeSettingsDeadline';
export function useDecreaseLpPositionCalldataQuery({ params, deadlineInMinutes, ...rest }) {
    const queryKey = [TRADING_API_CACHE_KEY, uniswapUrls.tradingApiPaths.decreaseLp, params];
    const deadline = getTradeSettingsDeadline(deadlineInMinutes);
    const paramsWithDeadline = { ...params, deadline };
    return useQuery({
        queryKey,
        queryFn: params
            ? async () => await decreaseLpPosition(paramsWithDeadline)
            : skipToken,
        ...rest,
    });
}
//# sourceMappingURL=useDecreaseLpPositionCalldataQuery.js.map