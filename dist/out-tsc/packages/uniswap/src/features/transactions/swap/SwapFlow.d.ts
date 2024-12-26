/// <reference types="react" />
import { TransactionModalProps } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalProps';
import { SwapFormState } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { SwapSettingConfig } from 'uniswap/src/features/transactions/swap/settings/configs/types';
import { SwapCallback } from 'uniswap/src/features/transactions/swap/types/swapCallback';
import { WrapCallback } from 'uniswap/src/features/transactions/swap/types/wrapCallback';
export interface SwapFlowProps extends Omit<TransactionModalProps, 'fullscreen' | 'modalName'> {
    prefilledState?: SwapFormState;
    settings: SwapSettingConfig[];
    hideHeader?: boolean;
    hideFooter?: boolean;
    swapCallback: SwapCallback;
    wrapCallback: WrapCallback;
    onSubmitSwap?: () => Promise<void>;
}
export declare function SwapFlow({ settings, swapCallback, wrapCallback, onSubmitSwap, ...transactionModalProps }: SwapFlowProps): JSX.Element;
//# sourceMappingURL=SwapFlow.d.ts.map