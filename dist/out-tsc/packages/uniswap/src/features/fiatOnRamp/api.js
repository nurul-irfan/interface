import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { objectToQueryString } from 'uniswap/src/data/utils';
import { FOR_API_HEADERS } from 'uniswap/src/features/fiatOnRamp/constants';
import { transformPaymentMethods } from 'uniswap/src/features/fiatOnRamp/utils';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { getFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { isMobileApp } from 'utilities/src/platform';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getFiatOnRampAggregatorApi() {
    if (!isMobileApp) {
        return fiatOnRampAggregatorApi;
    }
    let isForMigrationEnabled = false;
    try {
        isForMigrationEnabled = getFeatureFlag(FeatureFlags.ForMonorepoMigration);
    }
    catch { }
    return isForMigrationEnabled ? fiatOnRampAggregatorApiV2 : fiatOnRampAggregatorApi;
}
export const fiatOnRampAggregatorApiV2 = createApi({
    reducerPath: 'fiatOnRampAggregatorApi-uniswap',
    baseQuery: fetchBaseQuery({
        baseUrl: uniswapUrls.forApiUrl,
        headers: FOR_API_HEADERS,
    }),
    endpoints: (builder) => ({
        fiatOnRampAggregatorCountryList: builder.query({
            query: (request) => ({ url: '/SupportedCountries', body: request, method: 'POST' }),
        }),
        fiatOnRampAggregatorGetCountry: builder.query({
            query: () => ({ url: '/GetCountry', body: {}, method: 'POST' }),
        }),
        fiatOnRampAggregatorCryptoQuote: builder.query({
            query: (request) => ({
                url: '/Quote',
                body: request,
                method: 'POST',
            }),
            keepUnusedDataFor: 0,
            transformResponse: (response) => {
                var _a;
                return ({
                    ...response,
                    quotes: (_a = response.quotes) === null || _a === void 0 ? void 0 : _a.map((quote) => ({
                        ...quote,
                        serviceProviderDetails: {
                            ...quote.serviceProviderDetails,
                            paymentMethods: transformPaymentMethods(quote.serviceProviderDetails.paymentMethods),
                        },
                    })),
                });
            },
        }),
        fiatOnRampAggregatorTransferServiceProviders: builder.query({
            query: () => ({ url: '/TransferServiceProviders', body: {}, method: 'POST' }),
            keepUnusedDataFor: 60 * 60, // 1 hour
        }),
        fiatOnRampAggregatorSupportedTokens: builder.query({
            query: (request) => ({
                url: '/SupportedTokens',
                body: request,
                method: 'POST',
            }),
        }),
        fiatOnRampAggregatorSupportedFiatCurrencies: builder.query({
            query: (request) => ({
                url: '/SupportedFiatCurrencies',
                body: request,
                method: 'POST',
            }),
        }),
        fiatOnRampAggregatorWidget: builder.query({
            query: (request) => ({
                url: '/WidgetUrl',
                body: request,
                method: 'POST',
            }),
        }),
        fiatOnRampAggregatorTransferWidget: builder.query({
            query: (request) => ({
                url: '/TransferWidgetUrl',
                body: request,
                method: 'POST',
            }),
        }),
        /**
         * Fetches a fiat onramp transaction by its ID, with no signature authentication.
         */
        fiatOnRampAggregatorTransaction: builder.query({
            query: (request) => ({ url: '/Transaction', body: request, method: 'POST' }),
        }),
        fiatOnRampAggregatorOffRampWidget: builder.query({
            query: (request) => ({
                url: '/OffRampWidgetUrl',
                body: request,
                method: 'POST',
            }),
        }),
        fiatOnRampAggregatorOffRampTransferDetails: builder.query({
            query: (request) => ({
                url: '/OffRampTransferDetails',
                body: request,
                method: 'POST',
            }),
        }),
    }),
});
// TODO: WALL-5189 - remove this once we finish migrating away from original FOR endpoint service
export const fiatOnRampAggregatorApi = createApi({
    reducerPath: 'fiatOnRampAggregatorApi-uniswap',
    baseQuery: fetchBaseQuery({
        baseUrl: uniswapUrls.fiatOnRampApiUrl,
        headers: FOR_API_HEADERS,
    }),
    endpoints: (builder) => ({
        fiatOnRampAggregatorCountryList: builder.query({
            query: () => `/supported-countries`,
        }),
        fiatOnRampAggregatorGetCountry: builder.query({
            query: () => `/get-country`,
        }),
        fiatOnRampAggregatorCryptoQuote: builder.query({
            query: (request) => ({
                url: '/quote',
                body: request,
                method: 'POST',
            }),
            keepUnusedDataFor: 0,
            transformResponse: (response) => {
                var _a;
                return ({
                    ...response,
                    quotes: (_a = response.quotes) === null || _a === void 0 ? void 0 : _a.map((quote) => ({
                        ...quote,
                        serviceProviderDetails: {
                            ...quote.serviceProviderDetails,
                            paymentMethods: transformPaymentMethods(quote.serviceProviderDetails.paymentMethods),
                        },
                    })),
                });
            },
        }),
        fiatOnRampAggregatorTransferServiceProviders: builder.query({
            query: () => '/transfer-service-providers',
            keepUnusedDataFor: 60 * 60, // 1 hour
        }),
        fiatOnRampAggregatorSupportedTokens: builder.query({
            query: (request) => ({
                url: `/supported-tokens`,
                params: request,
            }),
        }),
        fiatOnRampAggregatorSupportedFiatCurrencies: builder.query({
            query: (request) => ({
                url: '/supported-fiat-currencies',
                params: request,
            }),
        }),
        fiatOnRampAggregatorWidget: builder.query({
            query: (request) => ({
                url: '/widget-url',
                body: request,
                method: 'POST',
            }),
        }),
        fiatOnRampAggregatorTransferWidget: builder.query({
            query: (request) => ({
                url: '/transfer-widget-url',
                body: request,
                method: 'POST',
            }),
        }),
        /**
         * Fetches a fiat onramp transaction by its ID, with no signature authentication.
         */
        fiatOnRampAggregatorTransaction: builder.query({
            query: (request) => `/transaction?${objectToQueryString(request)}`,
        }),
        // stubbing out these endpoints so that v2 works
        fiatOnRampAggregatorOffRampWidget: builder.query({
            query: () => '',
        }),
        fiatOnRampAggregatorOffRampTransferDetails: builder.query({ query: () => '' }),
    }),
});
export const { useFiatOnRampAggregatorCountryListQuery, useFiatOnRampAggregatorGetCountryQuery, useFiatOnRampAggregatorCryptoQuoteQuery, useFiatOnRampAggregatorTransferServiceProvidersQuery, useFiatOnRampAggregatorSupportedTokensQuery, useFiatOnRampAggregatorSupportedFiatCurrenciesQuery, useFiatOnRampAggregatorWidgetQuery, useFiatOnRampAggregatorTransferWidgetQuery, } = getFiatOnRampAggregatorApi();
//# sourceMappingURL=api.js.map