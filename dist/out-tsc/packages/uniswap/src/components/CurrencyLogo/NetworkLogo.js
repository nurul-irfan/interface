import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Flex, Image, useSporeColors } from 'ui/src';
import { ALL_NETWORKS_LOGO } from 'ui/src/assets';
import { iconSizes } from 'ui/src/theme';
import { getChainInfo } from 'uniswap/src/features/chains/chainInfo';
export const SQUIRCLE_BORDER_RADIUS_RATIO = 0.3;
export function TransactionSummaryNetworkLogo({ chainId, size = iconSizes.icon20, }) {
    return _jsx(NetworkLogo, { borderWidth: 1.5, chainId: chainId, shape: "square", size: size });
}
function _NetworkLogo({ chainId, shape, size: sizeWithoutBorder = iconSizes.icon20, borderWidth = 0, borderRadius, }) {
    const size = sizeWithoutBorder + 2 * borderWidth;
    const shapeBorderRadius = shape === 'circle' ? size / 2 : size * SQUIRCLE_BORDER_RADIUS_RATIO;
    const colors = useSporeColors();
    const imageStyle = {
        width: size,
        height: size,
        borderRadius: borderRadius !== null && borderRadius !== void 0 ? borderRadius : shapeBorderRadius,
        borderWidth,
        borderColor: colors.surface1.val,
    };
    if (chainId === null) {
        return (_jsx(Flex, { testID: "all-networks-logo", children: _jsx(Image, { resizeMode: "contain", source: ALL_NETWORKS_LOGO, style: imageStyle }) }));
    }
    const logo = getChainInfo(chainId).logo;
    const imageSize = size - borderWidth * 2; // this prevents the border from cutting off the logo
    return logo ? (_jsx(Flex, { testID: "network-logo", overflow: "hidden", style: imageStyle, children: _jsx(Image, { resizeMode: "contain", source: logo, width: imageSize, height: imageSize }) })) : null;
}
export const NetworkLogo = React.memo(_NetworkLogo);
//# sourceMappingURL=NetworkLogo.js.map