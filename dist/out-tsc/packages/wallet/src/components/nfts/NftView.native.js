import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, TouchableArea } from 'ui/src';
import noop from 'utilities/src/react/noop';
import { NFTViewer } from 'wallet/src/features/images/NFTViewer';
import { ESTIMATED_NFT_LIST_ITEM_SIZE, MAX_NFT_IMAGE_SIZE } from 'wallet/src/features/nfts/constants';
// WALL-4875 TODO try to combine web and mobile versions
export function NftView({ item, onPress, index }) {
    return (_jsx(Flex, { children: _jsx(TouchableArea, { activeOpacity: 1, testID: `nfts-list-item-${index !== null && index !== void 0 ? index : 0}`, 
            // Needed to fix long press issue with context menu on Android
            onLongPress: noop, onPress: onPress, children: _jsx(Flex, { alignItems: "center", aspectRatio: 1, backgroundColor: "$surface3", borderRadius: "$rounded12", overflow: "hidden", width: "100%", children: _jsx(NFTViewer, { autoplay: true, svgRenderingDisabled: true, imageDimensions: item.imageDimensions, limitGIFSize: ESTIMATED_NFT_LIST_ITEM_SIZE, maxHeight: MAX_NFT_IMAGE_SIZE, placeholderContent: item.name || item.collectionName, squareGridView: true, uri: item.imageUrl, thumbnailUrl: item.thumbnailUrl }) }) }) }));
}
//# sourceMappingURL=NftView.native.js.map