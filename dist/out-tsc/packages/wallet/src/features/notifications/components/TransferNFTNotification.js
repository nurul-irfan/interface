import { jsx as _jsx } from "react/jsx-runtime";
import { Unitag } from 'ui/src/components/icons';
import { TransactionStatus, TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import { LogoWithTxStatus } from 'wallet/src/components/CurrencyLogo/LogoWithTxStatus';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { useNFT } from 'wallet/src/features/nfts/hooks';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
import { NOTIFICATION_ICON_SIZE } from 'wallet/src/features/notifications/constants';
import { formTransferNFTNotificationTitle } from 'wallet/src/features/notifications/utils';
import { useActiveAccountAddressWithThrow, useDisplayName } from 'wallet/src/features/wallet/hooks';
import { DisplayNameType } from 'wallet/src/features/wallet/types';
export function TransferNFTNotification({ notification }) {
    var _a, _b, _c;
    const { address, assetType, chainId, tokenAddress, tokenId, txType, txStatus, hideDelay } = notification;
    const userAddress = useActiveAccountAddressWithThrow();
    const senderOrRecipient = txType === TransactionType.Send ? notification.recipient : notification.sender;
    const nftOwner = txType === TransactionType.Send ? notification.recipient : userAddress;
    const { data: nft } = useNFT(nftOwner, tokenAddress, tokenId);
    const { name: displayName, type: displayNameType } = (_a = useDisplayName(senderOrRecipient, { includeUnitagSuffix: true })) !== null && _a !== void 0 ? _a : {};
    const showUnicon = txStatus !== TransactionStatus.Canceled && displayNameType === DisplayNameType.Unitag;
    const title = formTransferNFTNotificationTitle(txType, txStatus, nft, tokenAddress, tokenId, displayName !== null && displayName !== void 0 ? displayName : senderOrRecipient);
    const { navigateToAccountActivityList } = useWalletNavigation();
    const icon = (_jsx(LogoWithTxStatus, { assetType: assetType, chainId: chainId, nftImageUrl: (_c = (_b = nft === null || nft === void 0 ? void 0 : nft.thumbnail) === null || _b === void 0 ? void 0 : _b.url) !== null && _c !== void 0 ? _c : undefined, size: NOTIFICATION_ICON_SIZE, txStatus: txStatus, txType: txType }));
    return (_jsx(NotificationToast, { address: address, hideDelay: hideDelay, icon: icon, postCaptionElement: showUnicon ? _jsx(Unitag, { size: "$icon.24" }) : undefined, title: title, onPress: navigateToAccountActivityList }));
}
//# sourceMappingURL=TransferNFTNotification.js.map