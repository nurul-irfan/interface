import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { SpinningLoader } from 'ui/src';
import { WrapType } from 'uniswap/src/features/transactions/types/wrap';
import { ONE_SECOND_MS } from 'utilities/src/time/time';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
// We roughly track the L1 block time, accuracy isnt crucial because we have other pending states,
// and when a txn confirms it ll replace this toast.
export const TRANSACTION_PENDING_NOTIFICATION_DELAY = 12 * ONE_SECOND_MS;
export function SwapPendingNotification({ notification }) {
    const { t } = useTranslation();
    const notificationText = getNotificationText(notification.wrapType, t);
    return (_jsx(NotificationToast, { smallToast: true, hideDelay: TRANSACTION_PENDING_NOTIFICATION_DELAY, postCaptionElement: _jsx(SpinningLoader, { color: "$accent1" }), title: notificationText }));
}
// eslint-disable-next-line consistent-return
function getNotificationText(wrapType, t) {
    switch (wrapType) {
        case WrapType.NotApplicable:
            return t('notification.swap.pending.swap');
        case WrapType.Unwrap:
            return t('notification.swap.pending.unwrap');
        case WrapType.Wrap:
            return t('notification.swap.pending.wrap');
    }
}
//# sourceMappingURL=SwapPendingNotification.js.map