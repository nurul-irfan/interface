/// <reference types="react" />
import { UniverseChainId } from 'uniswap/src/features/chains/types';
interface RecipientSelectSpeedBumpsProps {
    recipientAddress?: string;
    chainId?: UniverseChainId;
    checkSpeedBumps: boolean;
    setCheckSpeedBumps: (value: boolean) => void;
    onConfirm: () => void;
}
export declare function RecipientSelectSpeedBumps({ recipientAddress, checkSpeedBumps, chainId, ...rest }: RecipientSelectSpeedBumpsProps): JSX.Element | null;
export {};
//# sourceMappingURL=RecipientSelectSpeedBumps.d.ts.map