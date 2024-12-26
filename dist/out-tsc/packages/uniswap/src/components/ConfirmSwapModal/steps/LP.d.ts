/// <reference types="react" />
import { StepRowProps } from 'uniswap/src/components/ConfirmSwapModal/steps/StepRowSkeleton';
import { CollectFeesSteps, DecreasePositionTransactionStep, IncreasePositionTransactionStep, IncreasePositionTransactionStepAsync, MigratePositionTransactionStep, MigratePositionTransactionStepAsync } from 'uniswap/src/features/transactions/swap/types/steps';
type LPSteps = IncreasePositionTransactionStep | IncreasePositionTransactionStepAsync | DecreasePositionTransactionStep | MigratePositionTransactionStep | MigratePositionTransactionStepAsync | CollectFeesSteps;
export declare function LPTransactionStepRow({ status }: StepRowProps<LPSteps>): JSX.Element;
export {};
//# sourceMappingURL=LP.d.ts.map