import { InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { isTestEnv } from 'utilities/src/environment/env';
export function setupWalletCache() {
    return new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    // relayStylePagination function unfortunately generates a field policy that ignores args
                    // Note: all non-pagination related query args should be added for cache to work properly.
                    // ^ This ensures that cache doesnt get overwritten by similar queries with different args (e.g. different filter on NFT Items)
                    nftBalances: relayStylePagination(['ownerAddress']),
                    nftAssets: relayStylePagination(['address', 'filter']),
                    /*
                     * CACHE REDIRECTS
                     *
                     * when queries require params, Apollo cannot return partial data from cache
                     * because it will not know the `id` until data is received.
                     * The following redirects set ids to values known ahead of time.
                     *
                     * NOTE: may require setting a Field policy to ensure ids are stored in the
                     *      format we specify. See `token()` below for a full example.
                     * see https://music.youtube.com/watch?v=twd4Pb4o_fU&feature=share
                     */
                    // Cache redirects don't work in test environment, so we don't use them in tests
                    ...(!isTestEnv()
                        ? {
                            // simply use chain / address pair as id instead for tokens
                            token: {
                                read(_, { args, toReference }) {
                                    var _a;
                                    return toReference({
                                        __typename: 'Token',
                                        chain: args === null || args === void 0 ? void 0 : args.chain,
                                        address: (_a = args === null || args === void 0 ? void 0 : args.address) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
                                    });
                                },
                            },
                        }
                        : {}),
                    // Ignore `valueModifiers` and `onRampAuth` when caching `portfolios`.
                    // IMPORTANT: This assumes that `valueModifiers` are always the same when querying `portfolios` across the entire app.
                    portfolios: {
                        keyArgs: ['chains', 'ownerAddresses'],
                    },
                },
            },
            Token: {
                // key by chain, address combination so that Token(chain, address) endpoint can read from cache
                /**
                 * NOTE: In any query for `token` or `tokens`, you must include the `chain` and `address` fields
                 * in order for result to normalize properly in the cache.
                 */
                keyFields: ['chain', 'address'],
                fields: {
                    address: {
                        read(address) {
                            var _a;
                            // backend endpoint sometimes returns checksummed, sometimes lowercased addresses
                            // always use lowercased addresses in our app for consistency
                            return (_a = address === null || address === void 0 ? void 0 : address.toLowerCase()) !== null && _a !== void 0 ? _a : null;
                        },
                    },
                    feeData: {
                        // TODO(API-482): remove this once the backend bug is fixed.
                        // There's a bug in our graphql backend where `feeData` can incorrectly be `null` for certain queries (`topTokens`).
                        // This field policy ensures that the cache doesn't get overwritten with `null` values triggering unnecessary re-renders.
                        merge: ignoreIncomingNullValue,
                    },
                    protectionInfo: {
                        // TODO(API-482): remove this once the backend bug is fixed.
                        // There's a bug in our graphql backend where `protectionInfo` can incorrectly be `null` for certain queries (`topTokens`).
                        // This field policy ensures that the cache doesn't get overwritten with `null` values triggering unnecessary re-renders.
                        merge: ignoreIncomingNullValue,
                    },
                },
            },
            // Disable normalizaton for these types.
            // Given that we would never query these objects directly, we want these to be stored by their parent instead of being normalized.
            Amount: { keyFields: false },
            AmountChange: { keyFields: false },
            Dimensions: { keyFields: false },
            TimestampedAmount: { keyFields: false },
        },
    });
}
function ignoreIncomingNullValue(existing, incoming, { mergeObjects }) {
    if (existing && !incoming) {
        return existing;
    }
    return mergeObjects(existing, incoming);
}
//# sourceMappingURL=cache.js.map