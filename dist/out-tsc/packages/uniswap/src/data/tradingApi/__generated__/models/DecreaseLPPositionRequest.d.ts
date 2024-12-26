import type { Address } from './Address';
import type { ChainId } from './ChainId';
import type { Position } from './Position';
import type { ProtocolItems } from './ProtocolItems';
export type DecreaseLPPositionRequest = {
    protocol?: ProtocolItems;
    tokenId?: number;
    position?: Position;
    walletAddress?: Address;
    chainId?: ChainId;
    liquidityPercentageToDecrease?: number;
    liquidity0?: string;
    liquidity1?: string;
    slippageTolerance?: number;
    poolLiquidity?: string;
    currentTick?: number;
    sqrtRatioX96?: string;
    positionLiquidity?: string;
    expectedTokenOwed0RawAmount?: string;
    expectedTokenOwed1RawAmount?: string;
    collectAsWETH?: boolean;
    deadline?: number;
    simulateTransaction?: boolean;
};
//# sourceMappingURL=DecreaseLPPositionRequest.d.ts.map