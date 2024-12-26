import { AppearanceSettingType } from 'wallet/src/features/appearance/slice';
export declare function useCurrentAppearanceSetting(): AppearanceSettingType;
export declare function useSelectedColorScheme(): 'light' | 'dark';
/**
 * Note commenting this out again, but since we still have some bugs and have
 * tried a few versions of this already, going to leave this in for context.
 *
 * The general problem is that iOS wants to take a screenshot of both light/dark
 * when an app backgrounds so it can use that for showing the placeholder screen
 * in the app switcher properly even if you change from dark/light.
 *
 * React Native has some bugs around this, namely it just doesn't re-render fast
 * enough sometimes and you see a slight flicker as you foreground the app.
 *
 * But unfortunately this fix - which just tries to avoid it by pausing all
 * background scheme changes and accepting that sometimes the task switcher
 * screen may be wrong, also causes a worse issue in that if you do actually
 * change your color scheme while in the background (say you have Auto mode on
 * and it becomes evening) then when you foreground now the app has to do the
 * re-render *as it foregrounds*, which is even worse of a flicker. So, rock and
 * a hard place.
 *
 * For now, disabling: it means we may get some flickers especially on slower
 * devices.
 *
 * If we want less flickering in that case but stronger flickering in the case
 * where the user changes scheme, then we can uncomment this and replace the
 * `useColorScheme` above with `useColorSchemeForeground`.
 */
//# sourceMappingURL=hooks.d.ts.map