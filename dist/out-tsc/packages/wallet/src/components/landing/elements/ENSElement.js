import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, Image } from 'ui/src';
import { ENS_LOGO } from 'ui/src/assets';
import { colors, imageSizes, opacify } from 'ui/src/theme';
export const ENSElement = () => {
    return (_jsx(Flex, { backgroundColor: opacify(20, colors.bluePastel), borderRadius: "$rounded12", p: "$spacing12", transform: [{ rotateZ: '8deg' }], children: _jsx(Image, { height: imageSizes.image24, resizeMode: "contain", source: ENS_LOGO, width: imageSizes.image24 }) }));
};
//# sourceMappingURL=ENSElement.js.map