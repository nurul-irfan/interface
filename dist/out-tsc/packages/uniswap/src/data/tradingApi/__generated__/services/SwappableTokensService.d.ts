import type { Address } from '../models/Address';
import type { ChainId } from '../models/ChainId';
import type { GetSwappableTokensResponse } from '../models/GetSwappableTokensResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class SwappableTokensService {
    /**
     * Get swappable tokens
     * Get the swappable tokens for the given configuration. Either tokenIn (with tokenInChainId or (tokenInChainId and tokenOutChainId)) or tokenOut (with tokenOutChainId or (tokenOutChainId and tokenInChainId)) must be provided but not both.
     * @returns GetSwappableTokensResponse Get swappable tokens successful.
     * @throws ApiError
     */
    static getSwappableTokens({ tokenIn, tokenOut, tokenInChainId, tokenOutChainId, }: {
        tokenIn?: Address;
        tokenOut?: Address;
        tokenInChainId?: ChainId;
        tokenOutChainId?: ChainId;
    }): CancelablePromise<GetSwappableTokensResponse>;
}
//# sourceMappingURL=SwappableTokensService.d.ts.map