import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ContextMenu from 'react-native-context-menu-view';
import { useDispatch } from 'react-redux';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType, CopyNotificationType } from 'uniswap/src/features/notifications/types';
import { setClipboard } from 'uniswap/src/utils/clipboard';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { InfoRow } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/InfoRow';
import { TransactionParticipantDisplay } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/TransactionParticipantDisplay';
export function TransactionParticipantRow({ onClose, address, isSend = false, }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { navigateToExternalProfile } = useWalletNavigation();
    const onCopyAddress = () => {
        setClipboard(address)
            .then(() => {
            dispatch(pushNotification({
                type: AppNotificationType.Copied,
                copyType: CopyNotificationType.Address,
            }));
        })
            .catch(() => {
            // setClipboard shouldn't ever error
        });
    };
    const onViewProfile = () => {
        navigateToExternalProfile({ address });
        onClose();
    };
    const menuActions = useMemo(() => {
        return [{ title: t('common.copy.address') }, { title: t('common.view.profile') }];
    }, [t]);
    return (_jsx(InfoRow, { label: isSend ? t('common.text.recipient') : t('common.text.sender'), children: _jsx(ContextMenu, { dropdownMenuMode: true, actions: menuActions, onPress: (e) => {
                // Emitted index based on order of menu action array
                // Copy address
                if (e.nativeEvent.index === 0) {
                    onCopyAddress();
                }
                // View profile
                if (e.nativeEvent.index === 1) {
                    onViewProfile();
                }
            }, children: _jsx(TransactionParticipantDisplay, { address: address }) }) }));
}
//# sourceMappingURL=TransactionParticipantRow.native.js.map