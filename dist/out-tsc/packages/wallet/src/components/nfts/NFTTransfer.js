import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'ui/src';
import { iconSizes } from 'ui/src/theme';
import { NFTViewer } from 'wallet/src/features/images/NFTViewer';
export function NFTTransfer({ asset, nftSize }) {
    var _a, _b, _c;
    return (_jsxs(Flex, { centered: true, gap: "$spacing16", children: [_jsx(Flex, { borderRadius: "$rounded16", height: nftSize, overflow: "hidden", width: nftSize, children: _jsx(NFTViewer, { squareGridView: true, maxHeight: nftSize, uri: (_a = asset === null || asset === void 0 ? void 0 : asset.image) === null || _a === void 0 ? void 0 : _a.url }) }), _jsxs(Flex, { centered: true, row: true, gap: "$spacing8", children: [_jsx(Flex, { borderRadius: "$roundedFull", height: iconSizes.icon28, overflow: "hidden", width: iconSizes.icon28, children: _jsx(NFTViewer, { uri: (_c = (_b = asset === null || asset === void 0 ? void 0 : asset.collection) === null || _b === void 0 ? void 0 : _b.image) === null || _c === void 0 ? void 0 : _c.url }) }), _jsx(Text, { variant: "buttonLabel1", children: asset === null || asset === void 0 ? void 0 : asset.name })] })] }));
}
//# sourceMappingURL=NFTTransfer.js.map