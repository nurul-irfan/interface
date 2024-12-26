import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
export declare function hasTokenFee(currencyInfo: Maybe<CurrencyInfo>): {
    hasBuyTax: boolean;
    hasSellTax: boolean;
};
export declare function useExactOutputWillFail({ currencies, }: {
    currencies: {
        input: Maybe<CurrencyInfo>;
        output: Maybe<CurrencyInfo>;
    };
}): {
    outputTokenHasBuyTax: boolean;
    exactOutputWillFail: boolean;
    exactOutputWouldFailIfCurrenciesSwitched: boolean;
};
//# sourceMappingURL=useExactOutputWillFail.d.ts.map