import type { Insets } from 'react-native';
import { GetProps, SizeTokens } from 'tamagui';
export declare const flexStyles: {
    fill: {
        flex: number;
    };
    grow: {
        flexGrow: number;
    };
    shrink: {
        flexShrink: number;
    };
};
type SizeOrNumber = number | SizeTokens;
export declare const Flex: import("tamagui").TamaguiComponent<import("@tamagui/web").TamaDefer, import("tamagui").TamaguiElement, import("@tamagui/core").RNTamaguiViewNonStyleProps, import("@tamagui/web").StackStyleBase, {
    animateEnter?: "fadeInDown" | undefined;
    animateExit?: "fadeOutUp" | "fadeOutDown" | undefined;
    animateEnterExit?: "fadeInDownOutUp" | "fadeInDownOutDown" | undefined;
    inset?: SizeOrNumber | Insets | undefined;
    row?: boolean | undefined;
    shrink?: boolean | undefined;
    grow?: boolean | undefined;
    fill?: boolean | undefined;
    centered?: boolean | undefined;
}, import("@tamagui/web").StaticConfigPublic>;
export type FlexProps = GetProps<typeof Flex>;
export {};
//# sourceMappingURL=Flex.d.ts.map