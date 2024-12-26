import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'ui/src';
import { Shuffle } from 'ui/src/components/icons/Shuffle';
import { iconSizes } from 'ui/src/theme';
import { NetworkLogo } from 'uniswap/src/components/CurrencyLogo/NetworkLogo';
import { getChainLabel } from 'uniswap/src/features/chains/utils';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
export function NetworkChangedBridgeNotification({ notification, }) {
    const fromNetwork = getChainLabel(notification.fromChainId);
    const toNetwork = getChainLabel(notification.toChainId);
    return (_jsx(NotificationToast, { smallToast: true, hideDelay: notification.hideDelay, title: "", contentOverride: _jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing8", justifyContent: "center", children: [_jsxs(Flex, { row: true, centered: true, gap: "$spacing4", children: [_jsx(NetworkLogo, { chainId: notification.fromChainId, size: iconSizes.icon20 }), _jsx(Text, { variant: "body2", color: "$neutral1", children: fromNetwork })] }), _jsx(Shuffle, { color: "$neutral2", size: iconSizes.icon16 }), _jsxs(Flex, { row: true, centered: true, gap: "$spacing4", children: [_jsx(NetworkLogo, { chainId: notification.toChainId, size: iconSizes.icon20 }), _jsx(Text, { variant: "body2", color: "$neutral1", children: toNetwork })] })] }) }));
}
//# sourceMappingURL=NetworkChangedBridgeNotification.js.map