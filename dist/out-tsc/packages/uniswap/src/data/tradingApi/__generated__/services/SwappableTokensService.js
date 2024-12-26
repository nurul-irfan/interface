import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SwappableTokensService {
    /**
     * Get swappable tokens
     * Get the swappable tokens for the given configuration. Either tokenIn (with tokenInChainId or (tokenInChainId and tokenOutChainId)) or tokenOut (with tokenOutChainId or (tokenOutChainId and tokenInChainId)) must be provided but not both.
     * @returns GetSwappableTokensResponse Get swappable tokens successful.
     * @throws ApiError
     */
    static getSwappableTokens({ tokenIn, tokenOut, tokenInChainId, tokenOutChainId, }) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/swappable_tokens',
            query: {
                'tokenIn': tokenIn,
                'tokenOut': tokenOut,
                'tokenInChainId': tokenInChainId,
                'tokenOutChainId': tokenOutChainId,
            },
            errors: {
                400: `RequestValidationError, Bad Input`,
                401: `UnauthorizedError eg. Account is blocked.`,
                404: `ResourceNotFound eg. No quotes available or Gas fee/price not available`,
                429: `Ratelimited`,
                500: `Unexpected error`,
                504: `Request duration limit reached.`,
            },
        });
    }
}
//# sourceMappingURL=SwappableTokensService.js.map