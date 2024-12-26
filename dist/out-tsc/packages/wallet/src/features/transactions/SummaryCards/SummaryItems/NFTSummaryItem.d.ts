/// <reference types="react" />
import { NFTApproveTransactionInfo, NFTMintTransactionInfo, NFTTradeTransactionInfo, TransactionDetails, TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function NFTSummaryItem({ transaction, transactionType, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: NFTApproveTransactionInfo | NFTTradeTransactionInfo | NFTMintTransactionInfo;
    };
    transactionType: TransactionType;
}): JSX.Element;
//# sourceMappingURL=NFTSummaryItem.d.ts.map