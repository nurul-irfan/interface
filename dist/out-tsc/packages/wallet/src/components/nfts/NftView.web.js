import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from 'ui/src';
import { NFTViewer } from 'wallet/src/features/images/NFTViewer';
import { ESTIMATED_NFT_LIST_ITEM_SIZE } from 'wallet/src/features/nfts/constants';
// WALL-4875 TODO try to combine web and mobile versions
export function NftView({ item, onPress }) {
    var _a, _b;
    return (_jsx(Flex, { alignItems: "center", aspectRatio: 1, backgroundColor: "$surface3", borderRadius: "$rounded12", overflow: "hidden", width: "100%", onPress: onPress, children: _jsx(NFTViewer, { svgRenderingDisabled: true, imageDimensions: item.imageDimensions, limitGIFSize: ESTIMATED_NFT_LIST_ITEM_SIZE, placeholderContent: item.name || item.collectionName, squareGridView: true, uri: (_a = item.imageUrl) !== null && _a !== void 0 ? _a : '', thumbnailUrl: (_b = item.thumbnailUrl) !== null && _b !== void 0 ? _b : '' }) }));
}
//# sourceMappingURL=NftView.web.js.map