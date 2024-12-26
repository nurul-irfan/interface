import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { iconSizes } from 'ui/src/theme';
import { NetworkLogo } from 'uniswap/src/components/CurrencyLogo/NetworkLogo';
import { getChainLabel } from 'uniswap/src/features/chains/utils';
import { ONE_SECOND_MS } from 'utilities/src/time/time';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
export function NetworkChangedNotification({ notification: { chainId, flow, hideDelay = 2 * ONE_SECOND_MS }, }) {
    const { t } = useTranslation();
    return (_jsx(NotificationToast, { smallToast: true, hideDelay: hideDelay, icon: _jsx(NetworkLogo, { chainId: chainId, size: iconSizes.icon24 }), title: getTitle({ t, flow, chainId }) }));
}
function getTitle({ t, flow, chainId, }) {
    const network = getChainLabel(chainId);
    switch (flow) {
        case 'send':
            return t('notification.send.network', { network });
        case 'swap':
            return t('notification.swap.network', { network });
        default:
            return t('notification.network.changed', { network });
    }
}
//# sourceMappingURL=NetworkChangedNotification.js.map