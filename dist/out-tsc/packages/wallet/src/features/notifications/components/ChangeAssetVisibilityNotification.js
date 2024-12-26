import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { useSporeColors } from 'ui/src';
import EyeOffIcon from 'ui/src/assets/icons/eye-off.svg';
import EyeIcon from 'ui/src/assets/icons/eye.svg';
import { iconSizes } from 'ui/src/theme';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
export function ChangeAssetVisibilityNotification({ notification: { visible, hideDelay, assetName }, }) {
    const { t } = useTranslation();
    const colors = useSporeColors();
    return (_jsx(NotificationToast, { smallToast: true, hideDelay: hideDelay, icon: visible ? (_jsx(EyeOffIcon, { color: colors.neutral1.get(), height: iconSizes.icon24, width: iconSizes.icon24 })) : (_jsx(EyeIcon, { color: colors.neutral1.get(), height: iconSizes.icon24, width: iconSizes.icon24 })), title: visible
            ? t('notification.assetVisibility.hidden', { assetName })
            : t('notification.assetVisibility.unhidden', { assetName }) }));
}
//# sourceMappingURL=ChangeAssetVisibilityNotification.js.map