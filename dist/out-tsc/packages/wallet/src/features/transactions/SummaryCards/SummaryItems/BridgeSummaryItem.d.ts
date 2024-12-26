/// <reference types="react" />
import { BridgeTransactionInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function BridgeSummaryItem({ transaction, swapCallbacks, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: BridgeTransactionInfo;
    };
}): JSX.Element;
//# sourceMappingURL=BridgeSummaryItem.d.ts.map