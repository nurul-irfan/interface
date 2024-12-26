import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Flex, LinearGradient, ScrollView, Text, getUniconColors, useExtractedColors, useIsDarkMode, useSporeColors, } from 'ui/src';
import { Pen } from 'ui/src/components/icons';
import { borderRadii, fonts, iconSizes, imageSizes, spacing } from 'ui/src/theme';
import { TextInput } from 'uniswap/src/components/input/TextInput';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { useENS } from 'uniswap/src/features/ens/useENS';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType } from 'uniswap/src/features/notifications/types';
import { UnitagEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { useUnitagUpdater } from 'uniswap/src/features/unitags/context';
import { useUnitagByAddress } from 'uniswap/src/features/unitags/hooks';
import { UnitagScreens } from 'uniswap/src/types/screens/mobile';
import { shortenAddress } from 'utilities/src/addresses';
import { dismissNativeKeyboard } from 'utilities/src/device/keyboard';
import { logger } from 'utilities/src/logger/logger';
import { isExtension, isMobileApp } from 'utilities/src/platform';
import { normalizeTwitterUsername } from 'utilities/src/primitives/string';
import { DisplayNameText } from 'wallet/src/components/accounts/DisplayNameText';
import { useAvatarSelectionHandler } from 'wallet/src/features/unitags/AvatarSelection';
import { extensionNftModalProps } from 'wallet/src/features/unitags/ChooseNftModal';
import { ChoosePhotoOptionsModal } from 'wallet/src/features/unitags/ChoosePhotoOptionsModal';
import { HeaderRadial, solidHeaderProps } from 'wallet/src/features/unitags/HeaderRadial';
import { UnitagProfilePicture } from 'wallet/src/features/unitags/UnitagProfilePicture';
import { updateUnitagMetadata } from 'wallet/src/features/unitags/api';
import { tryUploadAvatar } from 'wallet/src/features/unitags/avatars';
import { useAvatarUploadCredsWithRefresh } from 'wallet/src/features/unitags/hooks';
import { useWalletSigners } from 'wallet/src/features/wallet/context';
import { useAccount } from 'wallet/src/features/wallet/hooks';
import { DisplayNameType } from 'wallet/src/features/wallet/types';
const PADDING_WIDTH = isExtension ? '$none' : '$spacing16';
const isProfileMetadataEdited = (loading, updatedMetadata, initialMetadata) => {
    return (!loading &&
        (isFieldEdited(initialMetadata === null || initialMetadata === void 0 ? void 0 : initialMetadata.avatar, updatedMetadata.avatar) ||
            isFieldEdited(initialMetadata === null || initialMetadata === void 0 ? void 0 : initialMetadata.description, updatedMetadata.description) ||
            isFieldEdited(initialMetadata === null || initialMetadata === void 0 ? void 0 : initialMetadata.twitter, updatedMetadata.twitter)));
};
function isFieldEdited(a, b) {
    const aNonValue = a === undefined || a === '';
    const bNonValue = b === undefined || b === '';
    if (aNonValue && bNonValue) {
        return false;
    }
    else {
        return a !== b;
    }
}
export function EditUnitagProfileContent({ address, unitag, entryPoint, onNavigate, }) {
    const { t } = useTranslation();
    const account = useAccount(address);
    const colors = useSporeColors();
    const signerManager = useWalletSigners();
    const dispatch = useDispatch();
    const { unitag: retrievedUnitag, loading } = useUnitagByAddress(address);
    const unitagMetadata = retrievedUnitag === null || retrievedUnitag === void 0 ? void 0 : retrievedUnitag.metadata;
    const [twitterInput, setTwitterInput] = useState();
    const [avatarImageUri, setAvatarImageUri] = useState();
    const [updateResponseLoading, setUpdateResponseLoading] = useState(false);
    const [bioInput, setBioInput] = useState();
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    useEffect(() => {
        // Only want to set values on first time unitag loads, when we have not yet made the PUT request
        if (unitagMetadata) {
            setAvatarImageUri(unitagMetadata.avatar);
            setBioInput(unitagMetadata.description);
            setTwitterInput(unitagMetadata.twitter);
            setUpdateResponseLoading(false);
        }
    }, [unitagMetadata]);
    const { triggerRefetchUnitags } = useUnitagUpdater();
    const { avatarUploadUrlResponse, avatarUploadUrlLoading } = useAvatarUploadCredsWithRefresh({
        unitag,
        account,
        signerManager,
    });
    const updatedMetadata = {
        ...(avatarImageUri ? { avatar: avatarImageUri } : {}),
        description: bioInput,
        twitter: twitterInput,
    };
    const isDarkMode = useIsDarkMode();
    const { name: ensName } = useENS(UniverseChainId.Mainnet, address);
    const onSetTwitterInput = (input) => {
        const normalizedInput = normalizeTwitterUsername(input);
        setTwitterInput(normalizedInput);
    };
    const profileMetadataEdited = isProfileMetadataEdited(updateResponseLoading, updatedMetadata, unitagMetadata);
    const { colors: avatarColors } = useExtractedColors(avatarImageUri);
    const { color: uniconColor } = getUniconColors(address, false);
    // Wait for avatar, then render avatar extracted colors or unicon colors if no avatar
    const fixedGradientColors = useMemo(() => {
        if (avatarImageUri && !avatarColors) {
            return [colors.surface1.val, colors.surface1.val];
        }
        else if (avatarImageUri && avatarColors && avatarColors.base) {
            return [avatarColors.base, avatarColors.base];
        }
        else {
            return [uniconColor, uniconColor];
        }
    }, [avatarImageUri, avatarColors, colors.surface1.val, uniconColor]);
    const openAvatarModal = () => {
        dismissNativeKeyboard();
        setShowAvatarModal(true);
    };
    const onCloseAvatarModal = () => {
        setShowAvatarModal(false);
    };
    const { avatarSelectionHandler, hasNFTs } = useAvatarSelectionHandler({
        address,
        avatarImageUri,
        setAvatarImageUri,
        showModal: openAvatarModal,
    });
    const onPressSaveChanges = async () => {
        dismissNativeKeyboard();
        // Try to upload avatar or skip avatar upload if not needed
        try {
            const { success, skipped } = await tryUploadAvatar({
                avatarImageUri,
                avatarUploadUrlResponse,
                avatarUploadUrlLoading,
            });
            // Display error if avatar upload failed
            if (!success) {
                handleUpdateError();
                return;
            }
            const uploadedNewAvatar = success && !skipped;
            await updateProfileMetadata(uploadedNewAvatar);
        }
        catch (e) {
            logger.error(e, {
                tags: { file: 'EditUnitagProfileScreen', function: 'onPressSaveChanges' },
            });
            handleUpdateError();
        }
    };
    const updateProfileMetadata = async (uploadedNewAvatar) => {
        // If new avatar was uploaded, update metadata.avatar to be the S3 file location
        const metadata = uploadedNewAvatar
            ? {
                ...updatedMetadata,
                // Add Date.now() to the end to ensure the resulting URL is not cached by devices
                avatar: (avatarUploadUrlResponse === null || avatarUploadUrlResponse === void 0 ? void 0 : avatarUploadUrlResponse.avatarUrl) ? avatarUploadUrlResponse.avatarUrl + `?${Date.now()}` : undefined,
            }
            : updatedMetadata;
        setUpdateResponseLoading(true);
        const { data: updateResponse } = await updateUnitagMetadata({
            username: unitag,
            metadata,
            clearAvatar: metadata.avatar === undefined,
            account,
            signerManager,
        });
        if (!updateResponse.success) {
            handleUpdateError();
            return;
        }
        // Log changed metadata
        sendAnalyticsEvent(UnitagEventName.UnitagMetadataUpdated, {
            avatar: uploadedNewAvatar,
            description: isFieldEdited(unitagMetadata === null || unitagMetadata === void 0 ? void 0 : unitagMetadata.description, updatedMetadata.description),
            twitter: isFieldEdited(unitagMetadata === null || unitagMetadata === void 0 ? void 0 : unitagMetadata.twitter, updatedMetadata.twitter),
        });
        dispatch(pushNotification({
            type: AppNotificationType.Success,
            title: t('unitags.notification.profile.title'),
        }));
        triggerRefetchUnitags();
        if (uploadedNewAvatar) {
            setAvatarImageUri(avatarUploadUrlResponse === null || avatarUploadUrlResponse === void 0 ? void 0 : avatarUploadUrlResponse.avatarUrl);
        }
        // If entered from claim flow confirmation screen, navigate back to home on update success
        if (entryPoint === UnitagScreens.UnitagConfirmation) {
            onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate();
        }
    };
    const handleUpdateError = () => {
        setUpdateResponseLoading(false);
        dispatch(pushNotification({
            type: AppNotificationType.Error,
            errorMessage: t('unitags.notification.profile.error'),
        }));
    };
    const inputProps = {
        blurOnSubmit: true,
        fontFamily: '$body',
        fontSize: '$medium',
        fontWeight: '300',
        p: '$none',
        placeholderTextColor: '$neutral3',
        returnKeyType: 'done',
        textAlign: 'left',
        borderRadius: isExtension ? 0 : undefined,
    };
    return (_jsxs(_Fragment, { children: [_jsx(ScrollView, { contentContainerStyle: { pb: '$spacing24' }, keyboardShouldPersistTaps: "handled", px: isExtension ? undefined : '$spacing24', showsVerticalScrollIndicator: false, children: _jsx(Flex, { grow: true, gap: "$spacing36", children: _jsxs(Flex, { fill: true, justifyContent: "space-between", children: [_jsxs(Flex, { pt: isExtension ? '$spacing48' : undefined, pb: "$spacing48", children: [isMobileApp && (_jsxs(Flex, { height: imageSizes.image100, children: [_jsx(Flex, { backgroundColor: "$surface1", borderRadius: "$rounded20", bottom: 0, left: 0, position: "absolute", right: 0, top: 0 }), _jsx(LinearGradient, { colors: fixedGradientColors, end: { x: 1, y: 1 }, start: { x: 0, y: 1 }, style: {
                                                    borderRadius: borderRadii.rounded20,
                                                    flex: 1,
                                                    opacity: 0.2,
                                                } }), avatarImageUri && (avatarColors === null || avatarColors === void 0 ? void 0 : avatarColors.primary) ? (_jsx(HeaderRadial, { borderRadius: spacing.spacing20, color: avatarColors.primary, ...solidHeaderProps })) : null] })), _jsxs(Flex, { bottom: spacing.spacing16, cursor: "pointer", mx: PADDING_WIDTH, position: "absolute", onPress: avatarSelectionHandler, children: [_jsx(Flex, { backgroundColor: "$surface1", borderRadius: "$roundedFull", children: _jsx(UnitagProfilePicture, { address: address, size: iconSizes.icon70, unitagAvatarUri: avatarImageUri }) }), _jsx(Flex, { backgroundColor: "$surface1", borderRadius: "$roundedFull", bottom: -spacing.spacing2, p: "$spacing2", position: "absolute", right: -spacing.spacing2, children: _jsx(Flex, { backgroundColor: isDarkMode ? '$neutral3' : '$neutral2', borderRadius: "$roundedFull", p: 6, children: _jsx(Pen, { color: isDarkMode ? '$neutral1' : '$surface1', size: iconSizes.icon16 }) }) })] })] }), _jsxs(Flex, { alignItems: "flex-start", gap: "$spacing2", pb: "$spacing16", px: PADDING_WIDTH, children: [_jsx(DisplayNameText, { displayName: { name: unitag, type: DisplayNameType.Unitag }, textProps: { variant: 'heading3' } }), _jsx(Text, { color: "$neutral2", variant: "subheading2", children: shortenAddress(address) })] }), _jsxs(Flex, { row: true, gap: "$spacing24", px: PADDING_WIDTH, pt: "$spacing16", children: [_jsxs(Flex, { flex: 1, gap: "$spacing24", children: [_jsx(Text, { color: "$neutral2", pt: "$spacing4", variant: "subheading1", children: t('unitags.profile.bio.label') }), _jsx(Text, { color: "$neutral2", variant: "subheading1", children: t('unitags.profile.links.twitter') }), ensName && (_jsx(Text, { color: "$neutral2", variant: "subheading1", children: "ENS" }))] }), _jsxs(Flex, { flex: 3, gap: "$spacing24", children: [!loading ? (_jsx(TextInput, { autoCorrect: true, height: fonts.subheading1.lineHeight, placeholder: t('unitags.profile.bio.placeholder'), value: bioInput, verticalAlign: "top", onChangeText: setBioInput, ...inputProps, mt: "$spacing4" })) : null, !loading ? (_jsxs(Flex, { row: true, gap: "$none", children: [_jsx(Text, { color: "$neutral3", children: "@" }), _jsx(TextInput, { autoCapitalize: "none", autoComplete: "off", autoCorrect: false, height: fonts.subheading1.lineHeight, placeholder: t('unitags.editProfile.placeholder'), value: twitterInput, verticalAlign: "top", onChangeText: onSetTwitterInput, ...inputProps })] })) : null, ensName && (_jsx(Text, { color: "$neutral2", variant: "body2", children: ensName }))] })] })] }) }) }), _jsx(Button, { disabled: !profileMetadataEdited, mt: "$spacing12", mx: isExtension ? undefined : '$spacing24', size: "medium", theme: "primary", onPress: onPressSaveChanges, children: t('common.button.save') }), showAvatarModal && (_jsx(ChoosePhotoOptionsModal, { address: address, hasNFTs: hasNFTs, setPhotoUri: setAvatarImageUri, showRemoveOption: !!avatarImageUri, nftModalProps: isExtension ? extensionNftModalProps : undefined, onClose: onCloseAvatarModal }))] }));
}
//# sourceMappingURL=EditUnitagProfileContent.js.map