import { forwardRef, useCallback, useMemo, useRef } from 'react';
import { YStack } from 'tamagui';
import { withAnimated } from 'ui/src/components/factories/animated';
import { defaultHitslopInset } from 'ui/src/theme';
import { isTestEnv } from 'utilities/src/environment/env';
/**
 * If you are trying to implement a standard button DO NOT USE this component. Use the Button component instead with the desired size and emphasis.
 * Examples of when to use this are:
 *  - clickable text
 *  - clickable icons (different from an icon button which has a bg color, border radius, and a border)
 *  - custom elements that are clickable (e.g. rows, cards, headers)
 */
export const TouchableArea = forwardRef(function TouchableArea({ ignoreDragEvents = false, scaleTo, onPress, children, hoverable, activeOpacity = 0.75, ...restProps }, ref) {
    const touchActivationPositionRef = useRef(null);
    const onPressHandler = useCallback(async (event) => {
        if (!onPress) {
            return;
        }
        // TODO: MOB-2756 we potentially may not need ignoreDragEvents logic
        if (!ignoreDragEvents) {
            const { pageX, pageY } = event.nativeEvent;
            const isDragEvent = touchActivationPositionRef.current &&
                isDrag(touchActivationPositionRef.current.pageX, touchActivationPositionRef.current.pageY, pageX, pageY);
            if (isDragEvent) {
                return;
            }
        }
        onPress(event);
    }, [onPress, ignoreDragEvents]);
    const onPressInHandler = useMemo(() => {
        return ({ nativeEvent: { pageX, pageY } }) => {
            touchActivationPositionRef.current = { pageX, pageY };
        };
    }, []);
    return (<YStack ref={ref} 
    // TODO(MOB-2826): tests are picking up weird animationStyle on snapshots...
    {...(!isTestEnv() && {
        animation: 'simple',
        // TODO(MOB-3059): fixes crash caused by animating shadowOffset, should be fixed in tamagui
        animateOnly: ['transform', 'opacity'],
    })} cursor="pointer" hitSlop={defaultHitslopInset} {...restProps} pressStyle={{
            opacity: activeOpacity,
            scale: scaleTo !== null && scaleTo !== void 0 ? scaleTo : 1,
            ...restProps.pressStyle,
        }} {...(hoverable && {
        hoverStyle: {
            backgroundColor: '$backgroundHover',
            ...restProps.hoverStyle,
        },
    })} onPress={onPressHandler} onPressIn={onPressInHandler}>
      {children}
    </YStack>);
});
export const AnimatedTouchableArea = withAnimated(TouchableArea);
/**
 * @link https://github.com/satya164/react-native-tab-view/issues/1241#issuecomment-1022400366
 * @returns true if press was after a drag gesture
 */
function isDrag(activationX, activationY, releaseX, releaseY, threshold = 2) {
    const absX = Math.abs(activationX - releaseX);
    const absY = Math.abs(activationY - releaseY);
    const dragged = absX > threshold || absY > threshold;
    return dragged;
}
//# sourceMappingURL=TouchableArea.jsx.map