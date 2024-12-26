import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text, TouchableArea, useSporeColors } from 'ui/src';
import { Camera, PhotoStacked, Share, Trash } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { ElementName, ModalName } from 'uniswap/src/features/telemetry/constants';
import { isExtension } from 'utilities/src/platform';
import { selectPhotoFromLibrary } from 'wallet/src/features/unitags/AvatarSelection';
import { ChooseNftModal } from 'wallet/src/features/unitags/ChooseNftModal';
export const ChoosePhotoOptionsModal = ({ address, hasNFTs, nftModalProps, setPhotoUri, onClose, showRemoveOption, }) => {
    const colors = useSporeColors();
    const [showNftsList, setShowNftsList] = useState(false);
    const onPressNftsList = async () => {
        setShowNftsList(true);
    };
    const onCloseNftsList = () => {
        setShowNftsList(false);
        onClose();
    };
    const onRemovePhoto = async () => {
        setPhotoUri(undefined);
        onClose();
    };
    const onPressCameraRoll = async () => {
        const selectedPhoto = await selectPhotoFromLibrary();
        // Close needs to happen before setting the photo, otherwise the handler can get cut short
        onClose();
        if (selectedPhoto) {
            setPhotoUri(selectedPhoto);
        }
    };
    const options = [
        {
            key: `${ElementName.OpenCameraRoll}`,
            onPress: onPressCameraRoll,
            item: _jsx(ChoosePhotoOption, { type: PhotoAction.BrowseCameraRoll }),
        },
    ];
    if (hasNFTs) {
        options.push({
            key: `${ElementName.OpenNftsList}`,
            onPress: onPressNftsList,
            item: _jsx(ChoosePhotoOption, { type: PhotoAction.BrowseNftsList }),
        });
    }
    if (showRemoveOption) {
        options.push({
            key: `${ElementName.Remove}`,
            onPress: onRemovePhoto,
            item: _jsx(ChoosePhotoOption, { type: PhotoAction.RemovePhoto }),
        });
    }
    return (_jsxs(_Fragment, { children: [_jsx(Modal, { isDismissible: true, backgroundColor: colors.surface1.val, hideHandlebar: false, name: ModalName.ChooseProfilePhoto, onClose: onClose, children: _jsx(Flex, { centered: true, gap: "$spacing24", pt: "$spacing8", px: "$spacing24", children: _jsx(Flex, { gap: "$spacing12", width: "100%", children: options.map((option) => (_jsx(TouchableArea, { onPress: option.onPress, children: option.item }, option.key))) }) }) }), showNftsList && address && (_jsx(ChooseNftModal, { address: address, setPhotoUri: setPhotoUri, onClose: onCloseNftsList, ...nftModalProps }))] }));
};
var PhotoAction;
(function (PhotoAction) {
    PhotoAction["BrowseCameraRoll"] = "camera-roll";
    PhotoAction["BrowseNftsList"] = "nfts-list";
    PhotoAction["RemovePhoto"] = "remove-photo";
})(PhotoAction || (PhotoAction = {}));
const ChoosePhotoOption = ({ type }) => {
    const { t } = useTranslation();
    return (_jsxs(Flex, { row: true, alignItems: "center", backgroundColor: "$surface3", borderRadius: "$rounded20", gap: "$spacing16", justifyContent: "flex-start", p: "$spacing24", children: [type === PhotoAction.BrowseCameraRoll &&
                (isExtension ? (_jsx(Share, { color: "$neutral1", size: iconSizes.icon24 })) : (_jsx(Camera, { color: "$neutral1", size: iconSizes.icon24 }))), type === PhotoAction.BrowseNftsList && _jsx(PhotoStacked, { color: "$neutral1", size: iconSizes.icon24 }), type === PhotoAction.RemovePhoto && _jsx(Trash, { color: "$statusCritical", size: iconSizes.icon24 }), _jsx(Flex, { shrink: true, alignItems: "flex-start", children: _jsxs(Text, { color: type === PhotoAction.RemovePhoto ? '$statusCritical' : '$neutral1', numberOfLines: 1, variant: "buttonLabel1", children: [type === PhotoAction.BrowseCameraRoll &&
                            (isExtension ? t('unitags.choosePhoto.option.computer') : t('unitags.choosePhoto.option.cameraRoll')), type === PhotoAction.BrowseNftsList && t('unitags.choosePhoto.option.nft'), type === PhotoAction.RemovePhoto && t('unitags.choosePhoto.option.remove')] }) })] }));
};
//# sourceMappingURL=ChoosePhotoOptionsModal.js.map