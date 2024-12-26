/// <reference types="react" />
import type { GestureResponderEvent } from 'react-native';
import { TamaguiElement } from 'tamagui';
export type TouchableAreaEvent = GestureResponderEvent;
/**
 * If you are trying to implement a standard button DO NOT USE this component. Use the Button component instead with the desired size and emphasis.
 * Examples of when to use this are:
 *  - clickable text
 *  - clickable icons (different from an icon button which has a bg color, border radius, and a border)
 *  - custom elements that are clickable (e.g. rows, cards, headers)
 */
export declare const TouchableArea: import("react").ForwardRefExoticComponent<Omit<import("tamagui").StackProps, keyof {
    hitSlop?: number | import("react-native").Insets | undefined;
    activeOpacity?: number | undefined;
    ignoreDragEvents?: boolean | undefined;
    scaleTo?: number | undefined;
    disabled?: boolean | undefined;
    hoverable?: boolean | undefined;
}> & {
    hitSlop?: number | import("react-native").Insets | undefined;
    activeOpacity?: number | undefined;
    ignoreDragEvents?: boolean | undefined;
    scaleTo?: number | undefined;
    disabled?: boolean | undefined;
    hoverable?: boolean | undefined;
} & import("react").RefAttributes<TamaguiElement>>;
export declare const AnimatedTouchableArea: import("react").ComponentClass<import("react-native-reanimated").AnimateProps<Omit<import("tamagui").StackProps, keyof {
    hitSlop?: number | import("react-native").Insets | undefined;
    activeOpacity?: number | undefined;
    ignoreDragEvents?: boolean | undefined;
    scaleTo?: number | undefined;
    disabled?: boolean | undefined;
    hoverable?: boolean | undefined;
}> & {
    hitSlop?: number | import("react-native").Insets | undefined;
    activeOpacity?: number | undefined;
    ignoreDragEvents?: boolean | undefined;
    scaleTo?: number | undefined;
    disabled?: boolean | undefined;
    hoverable?: boolean | undefined;
} & import("react").RefAttributes<TamaguiElement>>, any>;
//# sourceMappingURL=TouchableArea.d.ts.map