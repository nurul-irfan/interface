import { jsx as _jsx } from "react/jsx-runtime";
import { TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { TransferTokenSummaryItem } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/TransferTokenSummaryItem';
export function SendSummaryItem({ transaction, index, }) {
    return (_jsx(TransferTokenSummaryItem, { index: index, otherAddress: transaction.typeInfo.recipient, transaction: transaction, transactionType: TransactionType.Send }));
}
//# sourceMappingURL=SendSummaryItem.js.map