import { useEffect, useRef } from 'react';
import { useUniswapContext } from 'uniswap/src/contexts/UniswapContext';
export function useSwapNetworkNotification({ inputChainId, outputChainId, }) {
    const { onSwapChainsChanged } = useUniswapContext();
    const lastNetworkNotification = useRef({
        inputChainId: undefined,
        outputChainId: undefined,
    });
    useEffect(() => {
        const { inputChainId: lastInputChainId, outputChainId: lastOutputChainId } = lastNetworkNotification.current;
        const prevChainId = lastInputChainId !== null && lastInputChainId !== void 0 ? lastInputChainId : lastOutputChainId;
        // Set initial values but don't fire notification for first network selection
        if (!lastInputChainId && !lastOutputChainId) {
            lastNetworkNotification.current = { inputChainId, outputChainId };
            return;
        }
        // Check if either chain has changed
        const hasInputChanged = inputChainId !== lastInputChainId;
        const hasOutputChanged = outputChainId !== lastOutputChainId;
        // Skip if no changes
        if (!hasInputChanged && !hasOutputChanged) {
            return;
        }
        // Determine notification type and trigger
        if (inputChainId && outputChainId && inputChainId !== outputChainId) {
            onSwapChainsChanged({ chainId: inputChainId, outputChainId }); // Bridging notification
        }
        else if (inputChainId || (outputChainId && prevChainId)) {
            const chainId = inputChainId !== null && inputChainId !== void 0 ? inputChainId : outputChainId;
            // User is swapping on the same chain, don't show notification
            if (!chainId || chainId === prevChainId) {
                return;
            }
            onSwapChainsChanged({ chainId, prevChainId }); // Non-bridging notification
        }
        // Update last notification state
        lastNetworkNotification.current = { inputChainId, outputChainId };
    }, [inputChainId, outputChainId, onSwapChainsChanged]);
}
//# sourceMappingURL=useSwapNetworkNotification.js.map