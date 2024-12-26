/// <reference types="react" />
import { SwapSettingConfig } from 'uniswap/src/features/transactions/swap/settings/configs/types';
import { WrapCallback } from 'uniswap/src/features/transactions/swap/types/wrapCallback';
interface SwapFormScreenProps {
    hideContent: boolean;
    hideFooter?: boolean;
    settings: SwapSettingConfig[];
    wrapCallback?: WrapCallback;
}
/**
 * IMPORTANT: In the Extension, this component remains mounted when the user moves to the `SwapReview` screen.
 *            Make sure you take this into consideration when adding/modifying any hooks that run on this component.
 */
export declare function SwapFormScreen({ hideContent, settings, wrapCallback, }: SwapFormScreenProps): JSX.Element;
export {};
//# sourceMappingURL=SwapFormScreen.d.ts.map