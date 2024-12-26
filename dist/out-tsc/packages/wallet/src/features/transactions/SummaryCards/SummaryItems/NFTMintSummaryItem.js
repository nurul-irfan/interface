import { jsx as _jsx } from "react/jsx-runtime";
import { TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { NFTSummaryItem } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/NFTSummaryItem';
export function NFTMintSummaryItem({ transaction, index, }) {
    return _jsx(NFTSummaryItem, { index: index, transaction: transaction, transactionType: TransactionType.NFTMint });
}
//# sourceMappingURL=NFTMintSummaryItem.js.map