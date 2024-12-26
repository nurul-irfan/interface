import { jsx as _jsx } from "react/jsx-runtime";
import { AssetType } from 'uniswap/src/entities/assets';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { buildCurrencyId } from 'uniswap/src/utils/currencyId';
import { LogoWithTxStatus } from 'wallet/src/components/CurrencyLogo/LogoWithTxStatus';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
import { NOTIFICATION_ICON_SIZE } from 'wallet/src/features/notifications/constants';
import { formApproveNotificationTitle } from 'wallet/src/features/notifications/utils';
export function ApproveNotification({ notification: { address, chainId, tokenAddress, spender, txStatus, txType, hideDelay }, }) {
    const { navigateToAccountActivityList } = useWalletNavigation();
    const currencyInfo = useCurrencyInfo(buildCurrencyId(chainId, tokenAddress));
    const title = formApproveNotificationTitle(txStatus, currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency, tokenAddress, spender);
    const icon = (_jsx(LogoWithTxStatus, { assetType: AssetType.Currency, chainId: chainId, currencyInfo: currencyInfo, size: NOTIFICATION_ICON_SIZE, txStatus: txStatus, txType: txType }));
    return (_jsx(NotificationToast, { address: address, hideDelay: hideDelay, icon: icon, title: title, onPress: navigateToAccountActivityList }));
}
//# sourceMappingURL=ApproveNotification.js.map