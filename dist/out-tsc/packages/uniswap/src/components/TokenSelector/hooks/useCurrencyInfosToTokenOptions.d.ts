import { TokenOption } from 'uniswap/src/components/TokenSelector/types';
import { GqlResult } from 'uniswap/src/data/types';
import { CurrencyInfo, PortfolioBalance } from 'uniswap/src/features/dataApi/types';
export declare function useCurrencies(currencyIds: string[]): GqlResult<CurrencyInfo[]>;
export declare function currencyInfosToTokenOptions(currencyInfos: Array<CurrencyInfo | null> | undefined): TokenOption[] | undefined;
export declare function useCurrencyInfosToTokenOptions({ currencyInfos, portfolioBalancesById, sortAlphabetically, }: {
    currencyInfos?: CurrencyInfo[];
    sortAlphabetically?: boolean;
    portfolioBalancesById?: Record<string, PortfolioBalance>;
}): TokenOption[] | undefined;
//# sourceMappingURL=useCurrencyInfosToTokenOptions.d.ts.map