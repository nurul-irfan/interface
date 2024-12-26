/// <reference types="react" />
import { TransactionStep } from 'uniswap/src/features/transactions/swap/types/steps';
interface ProgressIndicatorProps {
    steps: TransactionStep[];
    currentStep?: {
        step: TransactionStep;
        accepted: boolean;
    };
}
export declare function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps): JSX.Element | null;
export {};
//# sourceMappingURL=ProgressIndicator.d.ts.map