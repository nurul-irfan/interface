/// <reference types="react" />
import { TransactionDetails, UnknownTransactionInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function UnknownSummaryItem({ transaction, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: UnknownTransactionInfo;
    };
}): JSX.Element;
//# sourceMappingURL=UnknownSummaryItem.d.ts.map