import { jsx as _jsx } from "react/jsx-runtime";
import { Unitag } from 'ui/src/components/icons';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { TransactionStatus, TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import { buildCurrencyId } from 'uniswap/src/utils/currencyId';
import { LogoWithTxStatus } from 'wallet/src/components/CurrencyLogo/LogoWithTxStatus';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
import { NOTIFICATION_ICON_SIZE } from 'wallet/src/features/notifications/constants';
import { formTransferCurrencyNotificationTitle } from 'wallet/src/features/notifications/utils';
import { useDisplayName } from 'wallet/src/features/wallet/hooks';
import { DisplayNameType } from 'wallet/src/features/wallet/types';
export function TransferCurrencyNotification({ notification, }) {
    var _a;
    const formatter = useLocalizationContext();
    const { address, assetType, chainId, tokenAddress, currencyAmountRaw, txType, txStatus, hideDelay } = notification;
    const senderOrRecipient = txType === TransactionType.Send ? notification.recipient : notification.sender;
    const { name: displayName, type: displayNameType } = (_a = useDisplayName(senderOrRecipient, { includeUnitagSuffix: false })) !== null && _a !== void 0 ? _a : {};
    const currencyInfo = useCurrencyInfo(buildCurrencyId(chainId, tokenAddress));
    // Transfer canceled title doesn't end with the display name
    const showUnicon = txStatus !== TransactionStatus.Canceled && displayNameType === DisplayNameType.Unitag;
    const title = formTransferCurrencyNotificationTitle(formatter, txType, txStatus, currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency, tokenAddress, currencyAmountRaw, displayNameType !== DisplayNameType.Address && displayName ? displayName : senderOrRecipient);
    const { navigateToAccountActivityList } = useWalletNavigation();
    const icon = (_jsx(LogoWithTxStatus, { assetType: assetType, chainId: chainId, currencyInfo: currencyInfo, size: NOTIFICATION_ICON_SIZE, txStatus: txStatus, txType: txType }));
    return (_jsx(NotificationToast, { address: address, hideDelay: hideDelay, icon: icon, postCaptionElement: showUnicon ? _jsx(Unitag, { size: "$icon.24" }) : undefined, title: title, onPress: navigateToAccountActivityList }));
}
//# sourceMappingURL=TransferCurrencyNotification.js.map