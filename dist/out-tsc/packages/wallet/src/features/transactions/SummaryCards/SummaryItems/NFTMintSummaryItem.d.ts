/// <reference types="react" />
import { NFTMintTransactionInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function NFTMintSummaryItem({ transaction, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: NFTMintTransactionInfo;
    };
}): JSX.Element;
//# sourceMappingURL=NFTMintSummaryItem.d.ts.map