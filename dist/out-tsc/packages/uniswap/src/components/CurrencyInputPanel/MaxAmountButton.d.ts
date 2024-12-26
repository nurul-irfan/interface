/// <reference types="react" />
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import { CurrencyField } from 'uniswap/src/types/currency';
interface MaxAmountButtonProps {
    currencyAmount: CurrencyAmount<Currency> | null | undefined;
    currencyBalance: CurrencyAmount<Currency> | null | undefined;
    onSetMax: (amount: string) => void;
    currencyField: CurrencyField;
    transactionType?: TransactionType;
}
export declare function MaxAmountButton({ currencyAmount, currencyBalance, onSetMax, currencyField, transactionType, }: MaxAmountButtonProps): JSX.Element;
export {};
//# sourceMappingURL=MaxAmountButton.d.ts.map