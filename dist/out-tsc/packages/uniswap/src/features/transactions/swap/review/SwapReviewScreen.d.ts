/// <reference types="react" />
import { SwapCallback } from 'uniswap/src/features/transactions/swap/types/swapCallback';
import { WrapCallback } from 'uniswap/src/features/transactions/swap/types/wrapCallback';
interface SwapReviewScreenProps {
    hideContent: boolean;
    swapCallback: SwapCallback;
    wrapCallback: WrapCallback;
    onSubmitSwap?: () => Promise<void>;
}
export declare function SwapReviewScreen(props: SwapReviewScreenProps): JSX.Element | null;
export {};
//# sourceMappingURL=SwapReviewScreen.d.ts.map