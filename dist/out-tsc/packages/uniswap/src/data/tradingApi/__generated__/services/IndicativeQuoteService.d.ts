import type { IndicativeQuoteRequest } from '../models/IndicativeQuoteRequest';
import type { IndicativeQuoteResponse } from '../models/IndicativeQuoteResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class IndicativeQuoteService {
    /**
     * Get an indicative quote
     * Get an indicative quote according to the provided configuration. The quote will not include a fee.
     * @returns IndicativeQuoteResponse Indicative quote request successful.
     * @throws ApiError
     */
    static indicativeQuote({ requestBody, }: {
        requestBody?: IndicativeQuoteRequest;
    }): CancelablePromise<IndicativeQuoteResponse>;
}
//# sourceMappingURL=IndicativeQuoteService.d.ts.map