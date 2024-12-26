import { Easing } from 'react-native-reanimated';
import { isIOS } from 'utilities/src/platform';
/**
 * iOS animation config. Based on default values from
 * the gorhom/bottom-sheet library.
 */
const ANIMATION_CONFIGS_IOS = {
    damping: 500,
    stiffness: 1500,
    mass: 1.5,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
};
/**apps/mobile/src/components/explore/ExploreSections.tsx
 * Android animation config. Based on default values from
 * the gorhom/bottom-sheet library.
 */
const ANIMATION_CONFIGS_ANDROID = {
    duration: 200,
    easing: Easing.out(Easing.exp),
};
export const IS_SHEET_READY_DELAY = 100;
export const BSM_ANIMATION_CONFIGS = isIOS ? ANIMATION_CONFIGS_IOS : ANIMATION_CONFIGS_ANDROID;
//# sourceMappingURL=modalConstants.js.map