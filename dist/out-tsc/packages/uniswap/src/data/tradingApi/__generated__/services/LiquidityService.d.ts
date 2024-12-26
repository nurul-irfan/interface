import type { CheckApprovalLPRequest } from '../models/CheckApprovalLPRequest';
import type { CheckApprovalLPResponse } from '../models/CheckApprovalLPResponse';
import type { ClaimLPFeesRequest } from '../models/ClaimLPFeesRequest';
import type { ClaimLPFeesResponse } from '../models/ClaimLPFeesResponse';
import type { CreateLPPositionRequest } from '../models/CreateLPPositionRequest';
import type { CreateLPPositionResponse } from '../models/CreateLPPositionResponse';
import type { DecreaseLPPositionRequest } from '../models/DecreaseLPPositionRequest';
import type { DecreaseLPPositionResponse } from '../models/DecreaseLPPositionResponse';
import type { IncreaseLPPositionRequest } from '../models/IncreaseLPPositionRequest';
import type { IncreaseLPPositionResponse } from '../models/IncreaseLPPositionResponse';
import type { MigrateLPPositionRequest } from '../models/MigrateLPPositionRequest';
import type { MigrateLPPositionResponse } from '../models/MigrateLPPositionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class LiquidityService {
    /**
     * Check if tokens and permits need to be approved to add liquidity
     * Checks if the wallet address has the required approvals. If the wallet address does not have the required approval, then the response will include the transactions to approve the tokens. If the wallet address has the required approval, then the response will be empty for the corresponding tokens. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the approval transactions.
     * @returns CheckApprovalLPResponse Approve LP successful.
     * @throws ApiError
     */
    static checkApprovalLp({ requestBody, }: {
        requestBody?: CheckApprovalLPRequest;
    }): CancelablePromise<CheckApprovalLPResponse>;
    /**
     * Create pool and position calldata
     * Create pool and position calldata. If the pool is not yet created, then the response will include the transaction to create the new pool with the initial price. If the pool is already created, then the response will not have the transaction to create the pool. The response will also have the transaction to create the position for the corresponding pool. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the creation transactions.
     * @returns CreateLPPositionResponse Create LP Position successful.
     * @throws ApiError
     */
    static createLpPosition({ requestBody, }: {
        requestBody?: CreateLPPositionRequest;
    }): CancelablePromise<CreateLPPositionResponse>;
    /**
     * Increase LP position calldata
     * The response will also have the transaction to increase the position for the corresponding pool. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the increase transaction.
     * @returns IncreaseLPPositionResponse Create LP Position successful.
     * @throws ApiError
     */
    static increaseLpPosition({ requestBody, }: {
        requestBody?: IncreaseLPPositionRequest;
    }): CancelablePromise<IncreaseLPPositionResponse>;
    /**
     * Decrease LP position calldata
     * The response will also have the transaction to decrease the position for the corresponding pool. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the decrease transaction.
     * @returns DecreaseLPPositionResponse Decrease LP Position successful.
     * @throws ApiError
     */
    static decreaseLpPosition({ requestBody, }: {
        requestBody?: DecreaseLPPositionRequest;
    }): CancelablePromise<DecreaseLPPositionResponse>;
    /**
     * Claim LP fees calldata
     * The response will also have the transaction to claim the fees for an LP position for the corresponding pool. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the claim transaction.
     * @returns ClaimLPFeesResponse Claim LP Fees successful.
     * @throws ApiError
     */
    static claimLpFees({ requestBody, }: {
        requestBody?: ClaimLPFeesRequest;
    }): CancelablePromise<ClaimLPFeesResponse>;
    /**
     * Migrate LP position calldata
     * The response will also have the transaction to migrate the position for the corresponding pool. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the migrate transaction.
     * @returns MigrateLPPositionResponse Migrate LP Position successful.
     * @throws ApiError
     */
    static migrateLpPosition({ requestBody, }: {
        requestBody?: MigrateLPPositionRequest;
    }): CancelablePromise<MigrateLPPositionResponse>;
}
//# sourceMappingURL=LiquidityService.d.ts.map