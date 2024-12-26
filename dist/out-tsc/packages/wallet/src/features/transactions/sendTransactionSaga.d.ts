import { providers } from 'ethers';
import { AccountMeta, SignerMnemonicAccountMeta } from 'uniswap/src/features/accounts/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { getBaseTradeAnalyticsProperties } from 'uniswap/src/features/transactions/swap/analytics';
import { OnChainTransactionDetails, TransactionOptions, TransactionOriginType, TransactionTypeInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
import { SignerManager } from 'wallet/src/features/wallet/signing/SignerManager';
export interface SendTransactionParams {
    txId?: string;
    chainId: UniverseChainId;
    account: AccountMeta;
    options: TransactionOptions;
    typeInfo: TransactionTypeInfo;
    transactionOriginType: TransactionOriginType;
    analytics?: ReturnType<typeof getBaseTradeAnalyticsProperties>;
}
export declare function sendTransaction(params: SendTransactionParams): Generator<import("redux-saga/effects").CallEffect<void> | import("redux-saga/effects").CallEffect<SignerManager> | import("redux-saga/effects").CallEffect<providers.JsonRpcProvider> | import("redux-saga/effects").CallEffect<OnChainTransactionDetails> | import("redux-saga/effects").CallEffect<number | undefined> | import("redux-saga/effects").CallEffect<{
    transactionResponse: providers.TransactionResponse;
    populatedRequest: providers.TransactionRequest;
}> | import("redux-saga/effects").PutEffect<{
    payload: import("uniswap/src/features/transactions/types/transactionDetails").FinalizedTransactionDetails;
    type: "transactions/finalizeTransaction";
}>, {
    transactionResponse: providers.TransactionResponse;
}, unknown>;
export declare function signAndSendTransaction(request: providers.TransactionRequest, account: AccountMeta, provider: providers.Provider, signerManager: SignerManager): Promise<{
    transactionResponse: providers.TransactionResponse;
    populatedRequest: providers.TransactionRequest;
}>;
/**
 * Attempts to fetch the next nonce to be used for a transaction.
 * If the chain supports private RPC, it will use the private RPC provider, in order to account for pending private transactions.
 *
 * @param account - The account to fetch the nonce for.
 * @param chainId - The chain ID to fetch the nonce for.
 * @returns The nonce if it was successfully fetched, otherwise undefined.
 */
export declare function tryGetNonce(account: SignerMnemonicAccountMeta, chainId: UniverseChainId): Generator<import("redux-saga/effects").CallEffect<providers.JsonRpcProvider> | import("redux-saga/effects").CallEffect<number>, number | undefined, unknown>;
export declare function getPendingPrivateTxCount(address: Address, chainId: number): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<(state: import("redux").CombinedState<{
    readonly "fiatOnRampAggregatorApi-uniswap": import("@reduxjs/toolkit/dist/query/core/apiState").CombinedState<{
        fiatOnRampAggregatorCountryList: import("@reduxjs/toolkit/dist/query").QueryDefinition<import("uniswap/src/features/fiatOnRamp/types").FORSupportedCountriesRequest, import("@reduxjs/toolkit/dist/query").BaseQueryFn<string | import("@reduxjs/toolkit/dist/query").FetchArgs, unknown, import("@reduxjs/toolkit/dist/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/dist/query").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORSupportedCountriesResponse, "fiatOnRampAggregatorApi-uniswap">;
        fiatOnRampAggregatorGetCountry: import("@reduxjs/toolkit/dist/query").QueryDefinition<void, import("@reduxjs/toolkit/dist/query").BaseQueryFn<string | import("@reduxjs/toolkit/dist/query").FetchArgs, unknown, import("@reduxjs/toolkit/dist/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/dist/query").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORCountry, "fiatOnRampAggregatorApi-uniswap">;
        fiatOnRampAggregatorCryptoQuote: import("@reduxjs/toolkit/dist/query").QueryDefinition<import("uniswap/src/features/fiatOnRamp/types").FORQuoteRequest, import("@reduxjs/toolkit/dist/query").BaseQueryFn<string | import("@reduxjs/toolkit/dist/query").FetchArgs, unknown, import("@reduxjs/toolkit/dist/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/dist/query").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORQuoteResponse, "fiatOnRampAggregatorApi-uniswap">;
        fiatOnRampAggregatorTransferServiceProviders: import("@reduxjs/toolkit/dist/query").QueryDefinition<void, import("@reduxjs/toolkit/dist/query").BaseQueryFn<string | import("@reduxjs/toolkit/dist/query").FetchArgs, unknown, import("@reduxjs/toolkit/dist/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/dist/query").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORServiceProvidersResponse, "fiatOnRampAggregatorApi-uniswap">;
        fiatOnRampAggregatorSupportedTokens: import("@reduxjs/toolkit/dist/query").QueryDefinition<import("uniswap/src/features/fiatOnRamp/types").FORSupportedTokensRequest, import("@reduxjs/toolkit/dist/query").BaseQueryFn<string | import("@reduxjs/toolkit/dist/query").FetchArgs, unknown, import("@reduxjs/toolkit/dist/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/dist/query").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORSupportedTokensResponse, "fiatOnRampAggregatorApi-uniswap">;
        fiatOnRampAggregatorSupportedFiatCurrencies: import("@reduxjs/toolkit/dist/query").QueryDefinition<import("uniswap/src/features/fiatOnRamp/types").FORSupportedFiatCurrenciesRequest, import("@reduxjs/toolkit/dist/query").BaseQueryFn<string | import("@reduxjs/toolkit/dist/query").FetchArgs, unknown, import("@reduxjs/toolkit/dist/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/dist/query").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORSupportedFiatCurrenciesResponse, "fiatOnRampAggregatorApi-uniswap">;
        fiatOnRampAggregatorWidget: import("@reduxjs/toolkit/dist/query").QueryDefinition<import("uniswap/src/features/fiatOnRamp/types").FORWidgetUrlRequest, import("@reduxjs/toolkit/dist/query").BaseQueryFn<string | import("@reduxjs/toolkit/dist/query").FetchArgs, unknown, import("@reduxjs/toolkit/dist/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/dist/query").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
        fiatOnRampAggregatorTransferWidget: import("@reduxjs/toolkit/dist/query").QueryDefinition<import("uniswap/src/features/fiatOnRamp/types").FORTransferWidgetUrlRequest, import("@reduxjs/toolkit/dist/query").BaseQueryFn<string | import("@reduxjs/toolkit/dist/query").FetchArgs, unknown, import("@reduxjs/toolkit/dist/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/dist/query").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
        fiatOnRampAggregatorTransaction: import("@reduxjs/toolkit/dist/query").QueryDefinition<Omit<import("uniswap/src/features/fiatOnRamp/types").FORTransactionRequest, "sessionId"> & {
            sessionId: string;
        }, import("@reduxjs/toolkit/dist/query").BaseQueryFn<string | import("@reduxjs/toolkit/dist/query").FetchArgs, unknown, import("@reduxjs/toolkit/dist/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/dist/query").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORTransactionResponse, "fiatOnRampAggregatorApi-uniswap">;
        fiatOnRampAggregatorOffRampWidget: import("@reduxjs/toolkit/dist/query").QueryDefinition<import("uniswap/src/features/fiatOnRamp/types").OffRampWidgetUrlRequest, import("@reduxjs/toolkit/dist/query").BaseQueryFn<string | import("@reduxjs/toolkit/dist/query").FetchArgs, unknown, import("@reduxjs/toolkit/dist/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/dist/query").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").FORWidgetUrlResponse, "fiatOnRampAggregatorApi-uniswap">;
        fiatOnRampAggregatorOffRampTransferDetails: import("@reduxjs/toolkit/dist/query").QueryDefinition<import("uniswap/src/features/fiatOnRamp/types").OffRampTransferDetailsRequest, import("@reduxjs/toolkit/dist/query").BaseQueryFn<string | import("@reduxjs/toolkit/dist/query").FetchArgs, unknown, import("@reduxjs/toolkit/dist/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/dist/query").FetchBaseQueryMeta>, never, import("uniswap/src/features/fiatOnRamp/types").OffRampTransferDetailsResponse, "fiatOnRampAggregatorApi-uniswap">;
    }, never, "fiatOnRampAggregatorApi-uniswap">;
    readonly favorites: import("uniswap/src/features/favorites/slice").FavoritesState;
    readonly notifications: import("uniswap/src/features/notifications/slice").NotificationState;
    readonly searchHistory: Readonly<import("uniswap/src/features/search/searchHistorySlice").SearchHistoryState>;
    readonly timing: import("uniswap/src/features/timing/slice").TimingState;
    readonly tokens: import("uniswap/src/features/tokens/slice/slice").TokensState;
    readonly transactions: import("uniswap/src/features/transactions/slice").TransactionsState;
    readonly transactionSettings: {
        swap: import("uniswap/src/features/transactions/settings/slice").TransactionSettingsState;
        lp: import("uniswap/src/features/transactions/settings/slice").TransactionSettingsState;
    };
    readonly uniswapBehaviorHistory: import("uniswap/src/features/behaviorHistory/slice").UniswapBehaviorHistoryState;
    readonly userSettings: import("uniswap/src/features/settings/slice").UserSettingsState;
}>, params_0: string | null) => import("uniswap/src/features/transactions/types/transactionDetails").TransactionDetails[] | undefined>, number, unknown>;
//# sourceMappingURL=sendTransactionSaga.d.ts.map