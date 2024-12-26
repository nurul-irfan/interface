import { config } from 'uniswap/src/config';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { createApiClient } from 'uniswap/src/data/apiClients/createApiClient';
import { UniversalRouterVersion, } from 'uniswap/src/data/tradingApi/__generated__';
export const TRADING_API_CACHE_KEY = 'TradingApi';
const TradingApiClient = createApiClient({
    baseUrl: uniswapUrls.tradingApiUrl,
    additionalHeaders: {
        'x-api-key': config.tradingApiKey,
    },
});
export async function fetchQuote({ v4Enabled, ...params }) {
    return await TradingApiClient.post(uniswapUrls.tradingApiPaths.quote, {
        body: JSON.stringify(params),
        headers: {
            'x-universal-router-version': v4Enabled ? UniversalRouterVersion._2_0 : UniversalRouterVersion._1_2,
        },
    });
}
export async function fetchIndicativeQuote(params) {
    return await TradingApiClient.post(uniswapUrls.tradingApiPaths.indicativeQuote, {
        body: JSON.stringify(params),
    });
}
export async function fetchSwap({ v4Enabled, ...params }) {
    return await TradingApiClient.post(uniswapUrls.tradingApiPaths.swap, {
        body: JSON.stringify(params),
        headers: {
            'x-universal-router-version': v4Enabled ? '2.0' : '1.2',
        },
    });
}
export async function fetchCheckApproval(params) {
    return await TradingApiClient.post(uniswapUrls.tradingApiPaths.approval, {
        body: JSON.stringify(params),
    });
}
export async function submitOrder(params) {
    return await TradingApiClient.post(uniswapUrls.tradingApiPaths.order, {
        body: JSON.stringify(params),
    });
}
export async function fetchOrders({ orderIds }) {
    return await TradingApiClient.get(uniswapUrls.tradingApiPaths.orders, {
        params: {
            orderIds: orderIds.join(','),
        },
    });
}
export async function fetchSwappableTokens(params) {
    return await TradingApiClient.get(uniswapUrls.tradingApiPaths.swappableTokens, {
        params: {
            tokenIn: params.tokenIn,
            tokenInChainId: params.tokenInChainId,
            ...(params.tokenOut && { tokenOut: params.tokenOut }),
            ...(params.tokenOutChainId && { tokenOutChainId: params.tokenOutChainId }),
        },
    });
}
export async function createLpPosition(params) {
    return await TradingApiClient.post(uniswapUrls.tradingApiPaths.createLp, {
        body: JSON.stringify({
            ...params,
        }),
    });
}
export async function decreaseLpPosition(params) {
    return await TradingApiClient.post(uniswapUrls.tradingApiPaths.decreaseLp, {
        body: JSON.stringify({
            ...params,
        }),
    });
}
export async function increaseLpPosition(params) {
    return await TradingApiClient.post(uniswapUrls.tradingApiPaths.increaseLp, {
        body: JSON.stringify({
            ...params,
        }),
    });
}
export async function checkLpApproval(params, headers) {
    return await TradingApiClient.post(uniswapUrls.tradingApiPaths.lpApproval, {
        body: JSON.stringify({
            ...params,
        }),
        headers,
    });
}
export async function claimLpFees(params) {
    return await TradingApiClient.post(uniswapUrls.tradingApiPaths.claimLpFees, {
        body: JSON.stringify({
            ...params,
        }),
    });
}
export async function fetchSwaps(params) {
    return await TradingApiClient.get(uniswapUrls.tradingApiPaths.swaps, {
        params: {
            txHashes: params.txHashes.join(','),
            chainId: params.chainId,
        },
    });
}
export async function migrateLpPosition(params) {
    return await TradingApiClient.post(uniswapUrls.tradingApiPaths.migrate, {
        body: JSON.stringify({
            ...params,
        }),
    });
}
//# sourceMappingURL=TradingApiClient.js.map