/// <reference types="react" />
import { TransactionDetails, WCConfirmInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SummaryItemProps } from 'wallet/src/features/transactions/SummaryCards/types';
export declare function WCSummaryItem({ transaction, index, }: SummaryItemProps & {
    transaction: TransactionDetails & {
        typeInfo: WCConfirmInfo;
    };
}): JSX.Element;
//# sourceMappingURL=WCSummaryItem.d.ts.map