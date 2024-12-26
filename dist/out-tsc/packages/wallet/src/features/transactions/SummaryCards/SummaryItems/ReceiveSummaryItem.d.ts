/// <reference types="react" />
import { ReceiveTokenTransactionInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function ReceiveSummaryItem({ transaction, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: ReceiveTokenTransactionInfo;
    };
}): JSX.Element;
//# sourceMappingURL=ReceiveSummaryItem.d.ts.map