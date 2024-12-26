import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable complexity */
import { AssetType } from 'uniswap/src/entities/assets';
import { AppNotificationType } from 'uniswap/src/features/notifications/types';
import { TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import { ApproveNotification } from 'wallet/src/features/notifications/components/ApproveNotification';
import { BridgeNotification } from 'wallet/src/features/notifications/components/BridgeNotification';
import { ChangeAssetVisibilityNotification } from 'wallet/src/features/notifications/components/ChangeAssetVisibilityNotification';
import { ChooseCountryNotification } from 'wallet/src/features/notifications/components/ChooseCountryNotification';
import { CopiedNotification } from 'wallet/src/features/notifications/components/CopiedNotification';
import { CopyFailedNotification } from 'wallet/src/features/notifications/components/CopyFailedNotification';
import { DefaultNotification } from 'wallet/src/features/notifications/components/DefaultNotification';
import { ErrorNotification } from 'wallet/src/features/notifications/components/ErrorNotification';
import { NetworkChangedBridgeNotification } from 'wallet/src/features/notifications/components/NetworkChangedBridgeNotification';
import { NetworkChangedNotification } from 'wallet/src/features/notifications/components/NetworkChangedNotification';
import { SuccessNotification } from 'wallet/src/features/notifications/components/SuccessNotification';
import { SwapNotification } from 'wallet/src/features/notifications/components/SwapNotification';
import { SwapPendingNotification } from 'wallet/src/features/notifications/components/SwapPendingNotification';
import { TransactionPendingNotification } from 'wallet/src/features/notifications/components/TransactionPendingNotification';
import { TransferCurrencyNotification } from 'wallet/src/features/notifications/components/TransferCurrencyNotification';
import { TransferCurrencyPendingNotification } from 'wallet/src/features/notifications/components/TransferCurrencyPendingNotification';
import { TransferNFTNotification } from 'wallet/src/features/notifications/components/TransferNFTNotification';
import { UnknownTxNotification } from 'wallet/src/features/notifications/components/UnknownNotification';
import { WrapNotification } from 'wallet/src/features/notifications/components/WrapNotification';
// Update name in `packages/wallet/src/components/ErrorBoundary/ErrorBoundary.tsx` if we update here
export function SharedNotificationToastRouter({ notification }) {
    switch (notification.type) {
        case AppNotificationType.Default:
            return _jsx(DefaultNotification, { notification: notification });
        case AppNotificationType.AssetVisibility:
            return _jsx(ChangeAssetVisibilityNotification, { notification: notification });
        case AppNotificationType.Copied:
            return _jsx(CopiedNotification, { notification: notification });
        case AppNotificationType.CopyFailed:
            return _jsx(CopyFailedNotification, { notification: notification });
        case AppNotificationType.Success:
            return _jsx(SuccessNotification, { notification: notification });
        case AppNotificationType.Error:
            return _jsx(ErrorNotification, { notification: notification });
        case AppNotificationType.ChooseCountry:
            return _jsx(ChooseCountryNotification, { notification: notification });
        case AppNotificationType.NetworkChanged:
            return _jsx(NetworkChangedNotification, { notification: notification });
        case AppNotificationType.NetworkChangedBridge:
            return _jsx(NetworkChangedBridgeNotification, { notification: notification });
        case AppNotificationType.SwapPending:
            return _jsx(SwapPendingNotification, { notification: notification });
        case AppNotificationType.TransferCurrencyPending:
            return _jsx(TransferCurrencyPendingNotification, {});
        case AppNotificationType.TransactionPending:
            return _jsx(TransactionPendingNotification, {});
        case AppNotificationType.Transaction:
            switch (notification.txType) {
                case TransactionType.Approve:
                    return _jsx(ApproveNotification, { notification: notification });
                case TransactionType.Bridge:
                    return _jsx(BridgeNotification, { notification: notification });
                case TransactionType.Swap:
                    return _jsx(SwapNotification, { notification: notification });
                case TransactionType.Wrap:
                    return _jsx(WrapNotification, { notification: notification });
                case TransactionType.Unknown:
                    return _jsx(UnknownTxNotification, { notification: notification });
                case TransactionType.Send:
                case TransactionType.Receive:
                    if (notification.assetType === AssetType.Currency) {
                        return _jsx(TransferCurrencyNotification, { notification: notification });
                    }
                    else {
                        return _jsx(TransferNFTNotification, { notification: notification });
                    }
            }
    }
    return null;
}
//# sourceMappingURL=SharedNotificationToastRouter.js.map