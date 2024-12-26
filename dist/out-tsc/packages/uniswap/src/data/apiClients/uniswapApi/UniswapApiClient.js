import { config } from 'uniswap/src/config';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { createApiClient } from 'uniswap/src/data/apiClients/createApiClient';
import { isInterface } from 'utilities/src/platform';
export const UNISWAP_API_CACHE_KEY = 'UniswapApi';
const UniswapApiClient = createApiClient({
    baseUrl: uniswapUrls.apiBaseUrl,
    additionalHeaders: {
        'x-api-key': config.uniswapApiKey,
    },
    includeBaseUniswapHeaders: !isInterface,
});
export async function fetchGasFee(params) {
    return await UniswapApiClient.post(uniswapUrls.gasServicePath, {
        body: JSON.stringify(params),
    });
}
export async function fetchTrmScreen(params) {
    return await UniswapApiClient.post(uniswapUrls.trmPath, {
        body: JSON.stringify(params),
    });
}
//# sourceMappingURL=UniswapApiClient.js.map