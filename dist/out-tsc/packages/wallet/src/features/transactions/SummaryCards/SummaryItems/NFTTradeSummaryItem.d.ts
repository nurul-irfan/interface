/// <reference types="react" />
import { NFTTradeTransactionInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function NFTTradeSummaryItem({ transaction, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: NFTTradeTransactionInfo;
    };
}): JSX.Element;
//# sourceMappingURL=NFTTradeSummaryItem.d.ts.map