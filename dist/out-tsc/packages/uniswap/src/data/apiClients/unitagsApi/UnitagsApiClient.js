import { uniswapUrls } from 'uniswap/src/constants/urls';
import { createApiClient } from 'uniswap/src/data/apiClients/createApiClient';
export const UNITAGS_API_CACHE_KEY = 'UnitagsApi';
const UnitagsApiClient = createApiClient({
    baseUrl: uniswapUrls.unitagsApiUrl,
});
export async function fetchUsername(params) {
    return await UnitagsApiClient.get('/username', { params });
}
export async function fetchAddress(params) {
    return await UnitagsApiClient.get('/address', { params });
}
export async function fetchAddresses({ addresses }) {
    return await UnitagsApiClient.get(`/addresses?addresses=${encodeURIComponent(addresses.join(','))}`);
}
export async function fetchClaimEligibility(params) {
    return await UnitagsApiClient.get('/claim/eligibility', { params });
}
//# sourceMappingURL=UnitagsApiClient.js.map