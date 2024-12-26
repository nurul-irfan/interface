/// <reference types="react" />
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { FlexProps } from 'ui/src';
import { ParsedWarnings } from 'uniswap/src/components/modals/WarningModal/types';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
type SendAmountInputProps = {
    currencyInfo: Maybe<CurrencyInfo>;
    currencyAmount: Maybe<CurrencyAmount<Currency>>;
    value?: string;
    usdValue: Maybe<CurrencyAmount<Currency>>;
    isFiatInput: boolean;
    warnings: ParsedWarnings;
    focus?: boolean;
    autoFocus?: boolean;
    onSetExactAmount: (amount: string) => void;
    onToggleIsFiatMode: (isFiatMode: boolean) => void;
    onSelectionChange?: (start: number, end: number) => void;
} & FlexProps;
export declare function SendAmountInput({ currencyInfo, currencyAmount, value, isFiatInput, warnings, onSelectionChange: selectionChange, onSetExactAmount, onToggleIsFiatMode, usdValue, ...rest }: SendAmountInputProps): JSX.Element;
export {};
//# sourceMappingURL=SendAmountInput.d.ts.map