/// <reference types="react" />
import { TransactionDetails, WrapTransactionInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function WrapSummaryItem({ transaction, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: WrapTransactionInfo;
    };
}): JSX.Element;
//# sourceMappingURL=WrapSummaryItem.d.ts.map