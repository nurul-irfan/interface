/// <reference types="react" />
import { ExactInputSwapTransactionInfo, ExactOutputSwapTransactionInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function SwapSummaryItem({ transaction, swapCallbacks, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: ExactOutputSwapTransactionInfo | ExactInputSwapTransactionInfo;
    };
}): JSX.Element;
//# sourceMappingURL=SwapSummaryItem.d.ts.map