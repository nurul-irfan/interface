/// <reference types="react" />
import { OnRampPurchaseInfo, OnRampTransferInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function OnRampTransferSummaryItem({ transaction, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: OnRampPurchaseInfo | OnRampTransferInfo;
    };
}): JSX.Element;
//# sourceMappingURL=OnRampTransferSummaryItem.d.ts.map