import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LiquidityService {
    /**
     * Check if tokens and permits need to be approved to add liquidity
     * Checks if the wallet address has the required approvals. If the wallet address does not have the required approval, then the response will include the transactions to approve the tokens. If the wallet address has the required approval, then the response will be empty for the corresponding tokens. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the approval transactions.
     * @returns CheckApprovalLPResponse Approve LP successful.
     * @throws ApiError
     */
    static checkApprovalLp({ requestBody, }) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lp/approve',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RequestValidationError, Bad Input`,
                401: `UnauthorizedError eg. Account is blocked.`,
                404: `ResourceNotFound eg. Token allowance not found or Gas info not found.`,
                419: `Ratelimited`,
                500: `Unexpected error`,
                504: `Request duration limit reached.`,
            },
        });
    }
    /**
     * Create pool and position calldata
     * Create pool and position calldata. If the pool is not yet created, then the response will include the transaction to create the new pool with the initial price. If the pool is already created, then the response will not have the transaction to create the pool. The response will also have the transaction to create the position for the corresponding pool. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the creation transactions.
     * @returns CreateLPPositionResponse Create LP Position successful.
     * @throws ApiError
     */
    static createLpPosition({ requestBody, }) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lp/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RequestValidationError, Bad Input`,
                401: `UnauthorizedError eg. Account is blocked.`,
                404: `ResourceNotFound eg. Cant Find LP Position.`,
                419: `Ratelimited`,
                500: `Unexpected error`,
                504: `Request duration limit reached.`,
            },
        });
    }
    /**
     * Increase LP position calldata
     * The response will also have the transaction to increase the position for the corresponding pool. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the increase transaction.
     * @returns IncreaseLPPositionResponse Create LP Position successful.
     * @throws ApiError
     */
    static increaseLpPosition({ requestBody, }) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lp/increase',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RequestValidationError, Bad Input`,
                401: `UnauthorizedError eg. Account is blocked.`,
                404: `ResourceNotFound eg. Cant Find LP Position.`,
                419: `Ratelimited`,
                500: `Unexpected error`,
                504: `Request duration limit reached.`,
            },
        });
    }
    /**
     * Decrease LP position calldata
     * The response will also have the transaction to decrease the position for the corresponding pool. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the decrease transaction.
     * @returns DecreaseLPPositionResponse Decrease LP Position successful.
     * @throws ApiError
     */
    static decreaseLpPosition({ requestBody, }) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lp/decrease',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RequestValidationError, Bad Input`,
                401: `UnauthorizedError eg. Account is blocked.`,
                404: `ResourceNotFound eg. Cant Find LP Position.`,
                419: `Ratelimited`,
                500: `Unexpected error`,
                504: `Request duration limit reached.`,
            },
        });
    }
    /**
     * Claim LP fees calldata
     * The response will also have the transaction to claim the fees for an LP position for the corresponding pool. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the claim transaction.
     * @returns ClaimLPFeesResponse Claim LP Fees successful.
     * @throws ApiError
     */
    static claimLpFees({ requestBody, }) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lp/claim',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RequestValidationError, Bad Input`,
                401: `UnauthorizedError eg. Account is blocked.`,
                404: `ResourceNotFound eg. Cant Find LP Position.`,
                419: `Ratelimited`,
                500: `Unexpected error`,
                504: `Request duration limit reached.`,
            },
        });
    }
    /**
     * Migrate LP position calldata
     * The response will also have the transaction to migrate the position for the corresponding pool. If the parameter `simulateTransaction` is set to `true`, then the response will include the gas fees for the migrate transaction.
     * @returns MigrateLPPositionResponse Migrate LP Position successful.
     * @throws ApiError
     */
    static migrateLpPosition({ requestBody, }) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/lp/migrate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RequestValidationError, Bad Input`,
                401: `UnauthorizedError eg. Account is blocked.`,
                404: `ResourceNotFound eg. Cant Find LP Position.`,
                419: `Ratelimited`,
                500: `Unexpected error`,
                504: `Request duration limit reached.`,
            },
        });
    }
}
//# sourceMappingURL=LiquidityService.js.map