import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { forwardRef } from 'react';
import Animated from 'react-native-reanimated';
// difficult to properly type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReanimatedFlashList = Animated.createAnimatedComponent(FlashList);
// difficult to properly type
export const AnimatedFlashList = forwardRef(function _AnimatedFlashList(props, ref) {
    return <ReanimatedFlashList ref={ref} sentry-label="ReanimatedFlashList" {...props}/>;
});
export const AnimatedBottomSheetFlashList = forwardRef(function _AnimatedBottomSheetFlashList(props, ref) {
    return (<ReanimatedFlashList ref={ref} {...props} renderScrollComponent={BottomSheetScrollView} sentry-label="AnimatedBottomSheetFlashList"/>);
});
//# sourceMappingURL=AnimatedFlashList.jsx.map