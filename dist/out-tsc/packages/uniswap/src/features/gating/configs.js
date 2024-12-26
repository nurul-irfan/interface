/**
 * Dynamic Configs
 * These should match the dynamic config's `Config Name` on Statsig
 */
export var DynamicConfigs;
(function (DynamicConfigs) {
    // Shared
    DynamicConfigs["Swap"] = "swap_config";
    DynamicConfigs["NetworkRequests"] = "network_requests";
    DynamicConfigs["Chains"] = "chains";
    // Wallet
    DynamicConfigs["HomeScreenExploreTokens"] = "home_screen_explore_tokens";
    DynamicConfigs["ForceUpgrade"] = "force_upgrade";
    DynamicConfigs["OnDeviceRecovery"] = "on_device_recovery";
    DynamicConfigs["UwuLink"] = "uwulink_config";
    DynamicConfigs["GasStrategies"] = "gas_strategy";
    DynamicConfigs["MainnetPrivateRpc"] = "mainnet_private_rpc";
    // Web
    DynamicConfigs["QuickRouteChains"] = "quick_route_chains";
    DynamicConfigs["AstroChain"] = "astro_chain";
})(DynamicConfigs || (DynamicConfigs = {}));
// Config values go here for easy access
// Shared
export var SwapConfigKey;
(function (SwapConfigKey) {
    SwapConfigKey["AverageL1BlockTimeMs"] = "averageL1BlockTimeMs";
    SwapConfigKey["AverageL2BlockTimeMs"] = "averageL2BlockTimeMs";
    SwapConfigKey["TradingApiSwapRequestMs"] = "tradingApiSwapRequestMs";
    SwapConfigKey["MinAutoSlippageToleranceL2"] = "minAutoSlippageToleranceL2";
    SwapConfigKey["EthSwapMinGasAmount"] = "ethSwapMinGasAmount";
    SwapConfigKey["EthSendMinGasAmount"] = "ethSendMinGasAmount";
    SwapConfigKey["PolygonSwapMinGasAmount"] = "polygonSwapMinGasAmount";
    SwapConfigKey["PolygonSendMinGasAmount"] = "polygonSendMinGasAmount";
    SwapConfigKey["AvalancheSwapMinGasAmount"] = "avalancheSwapMinGasAmount";
    SwapConfigKey["AvalancheSendMinGasAmount"] = "avalancheSendMinGasAmount";
    SwapConfigKey["CeloSwapMinGasAmount"] = "celoSwapMinGasAmount";
    SwapConfigKey["CeloSendMinGasAmount"] = "celoSendMinGasAmount";
    SwapConfigKey["MonSwapMinGasAmount"] = "monSwapMinGasAmount";
    SwapConfigKey["MonSendMinGasAmount"] = "monSendMinGasAmount";
    SwapConfigKey["GenericL2SwapMinGasAmount"] = "genericL2SwapMinGasAmount";
    SwapConfigKey["GenericL2SendMinGasAmount"] = "genericL2SendMinGasAmount";
})(SwapConfigKey || (SwapConfigKey = {}));
export var NetworkRequestsConfigKey;
(function (NetworkRequestsConfigKey) {
    NetworkRequestsConfigKey["BalanceMaxRefetchAttempts"] = "balanceMaxRefetchAttempts";
})(NetworkRequestsConfigKey || (NetworkRequestsConfigKey = {}));
export var ChainsConfigKey;
(function (ChainsConfigKey) {
    ChainsConfigKey["OrderedChainIds"] = "orderedChainIds";
    ChainsConfigKey["NewChainIds"] = "newChainIds";
})(ChainsConfigKey || (ChainsConfigKey = {}));
// Wallet
export var ForceUpgradeConfigKey;
(function (ForceUpgradeConfigKey) {
    ForceUpgradeConfigKey["Status"] = "status";
})(ForceUpgradeConfigKey || (ForceUpgradeConfigKey = {}));
export var HomeScreenExploreTokensConfigKey;
(function (HomeScreenExploreTokensConfigKey) {
    HomeScreenExploreTokensConfigKey["EthChainId"] = "ethChainId";
    HomeScreenExploreTokensConfigKey["Tokens"] = "tokens";
})(HomeScreenExploreTokensConfigKey || (HomeScreenExploreTokensConfigKey = {}));
export var OnDeviceRecoveryConfigKey;
(function (OnDeviceRecoveryConfigKey) {
    OnDeviceRecoveryConfigKey["AppLoadingTimeoutMs"] = "appLoadingTimeoutMs";
    OnDeviceRecoveryConfigKey["MaxMnemonicsToLoad"] = "maxMnemonicsToLoad";
})(OnDeviceRecoveryConfigKey || (OnDeviceRecoveryConfigKey = {}));
export var UwuLinkConfigKey;
(function (UwuLinkConfigKey) {
    UwuLinkConfigKey["Allowlist"] = "allowlist";
})(UwuLinkConfigKey || (UwuLinkConfigKey = {}));
export var MainnetPrivateRpcConfigKey;
(function (MainnetPrivateRpcConfigKey) {
    MainnetPrivateRpcConfigKey["UseFlashbots"] = "use_flashbots";
    MainnetPrivateRpcConfigKey["SendFlashbotsAuthenticationHeader"] = "send_authentication_header";
})(MainnetPrivateRpcConfigKey || (MainnetPrivateRpcConfigKey = {}));
// Web
export var QuickRouteChainsConfigKey;
(function (QuickRouteChainsConfigKey) {
    QuickRouteChainsConfigKey["Chains"] = "quick_route_chains";
})(QuickRouteChainsConfigKey || (QuickRouteChainsConfigKey = {}));
export var AstroChainConfigKey;
(function (AstroChainConfigKey) {
    AstroChainConfigKey["Url"] = "url";
})(AstroChainConfigKey || (AstroChainConfigKey = {}));
//# sourceMappingURL=configs.js.map