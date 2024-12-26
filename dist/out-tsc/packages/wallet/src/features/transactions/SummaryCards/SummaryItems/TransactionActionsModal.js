import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Flex, Separator, Text, isWeb } from 'ui/src';
import { ActionSheetModalContent } from 'uniswap/src/components/modals/ActionSheetModal';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { FORMAT_DATE_LONG, useFormattedDate } from 'uniswap/src/features/language/localizedDayjs';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType, CopyNotificationType } from 'uniswap/src/features/notifications/types';
import { ElementName, ModalName } from 'uniswap/src/features/telemetry/constants';
import { TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import { setClipboard } from 'uniswap/src/utils/clipboard';
import { openUri } from 'uniswap/src/utils/linking';
import { logger } from 'utilities/src/logger/logger';
import { openOnRampSupportLink } from 'wallet/src/utils/linking';
function renderOptionItem(label, textColorOverride) {
    return function OptionItem() {
        return (_jsxs(_Fragment, { children: [_jsx(Separator, {}), _jsx(Text, { color: textColorOverride !== null && textColorOverride !== void 0 ? textColorOverride : '$neutral1', p: "$spacing16", textAlign: "center", variant: "body1", children: label })] }));
    };
}
/** Display options for transactions. */
export default function TransactionActionsModal({ msTimestampAdded, onCancel, onClose, showCancelButton, transactionDetails, }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const dateString = useFormattedDate(dayjs(msTimestampAdded), FORMAT_DATE_LONG);
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);
    const options = useMemo(() => {
        var _a;
        const transactionId = getTransactionId(transactionDetails);
        const onRampProviderName = transactionDetails.typeInfo.type === TransactionType.OnRampPurchase ||
            transactionDetails.typeInfo.type === TransactionType.OnRampTransfer
            ? (_a = transactionDetails.typeInfo.serviceProvider) === null || _a === void 0 ? void 0 : _a.name
            : undefined;
        const maybeCopyTransactionIdOption = transactionId
            ? [
                {
                    key: ElementName.Copy,
                    onPress: async () => {
                        await setClipboard(transactionId);
                        dispatch(pushNotification({
                            type: AppNotificationType.Copied,
                            copyType: CopyNotificationType.TransactionId,
                        }));
                        handleClose();
                    },
                    render: onRampProviderName
                        ? renderOptionItem(t('transaction.action.copyProvider', {
                            providerName: onRampProviderName,
                        }))
                        : renderOptionItem(t('transaction.action.copy')),
                },
            ]
            : [];
        const transactionActionOptions = [
            ...maybeCopyTransactionIdOption,
            {
                key: ElementName.GetHelp,
                onPress: async () => {
                    await openSupportLink(transactionDetails);
                    handleClose();
                },
                render: renderOptionItem(t('settings.action.help')),
            },
        ];
        if (showCancelButton) {
            transactionActionOptions.push({
                key: ElementName.Cancel,
                onPress: onCancel,
                render: renderOptionItem(t('transaction.action.cancel.button'), '$statusCritical'),
            });
        }
        return transactionActionOptions;
    }, [transactionDetails, t, showCancelButton, dispatch, handleClose, onCancel]);
    return (_jsx(Modal, { hideHandlebar: true, backgroundColor: "$transparent", name: ModalName.TransactionActions, onClose: handleClose, ...(isWeb && { alignment: 'top' }), children: _jsx(Flex, { px: "$spacing12", children: _jsx(ActionSheetModalContent, { header: _jsx(Text, { color: "$neutral3", p: "$spacing16", variant: "body2", children: t('transaction.date', { date: dateString }) }), options: options, onClose: handleClose }) }) }));
}
export async function openSupportLink(transactionDetails) {
    var _a, _b;
    const params = new URLSearchParams();
    switch (transactionDetails.typeInfo.type) {
        case TransactionType.OnRampPurchase:
        case TransactionType.OnRampTransfer:
            return openOnRampSupportLink(transactionDetails.typeInfo.serviceProvider);
        default:
            params.append('tf_11041337007757', (_a = transactionDetails.ownerAddress) !== null && _a !== void 0 ? _a : ''); // Wallet Address
            params.append('tf_7005922218125', isWeb ? 'uniswap_extension_issue' : 'uw_ios_app'); // Report Type Dropdown
            params.append('tf_13686083567501', 'uw_transaction_details_page_submission'); // Issue type Dropdown
            params.append('tf_9807731675917', (_b = transactionDetails.hash) !== null && _b !== void 0 ? _b : 'N/A'); // Transaction id
            return openUri(uniswapUrls.helpRequestUrl + '?' + params.toString()).catch((e) => logger.error(e, { tags: { file: 'TransactionActionsModal', function: 'getHelpLink' } }));
    }
}
export function getTransactionId(transactionDetails) {
    switch (transactionDetails.typeInfo.type) {
        case TransactionType.OnRampPurchase:
        case TransactionType.OnRampTransfer:
            return transactionDetails.typeInfo.id;
        default:
            return transactionDetails.hash;
    }
}
//# sourceMappingURL=TransactionActionsModal.js.map