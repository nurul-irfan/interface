import type { Address } from './Address';
import type { ChainId } from './ChainId';
import type { Position } from './Position';
import type { ProtocolItems } from './ProtocolItems';
export type MigrateLPPositionRequest = {
    tokenId: number;
    walletAddress: Address;
    chainId: ChainId;
    inputProtocol: ProtocolItems;
    inputPosition: Position;
    inputPoolLiquidity: string;
    inputCurrentTick: number;
    inputSqrtRatioX96: string;
    inputPositionLiquidity: string;
    signature?: string;
    amount0: string;
    amount1: string;
    outputProtocol: ProtocolItems;
    outputPosition: Position;
    initialPrice?: string;
    outputPoolLiquidity?: string;
    outputCurrentTick?: number;
    outputSqrtRatioX96?: string;
    expectedTokenOwed0RawAmount: string;
    expectedTokenOwed1RawAmount: string;
    slippageTolerance?: number;
    deadline?: number;
    signatureDeadline?: number;
    simulateTransaction?: boolean;
};
//# sourceMappingURL=MigrateLPPositionRequest.d.ts.map