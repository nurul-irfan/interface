import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Flex } from 'ui/src';
import { Power } from 'ui/src/components/icons';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType } from 'uniswap/src/features/notifications/types';
import { ExtensionEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { logger } from 'utilities/src/logger/logger';
import { ContextMenu } from 'wallet/src/components/menu/ContextMenu';
import { DappEllipsisDropdownIcon } from 'wallet/src/components/settings/DappEllipsisDropdown/internal/DappEllipsisDropdownIcon';
import { useActiveAccountWithThrow } from 'wallet/src/features/wallet/hooks';
const PowerCircle = () => (_jsx(Flex, { centered: true, backgroundColor: "red", borderRadius: "$roundedFull", p: "$spacing2", pt: "$spacing1", children: _jsx(Power, { color: "white", size: "$icon.16" }) }));
export function DappEllipsisDropdown({ isEditing, setIsEditing, removeAllDappConnections, }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const activeAccount = useActiveAccountWithThrow();
    if (isEditing !== undefined || setIsEditing) {
        logger.warn('DappEllipsisDropdown.web.tsx', 'render', '`isEditing` and/or `setIsEditing` are not expected to be defined');
    }
    return (_jsx(ContextMenu, { closeOnClick: true, itemId: "connections-ellipsis-dropdown", menuOptions: [
            {
                label: t('settings.setting.connections.disconnectAll'),
                onPress: async () => {
                    await removeAllDappConnections(activeAccount);
                    sendAnalyticsEvent(ExtensionEventName.DappDisconnectAll, {
                        activeConnectedAddress: activeAccount.address,
                    });
                    dispatch(pushNotification({
                        type: AppNotificationType.Success,
                        title: t('common.text.disconnected'),
                    }));
                },
                Icon: PowerCircle,
                destructive: true,
            },
        ], offset: { mainAxis: 2 }, onLeftClick: true, children: _jsx(DappEllipsisDropdownIcon, {}) }));
}
//# sourceMappingURL=DappEllipsisDropdown.web.js.map