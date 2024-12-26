import type { Address } from './Address';
import type { ChainId } from './ChainId';
import type { PriorityInput } from './PriorityInput';
import type { PriorityOutput } from './PriorityOutput';
export type PriorityOrderInfo = {
    chainId: ChainId;
    nonce: string;
    reactor: string;
    swapper: string;
    deadline: number;
    additionalValidationContract?: string;
    additionalValidationData?: string;
    auctionStartBlock: string;
    baselinePriorityFeeWei: string;
    input: PriorityInput;
    outputs: Array<PriorityOutput>;
    cosigner: Address;
};
//# sourceMappingURL=PriorityOrderInfo.d.ts.map