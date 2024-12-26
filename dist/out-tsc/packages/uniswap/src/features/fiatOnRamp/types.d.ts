import { CurrencyInfo, PortfolioBalance } from 'uniswap/src/features/dataApi/types';
import { LocalOnRampTransactionInfo, OnRampPurchaseInfo, OnRampTransferInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { FiatCurrencyComponents } from 'utilities/src/format/localeBased';
export type FiatOnRampTransactionDetails = TransactionDetails & {
    typeInfo: LocalOnRampTransactionInfo | OnRampPurchaseInfo | OnRampTransferInfo;
};
export type FORCountry = {
    countryCode: string;
    displayName: string;
    state: string | undefined;
};
export type FORGetCountryResponse = FORCountry;
export type FORSupportedCountriesRequest = {
    rampDirection?: RampDirection;
};
export type FORSupportedCountriesResponse = {
    supportedCountries: FORCountry[];
};
export type FORQuoteRequest = {
    countryCode: string;
    destinationCurrencyCode: string;
    sourceAmount: number;
    sourceCurrencyCode: string;
    walletAddress?: string;
    state?: string;
    rampDirection?: RampDirection;
};
export type FORQuote = {
    countryCode: string | null;
    sourceAmount: number;
    sourceCurrencyCode: string;
    destinationAmount: number;
    destinationCurrencyCode: string;
    serviceProviderDetails: FORServiceProvider;
    totalFee: number;
    isMostRecentlyUsedProvider: boolean;
};
export type FORQuoteResponse = {
    quotes: Maybe<FORQuote[]>;
    message: string | null;
    error: string | null;
};
export type FORLogo = {
    darkLogo: string;
    lightLogo: string;
};
export type FORServiceProvider = {
    serviceProvider: string;
    name: string;
    url: string;
    logos: FORLogo;
    paymentMethods: string[];
    supportUrl?: string;
};
export type FORServiceProvidersResponse = {
    serviceProviders: FORServiceProvider[];
};
export type FORSupportedTokensRequest = {
    fiatCurrency: string;
    countryCode: string;
    rampDirection?: RampDirection;
};
export type FORSupportedToken = {
    cryptoCurrencyCode: string;
    displayName: string;
    address: string;
    cryptoCurrencyChain: string;
    chainId: string;
    symbol: string;
};
export type FORSupportedTokensResponse = {
    supportedTokens: FORSupportedToken[];
};
export type FORSupportedFiatCurrenciesRequest = {
    countryCode: string;
    rampDirection?: RampDirection;
};
export type FORSupportedFiatCurrency = {
    fiatCurrencyCode: string;
    displayName: string;
    symbol: string;
};
export type FORSupportedFiatCurrenciesResponse = {
    fiatCurrencies: FORSupportedFiatCurrency[];
};
export type FORWidgetUrlRequest = {
    sourceAmount: number;
    sourceCurrencyCode: string;
    destinationCurrencyCode: string;
    countryCode: string;
    serviceProvider: string;
    walletAddress: string;
    externalSessionId: string;
    redirectUrl?: string;
};
export type FORWidgetUrlResponse = {
    id: string;
    widgetUrl: string;
};
export type OffRampWidgetUrlRequest = {
    sourceAmount: number;
    baseCurrencyCode: string;
    refundWalletAddress: string;
    countryCode: string;
    quoteCurrencyCode: string;
    serviceProvider: string;
    externalSessionId: string;
    lockAmount?: string;
    requestSource?: string;
    externalTransactionId?: string;
    externalCustomerId?: string;
    redirectUrl?: string;
};
export type FORTransferWidgetUrlRequest = {
    serviceProvider: string;
    walletAddress: string;
    externalSessionId: string;
    redirectUrl: string;
};
export type OffRampTransferDetailsRequest = MoonpayOffRampTransferDetailsRequest | MeldOffRampTransferDetailsRequest;
type MoonpayOffRampTransferDetailsRequest = {
    moonpayDetails: {
        baseCurrencyCode: string;
        baseCurrencyAmount: number;
        depositWalletAddress: string;
        depositWalletAddressTag?: string;
    };
};
type MeldOffRampTransferDetailsRequest = {
    meldDetails: {
        sessionId: string;
    };
};
export type OffRampTransferDetailsResponse = {
    chainId: string;
    provider: string;
    tokenAddress: string;
    baseCurrencyCode: string;
    baseCurrencyAmount: number;
    depositWalletAddress: string;
    logos: {
        darkLogo: string;
        lightLogo: string;
        darkFullLogo: string;
        lightFullLogo: string;
    };
    depositWalletAddressTag?: string;
};
export type FORCryptoDetails = {
    walletAddress: string;
    networkFee: number;
    transactionFee: number;
    totalFee: number;
    blockchainTransactionId: string;
    chainId: string;
};
export type FORTransaction = {
    id: string;
    status: string;
    sourceAmount?: number;
    sourceCurrencyCode: string;
    destinationAmount?: number;
    destinationCurrencyCode: string;
    destinationContractAddress: string;
    serviceProviderDetails: FORServiceProvider;
    cryptoDetails: FORCryptoDetails;
    createdAt: string;
    updatedAt: string;
    externalSessionId: string;
};
export type FORTransactionRequest = {
    sessionId?: string;
    forceFetch?: boolean;
};
export type FORTransactionResponse = {
    transaction?: FORTransaction;
};
export type FiatOnRampCurrency = {
    currencyInfo: Maybe<CurrencyInfo>;
    moonpayCurrencyCode?: string;
    meldCurrencyCode?: string;
};
export interface FiatOffRampMetaData {
    name: string;
    logoUrl: string;
    onSubmitCallback: () => void;
    meldCurrencyCode?: string;
    moonpayCurrencyCode?: string;
}
export declare enum InitialQuoteSelection {
    MostRecent = 0,
    Best = 1
}
export type FiatCurrencyInfo = {
    name: string;
    shortName: string;
    code: string;
} & FiatCurrencyComponents;
export type FORCurrencyOrBalance = FiatOnRampCurrency | PortfolioBalance;
export declare enum RampToggle {
    BUY = "BUY",
    SELL = "SELL"
}
export declare enum RampDirection {
    ONRAMP = 0,
    OFFRAMP = 1
}
export {};
//# sourceMappingURL=types.d.ts.map