import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { DappLogoWithWCBadge } from 'wallet/src/components/CurrencyLogo/LogoWithTxStatus';
import { TransactionSummaryLayout } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/TransactionSummaryLayout';
import { TXN_HISTORY_ICON_SIZE } from 'wallet/src/features/transactions/SummaryCards/utils';
export function WCSummaryItem({ transaction, index, }) {
    const icon = useMemo(() => (_jsx(DappLogoWithWCBadge, { chainId: transaction.chainId, dappImageUrl: transaction.typeInfo.dapp.icon, dappName: transaction.typeInfo.dapp.name, size: TXN_HISTORY_ICON_SIZE })), [transaction.chainId, transaction.typeInfo.dapp.icon, transaction.typeInfo.dapp.name]);
    return (_jsx(TransactionSummaryLayout, { caption: transaction.typeInfo.dapp.name, icon: icon, index: index, transaction: transaction }));
}
//# sourceMappingURL=WCSummaryItem.js.map