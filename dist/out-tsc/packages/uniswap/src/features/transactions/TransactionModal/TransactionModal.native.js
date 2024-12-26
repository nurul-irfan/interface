import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BottomSheetFooter, BottomSheetView, KEYBOARD_STATE, useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { useMemo, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Extrapolate, FadeIn, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, } from 'react-native-reanimated';
import { Flex, LinearGradient, useSporeColors } from 'ui/src';
import { AnimatedFlex } from 'ui/src/components/layout/AnimatedFlex';
import { useDeviceDimensions } from 'ui/src/hooks/useDeviceDimensions';
import { borderRadii, opacify } from 'ui/src/theme';
import { HandleBar } from 'uniswap/src/components/modals/HandleBar';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { TransactionModalContextProvider, TransactionScreen, } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalContext';
import { TransactionModalUpdateLogger } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalUpdateLogger';
import { useAppInsets } from 'uniswap/src/hooks/useAppInsets';
const HANLDEBAR_HEIGHT = 32;
export function TransactionModal({ children, modalName, onClose, ...transactionContextProps }) {
    const [screen, setScreen] = useState(TransactionScreen.Form);
    const fullscreen = screen === TransactionScreen.Form;
    const colors = useSporeColors();
    const insets = useAppInsets();
    const dimensions = useDeviceDimensions();
    // Note: we explicitly set this to 'transparent', otherwise we get a really annoying
    // line as a visual artifact on mobile. For example, if a white background is rendered
    // on a white background, a grey line sometimes appears as the bottom sheet resizes.
    const backgroundColorValue = 'transparent';
    const handleBarHeight = fullscreen ? 0 : HANLDEBAR_HEIGHT;
    const fullContentHeight = dimensions.fullHeight - handleBarHeight;
    const animatedPosition = useSharedValue(0);
    const animatedBorderRadius = useAnimatedStyle(() => {
        const interpolatedRadius = interpolate(animatedPosition.value, [0, insets.top], [0, borderRadii.rounded24], Extrapolate.CLAMP);
        return { borderTopLeftRadius: interpolatedRadius, borderTopRightRadius: interpolatedRadius };
    });
    const bottomSheetViewStyles = useMemo(() => [
        {
            backgroundColor: backgroundColorValue,
            overflow: 'hidden',
            height: fullscreen ? fullContentHeight : undefined,
        },
        animatedBorderRadius,
    ], [animatedBorderRadius, backgroundColorValue, fullContentHeight, fullscreen]);
    return (_jsx(Modal, { enableDynamicSizing: true, hideKeyboardOnDismiss: true, overrideInnerContainer: true, renderBehindTopInset: true, animatedPosition: animatedPosition, backgroundColor: colors.surface1.val, fullScreen: fullscreen, hideHandlebar: fullscreen, name: modalName, onClose: onClose, children: _jsxs(TransactionModalContextProvider, { bottomSheetViewStyles: bottomSheetViewStyles, screen: screen, setScreen: setScreen, onClose: onClose, ...transactionContextProps, children: [children, _jsx(TransactionModalUpdateLogger, { modalName: modalName })] }) }));
}
export function TransactionModalInnerContainer({ bottomSheetViewStyles, fullscreen, children, }) {
    const insets = useAppInsets();
    const { animatedFooterHeight } = useBottomSheetInternal();
    const animatedPaddingBottom = useAnimatedStyle(() => {
        return { paddingBottom: animatedFooterHeight.value };
    });
    return (_jsx(BottomSheetView, { style: [bottomSheetViewStyles], children: _jsx(TouchableWithoutFeedback, { children: _jsxs(Flex, { mt: fullscreen ? insets.top : '$spacing8', children: [fullscreen && _jsx(HandleBar, { backgroundColor: "none" }), _jsx(AnimatedFlex, { grow: true, row: true, height: fullscreen ? '100%' : undefined, style: animatedPaddingBottom, children: _jsx(Flex, { px: "$spacing16", width: "100%", children: children }) })] }) }) }));
}
export function TransactionModalFooterContainer({ children }) {
    const insets = useAppInsets();
    const colors = useSporeColors();
    // Most of this logic is based on the `BottomSheetFooterContainer` component from `@gorhom/bottom-sheet`.
    const { animatedContainerHeight, animatedFooterHeight, animatedHandleHeight, animatedKeyboardHeightInContainer, animatedKeyboardState, animatedPosition, } = useBottomSheetInternal();
    const animatedFooterPosition = useDerivedValue(() => {
        const keyboardHeight = animatedKeyboardHeightInContainer.value;
        let footerTranslateY = Math.max(0, animatedContainerHeight.value - animatedPosition.value);
        if (animatedKeyboardState.value === KEYBOARD_STATE.SHOWN) {
            footerTranslateY = footerTranslateY - keyboardHeight;
        }
        footerTranslateY = footerTranslateY - animatedFooterHeight.value - animatedHandleHeight.value;
        return footerTranslateY;
    }, [
        animatedKeyboardHeightInContainer,
        animatedContainerHeight,
        animatedPosition,
        animatedKeyboardState,
        animatedFooterHeight,
        animatedHandleHeight,
    ]);
    return (_jsx(BottomSheetFooter, { animatedFooterPosition: animatedFooterPosition, children: _jsxs(AnimatedFlex, { entering: FadeIn, mx: "$spacing16", pb: insets.bottom, position: "relative", pt: "$spacing24", children: [children, _jsx(Flex, { bottom: 0, left: 0, position: "absolute", right: 0, top: 0, zIndex: -1, children: _jsx(LinearGradient, { colors: [opacify(0, colors.background.val), colors.background.val], end: [0, 0.15], height: "100%", start: [0, 0], width: "100%" }) })] }) }));
}
//# sourceMappingURL=TransactionModal.native.js.map