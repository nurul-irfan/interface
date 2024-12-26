import type { CreateSendRequest } from '../models/CreateSendRequest';
import type { CreateSendResponse } from '../models/CreateSendResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class SendService {
    /**
     * Create send calldata
     * Create the calldata for a send transaction.
     * @returns CreateSendResponse Create send successful.
     * @throws ApiError
     */
    static createSend({ requestBody, }: {
        requestBody?: CreateSendRequest;
    }): CancelablePromise<CreateSendResponse>;
}
//# sourceMappingURL=SendService.d.ts.map