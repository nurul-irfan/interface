import type { Address } from './Address';
import type { ChainId } from './ChainId';
import type { TradeType } from './TradeType';
export type LimitOrderQuoteRequest = {
    swapper: Address;
    limitPrice?: string;
    amount: string;
    orderDeadline?: number;
    type: TradeType;
    tokenIn: string;
    tokenOut: string;
    tokenInChainId: ChainId;
    tokenOutChainId: ChainId;
};
//# sourceMappingURL=LimitOrderQuoteRequest.d.ts.map