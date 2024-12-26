import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Flex, Image, Text, useIsDarkMode, useSporeColors } from 'ui/src';
import { DAI_LOGO, ETH_LOGO } from 'ui/src/assets';
import { RightArrow } from 'ui/src/components/icons';
import { DEP_accentColors, iconSizes, imageSizes, validColor } from 'ui/src/theme';
export const SwapElement = () => {
    const sporeColors = useSporeColors();
    const isDarkMode = useIsDarkMode();
    const colorPalette = useMemo(() => isDarkMode
        ? {
            backgroundBase: validColor('#23283E'),
            textBase: validColor(DEP_accentColors.blue400),
            backgroundQuote: validColor('#40321A'),
            textQuote: validColor(DEP_accentColors.yellow200),
        }
        : {
            backgroundBase: validColor('#F1F4FF'),
            textBase: validColor(DEP_accentColors.blue400),
            backgroundQuote: validColor('#FFF9EC'),
            textQuote: validColor(DEP_accentColors.yellow200),
        }, [isDarkMode]);
    return (_jsxs(Flex, { centered: true, row: true, borderRadius: "$rounded12", gap: "$spacing4", p: "$spacing12", transform: [{ rotateZ: '5deg' }], children: [_jsxs(Flex, { centered: true, row: true, backgroundColor: colorPalette.backgroundBase, borderRadius: "$roundedFull", gap: "$spacing8", p: "$spacing8", children: [_jsx(Image, { height: imageSizes.image24, resizeMode: "contain", source: ETH_LOGO, width: imageSizes.image24 }), _jsx(Text, { color: colorPalette.textBase, textAlign: "center", variant: "body2", children: "ETH" })] }), _jsx(RightArrow, { color: sporeColors.neutral3.val, size: iconSizes.icon20 }), _jsxs(Flex, { centered: true, row: true, backgroundColor: colorPalette.backgroundQuote, borderRadius: "$roundedFull", gap: "$spacing8", p: "$spacing8", children: [_jsx(Image, { height: imageSizes.image24, resizeMode: "contain", source: DAI_LOGO, width: imageSizes.image24 }), _jsx(Text, { color: colorPalette.textQuote, textAlign: "center", variant: "body2", children: "DAI" })] })] }));
};
//# sourceMappingURL=SwapElement.js.map