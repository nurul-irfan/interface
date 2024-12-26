import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { SuccessNotification } from 'wallet/src/features/notifications/components/SuccessNotification';
export function PasswordChangedNotification({ notification: { hideDelay }, }) {
    const { t } = useTranslation();
    return _jsx(SuccessNotification, { notification: { title: t('notification.passwordChanged'), hideDelay } });
}
//# sourceMappingURL=PasswordChangedNotification.js.map