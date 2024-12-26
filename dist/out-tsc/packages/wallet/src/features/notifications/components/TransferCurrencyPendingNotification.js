import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { SpinningLoader } from 'ui/src';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
import { TRANSACTION_PENDING_NOTIFICATION_DELAY } from 'wallet/src/features/notifications/components/SwapPendingNotification';
export function TransferCurrencyPendingNotification() {
    const { t } = useTranslation();
    return (_jsx(NotificationToast, { smallToast: true, hideDelay: TRANSACTION_PENDING_NOTIFICATION_DELAY, icon: _jsx(SpinningLoader, { color: "$accent1" }), title: t('notification.transfer.pending') }));
}
//# sourceMappingURL=TransferCurrencyPendingNotification.js.map