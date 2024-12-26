import { AppTFunction } from 'ui/src/i18n/types';
import { TokenApprovalTransactionStep, TokenRevocationTransactionStep, TransactionStep } from 'uniswap/src/features/transactions/swap/types/steps';
import { OverridesSentryFingerprint } from 'utilities/src/logger/types';
/** Superclass used to differentiate categorized/known transaction errors from generic/unknown errors. */
export declare abstract class TransactionError extends Error {
    logToSentry: boolean;
}
/** Thrown in code paths that should be unreachable, serving both typechecking and critical alarm purposes. */
export declare class UnexpectedTransactionStateError extends TransactionError {
    constructor(message: string);
}
/** Thrown when a transaction step fails for an unknown reason. */
export declare class TransactionStepFailedError extends TransactionError implements OverridesSentryFingerprint {
    step: TransactionStep;
    isBackendRejection: boolean;
    originalError?: Error;
    originalErrorStringified?: string;
    originalErrorString?: string;
    stepStringified?: string;
    constructor({ message, step, isBackendRejection, originalError, }: {
        message: string;
        step: TransactionStep;
        isBackendRejection?: boolean;
        originalError?: Error;
    });
    getFingerprint(): string[];
}
export declare class ApprovalEditedInWalletError extends TransactionStepFailedError {
    logToSentry: boolean;
    constructor({ step }: {
        step: TokenApprovalTransactionStep | TokenRevocationTransactionStep;
    });
}
/** Thrown when a transaction flow is interrupted by a known circumstance; should be handled gracefully in UI */
export declare class HandledTransactionInterrupt extends TransactionError {
    constructor(message: string);
}
export declare function getErrorContent(t: AppTFunction, error: Error): {
    title: string;
    message: string;
    supportArticleURL?: string;
};
//# sourceMappingURL=errors.d.ts.map