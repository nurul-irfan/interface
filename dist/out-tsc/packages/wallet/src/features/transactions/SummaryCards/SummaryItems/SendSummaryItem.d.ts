/// <reference types="react" />
import { SendTokenTransactionInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function SendSummaryItem({ transaction, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: SendTokenTransactionInfo;
    };
}): JSX.Element;
//# sourceMappingURL=SendSummaryItem.d.ts.map