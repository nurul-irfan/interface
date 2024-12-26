/// <reference types="react" />
import { ApproveTransactionInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function ApproveSummaryItem({ transaction, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: ApproveTransactionInfo;
    };
}): JSX.Element;
//# sourceMappingURL=ApproveSummaryItem.d.ts.map