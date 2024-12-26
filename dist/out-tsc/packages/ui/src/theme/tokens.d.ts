import { ColorTokens } from '@tamagui/core';
import { DynamicColor } from 'ui/src/hooks/useSporeColors';
declare const iconSize: {
    true: number;
    8: number;
    12: number;
    16: number;
    18: number;
    20: number;
    24: number;
    28: number;
    36: number;
    40: number;
    64: number;
    70: number;
    100: number;
};
export type IconSizeTokens = `$icon.${keyof typeof iconSize}`;
export declare const tokens: {
    color: {
        white: import("@tamagui/core").Variable<string>;
        black: import("@tamagui/core").Variable<string>;
        scrim: import("@tamagui/core").Variable<string>;
        uniswapXViolet: import("@tamagui/core").Variable<string>;
        uniswapXPurple: import("@tamagui/core").Variable<string>;
        fiatOnRampBanner: import("@tamagui/core").Variable<string>;
        pinkLight: import("@tamagui/core").Variable<string>;
        pinkPastel: import("@tamagui/core").Variable<string>;
        pinkBase: import("@tamagui/core").Variable<string>;
        pinkVibrant: import("@tamagui/core").Variable<string>;
        pinkDark: import("@tamagui/core").Variable<string>;
        redLight: import("@tamagui/core").Variable<string>;
        redPastel: import("@tamagui/core").Variable<string>;
        redBase: import("@tamagui/core").Variable<string>;
        redVibrant: import("@tamagui/core").Variable<string>;
        redDark: import("@tamagui/core").Variable<string>;
        orangeLight: import("@tamagui/core").Variable<string>;
        orangePastel: import("@tamagui/core").Variable<string>;
        orangeBase: import("@tamagui/core").Variable<string>;
        orangeVibrant: import("@tamagui/core").Variable<string>;
        orangeDark: import("@tamagui/core").Variable<string>;
        yellowLight: import("@tamagui/core").Variable<string>;
        yellowPastel: import("@tamagui/core").Variable<string>;
        yellowBase: import("@tamagui/core").Variable<string>;
        yellowVibrant: import("@tamagui/core").Variable<string>;
        yellowDark: import("@tamagui/core").Variable<string>;
        brownLight: import("@tamagui/core").Variable<string>;
        brownPastel: import("@tamagui/core").Variable<string>;
        brownBase: import("@tamagui/core").Variable<string>;
        brownVibrant: import("@tamagui/core").Variable<string>;
        brownDark: import("@tamagui/core").Variable<string>;
        greenLight: import("@tamagui/core").Variable<string>;
        greenPastel: import("@tamagui/core").Variable<string>;
        greenBase: import("@tamagui/core").Variable<string>;
        greenVibrant: import("@tamagui/core").Variable<string>;
        greenDark: import("@tamagui/core").Variable<string>;
        limeLight: import("@tamagui/core").Variable<string>;
        limePastel: import("@tamagui/core").Variable<string>;
        limeBase: import("@tamagui/core").Variable<string>;
        limeVibrant: import("@tamagui/core").Variable<string>;
        limeDark: import("@tamagui/core").Variable<string>;
        turquoiseLight: import("@tamagui/core").Variable<string>;
        turquoisePastel: import("@tamagui/core").Variable<string>;
        turquoiseBase: import("@tamagui/core").Variable<string>;
        turquoiseVibrant: import("@tamagui/core").Variable<string>;
        turquoiseDark: import("@tamagui/core").Variable<string>;
        cyanLight: import("@tamagui/core").Variable<string>;
        cyanPastel: import("@tamagui/core").Variable<string>;
        cyanBase: import("@tamagui/core").Variable<string>;
        cyanVibrant: import("@tamagui/core").Variable<string>;
        cyanDark: import("@tamagui/core").Variable<string>;
        blueLight: import("@tamagui/core").Variable<string>;
        bluePastel: import("@tamagui/core").Variable<string>;
        blueBase: import("@tamagui/core").Variable<string>;
        blueVibrant: import("@tamagui/core").Variable<string>;
        blueDark: import("@tamagui/core").Variable<string>;
        purpleLight: import("@tamagui/core").Variable<string>;
        purplePastel: import("@tamagui/core").Variable<string>;
        purpleBase: import("@tamagui/core").Variable<string>;
        purpleVibrant: import("@tamagui/core").Variable<string>;
        purpleDark: import("@tamagui/core").Variable<string>;
    };
    space: {
        true: import("@tamagui/core").Variable<number>;
        none: import("@tamagui/core").Variable<number>;
        gap4: import("@tamagui/core").Variable<number>;
        gap8: import("@tamagui/core").Variable<number>;
        gap12: import("@tamagui/core").Variable<number>;
        gap16: import("@tamagui/core").Variable<number>;
        gap20: import("@tamagui/core").Variable<number>;
        gap24: import("@tamagui/core").Variable<number>;
        gap32: import("@tamagui/core").Variable<number>;
        gap36: import("@tamagui/core").Variable<number>;
        padding6: import("@tamagui/core").Variable<number>;
        padding8: import("@tamagui/core").Variable<number>;
        padding12: import("@tamagui/core").Variable<number>;
        padding16: import("@tamagui/core").Variable<number>;
        padding20: import("@tamagui/core").Variable<number>;
        padding36: import("@tamagui/core").Variable<number>;
        spacing1: import("@tamagui/core").Variable<number>;
        spacing2: import("@tamagui/core").Variable<number>;
        spacing4: import("@tamagui/core").Variable<number>;
        spacing6: import("@tamagui/core").Variable<number>;
        spacing8: import("@tamagui/core").Variable<number>;
        spacing12: import("@tamagui/core").Variable<number>;
        spacing16: import("@tamagui/core").Variable<number>;
        spacing18: import("@tamagui/core").Variable<number>;
        spacing20: import("@tamagui/core").Variable<number>;
        spacing24: import("@tamagui/core").Variable<number>;
        spacing28: import("@tamagui/core").Variable<number>;
        spacing32: import("@tamagui/core").Variable<number>;
        spacing36: import("@tamagui/core").Variable<number>;
        spacing40: import("@tamagui/core").Variable<number>;
        spacing48: import("@tamagui/core").Variable<number>;
        spacing60: import("@tamagui/core").Variable<number>;
    };
    size: {
        true: import("@tamagui/core").Variable<number>;
        none: import("@tamagui/core").Variable<number>;
        gap4: import("@tamagui/core").Variable<number>;
        gap8: import("@tamagui/core").Variable<number>;
        gap12: import("@tamagui/core").Variable<number>;
        gap16: import("@tamagui/core").Variable<number>;
        gap20: import("@tamagui/core").Variable<number>;
        gap24: import("@tamagui/core").Variable<number>;
        gap32: import("@tamagui/core").Variable<number>;
        gap36: import("@tamagui/core").Variable<number>;
        padding6: import("@tamagui/core").Variable<number>;
        padding8: import("@tamagui/core").Variable<number>;
        padding12: import("@tamagui/core").Variable<number>;
        padding16: import("@tamagui/core").Variable<number>;
        padding20: import("@tamagui/core").Variable<number>;
        padding36: import("@tamagui/core").Variable<number>;
        spacing1: import("@tamagui/core").Variable<number>;
        spacing2: import("@tamagui/core").Variable<number>;
        spacing4: import("@tamagui/core").Variable<number>;
        spacing6: import("@tamagui/core").Variable<number>;
        spacing8: import("@tamagui/core").Variable<number>;
        spacing12: import("@tamagui/core").Variable<number>;
        spacing16: import("@tamagui/core").Variable<number>;
        spacing18: import("@tamagui/core").Variable<number>;
        spacing20: import("@tamagui/core").Variable<number>;
        spacing24: import("@tamagui/core").Variable<number>;
        spacing28: import("@tamagui/core").Variable<number>;
        spacing32: import("@tamagui/core").Variable<number>;
        spacing36: import("@tamagui/core").Variable<number>;
        spacing40: import("@tamagui/core").Variable<number>;
        spacing48: import("@tamagui/core").Variable<number>;
        spacing60: import("@tamagui/core").Variable<number>;
    };
    radius: {
        true: import("@tamagui/core").Variable<number>;
        none: import("@tamagui/core").Variable<number>;
        rounded4: import("@tamagui/core").Variable<number>;
        rounded6: import("@tamagui/core").Variable<number>;
        rounded8: import("@tamagui/core").Variable<number>;
        rounded12: import("@tamagui/core").Variable<number>;
        rounded16: import("@tamagui/core").Variable<number>;
        rounded20: import("@tamagui/core").Variable<number>;
        rounded24: import("@tamagui/core").Variable<number>;
        rounded32: import("@tamagui/core").Variable<number>;
        roundedFull: import("@tamagui/core").Variable<number>;
    };
    zIndex: {
        true: import("@tamagui/core").Variable<number>;
        negative: import("@tamagui/core").Variable<number>;
        background: import("@tamagui/core").Variable<number>;
        default: import("@tamagui/core").Variable<number>;
        mask: import("@tamagui/core").Variable<number>;
        dropdown: import("@tamagui/core").Variable<number>;
        sticky: import("@tamagui/core").Variable<number>;
        fixed: import("@tamagui/core").Variable<number>;
        modalBackdrop: import("@tamagui/core").Variable<number>;
        offcanvas: import("@tamagui/core").Variable<number>;
        modal: import("@tamagui/core").Variable<number>;
        popover: import("@tamagui/core").Variable<number>;
        tooltip: import("@tamagui/core").Variable<number>;
        overlay: import("@tamagui/core").Variable<number>;
    };
} & Omit<{
    color: {
        white: import("@tamagui/core").Variable<string>;
        black: import("@tamagui/core").Variable<string>;
        scrim: import("@tamagui/core").Variable<string>;
        uniswapXViolet: import("@tamagui/core").Variable<string>;
        uniswapXPurple: import("@tamagui/core").Variable<string>;
        fiatOnRampBanner: import("@tamagui/core").Variable<string>;
        pinkLight: import("@tamagui/core").Variable<string>;
        pinkPastel: import("@tamagui/core").Variable<string>;
        pinkBase: import("@tamagui/core").Variable<string>;
        pinkVibrant: import("@tamagui/core").Variable<string>;
        pinkDark: import("@tamagui/core").Variable<string>;
        redLight: import("@tamagui/core").Variable<string>;
        redPastel: import("@tamagui/core").Variable<string>;
        redBase: import("@tamagui/core").Variable<string>;
        redVibrant: import("@tamagui/core").Variable<string>;
        redDark: import("@tamagui/core").Variable<string>;
        orangeLight: import("@tamagui/core").Variable<string>;
        orangePastel: import("@tamagui/core").Variable<string>;
        orangeBase: import("@tamagui/core").Variable<string>;
        orangeVibrant: import("@tamagui/core").Variable<string>;
        orangeDark: import("@tamagui/core").Variable<string>;
        yellowLight: import("@tamagui/core").Variable<string>;
        yellowPastel: import("@tamagui/core").Variable<string>;
        yellowBase: import("@tamagui/core").Variable<string>;
        yellowVibrant: import("@tamagui/core").Variable<string>;
        yellowDark: import("@tamagui/core").Variable<string>;
        brownLight: import("@tamagui/core").Variable<string>;
        brownPastel: import("@tamagui/core").Variable<string>;
        brownBase: import("@tamagui/core").Variable<string>;
        brownVibrant: import("@tamagui/core").Variable<string>;
        brownDark: import("@tamagui/core").Variable<string>;
        greenLight: import("@tamagui/core").Variable<string>;
        greenPastel: import("@tamagui/core").Variable<string>;
        greenBase: import("@tamagui/core").Variable<string>;
        greenVibrant: import("@tamagui/core").Variable<string>;
        greenDark: import("@tamagui/core").Variable<string>;
        limeLight: import("@tamagui/core").Variable<string>;
        limePastel: import("@tamagui/core").Variable<string>;
        limeBase: import("@tamagui/core").Variable<string>;
        limeVibrant: import("@tamagui/core").Variable<string>;
        limeDark: import("@tamagui/core").Variable<string>;
        turquoiseLight: import("@tamagui/core").Variable<string>;
        turquoisePastel: import("@tamagui/core").Variable<string>;
        turquoiseBase: import("@tamagui/core").Variable<string>;
        turquoiseVibrant: import("@tamagui/core").Variable<string>;
        turquoiseDark: import("@tamagui/core").Variable<string>;
        cyanLight: import("@tamagui/core").Variable<string>;
        cyanPastel: import("@tamagui/core").Variable<string>;
        cyanBase: import("@tamagui/core").Variable<string>;
        cyanVibrant: import("@tamagui/core").Variable<string>;
        cyanDark: import("@tamagui/core").Variable<string>;
        blueLight: import("@tamagui/core").Variable<string>;
        bluePastel: import("@tamagui/core").Variable<string>;
        blueBase: import("@tamagui/core").Variable<string>;
        blueVibrant: import("@tamagui/core").Variable<string>;
        blueDark: import("@tamagui/core").Variable<string>;
        purpleLight: import("@tamagui/core").Variable<string>;
        purplePastel: import("@tamagui/core").Variable<string>;
        purpleBase: import("@tamagui/core").Variable<string>;
        purpleVibrant: import("@tamagui/core").Variable<string>;
        purpleDark: import("@tamagui/core").Variable<string>;
    };
    space: {
        true: import("@tamagui/core").Variable<number>;
        none: import("@tamagui/core").Variable<number>;
        gap4: import("@tamagui/core").Variable<number>;
        gap8: import("@tamagui/core").Variable<number>;
        gap12: import("@tamagui/core").Variable<number>;
        gap16: import("@tamagui/core").Variable<number>;
        gap20: import("@tamagui/core").Variable<number>;
        gap24: import("@tamagui/core").Variable<number>;
        gap32: import("@tamagui/core").Variable<number>;
        gap36: import("@tamagui/core").Variable<number>;
        padding6: import("@tamagui/core").Variable<number>;
        padding8: import("@tamagui/core").Variable<number>;
        padding12: import("@tamagui/core").Variable<number>;
        padding16: import("@tamagui/core").Variable<number>;
        padding20: import("@tamagui/core").Variable<number>;
        padding36: import("@tamagui/core").Variable<number>;
        spacing1: import("@tamagui/core").Variable<number>;
        spacing2: import("@tamagui/core").Variable<number>;
        spacing4: import("@tamagui/core").Variable<number>;
        spacing6: import("@tamagui/core").Variable<number>;
        spacing8: import("@tamagui/core").Variable<number>;
        spacing12: import("@tamagui/core").Variable<number>;
        spacing16: import("@tamagui/core").Variable<number>;
        spacing18: import("@tamagui/core").Variable<number>;
        spacing20: import("@tamagui/core").Variable<number>;
        spacing24: import("@tamagui/core").Variable<number>;
        spacing28: import("@tamagui/core").Variable<number>;
        spacing32: import("@tamagui/core").Variable<number>;
        spacing36: import("@tamagui/core").Variable<number>;
        spacing40: import("@tamagui/core").Variable<number>;
        spacing48: import("@tamagui/core").Variable<number>;
        spacing60: import("@tamagui/core").Variable<number>;
    };
    size: {
        true: import("@tamagui/core").Variable<number>;
        none: import("@tamagui/core").Variable<number>;
        gap4: import("@tamagui/core").Variable<number>;
        gap8: import("@tamagui/core").Variable<number>;
        gap12: import("@tamagui/core").Variable<number>;
        gap16: import("@tamagui/core").Variable<number>;
        gap20: import("@tamagui/core").Variable<number>;
        gap24: import("@tamagui/core").Variable<number>;
        gap32: import("@tamagui/core").Variable<number>;
        gap36: import("@tamagui/core").Variable<number>;
        padding6: import("@tamagui/core").Variable<number>;
        padding8: import("@tamagui/core").Variable<number>;
        padding12: import("@tamagui/core").Variable<number>;
        padding16: import("@tamagui/core").Variable<number>;
        padding20: import("@tamagui/core").Variable<number>;
        padding36: import("@tamagui/core").Variable<number>;
        spacing1: import("@tamagui/core").Variable<number>;
        spacing2: import("@tamagui/core").Variable<number>;
        spacing4: import("@tamagui/core").Variable<number>;
        spacing6: import("@tamagui/core").Variable<number>;
        spacing8: import("@tamagui/core").Variable<number>;
        spacing12: import("@tamagui/core").Variable<number>;
        spacing16: import("@tamagui/core").Variable<number>;
        spacing18: import("@tamagui/core").Variable<number>;
        spacing20: import("@tamagui/core").Variable<number>;
        spacing24: import("@tamagui/core").Variable<number>;
        spacing28: import("@tamagui/core").Variable<number>;
        spacing32: import("@tamagui/core").Variable<number>;
        spacing36: import("@tamagui/core").Variable<number>;
        spacing40: import("@tamagui/core").Variable<number>;
        spacing48: import("@tamagui/core").Variable<number>;
        spacing60: import("@tamagui/core").Variable<number>;
    };
    font: {
        monospace: import("@tamagui/core").Variable<number>;
        true: import("@tamagui/core").Variable<number>;
        heading1: import("@tamagui/core").Variable<number>;
        heading2: import("@tamagui/core").Variable<number>;
        heading3: import("@tamagui/core").Variable<number>;
        subheading1: import("@tamagui/core").Variable<number>;
        subheading2: import("@tamagui/core").Variable<number>;
        body1: import("@tamagui/core").Variable<number>;
        body2: import("@tamagui/core").Variable<number>;
        body3: import("@tamagui/core").Variable<number>;
        buttonLabel1: import("@tamagui/core").Variable<number>;
        buttonLabel2: import("@tamagui/core").Variable<number>;
        buttonLabel3: import("@tamagui/core").Variable<number>;
        buttonLabel4: import("@tamagui/core").Variable<number>;
    };
    icon: {
        100: import("@tamagui/core").Variable<number>;
        12: import("@tamagui/core").Variable<number>;
        20: import("@tamagui/core").Variable<number>;
        18: import("@tamagui/core").Variable<number>;
        70: import("@tamagui/core").Variable<number>;
        36: import("@tamagui/core").Variable<number>;
        24: import("@tamagui/core").Variable<number>;
        16: import("@tamagui/core").Variable<number>;
        8: import("@tamagui/core").Variable<number>;
        true: import("@tamagui/core").Variable<number>;
        28: import("@tamagui/core").Variable<number>;
        40: import("@tamagui/core").Variable<number>;
        64: import("@tamagui/core").Variable<number>;
    };
    image: {
        true: import("@tamagui/core").Variable<number>;
        image12: import("@tamagui/core").Variable<number>;
        image16: import("@tamagui/core").Variable<number>;
        image20: import("@tamagui/core").Variable<number>;
        image24: import("@tamagui/core").Variable<number>;
        image32: import("@tamagui/core").Variable<number>;
        image36: import("@tamagui/core").Variable<number>;
        image40: import("@tamagui/core").Variable<number>;
        image48: import("@tamagui/core").Variable<number>;
        image64: import("@tamagui/core").Variable<number>;
        image100: import("@tamagui/core").Variable<number>;
    };
    zIndex: {
        true: import("@tamagui/core").Variable<number>;
        negative: import("@tamagui/core").Variable<number>;
        background: import("@tamagui/core").Variable<number>;
        default: import("@tamagui/core").Variable<number>;
        mask: import("@tamagui/core").Variable<number>;
        dropdown: import("@tamagui/core").Variable<number>;
        sticky: import("@tamagui/core").Variable<number>;
        fixed: import("@tamagui/core").Variable<number>;
        modalBackdrop: import("@tamagui/core").Variable<number>;
        offcanvas: import("@tamagui/core").Variable<number>;
        modal: import("@tamagui/core").Variable<number>;
        popover: import("@tamagui/core").Variable<number>;
        tooltip: import("@tamagui/core").Variable<number>;
        overlay: import("@tamagui/core").Variable<number>;
    };
    radius: {
        true: import("@tamagui/core").Variable<number>;
        none: import("@tamagui/core").Variable<number>;
        rounded4: import("@tamagui/core").Variable<number>;
        rounded6: import("@tamagui/core").Variable<number>;
        rounded8: import("@tamagui/core").Variable<number>;
        rounded12: import("@tamagui/core").Variable<number>;
        rounded16: import("@tamagui/core").Variable<number>;
        rounded20: import("@tamagui/core").Variable<number>;
        rounded24: import("@tamagui/core").Variable<number>;
        rounded32: import("@tamagui/core").Variable<number>;
        roundedFull: import("@tamagui/core").Variable<number>;
    };
}, "color" | "space" | "size" | "radius" | "zIndex">;
/**
 * We have enabled allowedStyleValues: 'somewhat-strict-web' on createTamagui
 * which means our Tamagui components only accept valid tokens.
 *
 * But, sometimes we want to accept one-off values that aren't in the design system
 * especially as we migrate over.
 *
 * This is a way we can intentfully whitelist.

 */
export declare const validColor: (value: DynamicColor | string | undefined | null) => ColorTokens;
export {};
//# sourceMappingURL=tokens.d.ts.map