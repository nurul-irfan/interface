/// <reference types="react" />
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { Maybe } from 'graphql/jsutils/Maybe';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { CurrencyField } from 'uniswap/src/types/currency';
interface TokenSelectorPanelProps {
    currencyInfo: Maybe<CurrencyInfo>;
    currencyBalance: Maybe<CurrencyAmount<Currency>>;
    currencyAmount: Maybe<CurrencyAmount<Currency>>;
    showTokenSelector: boolean;
    onSelectCurrency: (currency: Currency, field: CurrencyField, isBridgePair: boolean) => void;
    onHideTokenSelector: () => void;
    onShowTokenSelector: () => void;
    onSetMax: (amount: string) => void;
}
export declare function TokenSelectorPanel({ currencyInfo, currencyBalance, currencyAmount, onSetMax, onSelectCurrency, onHideTokenSelector, onShowTokenSelector, showTokenSelector, }: TokenSelectorPanelProps): JSX.Element;
export {};
//# sourceMappingURL=TokenSelectorPanel.d.ts.map