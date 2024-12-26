import type { Address } from './Address';
import type { ClassicGasUseEstimateUSD } from './ClassicGasUseEstimateUSD';
import type { PriorityOrderInfo } from './PriorityOrderInfo';
export type PriorityQuote = {
    encodedOrder: string;
    orderId: string;
    orderInfo: PriorityOrderInfo;
    portionBips?: number;
    portionAmount?: string;
    portionRecipient?: Address;
    quoteId?: string;
    slippageTolerance?: number;
    deadlineBufferSecs?: number;
    classicGasUseEstimateUSD?: ClassicGasUseEstimateUSD;
    expectedAmountIn?: string;
    expectedAmountOut?: string;
};
//# sourceMappingURL=PriorityQuote.d.ts.map