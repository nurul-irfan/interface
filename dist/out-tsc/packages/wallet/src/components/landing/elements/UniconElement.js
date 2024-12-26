import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, useIsDarkMode } from 'ui/src';
import { OnboardingUnicon } from 'ui/src/components/icons';
import { DEP_accentColors, iconSizes, opacify, validColor } from 'ui/src/theme';
export const UniconElement = () => {
    const isDarkMode = useIsDarkMode();
    return (_jsx(Flex, { backgroundColor: isDarkMode ? validColor('$purpleDark') : opacify(20, DEP_accentColors.violet200), borderRadius: "$roundedFull", p: "$spacing8", transform: [{ rotateZ: '-4deg' }], children: _jsx(OnboardingUnicon, { color: DEP_accentColors.violet400, size: iconSizes.icon28 }) }));
};
//# sourceMappingURL=UniconElement.js.map