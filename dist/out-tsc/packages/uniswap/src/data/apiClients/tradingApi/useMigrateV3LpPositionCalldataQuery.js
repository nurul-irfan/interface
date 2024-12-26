import { skipToken, useQuery } from '@tanstack/react-query';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { TRADING_API_CACHE_KEY, migrateLpPosition } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
export function useMigrateV3LpPositionCalldataQuery({ params, ...rest }) {
    const queryKey = [TRADING_API_CACHE_KEY, uniswapUrls.tradingApiPaths.migrate, params];
    return useQuery({
        queryKey,
        queryFn: params ? async () => await migrateLpPosition(params) : skipToken,
        ...rest,
    });
}
//# sourceMappingURL=useMigrateV3LpPositionCalldataQuery.js.map