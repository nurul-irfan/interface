/// <reference types="react" />
import { OnRampPurchaseInfo, OnRampTransferInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function OnRampTransactionDetails({ transactionDetails, typeInfo, onClose, }: {
    transactionDetails: TransactionDetails;
    typeInfo: OnRampTransferInfo | OnRampPurchaseInfo;
    onClose: () => void;
}): JSX.Element;
//# sourceMappingURL=OnRampTransactionDetails.d.ts.map