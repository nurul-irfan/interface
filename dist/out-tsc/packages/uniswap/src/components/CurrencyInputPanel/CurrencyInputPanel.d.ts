import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { RefObject } from 'react';
import type { TextInput, TextInputProps } from 'react-native';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { CurrencyField } from 'uniswap/src/types/currency';
export type CurrencyInputPanelRef = {
    textInputRef: RefObject<TextInput>;
    triggerShakeAnimation: () => void;
};
export declare const CurrencyInputPanel: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<{
    autoFocus?: boolean | undefined;
    currencyAmount: Maybe<CurrencyAmount<Currency>>;
    currencyBalance: Maybe<CurrencyAmount<Currency>>;
    currencyField: CurrencyField;
    currencyInfo: Maybe<CurrencyInfo>;
    isLoading?: boolean | undefined;
    isIndicativeLoading?: boolean | undefined;
    focus?: boolean | undefined;
    isFiatMode?: boolean | undefined;
    onPressIn?: (() => void) | undefined;
    onSelectionChange?: ((start: number, end: number) => void) | undefined;
    onSetExactAmount: (amount: string) => void;
    onSetMax?: ((amount: string, currencyField: CurrencyField) => void) | undefined;
    onShowTokenSelector?: (() => void) | undefined;
    onToggleIsFiatMode: (currencyField: CurrencyField) => void;
    selection?: TextInputProps['selection'];
    showSoftInputOnFocus?: boolean | undefined;
    usdValue: Maybe<CurrencyAmount<Currency>>;
    value?: string | undefined;
    valueIsIndicative?: boolean | undefined;
    headerLabel?: string | undefined;
    disabled?: boolean | undefined;
    onPressDisabled?: (() => void) | undefined;
    enableInputOnly?: boolean | undefined;
    resetSelection?: ((args: {
        start: number;
        end?: number;
        currencyField?: CurrencyField;
    }) => void) | undefined;
} & Omit<import("@tamagui/core").RNTamaguiViewNonStyleProps, "fill" | keyof import("@tamagui/web").StackStyleBase | "animateEnter" | "animateExit" | "animateEnterExit" | "inset" | "row" | "shrink" | "grow" | "centered"> & import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
    animateEnter?: "fadeInDown" | undefined;
    animateExit?: "fadeOutUp" | "fadeOutDown" | undefined;
    animateEnterExit?: "fadeInDownOutUp" | "fadeInDownOutDown" | undefined;
    inset?: (number | import("tamagui").SizeTokens) | import("react-native").Insets | undefined;
    row?: boolean | undefined;
    shrink?: boolean | undefined;
    grow?: boolean | undefined;
    fill?: boolean | undefined;
    centered?: boolean | undefined;
} & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>> & import("@tamagui/web").WithPseudoProps<import("@tamagui/web").WithThemeValues<Omit<import("@tamagui/web").StackStyleBase, import("tamagui").Longhands>> & {
    animateEnter?: "fadeInDown" | undefined;
    animateExit?: "fadeOutUp" | "fadeOutDown" | undefined;
    animateEnterExit?: "fadeInDownOutUp" | "fadeInDownOutDown" | undefined;
    inset?: (number | import("tamagui").SizeTokens) | import("react-native").Insets | undefined;
    row?: boolean | undefined;
    shrink?: boolean | undefined;
    grow?: boolean | undefined;
    fill?: boolean | undefined;
    centered?: boolean | undefined;
} & import("@tamagui/web").WithShorthands<import("@tamagui/web").WithThemeValues<import("@tamagui/web").StackStyleBase>>> & import("@tamagui/web").WithMediaProps<import("@tamagui/web").WithThemeShorthandsAndPseudos<import("@tamagui/web").StackStyleBase, {
    animateEnter?: "fadeInDown" | undefined;
    animateExit?: "fadeOutUp" | "fadeOutDown" | undefined;
    animateEnterExit?: "fadeInDownOutUp" | "fadeInDownOutDown" | undefined;
    inset?: (number | import("tamagui").SizeTokens) | import("react-native").Insets | undefined;
    row?: boolean | undefined;
    shrink?: boolean | undefined;
    grow?: boolean | undefined;
    fill?: boolean | undefined;
    centered?: boolean | undefined;
}>> & import("react").RefAttributes<CurrencyInputPanelRef>>>;
//# sourceMappingURL=CurrencyInputPanel.d.ts.map