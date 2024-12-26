import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text, TouchableArea, isWeb } from 'ui/src';
import { RotatableChevron } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { NFTViewer } from 'wallet/src/features/images/NFTViewer';
const MAX_NFT_IMAGE_HEIGHT = 375;
export function NftTransactionDetails({ transactionDetails, typeInfo, onClose, }) {
    if (!typeInfo.nftSummaryInfo) {
        return _jsx(_Fragment, {});
    }
    return (_jsx(NftTransactionContent, { chainId: transactionDetails.chainId, nftSummaryInfo: typeInfo.nftSummaryInfo, onClose: onClose }));
}
export function NftTransactionContent({ chainId, nftSummaryInfo, onClose, }) {
    const { navigateToNftCollection, navigateToNftDetails } = useWalletNavigation();
    const onPressNft = () => {
        navigateToNftDetails({
            address: nftSummaryInfo.address,
            tokenId: nftSummaryInfo.tokenId,
        });
        onClose();
    };
    const onPressCollection = () => {
        // Collection should not be clickable on L2s
        if (chainId === UniverseChainId.Mainnet) {
            navigateToNftCollection({ collectionAddress: nftSummaryInfo.address });
            onClose();
        }
    };
    const disableOnPressNftItem = isWeb;
    const disableOnPressNftCollection = isWeb || chainId !== UniverseChainId.Mainnet;
    return (_jsxs(Flex, { borderRadius: "$rounded20", overflow: "hidden", children: [_jsx(TouchableArea, { cursor: "default", disabled: disableOnPressNftItem, onPress: onPressNft, children: _jsx(NFTViewer, { maxHeight: MAX_NFT_IMAGE_HEIGHT, uri: nftSummaryInfo.imageURL }) }), _jsxs(Flex, { borderBottomLeftRadius: "$rounded20", borderBottomRightRadius: "$rounded20", borderColor: "$surface3", borderWidth: 1, borderTopWidth: 0, p: "$spacing12", children: [_jsx(Text, { variant: "subheading2", children: nftSummaryInfo.name }), _jsx(TouchableArea, { cursor: "default", disabled: disableOnPressNftCollection, onPress: onPressCollection, children: _jsxs(Flex, { row: true, pr: "$spacing12", children: [_jsx(Text, { color: "$neutral2", numberOfLines: 1, variant: "body3", children: nftSummaryInfo.collectionName }), !disableOnPressNftCollection && (_jsx(RotatableChevron, { color: "$neutral2", direction: "right", height: iconSizes.icon16, width: iconSizes.icon16 }))] }) })] })] }));
}
//# sourceMappingURL=NftTransactionDetails.js.map