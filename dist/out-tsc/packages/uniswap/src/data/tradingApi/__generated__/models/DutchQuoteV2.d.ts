import type { Address } from './Address';
import type { ClassicGasUseEstimateUSD } from './ClassicGasUseEstimateUSD';
import type { DutchOrderInfoV2 } from './DutchOrderInfoV2';
export type DutchQuoteV2 = {
    encodedOrder: string;
    orderId: string;
    orderInfo: DutchOrderInfoV2;
    portionBips?: number;
    portionAmount?: string;
    portionRecipient?: Address;
    quoteId?: string;
    slippageTolerance?: number;
    deadlineBufferSecs?: number;
    classicGasUseEstimateUSD?: ClassicGasUseEstimateUSD;
};
//# sourceMappingURL=DutchQuoteV2.d.ts.map