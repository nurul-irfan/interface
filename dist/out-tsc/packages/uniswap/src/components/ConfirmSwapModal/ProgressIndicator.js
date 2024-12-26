import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Separator } from 'ui/src';
import { TokenApprovalTransactionStepRow, TokenRevocationTransactionStepRow, } from 'uniswap/src/components/ConfirmSwapModal/steps/Approve';
import { LPTransactionStepRow } from 'uniswap/src/components/ConfirmSwapModal/steps/LP';
import { Permit2SignatureStepRow } from 'uniswap/src/components/ConfirmSwapModal/steps/Permit';
import { SwapTransactionStepRow } from 'uniswap/src/components/ConfirmSwapModal/steps/Swap';
import { WrapTransactionStepRow } from 'uniswap/src/components/ConfirmSwapModal/steps/Wrap';
import { StepStatus } from 'uniswap/src/components/ConfirmSwapModal/types';
import { TransactionStepType } from 'uniswap/src/features/transactions/swap/types/steps';
function areStepsEqual(currentStep) {
    return (step) => {
        if (step.type !== (currentStep === null || currentStep === void 0 ? void 0 : currentStep.type)) {
            return false;
        }
        // There can be multiple approval steps with different tokens so both the type and the approval has to match
        if (currentStep.type === TransactionStepType.TokenApprovalTransaction) {
            return step.type === TransactionStepType.TokenApprovalTransaction && step.token === currentStep.token;
        }
        return true;
    };
}
export function ProgressIndicator({ currentStep, steps }) {
    function getStatus(targetStep) {
        const currentIndex = steps.findIndex(areStepsEqual(currentStep === null || currentStep === void 0 ? void 0 : currentStep.step));
        const targetIndex = steps.indexOf(targetStep);
        if (currentIndex < targetIndex) {
            return StepStatus.Preview;
        }
        else if (currentIndex === targetIndex) {
            return (currentStep === null || currentStep === void 0 ? void 0 : currentStep.accepted) ? StepStatus.InProgress : StepStatus.Active;
        }
        else {
            return StepStatus.Complete;
        }
    }
    if (steps.length === 0) {
        return null;
    }
    return (_jsxs(Flex, { px: "$spacing12", enterStyle: { opacity: 0 }, animation: "quicker", children: [_jsx(Separator, { my: "$spacing12" }), steps.map((step, i) => (_jsxs(Flex, { children: [_jsx(Step, { step: step, status: getStatus(step) }), i !== steps.length - 1 && _jsx(Flex, { backgroundColor: "$neutral3", height: 10, mt: 1, mx: 11, width: 2 })] }, `progress-indicator-step-${i}`)))] }));
}
function Step({ step, status }) {
    switch (step.type) {
        case TransactionStepType.WrapTransaction:
            return _jsx(WrapTransactionStepRow, { step: step, status: status });
        case TransactionStepType.TokenApprovalTransaction:
            return _jsx(TokenApprovalTransactionStepRow, { step: step, status: status });
        case TransactionStepType.TokenRevocationTransaction:
            return _jsx(TokenRevocationTransactionStepRow, { step: step, status: status });
        case TransactionStepType.Permit2Signature:
            return _jsx(Permit2SignatureStepRow, { step: step, status: status });
        case TransactionStepType.SwapTransaction:
        case TransactionStepType.SwapTransactionAsync:
        case TransactionStepType.UniswapXSignature:
            return _jsx(SwapTransactionStepRow, { step: step, status: status });
        case TransactionStepType.IncreasePositionTransaction:
        case TransactionStepType.IncreasePositionTransactionAsync:
        case TransactionStepType.DecreasePositionTransaction:
            return _jsx(LPTransactionStepRow, { step: step, status: status });
        case TransactionStepType.MigratePositionTransactionStep:
        case TransactionStepType.MigratePositionTransactionStepAsync:
        case TransactionStepType.CollectFeesTransactionStep:
            return _jsx(LPTransactionStepRow, { step: step, status: status });
    }
}
//# sourceMappingURL=ProgressIndicator.js.map