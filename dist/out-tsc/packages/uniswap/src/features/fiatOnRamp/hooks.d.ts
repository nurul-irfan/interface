import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Currency } from '@uniswap/sdk-core';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { FORQuote, FORSupportedFiatCurrency, FiatCurrencyInfo, FiatOnRampCurrency, RampDirection } from 'uniswap/src/features/fiatOnRamp/types';
export declare function useFormatExactCurrencyAmount(currencyAmount: string, currency: Maybe<Currency>): string | undefined;
/** Returns a new externalTransactionId and a callback to store the transaction. */
export declare function useFiatOnRampTransactionCreator(ownerAddress: string, chainId: UniverseChainId, serviceProvider?: string): {
    externalTransactionId: string;
    dispatchAddTransaction: () => void;
};
export declare function useMeldFiatCurrencySupportInfo(countryCode: string, skip?: boolean, rampDirection?: RampDirection): {
    appFiatCurrencySupportedInMeld: boolean;
    meldSupportedFiatCurrency: FiatCurrencyInfo;
    supportedFiatCurrencies: FORSupportedFiatCurrency[] | undefined;
};
export declare function useFiatOnRampSupportedTokens({ sourceCurrencyCode, countryCode, skip, rampDirection, }: {
    sourceCurrencyCode: string;
    countryCode: string;
    skip?: boolean;
    rampDirection?: RampDirection;
}): {
    error: boolean;
    list: FiatOnRampCurrency[] | undefined;
    loading: boolean;
    refetch: () => void;
};
/**
 * Hook to load quotes
 */
export declare function useFiatOnRampQuotes({ baseCurrencyAmount, baseCurrencyCode, quoteCurrencyCode, countryCode, countryState, rampDirection, balanceError, }: {
    baseCurrencyAmount?: number;
    baseCurrencyCode: string | undefined;
    quoteCurrencyCode: string | undefined;
    countryCode: string | undefined;
    countryState: string | undefined;
    rampDirection: RampDirection;
    balanceError?: boolean;
}): {
    loading: boolean;
    error?: FetchBaseQueryError | SerializedError;
    quotes: FORQuote[] | undefined;
};
export declare function useParseFiatOnRampError(error: unknown, currencyCode: string, balanceError: boolean): {
    errorText: string | undefined;
};
export declare function useIsSupportedFiatOnRampCurrency(currencyId: string, skip?: boolean): FiatOnRampCurrency | undefined;
//# sourceMappingURL=hooks.d.ts.map