import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, useIsDarkMode } from 'ui/src';
import { SendAction } from 'ui/src/components/icons';
import { colors, iconSizes, opacify, validColor } from 'ui/src/theme';
export const SendElement = () => {
    const isDarkMode = useIsDarkMode();
    return (_jsx(Flex, { backgroundColor: isDarkMode ? opacify(20, colors.greenBase) : opacify(10, colors.greenBase), borderRadius: "$rounded12", opacity: 0.8, p: "$spacing8", transform: [{ rotateZ: '-4deg' }], children: _jsx(SendAction, { color: isDarkMode ? validColor(colors.greenVibrant) : validColor(colors.greenBase), size: iconSizes.icon28 }) }));
};
//# sourceMappingURL=SendElement.js.map