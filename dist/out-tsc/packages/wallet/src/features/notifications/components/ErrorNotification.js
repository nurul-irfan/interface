import { jsx as _jsx } from "react/jsx-runtime";
import { AlertCircleFilled } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
export function ErrorNotification({ notification: { address, errorMessage, hideDelay }, }) {
    return (_jsx(NotificationToast, { smallToast: true, address: address, hideDelay: hideDelay, icon: _jsx(AlertCircleFilled, { color: "$neutral2", size: iconSizes.icon24 }), title: errorMessage }));
}
//# sourceMappingURL=ErrorNotification.js.map