import { skipToken, useQuery } from '@tanstack/react-query';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { TRADING_API_CACHE_KEY, fetchIndicativeQuote } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
import { logSwapQuoteFetch } from 'uniswap/src/features/transactions/swap/analytics';
export function useTradingApiIndicativeQuoteQuery({ params, ...rest }) {
    const queryKey = [TRADING_API_CACHE_KEY, uniswapUrls.tradingApiPaths.indicativeQuote, params];
    return useQuery({
        queryKey,
        queryFn: params
            ? async () => {
                if (params.tokenInChainId) {
                    logSwapQuoteFetch({ chainId: params.tokenInChainId, isQuickRoute: true });
                }
                return await fetchIndicativeQuote(params);
            }
            : skipToken,
        ...rest,
    });
}
//# sourceMappingURL=useTradingApiIndicativeQuoteQuery.js.map