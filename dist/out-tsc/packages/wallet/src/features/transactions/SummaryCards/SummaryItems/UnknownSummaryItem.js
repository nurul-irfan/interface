import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useSporeColors } from 'ui/src';
import { ContractInteraction } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { getValidAddress } from 'uniswap/src/utils/addresses';
import { shortenAddress } from 'utilities/src/addresses';
import { DappLogoWithWCBadge } from 'wallet/src/components/CurrencyLogo/LogoWithTxStatus';
import { TransactionSummaryLayout } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/TransactionSummaryLayout';
export function UnknownSummaryItem({ transaction, index, }) {
    var _a, _b;
    const colors = useSporeColors();
    const caption = useMemo(() => {
        return transaction.typeInfo.tokenAddress && getValidAddress(transaction.typeInfo.tokenAddress)
            ? shortenAddress(transaction.typeInfo.tokenAddress)
            : '';
    }, [transaction.typeInfo.tokenAddress]);
    const icon = useMemo(() => {
        var _a, _b;
        return ((_a = transaction.typeInfo.dappInfo) === null || _a === void 0 ? void 0 : _a.icon) ? (_jsx(DappLogoWithWCBadge, { hideWCBadge: true, chainId: transaction.chainId, dappImageUrl: transaction.typeInfo.dappInfo.icon, dappName: (_b = transaction.typeInfo.dappInfo.name) !== null && _b !== void 0 ? _b : '', size: iconSizes.icon40 })) : (_jsx(ContractInteraction, { color: "$neutral2", fill: colors.surface1.get(), size: "$icon.40" }));
    }, [colors.surface1, transaction.chainId, (_a = transaction.typeInfo.dappInfo) === null || _a === void 0 ? void 0 : _a.icon, (_b = transaction.typeInfo.dappInfo) === null || _b === void 0 ? void 0 : _b.name]);
    return _jsx(TransactionSummaryLayout, { caption: caption, icon: icon, index: index, transaction: transaction });
}
//# sourceMappingURL=UnknownSummaryItem.js.map