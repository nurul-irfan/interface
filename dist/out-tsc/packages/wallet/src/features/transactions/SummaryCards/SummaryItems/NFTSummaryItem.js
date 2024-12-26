import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { AssetType } from 'uniswap/src/entities/assets';
import { LogoWithTxStatus } from 'wallet/src/components/CurrencyLogo/LogoWithTxStatus';
import { TransactionSummaryLayout } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/TransactionSummaryLayout';
import { TXN_HISTORY_ICON_SIZE } from 'wallet/src/features/transactions/SummaryCards/utils';
export function NFTSummaryItem({ transaction, transactionType, index, }) {
    const icon = useMemo(() => (_jsx(LogoWithTxStatus, { assetType: AssetType.ERC721, chainId: transaction.chainId, nftImageUrl: transaction.typeInfo.nftSummaryInfo.imageURL, size: TXN_HISTORY_ICON_SIZE, txStatus: transaction.status, txType: transactionType })), [transaction.chainId, transaction.status, transaction.typeInfo.nftSummaryInfo.imageURL, transactionType]);
    return (_jsx(TransactionSummaryLayout, { caption: transaction.typeInfo.nftSummaryInfo.name, icon: icon, index: index, transaction: transaction }));
}
//# sourceMappingURL=NFTSummaryItem.js.map