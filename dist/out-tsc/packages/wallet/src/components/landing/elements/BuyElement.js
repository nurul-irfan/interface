import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, useIsDarkMode } from 'ui/src';
import { Buy } from 'ui/src/components/icons';
import { colors, opacify, validColor } from 'ui/src/theme';
export const BuyElement = () => {
    const isDarkMode = useIsDarkMode();
    return (_jsx(Flex, { centered: true, row: true, backgroundColor: isDarkMode ? opacify(10, colors.orangeBase) : validColor(colors.orangeLight), borderRadius: "$rounded12", gap: "$spacing4", p: "$spacing12", children: _jsx(Buy, { color: validColor('$orangeBase'), size: "$icon.20" }) }));
};
//# sourceMappingURL=BuyElement.js.map