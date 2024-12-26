import type { ChainId } from './ChainId';
import type { TradeType } from './TradeType';
export type IndicativeQuoteRequest = {
    type: TradeType;
    amount: string;
    tokenInChainId: ChainId;
    tokenOutChainId: ChainId;
    tokenIn: string;
    tokenOut: string;
};
//# sourceMappingURL=IndicativeQuoteRequest.d.ts.map