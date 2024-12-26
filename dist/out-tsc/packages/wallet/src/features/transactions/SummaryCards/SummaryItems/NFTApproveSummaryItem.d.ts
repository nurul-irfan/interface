/// <reference types="react" />
import { NFTApproveTransactionInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function NFTApproveSummaryItem({ transaction, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: NFTApproveTransactionInfo;
    };
}): JSX.Element;
//# sourceMappingURL=NFTApproveSummaryItem.d.ts.map