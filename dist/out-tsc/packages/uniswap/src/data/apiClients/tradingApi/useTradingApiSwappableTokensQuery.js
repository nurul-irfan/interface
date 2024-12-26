import { skipToken, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { TRADING_API_CACHE_KEY, fetchSwappableTokens } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
import { getTokenAddressFromChainForTradingApi, toTradingApiSupportedChainId, } from 'uniswap/src/features/transactions/swap/utils/tradingApi';
import { logger } from 'utilities/src/logger/logger';
export function useTradingApiSwappableTokensQuery({ params, ...rest }) {
    const queryKey = swappableTokensQueryKey(params);
    return useQuery({
        queryKey,
        queryFn: params ? swappableTokensQueryFn(params) : skipToken,
        ...rest,
    });
}
export function usePrefetchSwappableTokens(input) {
    const queryClient = useQueryClient();
    useEffect(() => {
        const prefetchSwappableTokens = async () => {
            const tokenIn = (input === null || input === void 0 ? void 0 : input.address) ? getTokenAddressFromChainForTradingApi(input.address, input.chainId) : undefined;
            const tokenInChainId = toTradingApiSupportedChainId(input === null || input === void 0 ? void 0 : input.chainId);
            if (!tokenIn || !tokenInChainId) {
                return;
            }
            await queryClient.prefetchQuery({
                queryKey: swappableTokensQueryKey({
                    tokenIn,
                    tokenInChainId,
                }),
                queryFn: swappableTokensQueryFn({
                    tokenIn,
                    tokenInChainId,
                }),
            });
        };
        prefetchSwappableTokens().catch((e) => {
            logger.error(e, {
                tags: { file: 'useTradingApiSwappableTokensQuery', function: 'prefetchSwappableTokens' },
            });
        });
    }, [input, queryClient]);
}
const swappableTokensQueryKey = (params) => {
    return [TRADING_API_CACHE_KEY, uniswapUrls.tradingApiPaths.swappableTokens, params === null || params === void 0 ? void 0 : params.tokenIn, params === null || params === void 0 ? void 0 : params.tokenInChainId];
};
const swappableTokensQueryFn = (params) => {
    return async () => await fetchSwappableTokens(params);
};
//# sourceMappingURL=useTradingApiSwappableTokensQuery.js.map