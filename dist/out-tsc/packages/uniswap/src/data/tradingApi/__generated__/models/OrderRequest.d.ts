import type { DutchQuote } from './DutchQuote';
import type { DutchQuoteV2 } from './DutchQuoteV2';
import type { PriorityQuote } from './PriorityQuote';
import type { Routing } from './Routing';
export type OrderRequest = {
    /**
     * The signed permit.
     */
    signature: string;
    quote: (DutchQuote | DutchQuoteV2 | PriorityQuote);
    routing?: Routing;
};
//# sourceMappingURL=OrderRequest.d.ts.map