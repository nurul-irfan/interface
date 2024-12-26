import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, SpinningLoader, useSporeColors } from 'ui/src';
import AlertCircle from 'ui/src/assets/icons/alert-circle.svg';
import { CheckmarkCircle } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { useSelectAddressHasNotifications, useSelectAddressNotifications, } from 'uniswap/src/features/notifications/hooks';
import { AppNotificationType } from 'uniswap/src/features/notifications/types';
import { TransactionStatus } from 'uniswap/src/features/transactions/types/transactionDetails';
import { useSortedPendingTransactions } from 'wallet/src/features/transactions/hooks';
import { useActiveAccountAddress } from 'wallet/src/features/wallet/hooks';
const PENDING_TX_TIME_LIMIT = 60000 * 5; // 5 mins
const LOADING_SPINNER_SIZE = iconSizes.icon20;
export function PendingNotificationBadge({ size = LOADING_SPINNER_SIZE }) {
    const colors = useSporeColors();
    const activeAccountAddress = useActiveAccountAddress();
    const sortedPendingTransactions = useSortedPendingTransactions(activeAccountAddress);
    const hasNotifications = useSelectAddressHasNotifications(activeAccountAddress);
    const notifications = useSelectAddressNotifications(activeAccountAddress);
    /*************** In-app txn confirmed  **************/
    const currentNotification = notifications === null || notifications === void 0 ? void 0 : notifications[0];
    if ((currentNotification === null || currentNotification === void 0 ? void 0 : currentNotification.type) === AppNotificationType.Transaction) {
        const { txStatus } = currentNotification;
        if (txStatus === TransactionStatus.Success) {
            return _jsx(CheckmarkCircle, { size: size });
        }
        return _jsx(AlertCircle, { color: colors.DEP_accentWarning.val, height: size, width: size });
    }
    /*************** Pending in-app txn  **************/
    const swapPendingNotificationActive = (currentNotification === null || currentNotification === void 0 ? void 0 : currentNotification.type) === AppNotificationType.SwapPending;
    const pendingTransactionCount = (sortedPendingTransactions !== null && sortedPendingTransactions !== void 0 ? sortedPendingTransactions : []).length;
    const txPendingLongerThanLimit = (sortedPendingTransactions === null || sortedPendingTransactions === void 0 ? void 0 : sortedPendingTransactions[0]) && Date.now() - sortedPendingTransactions[0].addedTime > PENDING_TX_TIME_LIMIT;
    // If a transaction has been pending for longer than 5 mins, then don't show the pending icon anymore
    // Dont show the loader if the swap pending toast is on screen
    if (!swapPendingNotificationActive &&
        pendingTransactionCount >= 1 &&
        pendingTransactionCount <= 99 &&
        !txPendingLongerThanLimit) {
        return _jsx(SpinningLoader, { color: "$accent1", size: LOADING_SPINNER_SIZE });
    }
    /**
     Has unchecked notification status (triggered by Transaction history updater or transaction watcher saga).
     Aka, will flip status to true when any local or remote transaction is confirmed.
    **/
    if (hasNotifications) {
        return (_jsx(Flex, { backgroundColor: "$accent1", borderRadius: "$roundedFull", height: iconSizes.icon8, width: iconSizes.icon8 }));
    }
    return null;
}
//# sourceMappingURL=PendingNotificationBadge.js.map