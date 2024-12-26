import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, Image } from 'ui/src';
import { FROGGY } from 'ui/src/assets';
import { imageSizes } from 'ui/src/theme';
export const FroggyElement = () => {
    return (_jsx(Flex, { borderRadius: "$rounded12", p: "$spacing8", transform: [{ rotateZ: '-10deg' }], children: _jsx(Image, { height: imageSizes.image48, resizeMode: "contain", source: FROGGY, width: imageSizes.image48 }) }));
};
//# sourceMappingURL=FroggyElement.js.map