import type { ApprovalRequest } from '../models/ApprovalRequest';
import type { ApprovalResponse } from '../models/ApprovalResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ApprovalService {
    /**
     * Check if token approval is required
     * Checks if the swapper has the required approval. If the swapper does not have the required approval, then the response will include the transaction to approve the token. If the swapper has the required approval, then the response will be empty. If the parameter `includeGasInfo` is set to `true`, then the response will include the gas fee for the approval transaction.
     * @returns ApprovalResponse Check approval successful.
     * @throws ApiError
     */
    static checkApproval({ requestBody, }: {
        requestBody?: ApprovalRequest;
    }): CancelablePromise<ApprovalResponse>;
}
//# sourceMappingURL=ApprovalService.d.ts.map