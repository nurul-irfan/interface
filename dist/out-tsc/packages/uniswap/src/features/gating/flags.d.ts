/**
 * Feature flag names
 */
export declare enum FeatureFlags {
    Datadog = 0,
    ForAggregator = 1,
    IndicativeSwapQuotes = 2,
    PortionFields = 3,
    SharedSwapArbitrumUniswapXExperiment = 4,
    TokenProtection = 5,
    UnichainPromo = 6,
    UniswapX = 7,
    UniswapXPriorityOrders = 8,
    V4Swap = 9,
    MonadTestnet = 10,
    DisableFiatOnRampKorea = 11,
    ExtensionAppRating = 12,
    ExtensionAutoConnect = 13,
    ExtensionClaimUnitag = 14,
    ExtensionPromotionGA = 15,
    FeedTab = 16,
    FiatOffRamp = 17,
    ForMonorepoMigration = 18,
    OnboardingKeyring = 19,
    OpenAIAssistant = 20,
    PrivateRpc = 21,
    Scantastic = 22,
    SelfReportSpamNFTs = 23,
    TransactionDetailsSheet = 24,
    UnitagsDeviceAttestation = 25,
    UwULink = 26,
    AATestWeb = 27,
    ConversionTracking = 28,
    Eip6936Enabled = 29,
    GoogleConversionTracking = 30,
    GqlTokenLists = 31,
    L2NFTs = 32,
    LimitsFees = 33,
    LPRedesign = 34,
    MultipleRoutingOptions = 35,
    NavigationHotkeys = 36,
    PriceRangeInputV2 = 37,
    QuickRouteMainnet = 38,
    Realtime = 39,
    TraceJsonRpc = 40,
    TwitterConversionTracking = 41,
    UniswapXSyntheticQuote = 42,
    UniswapXv2 = 43,
    UniversalSwap = 44,
    V4Data = 45,
    Zora = 46,
    OutageBannerArbitrum = 47,
    OutageBannerOptimism = 48,
    OutageBannerPolygon = 49
}
export declare const SHARED_FEATURE_FLAG_NAMES: Map<FeatureFlags, string>;
export declare const WEB_FEATURE_FLAG_NAMES: Map<FeatureFlags, string>;
export declare const WALLET_FEATURE_FLAG_NAMES: Map<FeatureFlags, string>;
export declare enum FeatureFlagClient {
    Web = 0,
    Wallet = 1
}
export declare function getFeatureFlagName(flag: FeatureFlags, client?: FeatureFlagClient): string;
//# sourceMappingURL=flags.d.ts.map