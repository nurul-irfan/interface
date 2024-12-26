import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Image, Text, useIsDarkMode } from 'ui/src';
import { USDC_LOGO } from 'ui/src/assets';
import { imageSizes, opacify, validColor } from 'ui/src/theme';
export const ReceiveUSDCElement = () => {
    const isDarkMode = useIsDarkMode();
    return (_jsxs(Flex, { centered: true, row: true, backgroundColor: isDarkMode ? validColor('#15202B') : opacify(20, '#A7BAFF'), borderRadius: "$roundedFull", gap: "$spacing8", px: "$spacing12", py: "$spacing8", transform: [{ rotateZ: '-1deg' }], children: [_jsx(Text, { color: validColor('#2775CA'), textAlign: "center", variant: "buttonLabel2", children: "+100" }), _jsx(Image, { height: imageSizes.image24, resizeMode: "contain", source: USDC_LOGO, width: imageSizes.image24 })] }));
};
//# sourceMappingURL=ReceiveUSDCElement.js.map