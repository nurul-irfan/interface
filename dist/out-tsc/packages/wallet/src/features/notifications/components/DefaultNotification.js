import { jsx as _jsx } from "react/jsx-runtime";
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
export function DefaultNotification({ notification: { address, title, hideDelay }, }) {
    return _jsx(NotificationToast, { address: address, hideDelay: hideDelay, title: title });
}
//# sourceMappingURL=DefaultNotification.js.map