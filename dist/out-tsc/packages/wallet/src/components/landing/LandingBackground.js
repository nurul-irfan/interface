import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming, } from 'react-native-reanimated';
import { Circle, Defs, Svg } from 'react-native-svg';
import { Flex, Image, isWeb, useIsDarkMode } from 'ui/src';
import { Jiggly } from 'ui/src/animations';
import { UNISWAP_LOGO } from 'ui/src/assets';
import { AnimatedFlex } from 'ui/src/components/layout/AnimatedFlex';
import { imageSizes } from 'ui/src/theme';
import { ONE_SECOND_MS } from 'utilities/src/time/time';
import { useTimeout } from 'utilities/src/time/timing';
import { BuyElement, FroggyElement, HeartElement, OpenseaElement, PolygonElement, ReceiveUSDCElement, SendElement, SwapElement, UniconElement, } from 'wallet/src/components/landing/elements';
import { InnerCircleGradient, OuterCircleGradient } from 'wallet/src/components/landing/landingBackgroundGradients';
const DEFAULT_INNER_CIRCLE_SIZE = 120;
const DEFAULT_OUTER_CIRCLE_SIZE = 215;
const ROTATION_DURATION = 150000;
const ACCELERATION_DURATION = ROTATION_DURATION / 50;
const LOGO_SIZE_WEB = 80;
const LOGO_SCALE_DELAY = 0.5 * ONE_SECOND_MS;
const LOGO_SCALE_DURATION = 0.7 * ONE_SECOND_MS;
const ANIMATED_ELEMENTS_DELAY = LOGO_SCALE_DELAY + LOGO_SCALE_DURATION - 750;
const INNER_CIRCLE_SHOW_DELAY = 0.3 * ONE_SECOND_MS;
const OUTER_CIRCLE_SHOW_DELAY = 0.5 * ONE_SECOND_MS;
export const LANDING_ANIMATION_DURATION = ANIMATED_ELEMENTS_DELAY;
const OnboardingAnimation = ({ elementsStyle, innerCircleSize, outerCircleSize, }) => {
    const [boxWidth, setBoxWidth] = useState(0);
    const [showAnimatedElements, setShowAnimatedElements] = useState(false);
    const onLayout = useCallback((event) => {
        setBoxWidth(event.nativeEvent.layout.width);
    }, []);
    const uniswapLogoScale = useSharedValue(1.5);
    const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: uniswapLogoScale.value }] }), [uniswapLogoScale]);
    useEffect(() => {
        uniswapLogoScale.value = withDelay(LOGO_SCALE_DELAY, withTiming(1, {
            duration: LOGO_SCALE_DURATION,
            easing: Easing.elastic(1.1),
        }));
    }, [uniswapLogoScale]);
    useTimeout(() => {
        setShowAnimatedElements(true);
    }, ANIMATED_ELEMENTS_DELAY);
    return (_jsxs(Flex, { grow: true, justifyContent: "center", style: { transform: isWeb ? 'scale(0.9)' : undefined }, onLayout: onLayout, children: [showAnimatedElements ? (_jsx(Flex, { style: elementsStyle, children: _jsx(AnimatedElements, { innerCircleSize: innerCircleSize, outerCircleSize: outerCircleSize, width: boxWidth }) })) : null, _jsx(AnimatedFlex, { alignSelf: "center", position: "absolute", style: animatedStyle, children: _jsx(Jiggly, { duration: 75, offset: 5, children: _jsx(Image, { height: isWeb ? LOGO_SIZE_WEB : imageSizes.image100, resizeMode: "contain", source: UNISWAP_LOGO, width: isWeb ? LOGO_SIZE_WEB : imageSizes.image100 }) }) })] }));
};
const INITIAL_ANIMATION_LENGTH = 0.1;
const AnimatedElements = ({ width, innerCircleSize, outerCircleSize, }) => {
    const isDarkMode = useIsDarkMode();
    const animatedElementsInner = useMemo(() => {
        const innerProps = { radius: innerCircleSize, speed: -1, isInner: true };
        return [
            {
                element: _jsx(SendElement, {}),
                coordinates: { deg: 3.2, ...innerProps },
            },
            {
                element: _jsx(HeartElement, {}),
                coordinates: { deg: 2.0, ...innerProps },
            },
            {
                element: _jsx(OpenseaElement, {}),
                coordinates: { deg: 0.3, ...innerProps },
            },
            {
                element: _jsx(BuyElement, {}),
                coordinates: { deg: 5.5, ...innerProps },
            },
        ];
    }, [innerCircleSize]);
    const animatedElementsOuter = useMemo(() => {
        const outerProps = { radius: outerCircleSize, speed: 1 };
        return [
            {
                element: _jsx(SwapElement, {}),
                coordinates: { radius: outerCircleSize + 40, deg: 1, speed: 1, flatteningY: 0.85 },
            },
            { element: _jsx(PolygonElement, {}), coordinates: { deg: 2.2, ...outerProps } },
            { element: _jsx(UniconElement, {}), coordinates: { deg: 3.8, ...outerProps } },
            { element: _jsx(FroggyElement, {}), coordinates: { deg: 4.8, ...outerProps } },
            {
                element: _jsx(ReceiveUSDCElement, {}),
                coordinates: { deg: 5.7, ...outerProps },
            },
        ];
    }, [outerCircleSize]);
    const rotation = useSharedValue(0);
    const innerAnimation = useSharedValue(0);
    const outerAnimation = useSharedValue(0);
    useEffect(() => {
        rotation.value = withDelay(1800, withSequence(withTiming(INITIAL_ANIMATION_LENGTH, {
            duration: ACCELERATION_DURATION,
            easing: Easing.in(Easing.ease),
        }), withRepeat(withTiming(2 * Math.PI + INITIAL_ANIMATION_LENGTH, {
            duration: ROTATION_DURATION,
            easing: Easing.linear,
        }), -1)));
        innerAnimation.value = withDelay(INNER_CIRCLE_SHOW_DELAY, withSpring(0.8));
        outerAnimation.value = withDelay(OUTER_CIRCLE_SHOW_DELAY, withSpring(0.8));
    }, [innerAnimation, outerAnimation, rotation]);
    const innerCircleStyle = useAnimatedStyle(() => {
        return {
            opacity: innerAnimation.value,
        };
    }, [innerAnimation]);
    const outerCircleStyle = useAnimatedStyle(() => {
        return {
            opacity: outerAnimation.value,
        };
    }, [outerAnimation]);
    return (_jsxs(Flex, { centered: true, grow: true, children: [_jsx(Animated.View, { style: [{ position: 'absolute' }, innerCircleStyle], children: _jsxs(Svg, { height: width * 2, width: width, children: [_jsx(Defs, { children: _jsx(InnerCircleGradient, { id: "gradInner" }) }), _jsx(Circle, { cx: width / 2, cy: width, fill: "none", r: innerCircleSize, stroke: "url(#gradInner)", strokeOpacity: isDarkMode ? '0.2' : '0.6', strokeWidth: "1" })] }) }, "Circle1"), _jsx(Animated.View, { style: [{ position: 'absolute' }, outerCircleStyle], children: _jsxs(Svg, { height: width * 2, width: width, children: [_jsx(Defs, { children: _jsx(OuterCircleGradient, { id: "gradOuter" }) }), _jsx(Circle, { cx: width / 2, cy: width, fill: "none", r: outerCircleSize, stroke: "url(#gradOuter)", strokeOpacity: isDarkMode ? '0.2' : '1', strokeWidth: "1" })] }) }), animatedElementsInner.map(({ element, coordinates }, index) => (_jsx(RotateElement, { coordinates: coordinates, element: element, innerAnimation: innerAnimation, outerAnimation: outerAnimation, rotation: rotation }, `${index}_ICON_INNER`))), animatedElementsOuter.map(({ element, coordinates }, index) => (_jsx(RotateElement, { coordinates: coordinates, element: element, innerAnimation: innerAnimation, outerAnimation: outerAnimation, rotation: rotation }, `${index}_ICON_OUTER`)))] }));
};
const RotateElement = ({ element, coordinates, innerAnimation, outerAnimation, rotation, }) => {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            justifyContent: 'center',
            position: 'absolute',
            opacity: coordinates.isInner ? innerAnimation.value : outerAnimation.value,
            transform: [
                {
                    scale: 0.9 + (coordinates.isInner ? innerAnimation.value : outerAnimation.value) * 0.1,
                },
                {
                    translateX: Math.cos((rotation.value + coordinates.deg) * coordinates.speed) * coordinates.radius,
                },
                {
                    translateY: Math.sin((rotation.value + coordinates.deg) * coordinates.speed) *
                        coordinates.radius *
                        (coordinates.flatteningY || 1),
                },
            ],
        };
    }, [coordinates, innerAnimation, outerAnimation, rotation]);
    return (_jsx(Animated.View, { style: animatedStyle, children: _jsx(Jiggly, { children: element }) }));
};
export const LandingBackground = ({ navigationEventConsumer, elementsStyle, innerCircleSize = DEFAULT_INNER_CIRCLE_SIZE, outerCircleSize = DEFAULT_OUTER_CIRCLE_SIZE, }) => {
    const [blurred, setBlurred] = useState(false);
    const [hideAnimation, setHideAnimation] = useState(false);
    useEffect(() => {
        return navigationEventConsumer === null || navigationEventConsumer === void 0 ? void 0 : navigationEventConsumer.addListener('blur', () => {
            // set this flag on blur (when navigating to another screen)
            setBlurred(true);
        });
    }, [navigationEventConsumer]);
    useEffect(() => {
        return navigationEventConsumer === null || navigationEventConsumer === void 0 ? void 0 : navigationEventConsumer.addListener('focus', () => {
            // reset animation when focusing on this screen again
            setBlurred(false);
            setHideAnimation(false);
        });
    }, [navigationEventConsumer]);
    // callback to turn off the animation (so that we can turn it back
    // on on focus)
    const turnAnimationOff = useCallback(() => {
        if (blurred) {
            setHideAnimation(true);
        }
    }, [blurred]);
    // but make sure it's delayed a tiny bit, otherwise blur triggers
    // immediately, so the animation would disappear before the screen
    // transition animation happens
    useTimeout(turnAnimationOff, 500);
    if (hideAnimation) {
        // resets the animation to restart when the screen is mounted again (eg. going back)
        return null;
    }
    return (_jsx(OnboardingAnimation, { elementsStyle: elementsStyle, innerCircleSize: innerCircleSize, outerCircleSize: outerCircleSize }));
};
//# sourceMappingURL=LandingBackground.js.map