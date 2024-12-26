/// <reference types="react" />
import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<Omit<import("@tamagui/web").GetFinalProps<import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    }>, "theme" | "debug" | "icon" | "space" | "size" | "zIndex" | "background" | "mask" | "maxWidth" | "maxHeight" | "m" | "mb" | "ml" | "mr" | "mt" | "mx" | "my" | "p" | "pb" | "pl" | "pr" | "pt" | "px" | "py" | "borderColor" | "outlineColor" | "shadowColor" | "$xxxl" | "$xxl" | "$xl" | "$lg" | "$md" | "$sm" | "$xs" | "$xxs" | "$short" | "$midHeight" | import("@tamagui/web").GroupMediaKeys | "$theme-dark" | "$theme-light" | "$platform-native" | "$platform-web" | "$platform-android" | "$platform-ios" | "display" | "x" | "y" | "perspective" | "scale" | "scaleX" | "scaleY" | "skewX" | "skewY" | "matrix" | "rotate" | "rotateY" | "rotateX" | "rotateZ" | "transition" | "textWrap" | "contain" | "touchAction" | "cursor" | "outlineOffset" | "outlineStyle" | "outlineWidth" | "userSelect" | "scrollbarWidth" | "pointerEvents" | "transformOrigin" | "filter" | "backdropFilter" | "mixBlendMode" | "backgroundImage" | "backgroundOrigin" | "backgroundPosition" | "backgroundRepeat" | "backgroundSize" | "backgroundClip" | "backgroundBlendMode" | "backgroundAttachment" | "clipPath" | "containerType" | "caretColor" | "transformStyle" | "maskImage" | "textEmphasis" | "borderImage" | "float" | "content" | "overflowBlock" | "overflowInline" | "maskBorder" | "maskBorderMode" | "maskBorderOutset" | "maskBorderRepeat" | "maskBorderSlice" | "maskBorderSource" | "maskBorderWidth" | "maskClip" | "maskComposite" | "maskMode" | "maskOrigin" | "maskPosition" | "maskRepeat" | "maskSize" | "maskType" | "gridRow" | "gridRowEnd" | "gridRowGap" | "gridRowStart" | "gridColumn" | "gridColumnEnd" | "gridColumnGap" | "gridColumnStart" | "gridTemplateColumns" | "gridTemplateAreas" | "borderInlineColor" | "borderInlineStartColor" | "borderInlineEndColor" | "borderBlockWidth" | "borderBlockStartWidth" | "borderBlockEndWidth" | "borderInlineWidth" | "borderInlineStartWidth" | "borderInlineEndWidth" | "borderBlockStyle" | "borderBlockStartStyle" | "borderBlockEndStyle" | "borderInlineStyle" | "borderInlineStartStyle" | "borderInlineEndStyle" | "marginBlock" | "marginBlockStart" | "marginBlockEnd" | "marginInline" | "marginInlineStart" | "marginInlineEnd" | "paddingBlock" | "paddingBlockStart" | "paddingBlockEnd" | "paddingInline" | "paddingInlineStart" | "paddingInlineEnd" | "objectFit" | "verticalAlign" | "insetBlock" | "insetBlockStart" | "insetBlockEnd" | "insetInline" | "insetInlineStart" | "insetInlineEnd" | "blockSize" | "minBlockSize" | "maxBlockSize" | "inlineSize" | "minInlineSize" | "maxInlineSize" | "spaceDirection" | "separator" | "animation" | "animateOnly" | "animatePresence" | "elevation" | "backfaceVisibility" | "backgroundColor" | "borderBlockColor" | "borderBlockEndColor" | "borderBlockStartColor" | "borderBottomColor" | "borderBottomEndRadius" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderBottomStartRadius" | "borderCurve" | "borderEndColor" | "borderEndEndRadius" | "borderEndStartRadius" | "borderLeftColor" | "borderRadius" | "borderRightColor" | "borderStartColor" | "borderStartEndRadius" | "borderStartStartRadius" | "borderStyle" | "borderTopColor" | "borderTopEndRadius" | "borderTopLeftRadius" | "borderTopRightRadius" | "borderTopStartRadius" | "opacity" | "alignContent" | "alignItems" | "alignSelf" | "aspectRatio" | "borderBottomWidth" | "borderEndWidth" | "borderLeftWidth" | "borderRightWidth" | "borderStartWidth" | "borderTopWidth" | "borderWidth" | "bottom" | "end" | "flex" | "flexBasis" | "flexDirection" | "rowGap" | "gap" | "columnGap" | "flexGrow" | "flexShrink" | "flexWrap" | "height" | "justifyContent" | "left" | "marginEnd" | "marginStart" | "minHeight" | "minWidth" | "overflow" | "paddingEnd" | "paddingStart" | "position" | "right" | "start" | "top" | "width" | "direction" | "shadowOffset" | "shadowOpacity" | "shadowRadius" | "transform" | "transformMatrix" | "rotation" | "translateX" | "translateY" | "hitSlop" | "children" | "target" | "htmlFor" | "asChild" | "dangerouslySetInnerHTML" | "disabled" | "className" | "themeShallow" | "themeInverse" | "id" | "tag" | "group" | "untilMeasured" | "componentName" | "tabIndex" | "role" | "disableOptimization" | "forceStyle" | "disableClassName" | "onStartShouldSetResponder" | "dataSet" | "onScrollShouldSetResponder" | "onScrollShouldSetResponderCapture" | "onSelectionChangeShouldSetResponder" | "onSelectionChangeShouldSetResponderCapture" | "onLayout" | "href" | "hrefAttrs" | "elevationAndroid" | "rel" | "download" | "focusable" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "style" | "removeClippedSubviews" | "testID" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerUp" | "onPointerUpCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "aria-label" | "accessibilityRole" | "accessibilityState" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-labelledby" | "accessibilityHint" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "onAccessibilityAction" | "importantForAccessibility" | "aria-hidden" | "aria-live" | "aria-modal" | "accessibilityLiveRegion" | "accessibilityLabelledBy" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "accessibilityLanguage" | "onPress" | "onLongPress" | "onPressIn" | "onPressOut" | "onHoverIn" | "onHoverOut" | "onMouseEnter" | "onMouseLeave" | "onMouseDown" | "onMouseUp" | "onFocus" | "onBlur" | "inset" | "fill" | "fullscreen" | "unstyled" | "textProps" | "backgroundless" | "fadeIn" | "fadeOut" | keyof import("@tamagui/web").WithPseudoProps<import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>>> | keyof import("tamagui").TextContextStyles | "noTextWrap" | "iconAfter" | "spaceFlex"> & Omit<import("@tamagui/core").RNTamaguiViewNonStyleProps, "size" | "elevation" | keyof import("@tamagui/web").StackStyleBase | "disabled" | "inset" | "fill" | "fullscreen" | "backgroundless" | "fadeIn" | "fadeOut"> & import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>> & import("@tamagui/web").WithPseudoProps<import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>>> & import("@tamagui/web").WithMediaProps<import("@tamagui/web").WithThemeShorthandsAndPseudos<import("@tamagui/web").StackStyleBase, {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    }>> & import("tamagui").TextContextStyles & {
        textProps?: Partial<import("@tamagui/web").GetFinalProps<import("tamagui").TextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
            size?: import("tamagui").FontSizeTokens | undefined;
            unstyled?: boolean | undefined;
        }>> | undefined;
        noTextWrap?: boolean | undefined;
    } & {
        icon?: (JSX.Element | import("react").FunctionComponent<import("../..").IconProps> | null) | undefined;
        iconAfter?: (JSX.Element | import("react").FunctionComponent<import("../..").IconProps> | null) | undefined;
        spaceFlex?: number | boolean | undefined;
        unstyled?: boolean | undefined;
    } & import("react").RefAttributes<import("tamagui").TamaguiElement>> & import("@tamagui/web").StaticComponentObject<Omit<import("@tamagui/web").GetFinalProps<import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    }>, "theme" | "debug" | "icon" | "space" | "size" | "zIndex" | "background" | "mask" | "maxWidth" | "maxHeight" | "m" | "mb" | "ml" | "mr" | "mt" | "mx" | "my" | "p" | "pb" | "pl" | "pr" | "pt" | "px" | "py" | "borderColor" | "outlineColor" | "shadowColor" | "$xxxl" | "$xxl" | "$xl" | "$lg" | "$md" | "$sm" | "$xs" | "$xxs" | "$short" | "$midHeight" | import("@tamagui/web").GroupMediaKeys | "$theme-dark" | "$theme-light" | "$platform-native" | "$platform-web" | "$platform-android" | "$platform-ios" | "display" | "x" | "y" | "perspective" | "scale" | "scaleX" | "scaleY" | "skewX" | "skewY" | "matrix" | "rotate" | "rotateY" | "rotateX" | "rotateZ" | "transition" | "textWrap" | "contain" | "touchAction" | "cursor" | "outlineOffset" | "outlineStyle" | "outlineWidth" | "userSelect" | "scrollbarWidth" | "pointerEvents" | "transformOrigin" | "filter" | "backdropFilter" | "mixBlendMode" | "backgroundImage" | "backgroundOrigin" | "backgroundPosition" | "backgroundRepeat" | "backgroundSize" | "backgroundClip" | "backgroundBlendMode" | "backgroundAttachment" | "clipPath" | "containerType" | "caretColor" | "transformStyle" | "maskImage" | "textEmphasis" | "borderImage" | "float" | "content" | "overflowBlock" | "overflowInline" | "maskBorder" | "maskBorderMode" | "maskBorderOutset" | "maskBorderRepeat" | "maskBorderSlice" | "maskBorderSource" | "maskBorderWidth" | "maskClip" | "maskComposite" | "maskMode" | "maskOrigin" | "maskPosition" | "maskRepeat" | "maskSize" | "maskType" | "gridRow" | "gridRowEnd" | "gridRowGap" | "gridRowStart" | "gridColumn" | "gridColumnEnd" | "gridColumnGap" | "gridColumnStart" | "gridTemplateColumns" | "gridTemplateAreas" | "borderInlineColor" | "borderInlineStartColor" | "borderInlineEndColor" | "borderBlockWidth" | "borderBlockStartWidth" | "borderBlockEndWidth" | "borderInlineWidth" | "borderInlineStartWidth" | "borderInlineEndWidth" | "borderBlockStyle" | "borderBlockStartStyle" | "borderBlockEndStyle" | "borderInlineStyle" | "borderInlineStartStyle" | "borderInlineEndStyle" | "marginBlock" | "marginBlockStart" | "marginBlockEnd" | "marginInline" | "marginInlineStart" | "marginInlineEnd" | "paddingBlock" | "paddingBlockStart" | "paddingBlockEnd" | "paddingInline" | "paddingInlineStart" | "paddingInlineEnd" | "objectFit" | "verticalAlign" | "insetBlock" | "insetBlockStart" | "insetBlockEnd" | "insetInline" | "insetInlineStart" | "insetInlineEnd" | "blockSize" | "minBlockSize" | "maxBlockSize" | "inlineSize" | "minInlineSize" | "maxInlineSize" | "spaceDirection" | "separator" | "animation" | "animateOnly" | "animatePresence" | "elevation" | "backfaceVisibility" | "backgroundColor" | "borderBlockColor" | "borderBlockEndColor" | "borderBlockStartColor" | "borderBottomColor" | "borderBottomEndRadius" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderBottomStartRadius" | "borderCurve" | "borderEndColor" | "borderEndEndRadius" | "borderEndStartRadius" | "borderLeftColor" | "borderRadius" | "borderRightColor" | "borderStartColor" | "borderStartEndRadius" | "borderStartStartRadius" | "borderStyle" | "borderTopColor" | "borderTopEndRadius" | "borderTopLeftRadius" | "borderTopRightRadius" | "borderTopStartRadius" | "opacity" | "alignContent" | "alignItems" | "alignSelf" | "aspectRatio" | "borderBottomWidth" | "borderEndWidth" | "borderLeftWidth" | "borderRightWidth" | "borderStartWidth" | "borderTopWidth" | "borderWidth" | "bottom" | "end" | "flex" | "flexBasis" | "flexDirection" | "rowGap" | "gap" | "columnGap" | "flexGrow" | "flexShrink" | "flexWrap" | "height" | "justifyContent" | "left" | "marginEnd" | "marginStart" | "minHeight" | "minWidth" | "overflow" | "paddingEnd" | "paddingStart" | "position" | "right" | "start" | "top" | "width" | "direction" | "shadowOffset" | "shadowOpacity" | "shadowRadius" | "transform" | "transformMatrix" | "rotation" | "translateX" | "translateY" | "hitSlop" | "children" | "target" | "htmlFor" | "asChild" | "dangerouslySetInnerHTML" | "disabled" | "className" | "themeShallow" | "themeInverse" | "id" | "tag" | "group" | "untilMeasured" | "componentName" | "tabIndex" | "role" | "disableOptimization" | "forceStyle" | "disableClassName" | "onStartShouldSetResponder" | "dataSet" | "onScrollShouldSetResponder" | "onScrollShouldSetResponderCapture" | "onSelectionChangeShouldSetResponder" | "onSelectionChangeShouldSetResponderCapture" | "onLayout" | "href" | "hrefAttrs" | "elevationAndroid" | "rel" | "download" | "focusable" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "style" | "removeClippedSubviews" | "testID" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerUp" | "onPointerUpCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "aria-label" | "accessibilityRole" | "accessibilityState" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-labelledby" | "accessibilityHint" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "onAccessibilityAction" | "importantForAccessibility" | "aria-hidden" | "aria-live" | "aria-modal" | "accessibilityLiveRegion" | "accessibilityLabelledBy" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "accessibilityLanguage" | "onPress" | "onLongPress" | "onPressIn" | "onPressOut" | "onHoverIn" | "onHoverOut" | "onMouseEnter" | "onMouseLeave" | "onMouseDown" | "onMouseUp" | "onFocus" | "onBlur" | "inset" | "fill" | "fullscreen" | "unstyled" | "textProps" | "backgroundless" | "fadeIn" | "fadeOut" | keyof import("@tamagui/web").WithPseudoProps<import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>>> | keyof import("tamagui").TextContextStyles | "noTextWrap" | "iconAfter" | "spaceFlex"> & Omit<import("@tamagui/core").RNTamaguiViewNonStyleProps, "size" | "elevation" | keyof import("@tamagui/web").StackStyleBase | "disabled" | "inset" | "fill" | "fullscreen" | "backgroundless" | "fadeIn" | "fadeOut"> & import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>> & import("@tamagui/web").WithPseudoProps<import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>>> & import("@tamagui/web").WithMediaProps<import("@tamagui/web").WithThemeShorthandsAndPseudos<import("@tamagui/web").StackStyleBase, {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    }>> & import("tamagui").TextContextStyles & {
        textProps?: Partial<import("@tamagui/web").GetFinalProps<import("tamagui").TextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
            size?: import("tamagui").FontSizeTokens | undefined;
            unstyled?: boolean | undefined;
        }>> | undefined;
        noTextWrap?: boolean | undefined;
    } & {
        icon?: (JSX.Element | import("react").FunctionComponent<import("../..").IconProps> | null) | undefined;
        iconAfter?: (JSX.Element | import("react").FunctionComponent<import("../..").IconProps> | null) | undefined;
        spaceFlex?: number | boolean | undefined;
        unstyled?: boolean | undefined;
    }, import("tamagui").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps & Omit<import("@tamagui/core").RNTamaguiViewNonStyleProps, "size" | "elevation" | keyof import("@tamagui/web").StackStyleBase | "disabled" | "inset" | "fill" | "fullscreen" | "backgroundless" | "fadeIn" | "fadeOut"> & import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>> & import("@tamagui/web").WithPseudoProps<import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>>> & import("@tamagui/web").WithMediaProps<import("@tamagui/web").WithThemeShorthandsAndPseudos<import("@tamagui/web").StackStyleBase, {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    }>> & import("tamagui").TextContextStyles & {
        textProps?: Partial<import("@tamagui/web").GetFinalProps<import("tamagui").TextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
            size?: import("tamagui").FontSizeTokens | undefined;
            unstyled?: boolean | undefined;
        }>> | undefined;
        noTextWrap?: boolean | undefined;
    } & {
        icon?: (JSX.Element | import("react").FunctionComponent<import("../..").IconProps> | null) | undefined;
        iconAfter?: (JSX.Element | import("react").FunctionComponent<import("../..").IconProps> | null) | undefined;
        spaceFlex?: number | boolean | undefined;
        unstyled?: boolean | undefined;
    }, import("@tamagui/web").StackStyleBase, {
        size?: "medium" | "small" | "large" | undefined;
        elevation?: number | import("tamagui").SizeTokens | undefined;
        disabled?: boolean | undefined;
        inset?: number | import("tamagui").SizeTokens | {
            top?: number | undefined;
            bottom?: number | undefined;
            left?: number | undefined;
            right?: number | undefined;
        } | undefined;
        fill?: boolean | undefined;
        fullscreen?: boolean | undefined;
        backgroundless?: boolean | undefined;
        fadeIn?: boolean | undefined;
        fadeOut?: boolean | undefined;
    }, import("@tamagui/web").StaticConfigPublic> & Omit<import("@tamagui/web").StaticConfigPublic, "staticConfig" | "extractable" | "styleable"> & {
        __tama: [Omit<import("@tamagui/web").GetFinalProps<import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
            size?: "medium" | "small" | "large" | undefined;
            elevation?: number | import("tamagui").SizeTokens | undefined;
            disabled?: boolean | undefined;
            inset?: number | import("tamagui").SizeTokens | {
                top?: number | undefined;
                bottom?: number | undefined;
                left?: number | undefined;
                right?: number | undefined;
            } | undefined;
            fill?: boolean | undefined;
            fullscreen?: boolean | undefined;
            backgroundless?: boolean | undefined;
            fadeIn?: boolean | undefined;
            fadeOut?: boolean | undefined;
        }>, "theme" | "debug" | "icon" | "space" | "size" | "zIndex" | "background" | "mask" | "maxWidth" | "maxHeight" | "m" | "mb" | "ml" | "mr" | "mt" | "mx" | "my" | "p" | "pb" | "pl" | "pr" | "pt" | "px" | "py" | "borderColor" | "outlineColor" | "shadowColor" | "$xxxl" | "$xxl" | "$xl" | "$lg" | "$md" | "$sm" | "$xs" | "$xxs" | "$short" | "$midHeight" | import("@tamagui/web").GroupMediaKeys | "$theme-dark" | "$theme-light" | "$platform-native" | "$platform-web" | "$platform-android" | "$platform-ios" | "display" | "x" | "y" | "perspective" | "scale" | "scaleX" | "scaleY" | "skewX" | "skewY" | "matrix" | "rotate" | "rotateY" | "rotateX" | "rotateZ" | "transition" | "textWrap" | "contain" | "touchAction" | "cursor" | "outlineOffset" | "outlineStyle" | "outlineWidth" | "userSelect" | "scrollbarWidth" | "pointerEvents" | "transformOrigin" | "filter" | "backdropFilter" | "mixBlendMode" | "backgroundImage" | "backgroundOrigin" | "backgroundPosition" | "backgroundRepeat" | "backgroundSize" | "backgroundClip" | "backgroundBlendMode" | "backgroundAttachment" | "clipPath" | "containerType" | "caretColor" | "transformStyle" | "maskImage" | "textEmphasis" | "borderImage" | "float" | "content" | "overflowBlock" | "overflowInline" | "maskBorder" | "maskBorderMode" | "maskBorderOutset" | "maskBorderRepeat" | "maskBorderSlice" | "maskBorderSource" | "maskBorderWidth" | "maskClip" | "maskComposite" | "maskMode" | "maskOrigin" | "maskPosition" | "maskRepeat" | "maskSize" | "maskType" | "gridRow" | "gridRowEnd" | "gridRowGap" | "gridRowStart" | "gridColumn" | "gridColumnEnd" | "gridColumnGap" | "gridColumnStart" | "gridTemplateColumns" | "gridTemplateAreas" | "borderInlineColor" | "borderInlineStartColor" | "borderInlineEndColor" | "borderBlockWidth" | "borderBlockStartWidth" | "borderBlockEndWidth" | "borderInlineWidth" | "borderInlineStartWidth" | "borderInlineEndWidth" | "borderBlockStyle" | "borderBlockStartStyle" | "borderBlockEndStyle" | "borderInlineStyle" | "borderInlineStartStyle" | "borderInlineEndStyle" | "marginBlock" | "marginBlockStart" | "marginBlockEnd" | "marginInline" | "marginInlineStart" | "marginInlineEnd" | "paddingBlock" | "paddingBlockStart" | "paddingBlockEnd" | "paddingInline" | "paddingInlineStart" | "paddingInlineEnd" | "objectFit" | "verticalAlign" | "insetBlock" | "insetBlockStart" | "insetBlockEnd" | "insetInline" | "insetInlineStart" | "insetInlineEnd" | "blockSize" | "minBlockSize" | "maxBlockSize" | "inlineSize" | "minInlineSize" | "maxInlineSize" | "spaceDirection" | "separator" | "animation" | "animateOnly" | "animatePresence" | "elevation" | "backfaceVisibility" | "backgroundColor" | "borderBlockColor" | "borderBlockEndColor" | "borderBlockStartColor" | "borderBottomColor" | "borderBottomEndRadius" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderBottomStartRadius" | "borderCurve" | "borderEndColor" | "borderEndEndRadius" | "borderEndStartRadius" | "borderLeftColor" | "borderRadius" | "borderRightColor" | "borderStartColor" | "borderStartEndRadius" | "borderStartStartRadius" | "borderStyle" | "borderTopColor" | "borderTopEndRadius" | "borderTopLeftRadius" | "borderTopRightRadius" | "borderTopStartRadius" | "opacity" | "alignContent" | "alignItems" | "alignSelf" | "aspectRatio" | "borderBottomWidth" | "borderEndWidth" | "borderLeftWidth" | "borderRightWidth" | "borderStartWidth" | "borderTopWidth" | "borderWidth" | "bottom" | "end" | "flex" | "flexBasis" | "flexDirection" | "rowGap" | "gap" | "columnGap" | "flexGrow" | "flexShrink" | "flexWrap" | "height" | "justifyContent" | "left" | "marginEnd" | "marginStart" | "minHeight" | "minWidth" | "overflow" | "paddingEnd" | "paddingStart" | "position" | "right" | "start" | "top" | "width" | "direction" | "shadowOffset" | "shadowOpacity" | "shadowRadius" | "transform" | "transformMatrix" | "rotation" | "translateX" | "translateY" | "hitSlop" | "children" | "target" | "htmlFor" | "asChild" | "dangerouslySetInnerHTML" | "disabled" | "className" | "themeShallow" | "themeInverse" | "id" | "tag" | "group" | "untilMeasured" | "componentName" | "tabIndex" | "role" | "disableOptimization" | "forceStyle" | "disableClassName" | "onStartShouldSetResponder" | "dataSet" | "onScrollShouldSetResponder" | "onScrollShouldSetResponderCapture" | "onSelectionChangeShouldSetResponder" | "onSelectionChangeShouldSetResponderCapture" | "onLayout" | "href" | "hrefAttrs" | "elevationAndroid" | "rel" | "download" | "focusable" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "style" | "removeClippedSubviews" | "testID" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerUp" | "onPointerUpCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "aria-label" | "accessibilityRole" | "accessibilityState" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-labelledby" | "accessibilityHint" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "onAccessibilityAction" | "importantForAccessibility" | "aria-hidden" | "aria-live" | "aria-modal" | "accessibilityLiveRegion" | "accessibilityLabelledBy" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "accessibilityLanguage" | "onPress" | "onLongPress" | "onPressIn" | "onPressOut" | "onHoverIn" | "onHoverOut" | "onMouseEnter" | "onMouseLeave" | "onMouseDown" | "onMouseUp" | "onFocus" | "onBlur" | "inset" | "fill" | "fullscreen" | "unstyled" | "textProps" | "backgroundless" | "fadeIn" | "fadeOut" | keyof import("@tamagui/web").WithPseudoProps<import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
            size?: "medium" | "small" | "large" | undefined;
            elevation?: number | import("tamagui").SizeTokens | undefined;
            disabled?: boolean | undefined;
            inset?: number | import("tamagui").SizeTokens | {
                top?: number | undefined;
                bottom?: number | undefined;
                left?: number | undefined;
                right?: number | undefined;
            } | undefined;
            fill?: boolean | undefined;
            fullscreen?: boolean | undefined;
            backgroundless?: boolean | undefined;
            fadeIn?: boolean | undefined;
            fadeOut?: boolean | undefined;
        } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>>> | keyof import("tamagui").TextContextStyles | "noTextWrap" | "iconAfter" | "spaceFlex"> & Omit<import("@tamagui/core").RNTamaguiViewNonStyleProps, "size" | "elevation" | keyof import("@tamagui/web").StackStyleBase | "disabled" | "inset" | "fill" | "fullscreen" | "backgroundless" | "fadeIn" | "fadeOut"> & import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
            size?: "medium" | "small" | "large" | undefined;
            elevation?: number | import("tamagui").SizeTokens | undefined;
            disabled?: boolean | undefined;
            inset?: number | import("tamagui").SizeTokens | {
                top?: number | undefined;
                bottom?: number | undefined;
                left?: number | undefined;
                right?: number | undefined;
            } | undefined;
            fill?: boolean | undefined;
            fullscreen?: boolean | undefined;
            backgroundless?: boolean | undefined;
            fadeIn?: boolean | undefined;
            fadeOut?: boolean | undefined;
        } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>> & import("@tamagui/web").WithPseudoProps<import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
            size?: "medium" | "small" | "large" | undefined;
            elevation?: number | import("tamagui").SizeTokens | undefined;
            disabled?: boolean | undefined;
            inset?: number | import("tamagui").SizeTokens | {
                top?: number | undefined;
                bottom?: number | undefined;
                left?: number | undefined;
                right?: number | undefined;
            } | undefined;
            fill?: boolean | undefined;
            fullscreen?: boolean | undefined;
            backgroundless?: boolean | undefined;
            fadeIn?: boolean | undefined;
            fadeOut?: boolean | undefined;
        } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>>> & import("@tamagui/web").WithMediaProps<import("@tamagui/web").WithThemeShorthandsAndPseudos<import("@tamagui/web").StackStyleBase, {
            size?: "medium" | "small" | "large" | undefined;
            elevation?: number | import("tamagui").SizeTokens | undefined;
            disabled?: boolean | undefined;
            inset?: number | import("tamagui").SizeTokens | {
                top?: number | undefined;
                bottom?: number | undefined;
                left?: number | undefined;
                right?: number | undefined;
            } | undefined;
            fill?: boolean | undefined;
            fullscreen?: boolean | undefined;
            backgroundless?: boolean | undefined;
            fadeIn?: boolean | undefined;
            fadeOut?: boolean | undefined;
        }>> & import("tamagui").TextContextStyles & {
            textProps?: Partial<import("@tamagui/web").GetFinalProps<import("tamagui").TextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
                size?: import("tamagui").FontSizeTokens | undefined;
                unstyled?: boolean | undefined;
            }>> | undefined;
            noTextWrap?: boolean | undefined;
        } & {
            icon?: (JSX.Element | import("react").FunctionComponent<import("../..").IconProps> | null) | undefined;
            iconAfter?: (JSX.Element | import("react").FunctionComponent<import("../..").IconProps> | null) | undefined;
            spaceFlex?: number | boolean | undefined;
            unstyled?: boolean | undefined;
        }, import("tamagui").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps & Omit<import("@tamagui/core").RNTamaguiViewNonStyleProps, "size" | "elevation" | keyof import("@tamagui/web").StackStyleBase | "disabled" | "inset" | "fill" | "fullscreen" | "backgroundless" | "fadeIn" | "fadeOut"> & import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
            size?: "medium" | "small" | "large" | undefined;
            elevation?: number | import("tamagui").SizeTokens | undefined;
            disabled?: boolean | undefined;
            inset?: number | import("tamagui").SizeTokens | {
                top?: number | undefined;
                bottom?: number | undefined;
                left?: number | undefined;
                right?: number | undefined;
            } | undefined;
            fill?: boolean | undefined;
            fullscreen?: boolean | undefined;
            backgroundless?: boolean | undefined;
            fadeIn?: boolean | undefined;
            fadeOut?: boolean | undefined;
        } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>> & import("@tamagui/web").WithPseudoProps<import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
            size?: "medium" | "small" | "large" | undefined;
            elevation?: number | import("tamagui").SizeTokens | undefined;
            disabled?: boolean | undefined;
            inset?: number | import("tamagui").SizeTokens | {
                top?: number | undefined;
                bottom?: number | undefined;
                left?: number | undefined;
                right?: number | undefined;
            } | undefined;
            fill?: boolean | undefined;
            fullscreen?: boolean | undefined;
            backgroundless?: boolean | undefined;
            fadeIn?: boolean | undefined;
            fadeOut?: boolean | undefined;
        } & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>>> & import("@tamagui/web").WithMediaProps<import("@tamagui/web").WithThemeShorthandsAndPseudos<import("@tamagui/web").StackStyleBase, {
            size?: "medium" | "small" | "large" | undefined;
            elevation?: number | import("tamagui").SizeTokens | undefined;
            disabled?: boolean | undefined;
            inset?: number | import("tamagui").SizeTokens | {
                top?: number | undefined;
                bottom?: number | undefined;
                left?: number | undefined;
                right?: number | undefined;
            } | undefined;
            fill?: boolean | undefined;
            fullscreen?: boolean | undefined;
            backgroundless?: boolean | undefined;
            fadeIn?: boolean | undefined;
            fadeOut?: boolean | undefined;
        }>> & import("tamagui").TextContextStyles & {
            textProps?: Partial<import("@tamagui/web").GetFinalProps<import("tamagui").TextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
                size?: import("tamagui").FontSizeTokens | undefined;
                unstyled?: boolean | undefined;
            }>> | undefined;
            noTextWrap?: boolean | undefined;
        } & {
            icon?: (JSX.Element | import("react").FunctionComponent<import("../..").IconProps> | null) | undefined;
            iconAfter?: (JSX.Element | import("react").FunctionComponent<import("../..").IconProps> | null) | undefined;
            spaceFlex?: number | boolean | undefined;
            unstyled?: boolean | undefined;
        }, import("@tamagui/web").StackStyleBase, {
            size?: "medium" | "small" | "large" | undefined;
            elevation?: number | import("tamagui").SizeTokens | undefined;
            disabled?: boolean | undefined;
            inset?: number | import("tamagui").SizeTokens | {
                top?: number | undefined;
                bottom?: number | undefined;
                left?: number | undefined;
                right?: number | undefined;
            } | undefined;
            fill?: boolean | undefined;
            fullscreen?: boolean | undefined;
            backgroundless?: boolean | undefined;
            fadeIn?: boolean | undefined;
            fadeOut?: boolean | undefined;
        }, import("@tamagui/web").StaticConfigPublic];
    } & {
        Text: import("tamagui").TamaguiComponent<import("@tamagui/web").TamaDefer, import("tamagui").TamaguiTextElement, import("tamagui").TextNonStyleProps, import("@tamagui/web").TextStylePropsBase, {
            size?: import("tamagui").FontSizeTokens | undefined;
            unstyled?: boolean | undefined;
        }, import("@tamagui/web").StaticConfigPublic>;
    };
};
type Story = StoryObj<typeof meta>;
export declare const VariantSmall: Story;
export declare const VariantMedium: Story;
export declare const VariantLarge: Story;
export default meta;
//# sourceMappingURL=Button.stories.d.ts.map