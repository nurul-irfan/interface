import { useMemo } from 'react';
import { getUniconColors, passesContrast, useExtractedColors, useIsDarkMode, useSporeColors } from 'ui/src';
import { useAvatar } from 'uniswap/src/features/address/avatar';
export function useAddressColorProps(address) {
    const colors = useSporeColors();
    const isDarkMode = useIsDarkMode();
    const { color: uniconColor } = getUniconColors(address, isDarkMode);
    const { avatar, loading: avatarLoading } = useAvatar(address);
    const { colors: avatarColors } = useExtractedColors(avatar);
    const hasAvatar = !!avatar && !avatarLoading;
    const smartColor = useMemo(() => {
        const contrastThreshold = 3; // WCAG AA standard for contrast
        const backgroundColor = colors.surface2.val; // replace with your actual background color
        if (hasAvatar && avatarColors && avatarColors.primary) {
            if (passesContrast(avatarColors.primary, backgroundColor, contrastThreshold)) {
                return avatarColors.primary;
            }
            if (passesContrast(avatarColors.base, backgroundColor, contrastThreshold)) {
                return avatarColors.base;
            }
            if (passesContrast(avatarColors.detail, backgroundColor, contrastThreshold)) {
                return avatarColors.detail;
            }
            // Modify the color if it doesn't pass the contrast check
            // Replace 'modifiedColor' with the actual color you want to use
            return colors.neutral1.val;
        }
        return uniconColor;
    }, [avatarColors, hasAvatar, uniconColor, colors.surface2.val, colors.neutral1.val]);
    return smartColor;
}
//# sourceMappingURL=color.js.map