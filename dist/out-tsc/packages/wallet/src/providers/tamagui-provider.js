import { jsx as _jsx } from "react/jsx-runtime";
import { TamaguiProvider as OGTamaguiProvider } from 'ui/src';
import { config } from 'ui/src/tamagui.config';
import { isTestEnv } from 'utilities/src/environment/env';
import { useSelectedColorScheme } from 'wallet/src/features/appearance/hooks';
// without <NavigationProvider>
// this exported Provider is useful for tests
export function TamaguiProvider({ children, ...rest }) {
    // because we don't always want to wrap all of redux for visual tests, make it default to false if in test mode
    // this should be done better but release needs hotfix so for now it works
    const userSelectedColorScheme = useSelectedColorScheme();
    const isDark = isTestEnv() ? false : userSelectedColorScheme === 'dark';
    return (_jsx(OGTamaguiProvider, { config: config, defaultTheme: isDark ? 'dark' : 'light', ...rest, children: children }));
}
//# sourceMappingURL=tamagui-provider.js.map