import type { Address } from '../models/Address';
import type { GetOrdersResponse } from '../models/GetOrdersResponse';
import type { OrderId } from '../models/OrderId';
import type { OrderIds } from '../models/OrderIds';
import type { OrderRequest } from '../models/OrderRequest';
import type { OrderResponse } from '../models/OrderResponse';
import type { OrderStatus } from '../models/OrderStatus';
import type { OrderTypeQuery } from '../models/OrderTypeQuery';
import type { SortKey } from '../models/SortKey';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class OrderService {
    /**
     * Create a gasless order
     * Submits a new gasless encoded order. The order will be validated and if valid, will be submitted to the filler network. The network will try to fill the order at the quoted `startAmount`, and if not, the amount will start decaying until the `endAmount` is reached. While the order is within `decayEndTime`, the `orderStatus` is `open`. If the order does not get filled after the `decayEndTime` has passed, that is reflected in the `expired` `orderStatus`. then  The order will be filled at the best price possible. Once the order is filled, `orderStatus` becomes `filled`.
     * @returns OrderResponse Encoded order submitted.
     * @throws ApiError
     */
    static postOrder({ requestBody, }: {
        requestBody?: OrderRequest;
    }): CancelablePromise<OrderResponse>;
    /**
     * Get gasless orders
     * Retrieve gasless orders filtered by query param(s). Some fields on the order can be used as query param.
     * @returns GetOrdersResponse The request orders matching the query parameters.
     * @throws ApiError
     */
    static getOrder({ orderType, orderId, orderIds, limit, orderStatus, swapper, sortKey, sort, filler, cursor, }: {
        /**
         * The default orderType is Dutch_V1_V2 and will grab both Dutch and Dutch_V2 orders.
         */
        orderType?: OrderTypeQuery;
        orderId?: OrderId;
        /**
         * ids split by commas
         */
        orderIds?: OrderIds;
        limit?: number;
        /**
         * Filter by order status.
         */
        orderStatus?: OrderStatus;
        /**
         * Filter by swapper address.
         */
        swapper?: Address;
        /**
         * Order the query results by the sort key.
         */
        sortKey?: SortKey;
        /**
         * Sort query. For example: `sort=gt(UNIX_TIMESTAMP)`, `sort=between(1675872827, 1675872930)`, or `lt(1675872930)`.
         */
        sort?: string;
        /**
         * Filter by filler address.
         */
        filler?: Address;
        cursor?: string;
    }): CancelablePromise<GetOrdersResponse>;
}
//# sourceMappingURL=OrderService.d.ts.map