import { UniverseChainId } from 'uniswap/src/features/chains/types';
/**
 * Shows a network notification for a swap.
 * Depending on chain inputs passed, shows a bridging or non-bridging notification.
 */
export declare function useShowSwapNetworkNotification(): ({ chainId, outputChainId, }: {
    chainId: UniverseChainId;
    outputChainId?: UniverseChainId;
}) => void;
//# sourceMappingURL=useShowSwapNetworkNotification.d.ts.map