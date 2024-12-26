import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CopySheets, HelpCenter } from 'ui/src/components/icons';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType, CopyNotificationType } from 'uniswap/src/features/notifications/types';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { cancelTransaction } from 'uniswap/src/features/transactions/slice';
import { TransactionStatus } from 'uniswap/src/features/transactions/types/transactionDetails';
import { setClipboard } from 'uniswap/src/utils/clipboard';
import { CancelConfirmationView } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/CancelConfirmationView';
import TransactionActionsModal, { getTransactionId, openSupportLink, } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/TransactionActionsModal';
import { getIsCancelable } from 'wallet/src/features/transactions/utils';
import { useActiveAccountWithThrow } from 'wallet/src/features/wallet/hooks';
export const useTransactionActions = ({ authTrigger, transaction, }) => {
    const { t } = useTranslation();
    const { type } = useActiveAccountWithThrow();
    const readonly = type === AccountType.Readonly;
    const [showActionsModal, setShowActionsModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const dispatch = useDispatch();
    const { status, addedTime } = transaction;
    const isCancelable = !readonly && getIsCancelable(transaction);
    const handleCancel = (txRequest) => {
        if (!transaction) {
            return;
        }
        dispatch(cancelTransaction({
            chainId: transaction.chainId,
            id: transaction.id,
            address: transaction.from,
            cancelRequest: txRequest,
        }));
        setShowCancelModal(false);
    };
    const handleCancelModalClose = () => {
        setShowCancelModal(false);
    };
    const handleActionsModalClose = () => {
        setShowActionsModal(false);
    };
    const handleCancelConfirmationBack = () => {
        setShowCancelModal(false);
    };
    useEffect(() => {
        if (status !== TransactionStatus.Pending) {
            setShowCancelModal(false);
        }
    }, [status]);
    const openActionsModal = () => {
        setShowActionsModal(true);
    };
    const openCancelModal = () => {
        setShowCancelModal(true);
    };
    const renderModals = () => (_jsxs(_Fragment, { children: [showActionsModal && (_jsx(TransactionActionsModal, { msTimestampAdded: addedTime, showCancelButton: isCancelable, transactionDetails: transaction, onCancel: () => {
                    setShowActionsModal(false);
                    setShowCancelModal(true);
                }, onClose: handleActionsModalClose })), showCancelModal && (_jsx(Modal, { hideHandlebar: false, name: ModalName.TransactionActions, onClose: handleCancelModalClose, children: transaction && (_jsx(CancelConfirmationView, { authTrigger: authTrigger, transactionDetails: transaction, onBack: handleCancelConfirmationBack, onCancel: handleCancel })) }))] }));
    const menuItems = useMemo(() => {
        const items = [];
        const transactionId = getTransactionId(transaction);
        if (transactionId) {
            items.push({
                label: t('transaction.action.copy'),
                textProps: { variant: 'body2' },
                onPress: async () => {
                    await setClipboard(transactionId);
                    dispatch(pushNotification({
                        type: AppNotificationType.Copied,
                        copyType: CopyNotificationType.TransactionId,
                    }));
                },
                Icon: CopySheets,
            });
            items.push({
                label: t('settings.action.help'),
                textProps: { variant: 'body2' },
                onPress: async () => {
                    await openSupportLink(transaction);
                },
                Icon: HelpCenter,
            });
        }
        return items;
    }, [transaction, t, dispatch]);
    return {
        openActionsModal,
        openCancelModal,
        renderModals,
        menuItems,
    };
};
//# sourceMappingURL=useTransactionActions.js.map