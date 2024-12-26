import { jsx as _jsx } from "react/jsx-runtime";
import { TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { TransferTokenSummaryItem } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/TransferTokenSummaryItem';
export function ReceiveSummaryItem({ transaction, index, }) {
    return (_jsx(TransferTokenSummaryItem, { index: index, otherAddress: transaction.typeInfo.sender, transaction: transaction, transactionType: TransactionType.Receive }));
}
//# sourceMappingURL=ReceiveSummaryItem.js.map