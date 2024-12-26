import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, Image } from 'ui/src';
import { OPENSEA_LOGO } from 'ui/src/assets';
import { DEP_accentColors, imageSizes, validColor } from 'ui/src/theme';
export const OpenseaElement = () => {
    return (_jsx(Flex, { backgroundColor: validColor(DEP_accentColors.blue400), borderRadius: "$roundedFull", p: "$spacing4", children: _jsx(Image, { height: imageSizes.image32, resizeMode: "contain", source: OPENSEA_LOGO, width: imageSizes.image32 }) }));
};
//# sourceMappingURL=OpenseaElement.js.map