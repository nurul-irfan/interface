import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Flex, Text, useSporeColors } from 'ui/src';
import { AlertTriangleFilled } from 'ui/src/components/icons';
import { fonts } from 'ui/src/theme';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType } from 'uniswap/src/features/notifications/types';
import { ModalName, UnitagEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { useUnitagUpdater } from 'uniswap/src/features/unitags/context';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { logger } from 'utilities/src/logger/logger';
import { isExtension } from 'utilities/src/platform';
import { ModalBackButton } from 'wallet/src/components/modals/ModalBackButton';
import { UnitagName } from 'wallet/src/features/unitags/UnitagName';
import { deleteUnitag } from 'wallet/src/features/unitags/api';
import { useWalletSigners } from 'wallet/src/features/wallet/context';
import { useAccount } from 'wallet/src/features/wallet/hooks';
export function DeleteUnitagModal({ unitag, address, onClose, onSuccess, }) {
    const { t } = useTranslation();
    const colors = useSporeColors();
    const dispatch = useDispatch();
    const { triggerRefetchUnitags } = useUnitagUpdater();
    const account = useAccount(address);
    const signerManager = useWalletSigners();
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDeleteError = () => {
        setIsDeleting(false);
        dispatch(pushNotification({
            type: AppNotificationType.Error,
            errorMessage: t('unitags.notification.delete.error'),
        }));
        onClose();
    };
    const onDelete = async () => {
        try {
            setIsDeleting(true);
            const { data: deleteResponse } = await deleteUnitag({
                username: unitag,
                account,
                signerManager,
            });
            setIsDeleting(false);
            if (!(deleteResponse === null || deleteResponse === void 0 ? void 0 : deleteResponse.success)) {
                handleDeleteError();
                return;
            }
            if (deleteResponse === null || deleteResponse === void 0 ? void 0 : deleteResponse.success) {
                sendAnalyticsEvent(UnitagEventName.UnitagRemoved);
                triggerRefetchUnitags();
                dispatch(pushNotification({
                    type: AppNotificationType.Success,
                    title: t('unitags.notification.delete.title'),
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                onClose();
            }
        }
        catch (e) {
            logger.error(e, {
                tags: { file: 'DeleteUnitagModal', function: 'onDelete' },
            });
            handleDeleteError();
        }
    };
    return (_jsxs(Modal, { isDismissible: true, name: ModalName.UnitagsDelete, onClose: onClose, children: [isExtension && _jsx(ModalBackButton, { onBack: onClose }), _jsxs(Flex, { centered: true, gap: "$spacing12", pb: "$spacing12", pt: isExtension ? '$spacing24' : '$spacing12', px: "$spacing24", children: [_jsx(Flex, { centered: true, backgroundColor: "$DEP_accentCriticalSoft", borderRadius: "$rounded12", height: "$spacing48", mb: "$spacing8", minWidth: "$spacing48", children: _jsx(AlertTriangleFilled, { color: "$statusCritical", size: "$icon.24" }) }), _jsx(Text, { textAlign: "center", variant: "subheading1", children: t('unitags.delete.confirm.title') }), _jsx(Text, { color: "$neutral2", textAlign: "center", variant: isExtension ? 'body3' : 'body2', children: t('unitags.delete.confirm.subtitle') }), _jsx(Flex, { py: "$spacing24", children: _jsx(UnitagName, { name: unitag, fontSize: fonts.heading3.fontSize }) }), _jsx(Flex, { centered: true, row: true, width: "100%", children: _jsx(Button, { fill: true, disabled: isDeleting, testID: TestID.Remove, theme: "detrimental", onPress: onDelete, children: isDeleting ? (_jsx(Flex, { height: fonts.buttonLabel1.lineHeight, children: _jsx(ActivityIndicator, { color: colors.white.val }) })) : (t('common.button.delete')) }) })] })] }));
}
//# sourceMappingURL=DeleteUnitagModal.js.map