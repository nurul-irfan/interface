import type { QuoteRequest } from '../models/QuoteRequest';
import type { QuoteResponse } from '../models/QuoteResponse';
import type { UniversalRouterVersion } from '../models/UniversalRouterVersion';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class QuoteService {
    /**
     * Get a quote
     * Get a quote according to the provided configuration. Optionally adds a fee to the quote according to the API key being used. The fee is **ALWAYS** taken from the output token. If there is a fee and the trade is `EXACT_INPUT`, then the output amount will **NOT** include the fee subtraction. For `EXACT_INPUT` swaps, use `portionBips` to calculate the fee from the quoted amount. If there is a fee and the trade is `EXACT_OUTPUT`, then the input amount will **NOT** include the fee addition to account for the fee. For `EXACT_OUTPUT` swaps, use `portionAmount` to get the fee.
     *
     * We also support Wrapping and Unwrapping of native tokens on their respective chains. Wrapping and Unwrapping only works for when `routingPreference` is `CLASSIC`, `BEST_PRICE`, or `BEST_PRICE_V2`. We do not support `UNISWAPX` or `UNISWAPX_V2` for these actions.
     * @returns QuoteResponse Quote request successful.
     * @throws ApiError
     */
    static aggregatorQuote({ xUniversalRouterVersion, requestBody, }: {
        /**
         * The version of the Universal Router to use for the swap journey. *MUST* be consistent throughout the API calls.
         */
        xUniversalRouterVersion?: UniversalRouterVersion;
        requestBody?: QuoteRequest;
    }): CancelablePromise<QuoteResponse>;
}
//# sourceMappingURL=QuoteService.d.ts.map