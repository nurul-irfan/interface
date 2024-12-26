import { config } from 'uniswap/src/config';
import { createApiClient } from 'uniswap/src/data/apiClients/createApiClient';
export const SIMPLE_HASH_API_CACHE_KEY = 'SimpleHashApi';
const SimpleHashApiClient = createApiClient({
    baseUrl: `${config.simpleHashApiUrl}/api/v0`,
    includeBaseUniswapHeaders: false,
    additionalHeaders: {
        'x-api-key': config.simpleHashApiKey,
    },
});
export async function reportNftSpamToSimpleHash(params) {
    return await SimpleHashApiClient.post('/nfts/report/spam', {
        body: JSON.stringify({
            contract_address: params.contractAddress,
            token_id: params.tokenId,
            chain_id: params.networkName,
            event_type: 'label_spam',
        }),
    });
}
//# sourceMappingURL=SimpleHashApiClient.js.map