import { Currency } from '@uniswap/sdk-core';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { LocalizationContextState } from 'uniswap/src/features/language/LocalizationContext';
import { ValueType } from 'uniswap/src/features/tokens/getCurrencyAmount';
import { BridgeTransactionInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SwapTypeTransactionInfo } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/types';
export declare function useFormattedCurrencyAmountAndUSDValue({ currency, currencyAmountRaw, formatter, isApproximateAmount, valueType, isUniswapX, }: {
    currency: Maybe<Currency>;
    currencyAmountRaw: string | undefined;
    formatter: LocalizationContextState;
    isApproximateAmount?: boolean;
    valueType?: ValueType;
    isUniswapX?: boolean;
}): {
    amount: string;
    value: string;
    tilde: string;
};
export declare function shortenHash(hash: string | undefined, chars?: NumberRange<1, 20>): string;
export declare function getFormattedSwapRatio({ typeInfo, inputCurrency, outputCurrency, formatter, }: {
    typeInfo: SwapTypeTransactionInfo | BridgeTransactionInfo;
    inputCurrency: CurrencyInfo;
    outputCurrency: CurrencyInfo;
    formatter: LocalizationContextState;
}): string;
export declare function hasInterfaceFees({ swapTimestampMs }: {
    swapTimestampMs: number;
}): boolean;
//# sourceMappingURL=utils.d.ts.map