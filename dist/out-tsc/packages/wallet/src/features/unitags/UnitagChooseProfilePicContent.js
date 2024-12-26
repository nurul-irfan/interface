import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator } from 'react-native';
import { Button, Flex, Text, TouchableArea, useIsDarkMode, useSporeColors } from 'ui/src';
import { Pen } from 'ui/src/components/icons';
import { fonts, iconSizes, imageSizes, spacing } from 'ui/src/theme';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { useENSName } from 'uniswap/src/features/ens/api';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { ExtensionScreens } from 'uniswap/src/types/screens/extension';
import { MobileScreens, OnboardingScreens } from 'uniswap/src/types/screens/mobile';
import { isMobileApp } from 'utilities/src/platform';
import { useAvatarSelectionHandler } from 'wallet/src/features/unitags/AvatarSelection';
import { ChoosePhotoOptionsModal } from 'wallet/src/features/unitags/ChoosePhotoOptionsModal';
import { UnitagName } from 'wallet/src/features/unitags/UnitagName';
import { UnitagProfilePicture } from 'wallet/src/features/unitags/UnitagProfilePicture';
import { useClaimUnitag } from 'wallet/src/features/unitags/hooks';
function convertEntryPointToAnalyticsSource(entryPoint) {
    switch (entryPoint) {
        case ExtensionScreens.Home:
        // falls through
        case MobileScreens.Home:
            return 'home';
        case MobileScreens.Settings:
            return 'settings';
        case OnboardingScreens.Landing:
            return 'onboarding';
        default:
            throw new Error(`unhandled entryPoint for ChooseProfilePictureScreen: ${entryPoint}`);
    }
}
export function UnitagChooseProfilePicContent({ address, unitag, shouldHandleClaim, entryPoint, unitagFontSize, nftModalProps, onContinue, }) {
    const { t } = useTranslation();
    const colors = useSporeColors();
    const { data: ensName } = useENSName(address, UniverseChainId.Mainnet);
    const claimUnitag = useClaimUnitag();
    const isDarkMode = useIsDarkMode();
    const [imageUri, setImageUri] = useState();
    const [showModal, setShowModal] = useState(false);
    const [claimError, setClaimError] = useState();
    const [isClaiming, setIsClaiming] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
    const onCloseModal = () => {
        setShowModal(false);
    };
    const { avatarSelectionHandler, hasNFTs } = useAvatarSelectionHandler({
        address,
        avatarImageUri: imageUri,
        setAvatarImageUri: setImageUri,
        showModal: openModal,
    });
    const onPressContinue = async () => {
        if (shouldHandleClaim) {
            await attemptClaimUnitag();
        }
        else {
            onContinue(imageUri);
        }
    };
    const attemptClaimUnitag = async () => {
        setIsClaiming(true);
        const source = convertEntryPointToAnalyticsSource(entryPoint);
        const { claimError: attemptClaimError } = await claimUnitag({
            address,
            username: unitag,
            avatarUri: imageUri,
        }, {
            source,
            hasENSAddress: !!ensName,
        });
        setIsClaiming(false);
        setClaimError(attemptClaimError);
        if (attemptClaimError === undefined) {
            onContinue(imageUri);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Flex, { centered: true, gap: "$spacing20", mt: "$spacing24", children: [_jsxs(TouchableArea, { onPress: avatarSelectionHandler, children: [_jsx(Flex, { px: "$spacing4", children: _jsx(ProfilePicture, { address: address, imageUri: imageUri }) }), _jsx(Flex, { backgroundColor: "$surface1", borderRadius: "$roundedFull", bottom: -spacing.spacing2, p: "$spacing4", position: "absolute", right: -spacing.spacing2, testID: TestID.Edit, children: _jsx(Flex, { backgroundColor: isDarkMode ? '$neutral3' : '$neutral2', borderRadius: "$roundedFull", p: 8, children: _jsx(Pen, { color: isDarkMode ? '$neutral1' : '$surface1', size: iconSizes.icon16 }) }) })] }), _jsx(Flex, { row: true, children: isMobileApp && _jsx(UnitagName, { fontSize: unitagFontSize, name: unitag }) }), !!claimError && (_jsx(Text, { color: "$statusCritical", variant: "body2", children: claimError }))] }), isMobileApp && _jsx(Flex, { fill: true }), _jsx(Button, { disabled: !!claimError || isClaiming, size: "medium", testID: TestID.Continue, theme: "primary", onPress: onPressContinue, children: isClaiming ? (_jsx(Flex, { height: fonts.buttonLabel1.lineHeight, children: _jsx(ActivityIndicator, { color: colors.white.val }) })) : (t('common.button.continue')) }), showModal && (_jsx(ChoosePhotoOptionsModal, { address: address, hasNFTs: hasNFTs, nftModalProps: nftModalProps, showRemoveOption: !!imageUri, setPhotoUri: setImageUri, onClose: onCloseModal }))] }));
}
function ProfilePicture({ address, imageUri }) {
    if (address) {
        return _jsx(UnitagProfilePicture, { address: address, size: imageSizes.image100, unitagAvatarUri: imageUri });
    }
    return _jsx(Flex, { borderRadius: "$roundedFull", height: imageSizes.image100, overflow: "hidden", width: imageSizes.image100 });
}
//# sourceMappingURL=UnitagChooseProfilePicContent.js.map