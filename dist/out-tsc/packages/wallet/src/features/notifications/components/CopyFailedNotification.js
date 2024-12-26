import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
export function CopyFailedNotification({ notification: { hideDelay = 2000 }, }) {
    const { t } = useTranslation();
    const title = t('notification.copied.failed');
    return _jsx(NotificationToast, { hideDelay: hideDelay, title: title });
}
//# sourceMappingURL=CopyFailedNotification.js.map