/// <reference types="react" />
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
/**
 * Component to display bridge swaps with two logos and currency amounts
 * 💶Token -> 💴Token
 */
export declare function BridgingCurrencyRow({ inputCurrencyInfo, outputCurrencyInfo, formattedInputTokenAmount, formattedOutputTokenAmount, }: {
    inputCurrencyInfo?: Maybe<CurrencyInfo>;
    outputCurrencyInfo?: Maybe<CurrencyInfo>;
    formattedInputTokenAmount: string;
    formattedOutputTokenAmount: string;
}): JSX.Element;
//# sourceMappingURL=BridgingCurrencyRow.d.ts.map