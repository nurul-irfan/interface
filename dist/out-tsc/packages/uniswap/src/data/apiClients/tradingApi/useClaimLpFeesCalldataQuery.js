import { skipToken, useQuery } from '@tanstack/react-query';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { TRADING_API_CACHE_KEY, claimLpFees } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
export function useClaimLpFeesCalldataQuery({ params, ...rest }) {
    const queryKey = [TRADING_API_CACHE_KEY, uniswapUrls.tradingApiPaths.claimLpFees, params];
    return useQuery({
        queryKey,
        queryFn: params ? async () => await claimLpFees(params) : skipToken,
        ...rest,
    });
}
//# sourceMappingURL=useClaimLpFeesCalldataQuery.js.map