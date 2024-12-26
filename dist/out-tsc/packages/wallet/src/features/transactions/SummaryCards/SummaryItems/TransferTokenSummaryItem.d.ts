/// <reference types="react" />
import { ReceiveTokenTransactionInfo, SendTokenTransactionInfo, TransactionDetails, TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function TransferTokenSummaryItem({ transactionType, otherAddress, transaction, index, }: SummaryItemProps & {
    transactionType: TransactionType.Send | TransactionType.Receive;
    otherAddress: string;
    transaction: TransactionDetails & {
        typeInfo: ReceiveTokenTransactionInfo | SendTokenTransactionInfo;
    };
}): JSX.Element;
//# sourceMappingURL=TransferTokenSummaryItem.d.ts.map