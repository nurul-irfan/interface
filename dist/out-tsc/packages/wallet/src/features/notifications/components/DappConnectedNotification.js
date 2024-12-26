import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { UniversalImage } from 'ui/src';
import { borderRadii, iconSizes } from 'ui/src/theme';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
export function DappConnectedNotification({ notification: { hideDelay = 2000, dappIconUrl }, }) {
    const { t } = useTranslation();
    return (_jsx(NotificationToast, { smallToast: true, hideDelay: hideDelay, icon: dappIconUrl ? (_jsx(UniversalImage, { uri: dappIconUrl, style: { image: { borderRadius: borderRadii.rounded8 } }, size: {
                width: iconSizes.icon20,
                height: iconSizes.icon20,
            } })) : undefined, title: t('common.text.connected') }));
}
//# sourceMappingURL=DappConnectedNotification.js.map