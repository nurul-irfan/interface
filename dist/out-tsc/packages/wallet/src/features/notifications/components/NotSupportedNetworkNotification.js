import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { AlertTriangleFilled } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
export function NotSupportedNetworkNotification({ notification: { hideDelay = 2000 }, }) {
    const { t } = useTranslation();
    return (_jsx(NotificationToast, { smallToast: true, hideDelay: hideDelay, icon: _jsx(AlertTriangleFilled, { color: "$neutral2", size: iconSizes.icon20 }), title: t('extension.network.notSupported') }));
}
//# sourceMappingURL=NotSupportedNetworkNotification.js.map