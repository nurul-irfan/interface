import { FORQuoteRequest, FORQuoteResponse, FORServiceProvidersResponse, FORSupportedCountriesRequest, FORSupportedCountriesResponse, FORSupportedFiatCurrenciesRequest, FORSupportedFiatCurrenciesResponse, FORSupportedTokensRequest, FORSupportedTokensResponse, FORTransactionRequest, FORTransactionResponse, FORTransferWidgetUrlRequest, FORWidgetUrlRequest, FORWidgetUrlResponse, OffRampTransferDetailsRequest, OffRampTransferDetailsResponse, OffRampWidgetUrlRequest } from 'uniswap/src/features/fiatOnRamp/types';
export declare function getFiatOnRampAggregatorApi(): import("@reduxjs/toolkit/query/react").Api<import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, {
    fiatOnRampAggregatorCountryList: import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedCountriesRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedCountriesResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorGetCountry: import("@reduxjs/toolkit/query/react").QueryDefinition<void, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORCountry, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorCryptoQuote: import("@reduxjs/toolkit/query/react").QueryDefinition<FORQuoteRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORQuoteResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorTransferServiceProviders: import("@reduxjs/toolkit/query/react").QueryDefinition<void, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORServiceProvidersResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorSupportedTokens: import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedTokensRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedTokensResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorSupportedFiatCurrencies: import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedFiatCurrenciesRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedFiatCurrenciesResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorWidget: import("@reduxjs/toolkit/query/react").QueryDefinition<FORWidgetUrlRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorTransferWidget: import("@reduxjs/toolkit/query/react").QueryDefinition<FORTransferWidgetUrlRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
    /**
     * Fetches a fiat onramp transaction by its ID, with no signature authentication.
     */
    fiatOnRampAggregatorTransaction: import("@reduxjs/toolkit/query/react").QueryDefinition<Omit<FORTransactionRequest, "sessionId"> & {
        sessionId: string;
    }, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORTransactionResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorOffRampWidget: import("@reduxjs/toolkit/query/react").QueryDefinition<OffRampWidgetUrlRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorOffRampTransferDetails: import("@reduxjs/toolkit/query/react").QueryDefinition<OffRampTransferDetailsRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, OffRampTransferDetailsResponse, "fiatOnRampAggregatorApi-uniswap">;
}, "fiatOnRampAggregatorApi-uniswap", never, typeof import("@reduxjs/toolkit/dist/query/core/module").coreModuleName | typeof import("@reduxjs/toolkit/dist/query/react/module").reactHooksModuleName>;
export declare const fiatOnRampAggregatorApiV2: import("@reduxjs/toolkit/query/react").Api<import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, {
    fiatOnRampAggregatorCountryList: import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedCountriesRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedCountriesResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorGetCountry: import("@reduxjs/toolkit/query/react").QueryDefinition<void, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORCountry, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorCryptoQuote: import("@reduxjs/toolkit/query/react").QueryDefinition<FORQuoteRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORQuoteResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorTransferServiceProviders: import("@reduxjs/toolkit/query/react").QueryDefinition<void, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORServiceProvidersResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorSupportedTokens: import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedTokensRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedTokensResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorSupportedFiatCurrencies: import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedFiatCurrenciesRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedFiatCurrenciesResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorWidget: import("@reduxjs/toolkit/query/react").QueryDefinition<FORWidgetUrlRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorTransferWidget: import("@reduxjs/toolkit/query/react").QueryDefinition<FORTransferWidgetUrlRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
    /**
     * Fetches a fiat onramp transaction by its ID, with no signature authentication.
     */
    fiatOnRampAggregatorTransaction: import("@reduxjs/toolkit/query/react").QueryDefinition<Omit<FORTransactionRequest, "sessionId"> & {
        sessionId: string;
    }, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORTransactionResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorOffRampWidget: import("@reduxjs/toolkit/query/react").QueryDefinition<OffRampWidgetUrlRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorOffRampTransferDetails: import("@reduxjs/toolkit/query/react").QueryDefinition<OffRampTransferDetailsRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, OffRampTransferDetailsResponse, "fiatOnRampAggregatorApi-uniswap">;
}, "fiatOnRampAggregatorApi-uniswap", never, typeof import("@reduxjs/toolkit/dist/query/core/module").coreModuleName | typeof import("@reduxjs/toolkit/dist/query/react/module").reactHooksModuleName>;
export declare const fiatOnRampAggregatorApi: import("@reduxjs/toolkit/query/react").Api<import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, {
    fiatOnRampAggregatorCountryList: import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedCountriesRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedCountriesResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorGetCountry: import("@reduxjs/toolkit/query/react").QueryDefinition<void, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORCountry, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorCryptoQuote: import("@reduxjs/toolkit/query/react").QueryDefinition<FORQuoteRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORQuoteResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorTransferServiceProviders: import("@reduxjs/toolkit/query/react").QueryDefinition<void, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORServiceProvidersResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorSupportedTokens: import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedTokensRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedTokensResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorSupportedFiatCurrencies: import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedFiatCurrenciesRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedFiatCurrenciesResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorWidget: import("@reduxjs/toolkit/query/react").QueryDefinition<FORWidgetUrlRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorTransferWidget: import("@reduxjs/toolkit/query/react").QueryDefinition<FORTransferWidgetUrlRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
    /**
     * Fetches a fiat onramp transaction by its ID, with no signature authentication.
     */
    fiatOnRampAggregatorTransaction: import("@reduxjs/toolkit/query/react").QueryDefinition<Omit<FORTransactionRequest, "sessionId"> & {
        sessionId: string;
    }, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORTransactionResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorOffRampWidget: import("@reduxjs/toolkit/query/react").QueryDefinition<OffRampWidgetUrlRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
    fiatOnRampAggregatorOffRampTransferDetails: import("@reduxjs/toolkit/query/react").QueryDefinition<OffRampTransferDetailsRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, OffRampTransferDetailsResponse, "fiatOnRampAggregatorApi-uniswap">;
}, "fiatOnRampAggregatorApi-uniswap", never, typeof import("@reduxjs/toolkit/dist/query/core/module").coreModuleName | typeof import("@reduxjs/toolkit/dist/query/react/module").reactHooksModuleName>;
export declare const useFiatOnRampAggregatorCountryListQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedCountriesRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedCountriesResponse, "fiatOnRampAggregatorApi-uniswap">>, useFiatOnRampAggregatorGetCountryQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query/react").QueryDefinition<void, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORCountry, "fiatOnRampAggregatorApi-uniswap">>, useFiatOnRampAggregatorCryptoQuoteQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query/react").QueryDefinition<FORQuoteRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORQuoteResponse, "fiatOnRampAggregatorApi-uniswap">>, useFiatOnRampAggregatorTransferServiceProvidersQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query/react").QueryDefinition<void, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORServiceProvidersResponse, "fiatOnRampAggregatorApi-uniswap">>, useFiatOnRampAggregatorSupportedTokensQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedTokensRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedTokensResponse, "fiatOnRampAggregatorApi-uniswap">>, useFiatOnRampAggregatorSupportedFiatCurrenciesQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query/react").QueryDefinition<FORSupportedFiatCurrenciesRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORSupportedFiatCurrenciesResponse, "fiatOnRampAggregatorApi-uniswap">>, useFiatOnRampAggregatorWidgetQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query/react").QueryDefinition<FORWidgetUrlRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">>, useFiatOnRampAggregatorTransferWidgetQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query/react").QueryDefinition<FORTransferWidgetUrlRequest, import("@reduxjs/toolkit/query/react").BaseQueryFn<string | import("@reduxjs/toolkit/query/react").FetchArgs, unknown, import("@reduxjs/toolkit/query/react").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query/react").FetchBaseQueryMeta>, never, FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">>;
//# sourceMappingURL=api.d.ts.map