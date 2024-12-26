import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from 'ui/src';
import { Heart } from 'ui/src/components/icons';
import { DEP_accentColors, iconSizes, opacify, validColor } from 'ui/src/theme';
export const HeartElement = () => {
    return (_jsx(Flex, { backgroundColor: opacify(10, DEP_accentColors.red400), borderRadius: "$rounded12", p: "$spacing12", transform: [{ rotateZ: '-20deg' }], children: _jsx(Heart, { color: validColor(DEP_accentColors.red300), opacity: 0.95, size: iconSizes.icon16 }) }));
};
//# sourceMappingURL=HeartElement.js.map