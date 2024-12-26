/// <reference types="react" />
import { StepRowProps } from 'uniswap/src/components/ConfirmSwapModal/steps/StepRowSkeleton';
import { SwapTransactionStep, SwapTransactionStepAsync, UniswapXSignatureStep } from 'uniswap/src/features/transactions/swap/types/steps';
type SwapSteps = SwapTransactionStep | SwapTransactionStepAsync | UniswapXSignatureStep;
export declare function SwapTransactionStepRow({ step, status }: StepRowProps<SwapSteps>): JSX.Element;
export {};
//# sourceMappingURL=Swap.d.ts.map