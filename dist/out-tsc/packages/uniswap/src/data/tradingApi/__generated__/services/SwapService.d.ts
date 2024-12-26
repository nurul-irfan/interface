import type { ChainId } from '../models/ChainId';
import type { CreateSwapRequest } from '../models/CreateSwapRequest';
import type { CreateSwapResponse } from '../models/CreateSwapResponse';
import type { GetSwapsResponse } from '../models/GetSwapsResponse';
import type { TransactionHash } from '../models/TransactionHash';
import type { UniversalRouterVersion } from '../models/UniversalRouterVersion';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class SwapService {
    /**
     * Create swap calldata
     * Create the calldata for a swap transaction (including wrap/unwrap) against the Uniswap Protocols. If the `quote` parameter includes the fee parameters, then the calldata will include the fee disbursement. The gas estimates will be **more precise** when the the response calldata would be valid if submitted on-chain.
     * @returns CreateSwapResponse Create swap successful.
     * @throws ApiError
     */
    static createSwapTransaction({ xUniversalRouterVersion, requestBody, }: {
        /**
         * The version of the Universal Router to use for the swap journey. *MUST* be consistent throughout the API calls.
         */
        xUniversalRouterVersion?: UniversalRouterVersion;
        requestBody?: CreateSwapRequest;
    }): CancelablePromise<CreateSwapResponse>;
    /**
     * Get swaps status
     * Get the status of a swap or bridge transactions.
     * @returns GetSwapsResponse Get swap successful.
     * @throws ApiError
     */
    static getSwaps({ txHashes, chainId, }: {
        /**
         * The transaction hashes.
         */
        txHashes: Array<TransactionHash>;
        chainId?: ChainId;
    }): CancelablePromise<GetSwapsResponse>;
}
//# sourceMappingURL=SwapService.d.ts.map