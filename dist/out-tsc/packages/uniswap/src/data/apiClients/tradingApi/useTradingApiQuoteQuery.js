import { skipToken } from '@tanstack/react-query';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { useQueryWithImmediateGarbageCollection } from 'uniswap/src/data/apiClients/hooks/useQueryWithImmediateGarbageCollection';
import { TRADING_API_CACHE_KEY, fetchQuote, } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
import { logSwapQuoteFetch } from 'uniswap/src/features/transactions/swap/analytics';
export function useTradingApiQuoteQuery({ params, ...rest }) {
    const queryKey = [TRADING_API_CACHE_KEY, uniswapUrls.tradingApiPaths.quote, params];
    return useQueryWithImmediateGarbageCollection({
        queryKey,
        queryFn: params
            ? async () => {
                const { isUSDQuote, ...fetchParams } = params;
                if (fetchParams.tokenInChainId) {
                    logSwapQuoteFetch({ chainId: fetchParams.tokenInChainId, isUSDQuote });
                }
                return await fetchQuote(fetchParams);
            }
            : skipToken,
        ...rest,
    });
}
//# sourceMappingURL=useTradingApiQuoteQuery.js.map