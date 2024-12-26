import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import ContextMenu from 'react-native-context-menu-view';
import { DappEllipsisDropdownIcon } from 'wallet/src/components/settings/DappEllipsisDropdown/internal/DappEllipsisDropdownIcon';
import { useActiveAccountWithThrow } from 'wallet/src/features/wallet/hooks';
export function DappEllipsisDropdown({ removeAllDappConnections, setIsEditing, isEditing, }) {
    const { t } = useTranslation();
    const activeAccount = useActiveAccountWithThrow();
    return (_jsx(ContextMenu, { dropdownMenuMode: true, actions: [
            {
                title: t('settings.setting.connections.disconnectAll'),
                destructive: true,
                systemIcon: 'trash',
            },
            {
                title: t('common.edit.button'),
                selected: isEditing,
                systemIcon: 'square.and.pencil',
            },
        ], onPress: async (e) => {
            const { index } = e.nativeEvent;
            switch (index) {
                case 0:
                    setIsEditing === null || setIsEditing === void 0 ? void 0 : setIsEditing(false);
                    await removeAllDappConnections(activeAccount);
                    break;
                case 1:
                    setIsEditing === null || setIsEditing === void 0 ? void 0 : setIsEditing(!isEditing);
                    break;
            }
        }, children: _jsx(DappEllipsisDropdownIcon, {}) }));
}
//# sourceMappingURL=DappEllipsisDropdown.native.js.map