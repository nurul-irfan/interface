import { jsx as _jsx } from "react/jsx-runtime";
import { TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { NFTSummaryItem } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/NFTSummaryItem';
export function NFTApproveSummaryItem({ transaction, index, }) {
    return _jsx(NFTSummaryItem, { index: index, transaction: transaction, transactionType: TransactionType.NFTApprove });
}
//# sourceMappingURL=NFTApproveSummaryItem.js.map