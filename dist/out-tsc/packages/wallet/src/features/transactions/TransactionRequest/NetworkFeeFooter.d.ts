/// <reference types="react" />
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { GasFeeResult } from 'uniswap/src/features/gas/types';
interface NetworkFeeFooterProps {
    chainId: UniverseChainId;
    showNetworkLogo: boolean;
    gasFee: GasFeeResult | undefined;
    isUniswapX?: boolean;
}
export declare function NetworkFeeFooter({ chainId, showNetworkLogo, gasFee, isUniswapX, }: NetworkFeeFooterProps): JSX.Element | null;
export {};
//# sourceMappingURL=NetworkFeeFooter.d.ts.map