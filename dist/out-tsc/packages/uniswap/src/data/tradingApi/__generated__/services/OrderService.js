import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrderService {
    /**
     * Create a gasless order
     * Submits a new gasless encoded order. The order will be validated and if valid, will be submitted to the filler network. The network will try to fill the order at the quoted `startAmount`, and if not, the amount will start decaying until the `endAmount` is reached. While the order is within `decayEndTime`, the `orderStatus` is `open`. If the order does not get filled after the `decayEndTime` has passed, that is reflected in the `expired` `orderStatus`. then  The order will be filled at the best price possible. Once the order is filled, `orderStatus` becomes `filled`.
     * @returns OrderResponse Encoded order submitted.
     * @throws ApiError
     */
    static postOrder({ requestBody, }) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RequestValidationError, Bad Input`,
                401: `UnauthorizedError eg. Account is blocked.`,
                419: `Ratelimited`,
                500: `Unexpected error`,
                504: `Request duration limit reached.`,
            },
        });
    }
    /**
     * Get gasless orders
     * Retrieve gasless orders filtered by query param(s). Some fields on the order can be used as query param.
     * @returns GetOrdersResponse The request orders matching the query parameters.
     * @throws ApiError
     */
    static getOrder({ orderType, orderId, orderIds, limit, orderStatus, swapper, sortKey, sort, filler, cursor, }) {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders',
            query: {
                'orderType': orderType,
                'orderId': orderId,
                'orderIds': orderIds,
                'limit': limit,
                'orderStatus': orderStatus,
                'swapper': swapper,
                'sortKey': sortKey,
                'sort': sort,
                'filler': filler,
                'cursor': cursor,
            },
            errors: {
                400: `RequestValidationError eg. Token allowance not valid or Insufficient Funds.`,
                404: `Orders not found.`,
                419: `Ratelimited`,
                500: `Unexpected error`,
                504: `Request duration limit reached.`,
            },
        });
    }
}
//# sourceMappingURL=OrderService.js.map