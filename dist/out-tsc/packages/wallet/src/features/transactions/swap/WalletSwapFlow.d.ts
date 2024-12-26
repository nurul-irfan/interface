/// <reference types="react" />
import { SwapFlowProps } from 'uniswap/src/features/transactions/swap/SwapFlow';
type WalletSwapFlowProps = Omit<SwapFlowProps, 'settings' | 'swapCallback' | 'wrapCallback'> & {
    onSubmitSwap?: () => Promise<void>;
};
export declare function WalletSwapFlow({ onSubmitSwap, ...props }: WalletSwapFlowProps): JSX.Element;
export {};
//# sourceMappingURL=WalletSwapFlow.d.ts.map