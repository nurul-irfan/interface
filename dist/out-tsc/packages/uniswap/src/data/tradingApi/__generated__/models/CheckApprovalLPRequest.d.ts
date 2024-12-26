import type { Address } from './Address';
import type { ChainId } from './ChainId';
import type { ProtocolItems } from './ProtocolItems';
export type CheckApprovalLPRequest = {
    protocol?: ProtocolItems;
    token0?: Address;
    token1?: Address;
    positionToken?: Address;
    chainId?: ChainId;
    walletAddress?: Address;
    amount0?: string;
    amount1?: string;
    positionAmount?: string;
    simulateTransaction?: boolean;
};
//# sourceMappingURL=CheckApprovalLPRequest.d.ts.map