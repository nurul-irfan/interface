import type { Address } from './Address';
import type { ChainId } from './ChainId';
import type { Permit } from './Permit';
import type { Position } from './Position';
import type { ProtocolItems } from './ProtocolItems';
export type CreateLPPositionRequest = {
    protocol?: ProtocolItems;
    position?: Position;
    walletAddress?: Address;
    chainId?: ChainId;
    initialPrice?: string;
    poolLiquidity?: string;
    currentTick?: number;
    sqrtRatioX96?: string;
    amount0?: string;
    amount1?: string;
    slippageTolerance?: number;
    deadline?: number;
    /**
     * The signed permit.
     */
    signature?: string;
    batchPermitData?: Permit;
    simulateTransaction?: boolean;
};
//# sourceMappingURL=CreateLPPositionRequest.d.ts.map