import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Flex, Text, isWeb, useSporeColors } from 'ui/src';
import { X } from 'ui/src/components/icons';
import { spacing } from 'ui/src/theme';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { useAppInsets } from 'uniswap/src/hooks/useAppInsets';
import { isMobileApp } from 'utilities/src/platform';
import { NftView } from 'wallet/src/components/nfts/NftView';
import { NftViewWithContextMenu } from 'wallet/src/components/nfts/NftViewWithContextMenu';
import { NftsList } from 'wallet/src/components/nfts/NftsList';
export const NFT_MODAL_MAX_WIDTH = 610;
export const extensionNftModalProps = {
    includeContextMenu: false,
    itemMargin: '$spacing6',
    containerProps: { m: -spacing.spacing6 }, // Cancels out the margin on each NFT item
    modalMaxWidth: NFT_MODAL_MAX_WIDTH,
    numColumns: 4,
};
export const ChooseNftModal = ({ address, includeContextMenu = true, itemMargin = '$spacing4', numColumns, containerProps, modalMaxWidth, setPhotoUri, onClose, }) => {
    const colors = useSporeColors();
    const insets = useAppInsets();
    const { t } = useTranslation();
    const renderNFT = (item) => {
        const onPressNft = () => {
            setPhotoUri(item.imageUrl);
            onClose();
        };
        return (_jsx(Flex, { fill: true, m: itemMargin, children: includeContextMenu ? (_jsx(NftViewWithContextMenu, { item: item, owner: address, onPress: onPressNft })) : (_jsx(NftView, { item: item, onPress: onPressNft })) }));
    };
    const renderedInBottomSheet = isMobileApp;
    return (_jsx(Modal, { overrideInnerContainer: true, backgroundColor: colors.surface1.val, hideHandlebar: false, isDismissible: renderedInBottomSheet, name: ModalName.NftCollection, maxWidth: modalMaxWidth, padding: isWeb ? spacing.spacing24 : undefined, onClose: onClose, children: _jsxs(Flex, { fill: true, gap: "$spacing24", children: [isWeb ? (_jsxs(Flex, { row: true, centered: true, children: [_jsx(Flex, { grow: true, centered: true, children: _jsx(Text, { color: "$neutral1", variant: "subheading1", children: t('unitags.choosePhoto.option.nft') }) }), _jsx(X, { position: "absolute", left: 0, size: "$icon.24", cursor: "pointer", color: "$neutral2", onClick: onClose })] })) : undefined, _jsx(Flex, { fill: true, ...containerProps, children: _jsx(NftsList, { renderedInModal: renderedInBottomSheet, owner: address, renderNFTItem: renderNFT, contentContainerStyle: {
                            paddingHorizontal: spacing.spacing12,
                            paddingTop: spacing.spacing12,
                            paddingBottom: renderedInBottomSheet ? insets.bottom + spacing.spacing12 : undefined,
                        }, numColumns: numColumns }) })] }) }));
};
//# sourceMappingURL=ChooseNftModal.js.map