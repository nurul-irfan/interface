import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable complexity */
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Flex, Text, useSporeColors } from 'ui/src';
import { AlertTriangleFilled, Person } from 'ui/src/components/icons';
import { fonts, spacing } from 'ui/src/theme';
import { TextInput } from 'uniswap/src/components/input/TextInput';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType } from 'uniswap/src/features/notifications/types';
import { ModalName, UnitagEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { UNITAG_SUFFIX } from 'uniswap/src/features/unitags/constants';
import { useUnitagUpdater } from 'uniswap/src/features/unitags/context';
import { UnitagErrorCodes } from 'uniswap/src/features/unitags/types';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { getUniqueId } from 'utilities/src/device/getUniqueId';
import { dismissNativeKeyboard } from 'utilities/src/device/keyboard';
import { logger } from 'utilities/src/logger/logger';
import { isExtension, isMobileApp } from 'utilities/src/platform';
import { useAsyncData } from 'utilities/src/react/hooks';
import { ModalBackButton } from 'wallet/src/components/modals/ModalBackButton';
import { UnitagName } from 'wallet/src/features/unitags/UnitagName';
import { changeUnitag } from 'wallet/src/features/unitags/api';
import { useCanAddressClaimUnitag, useCanClaimUnitagName } from 'wallet/src/features/unitags/hooks';
import { parseUnitagErrorCode } from 'wallet/src/features/unitags/utils';
import { useWalletSigners } from 'wallet/src/features/wallet/context';
import { useAccount } from 'wallet/src/features/wallet/hooks';
export function ChangeUnitagModal({ unitag, address, keyboardHeight = 0, onClose, onSuccess, }) {
    const { t } = useTranslation();
    const colors = useSporeColors();
    const dispatch = useDispatch();
    const { data: deviceId } = useAsyncData(getUniqueId);
    const account = useAccount(address);
    const signerManager = useWalletSigners();
    const [newUnitag, setNewUnitag] = useState(unitag);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isCheckingUnitag, setIsCheckingUnitag] = useState(false);
    const [isChangeResponseLoading, setIsChangeResponseLoading] = useState(false);
    const [unitagToCheck, setUnitagToCheck] = useState(unitag);
    const { error: canClaimUnitagNameError, loading: loadingUnitagErrorCheck } = useCanClaimUnitagName(unitagToCheck);
    const { errorCode } = useCanAddressClaimUnitag(address, true);
    const { triggerRefetchUnitags } = useUnitagUpdater();
    const isUnitagEdited = unitag !== newUnitag;
    const isUnitagInvalid = newUnitag === unitagToCheck && !!canClaimUnitagNameError && !loadingUnitagErrorCheck;
    const isUnitagValid = isUnitagEdited && !canClaimUnitagNameError && !loadingUnitagErrorCheck && !!newUnitag;
    const hasReachedAddressLimit = errorCode === UnitagErrorCodes.AddressLimitReached;
    const isSubmitButtonDisabled = isCheckingUnitag ||
        isChangeResponseLoading ||
        !deviceId ||
        hasReachedAddressLimit ||
        !isUnitagEdited ||
        !newUnitag ||
        isUnitagInvalid;
    const onFinishEditing = () => {
        dismissNativeKeyboard();
    };
    const onCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };
    const onPressSaveChanges = () => {
        if (newUnitag !== unitagToCheck) {
            // Unitag needs to be checked for errors and availability
            setIsCheckingUnitag(true);
            setUnitagToCheck(newUnitag);
        }
        else if (isUnitagValid) {
            // If unitag is unchanged and is available, continue to speedbump
            onFinishEditing();
            setShowConfirmModal(true);
        }
    };
    const onChangeSubmit = async () => {
        if (!deviceId) {
            logger.error(new Error('DeviceId is undefined'), {
                tags: { file: 'ChangeUnitagModal', function: 'onChangeSubmit' },
            });
            return; // Should never hit this condition. Button is disabled if deviceId is undefined
        }
        onFinishEditing();
        setShowConfirmModal(false);
        setIsChangeResponseLoading(true);
        try {
            // Change unitag backend call
            const { data: changeResponse } = await changeUnitag({
                username: unitagToCheck,
                deviceId,
                account,
                signerManager,
            });
            setIsChangeResponseLoading(false);
            // If change failed and returns an error code, display the error message
            if (!changeResponse.success && !!changeResponse.errorCode) {
                dispatch(pushNotification({
                    type: AppNotificationType.Error,
                    errorMessage: parseUnitagErrorCode(t, unitagToCheck, changeResponse.errorCode),
                }));
                return;
            }
            // If change succeeded, exit the modal and display a success message
            if (changeResponse.success) {
                sendAnalyticsEvent(UnitagEventName.UnitagChanged);
                triggerRefetchUnitags();
                dispatch(pushNotification({
                    type: AppNotificationType.Success,
                    title: t('unitags.notification.username.title'),
                }));
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                onClose();
            }
        }
        catch (e) {
            // If some other error occurs, log it and display a generic error message
            logger.error(e, {
                tags: { file: 'ChangeUnitagModal', function: 'onChangeSubmit' },
            });
            dispatch(pushNotification({
                type: AppNotificationType.Error,
                errorMessage: t('unitags.notification.username.error'),
            }));
            onClose();
            setIsChangeResponseLoading(false);
        }
    };
    // When useUnitagError completes loading, if unitag is valid then continue to speedbump
    useEffect(() => {
        if (isCheckingUnitag && !!unitagToCheck && !loadingUnitagErrorCheck) {
            setIsCheckingUnitag(false);
            // If unitagError is defined, it's rendered in UI. If no error, continue to speedbump
            if (unitagToCheck === newUnitag && isUnitagValid) {
                onFinishEditing();
                setShowConfirmModal(true);
            }
        }
    }, [isCheckingUnitag, isUnitagValid, loadingUnitagErrorCheck, newUnitag, unitagToCheck]);
    return (_jsxs(_Fragment, { children: [showConfirmModal && (_jsx(ChangeUnitagConfirmModal, { unitag: newUnitag, onChangeSubmit: onChangeSubmit, onClose: onCloseConfirmModal })), _jsxs(Modal, { isDismissible: true, name: ModalName.UnitagsChange, onClose: onClose, children: [isExtension && _jsx(ModalBackButton, { onBack: onClose }), _jsxs(Flex, { centered: true, gap: "$spacing12", 
                        // Since BottomSheetTextInput doesnt work, dynamically set bottom padding based on keyboard height to get a keyboard avoiding view
                        pb: keyboardHeight > 0 ? keyboardHeight - spacing.spacing20 : '$spacing12', pt: isExtension ? '$spacing24' : '$spacing12', px: isExtension ? undefined : '$spacing24', children: [_jsx(Flex, { centered: true, backgroundColor: "$surface2", borderRadius: "$rounded12", height: "$spacing48", minWidth: "$spacing48", children: _jsx(Person, { color: "$neutral1", size: "$icon.24" }) }), _jsx(Text, { textAlign: "center", variant: "subheading1", children: t('unitags.editUsername.title') }), _jsxs(Flex, { row: true, alignItems: "center", borderColor: "$surface3", borderRadius: "$rounded16", borderWidth: "$spacing1", px: "$spacing24", mt: "$spacing12", width: "100%", children: [_jsx(TextInput, { autoFocus: true, autoCapitalize: "none", color: "$neutral1", fontFamily: "$subHeading", fontSize: fonts.subheading1.fontSize, fontWeight: "$book", m: "$none", maxLength: 20, numberOfLines: 1, px: "$none", py: "$spacing20", returnKeyType: "done", value: newUnitag, width: "100%", onChangeText: (text) => setNewUnitag(text.trim().toLowerCase()), onSubmitEditing: onFinishEditing }), _jsx(Flex, { position: "absolute", right: "$spacing20", top: "$spacing20", children: _jsx(Text, { color: "$neutral3", variant: "subheading1", children: UNITAG_SUFFIX }) })] }), hasReachedAddressLimit ? (_jsx(Flex, { backgroundColor: "$DEP_accentCriticalSoft", borderRadius: "$rounded16", px: "$spacing16", py: "$spacing12", width: "100%", children: _jsx(Text, { color: "$statusCritical", variant: "body3", children: t('unitags.editUsername.warning.max') }) })) : (_jsx(Flex, { backgroundColor: "$surface2", borderRadius: "$rounded16", px: "$spacing16", py: "$spacing12", width: "100%", children: _jsx(Text, { color: "$neutral2", variant: "body3", children: _jsx(Trans, { components: { highlight: _jsx(Text, { color: "$statusCritical", variant: "body3" }) }, i18nKey: "unitags.editUsername.warning.default" }) }) })), _jsx(Flex, { centered: true, row: true, gap: "$spacing8", minHeight: fonts.body3.lineHeight, children: isUnitagEdited && unitagToCheck === newUnitag && canClaimUnitagNameError && (_jsx(Text, { color: "$statusCritical", textAlign: "center", variant: "body3", children: canClaimUnitagNameError })) }), _jsx(Flex, { centered: true, row: true, pt: "$spacing4", width: "100%", children: _jsx(Button, { fill: true, disabled: isSubmitButtonDisabled, testID: TestID.Confirm, theme: "primary", onPress: onPressSaveChanges, children: isCheckingUnitag || isChangeResponseLoading ? (_jsx(Flex, { height: fonts.buttonLabel1.lineHeight, children: _jsx(ActivityIndicator, { color: colors.white.val }) })) : (t('common.button.save')) }) })] })] })] }));
}
function ChangeUnitagConfirmModal({ unitag, onClose, onChangeSubmit, }) {
    const { t } = useTranslation();
    return (_jsxs(Modal, { isDismissible: true, name: ModalName.UnitagsChangeConfirm, onClose: onClose, children: [isExtension && _jsx(ModalBackButton, { onBack: onClose }), _jsxs(Flex, { centered: true, gap: "$spacing12", pb: "$spacing12", pt: isExtension ? '$spacing24' : '$spacing12', px: "$spacing24", children: [_jsx(Flex, { centered: true, backgroundColor: "$DEP_accentCriticalSoft", borderRadius: "$rounded12", height: "$spacing48", mb: "$spacing8", minWidth: "$spacing48", children: _jsx(AlertTriangleFilled, { color: "$statusCritical", size: "$icon.24" }) }), _jsx(Text, { textAlign: "center", variant: "subheading1", children: t('unitags.editUsername.confirm.title') }), _jsx(Text, { color: "$neutral2", textAlign: "center", variant: isExtension ? 'body3' : 'body2', children: t('unitags.editUsername.confirm.subtitle') }), _jsx(Flex, { py: "$spacing32", children: _jsx(UnitagName, { name: unitag, fontSize: fonts.heading3.fontSize }) }), _jsxs(Flex, { centered: true, row: true, gap: "$spacing12", width: "100%", children: [isMobileApp && (_jsx(Button, { fill: true, testID: TestID.Remove, theme: "secondary", onPress: onClose, children: t('common.button.back') })), _jsx(Button, { fill: true, testID: TestID.Remove, theme: "detrimental", onPress: onChangeSubmit, children: t('common.button.confirm') })] })] })] }));
}
//# sourceMappingURL=ChangeUnitagModal.js.map