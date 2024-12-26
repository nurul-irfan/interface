import { jsx as _jsx } from "react/jsx-runtime";
import { CheckmarkCircle } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
export function SuccessNotification({ notification: { hideDelay = 2000, title }, }) {
    return (_jsx(NotificationToast, { smallToast: true, hideDelay: hideDelay, icon: _jsx(CheckmarkCircle, { size: iconSizes.icon16 }), title: title }));
}
//# sourceMappingURL=SuccessNotification.js.map