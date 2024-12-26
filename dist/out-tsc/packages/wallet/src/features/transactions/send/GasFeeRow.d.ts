/// <reference types="react" />
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { GasFeeResult } from 'uniswap/src/features/gas/types';
type GasFeeRowProps = {
    gasFee: GasFeeResult;
    chainId: UniverseChainId;
};
export declare function GasFeeRow({ gasFee, chainId }: GasFeeRowProps): JSX.Element | null;
export {};
//# sourceMappingURL=GasFeeRow.d.ts.map