// eslint-disable-next-line no-restricted-imports
import { useTheme } from '@tamagui/core';
import { useMemo } from 'react';
/**
 * Wraps `useTheme` hook to provide spore color theme.
 * Do not pass a conditional value to `name` prop.
 *
 * @param name the theme name
 * @returns `useTheme` hook with the passed color theme
 */
export const useSporeColors = (name) => {
    const config = useMemo(() => ({ name }), [name]);
    return useTheme(config);
};
//# sourceMappingURL=useSporeColors.js.map