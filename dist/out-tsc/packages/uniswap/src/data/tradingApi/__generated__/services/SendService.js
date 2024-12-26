import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SendService {
    /**
     * Create send calldata
     * Create the calldata for a send transaction.
     * @returns CreateSendResponse Create send successful.
     * @throws ApiError
     */
    static createSend({ requestBody, }) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/send',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RequestValidationError, Bad Input`,
                401: `UnauthorizedError eg. Account is blocked.`,
                404: `ResourceNotFound eg. Gas fee not available`,
                429: `Ratelimited`,
                500: `Unexpected error`,
                504: `Request duration limit reached.`,
            },
        });
    }
}
//# sourceMappingURL=SendService.js.map