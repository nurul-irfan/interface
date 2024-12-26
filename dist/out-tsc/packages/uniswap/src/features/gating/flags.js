import { logger } from 'utilities/src/logger/logger';
import { isInterface } from 'utilities/src/platform';
/**
 * Feature flag names
 */
export var FeatureFlags;
(function (FeatureFlags) {
    // Shared
    FeatureFlags[FeatureFlags["Datadog"] = 0] = "Datadog";
    FeatureFlags[FeatureFlags["ForAggregator"] = 1] = "ForAggregator";
    FeatureFlags[FeatureFlags["IndicativeSwapQuotes"] = 2] = "IndicativeSwapQuotes";
    FeatureFlags[FeatureFlags["PortionFields"] = 3] = "PortionFields";
    FeatureFlags[FeatureFlags["SharedSwapArbitrumUniswapXExperiment"] = 4] = "SharedSwapArbitrumUniswapXExperiment";
    FeatureFlags[FeatureFlags["TokenProtection"] = 5] = "TokenProtection";
    FeatureFlags[FeatureFlags["UnichainPromo"] = 6] = "UnichainPromo";
    FeatureFlags[FeatureFlags["UniswapX"] = 7] = "UniswapX";
    FeatureFlags[FeatureFlags["UniswapXPriorityOrders"] = 8] = "UniswapXPriorityOrders";
    FeatureFlags[FeatureFlags["V4Swap"] = 9] = "V4Swap";
    FeatureFlags[FeatureFlags["MonadTestnet"] = 10] = "MonadTestnet";
    // Wallet
    FeatureFlags[FeatureFlags["DisableFiatOnRampKorea"] = 11] = "DisableFiatOnRampKorea";
    FeatureFlags[FeatureFlags["ExtensionAppRating"] = 12] = "ExtensionAppRating";
    FeatureFlags[FeatureFlags["ExtensionAutoConnect"] = 13] = "ExtensionAutoConnect";
    FeatureFlags[FeatureFlags["ExtensionClaimUnitag"] = 14] = "ExtensionClaimUnitag";
    FeatureFlags[FeatureFlags["ExtensionPromotionGA"] = 15] = "ExtensionPromotionGA";
    FeatureFlags[FeatureFlags["FeedTab"] = 16] = "FeedTab";
    FeatureFlags[FeatureFlags["FiatOffRamp"] = 17] = "FiatOffRamp";
    FeatureFlags[FeatureFlags["ForMonorepoMigration"] = 18] = "ForMonorepoMigration";
    FeatureFlags[FeatureFlags["OnboardingKeyring"] = 19] = "OnboardingKeyring";
    FeatureFlags[FeatureFlags["OpenAIAssistant"] = 20] = "OpenAIAssistant";
    FeatureFlags[FeatureFlags["PrivateRpc"] = 21] = "PrivateRpc";
    FeatureFlags[FeatureFlags["Scantastic"] = 22] = "Scantastic";
    FeatureFlags[FeatureFlags["SelfReportSpamNFTs"] = 23] = "SelfReportSpamNFTs";
    FeatureFlags[FeatureFlags["TransactionDetailsSheet"] = 24] = "TransactionDetailsSheet";
    FeatureFlags[FeatureFlags["UnitagsDeviceAttestation"] = 25] = "UnitagsDeviceAttestation";
    FeatureFlags[FeatureFlags["UwULink"] = 26] = "UwULink";
    // Web
    FeatureFlags[FeatureFlags["AATestWeb"] = 27] = "AATestWeb";
    FeatureFlags[FeatureFlags["ConversionTracking"] = 28] = "ConversionTracking";
    FeatureFlags[FeatureFlags["Eip6936Enabled"] = 29] = "Eip6936Enabled";
    FeatureFlags[FeatureFlags["GoogleConversionTracking"] = 30] = "GoogleConversionTracking";
    FeatureFlags[FeatureFlags["GqlTokenLists"] = 31] = "GqlTokenLists";
    FeatureFlags[FeatureFlags["L2NFTs"] = 32] = "L2NFTs";
    FeatureFlags[FeatureFlags["LimitsFees"] = 33] = "LimitsFees";
    FeatureFlags[FeatureFlags["LPRedesign"] = 34] = "LPRedesign";
    FeatureFlags[FeatureFlags["MultipleRoutingOptions"] = 35] = "MultipleRoutingOptions";
    FeatureFlags[FeatureFlags["NavigationHotkeys"] = 36] = "NavigationHotkeys";
    FeatureFlags[FeatureFlags["PriceRangeInputV2"] = 37] = "PriceRangeInputV2";
    FeatureFlags[FeatureFlags["QuickRouteMainnet"] = 38] = "QuickRouteMainnet";
    FeatureFlags[FeatureFlags["Realtime"] = 39] = "Realtime";
    FeatureFlags[FeatureFlags["TraceJsonRpc"] = 40] = "TraceJsonRpc";
    FeatureFlags[FeatureFlags["TwitterConversionTracking"] = 41] = "TwitterConversionTracking";
    FeatureFlags[FeatureFlags["UniswapXSyntheticQuote"] = 42] = "UniswapXSyntheticQuote";
    FeatureFlags[FeatureFlags["UniswapXv2"] = 43] = "UniswapXv2";
    FeatureFlags[FeatureFlags["UniversalSwap"] = 44] = "UniversalSwap";
    FeatureFlags[FeatureFlags["V4Data"] = 45] = "V4Data";
    FeatureFlags[FeatureFlags["Zora"] = 46] = "Zora";
    // TODO(WEB-3625): Remove these once we have a generalized system for outage banners.
    FeatureFlags[FeatureFlags["OutageBannerArbitrum"] = 47] = "OutageBannerArbitrum";
    FeatureFlags[FeatureFlags["OutageBannerOptimism"] = 48] = "OutageBannerOptimism";
    FeatureFlags[FeatureFlags["OutageBannerPolygon"] = 49] = "OutageBannerPolygon";
})(FeatureFlags || (FeatureFlags = {}));
// These names must match the gate name on statsig
export const SHARED_FEATURE_FLAG_NAMES = new Map([
    [FeatureFlags.Datadog, 'datadog'],
    [FeatureFlags.IndicativeSwapQuotes, 'indicative-quotes'],
    [FeatureFlags.MonadTestnet, 'monad_testnet'],
    [FeatureFlags.PortionFields, 'portion-fields'],
    [FeatureFlags.SharedSwapArbitrumUniswapXExperiment, 'shared_swap_arbitrum_uniswapx_experiment'],
    [FeatureFlags.TokenProtection, 'token_protection'],
    [FeatureFlags.UnichainPromo, 'unichain_promo'],
    [FeatureFlags.UniswapX, 'uniswapx'],
    [FeatureFlags.UniswapXPriorityOrders, 'uniswapx_priority_orders'],
    [FeatureFlags.V4Swap, 'v4_swap'],
]);
// These names must match the gate name on statsig
export const WEB_FEATURE_FLAG_NAMES = new Map([
    ...SHARED_FEATURE_FLAG_NAMES,
    [FeatureFlags.AATestWeb, 'aatest_web'],
    [FeatureFlags.ConversionTracking, 'conversion-tracking'],
    [FeatureFlags.Eip6936Enabled, 'eip6963_enabled'],
    [FeatureFlags.ForAggregator, 'for_aggregator_web'],
    [FeatureFlags.GoogleConversionTracking, 'google_conversion_tracking'],
    [FeatureFlags.GqlTokenLists, 'gql_token_lists'],
    [FeatureFlags.L2NFTs, 'l2_nfts'],
    [FeatureFlags.LPRedesign, 'lp_redesign'],
    [FeatureFlags.LimitsFees, 'limits_fees'],
    [FeatureFlags.MultipleRoutingOptions, 'multiple_routing_options'],
    [FeatureFlags.NavigationHotkeys, 'navigation_hotkeys'],
    // TODO(WEB-3625): Remove these once we have a generalized system for outage banners.
    [FeatureFlags.OutageBannerArbitrum, 'outage_banner_feb_2024_arbitrum'],
    [FeatureFlags.OutageBannerOptimism, 'outage_banner_feb_2024_optimism'],
    [FeatureFlags.OutageBannerPolygon, 'outage_banner_feb_2024_polygon'],
    [FeatureFlags.PriceRangeInputV2, 'price_range_input_v2'],
    [FeatureFlags.QuickRouteMainnet, 'enable_quick_route_mainnet'],
    [FeatureFlags.Realtime, 'realtime'],
    [FeatureFlags.TraceJsonRpc, 'traceJsonRpc'],
    [FeatureFlags.TwitterConversionTracking, 'twitter_conversion_tracking'],
    [FeatureFlags.UniswapXSyntheticQuote, 'uniswapx_synthetic_quote'],
    [FeatureFlags.UniswapXv2, 'uniswapx_v2'],
    [FeatureFlags.UniversalSwap, 'universal_swap'],
    [FeatureFlags.V4Data, 'v4_data'],
    [FeatureFlags.Zora, 'zora'],
]);
// These names must match the gate name on statsig
export const WALLET_FEATURE_FLAG_NAMES = new Map([
    ...SHARED_FEATURE_FLAG_NAMES,
    [FeatureFlags.DisableFiatOnRampKorea, 'disable-fiat-onramp-korea'],
    [FeatureFlags.ExtensionAppRating, 'extension_app_rating'],
    [FeatureFlags.ExtensionAutoConnect, 'extension-auto-connect'],
    [FeatureFlags.ExtensionClaimUnitag, 'extension-claim-unitag'],
    [FeatureFlags.ExtensionPromotionGA, 'extension-promotion-ga'],
    [FeatureFlags.FeedTab, 'feed-tab'],
    [FeatureFlags.FiatOffRamp, 'fiat-offramp'],
    [FeatureFlags.ForAggregator, 'for-aggregator'],
    [FeatureFlags.ForMonorepoMigration, 'for-monorepo-migration'],
    [FeatureFlags.OnboardingKeyring, 'onboarding-keyring'],
    [FeatureFlags.OpenAIAssistant, 'openai-assistant'],
    [FeatureFlags.PrivateRpc, 'mev-blocker'],
    [FeatureFlags.Scantastic, 'scantastic'],
    [FeatureFlags.SelfReportSpamNFTs, 'self-report-spam-nfts'],
    [FeatureFlags.TransactionDetailsSheet, 'transaction-details-sheet'],
    [FeatureFlags.UnitagsDeviceAttestation, 'unitags-device-attestation'],
    [FeatureFlags.UwULink, 'uwu-link'],
]);
export var FeatureFlagClient;
(function (FeatureFlagClient) {
    FeatureFlagClient[FeatureFlagClient["Web"] = 0] = "Web";
    FeatureFlagClient[FeatureFlagClient["Wallet"] = 1] = "Wallet";
})(FeatureFlagClient || (FeatureFlagClient = {}));
const FEATURE_FLAG_NAMES = {
    [FeatureFlagClient.Web]: WEB_FEATURE_FLAG_NAMES,
    [FeatureFlagClient.Wallet]: WALLET_FEATURE_FLAG_NAMES,
};
export function getFeatureFlagName(flag, client) {
    const names = client !== undefined
        ? FEATURE_FLAG_NAMES[client]
        : isInterface
            ? FEATURE_FLAG_NAMES[FeatureFlagClient.Web]
            : FEATURE_FLAG_NAMES[FeatureFlagClient.Wallet];
    const name = names.get(flag);
    if (!name) {
        const err = new Error(`Feature ${FeatureFlags[flag]} does not have a name mapped for this application`);
        logger.error(err, {
            tags: {
                file: 'flags.ts',
                function: 'getFeatureFlagName',
            },
        });
        throw err;
    }
    return name;
}
//# sourceMappingURL=flags.js.map