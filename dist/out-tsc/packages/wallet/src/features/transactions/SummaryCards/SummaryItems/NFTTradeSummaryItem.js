import { jsx as _jsx } from "react/jsx-runtime";
import { NFTSummaryItem } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/NFTSummaryItem';
export function NFTTradeSummaryItem({ transaction, index, }) {
    return _jsx(NFTSummaryItem, { index: index, transaction: transaction, transactionType: transaction.typeInfo.type });
}
//# sourceMappingURL=NFTTradeSummaryItem.js.map