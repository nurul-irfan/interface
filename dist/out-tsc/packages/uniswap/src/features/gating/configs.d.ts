import { GasStrategy } from 'uniswap/src/data/tradingApi/types';
/**
 * Dynamic Configs
 * These should match the dynamic config's `Config Name` on Statsig
 */
export declare enum DynamicConfigs {
    Swap = "swap_config",
    NetworkRequests = "network_requests",
    Chains = "chains",
    HomeScreenExploreTokens = "home_screen_explore_tokens",
    ForceUpgrade = "force_upgrade",
    OnDeviceRecovery = "on_device_recovery",
    UwuLink = "uwulink_config",
    GasStrategies = "gas_strategy",
    MainnetPrivateRpc = "mainnet_private_rpc",
    QuickRouteChains = "quick_route_chains",
    AstroChain = "astro_chain"
}
export declare enum SwapConfigKey {
    AverageL1BlockTimeMs = "averageL1BlockTimeMs",
    AverageL2BlockTimeMs = "averageL2BlockTimeMs",
    TradingApiSwapRequestMs = "tradingApiSwapRequestMs",
    MinAutoSlippageToleranceL2 = "minAutoSlippageToleranceL2",
    EthSwapMinGasAmount = "ethSwapMinGasAmount",
    EthSendMinGasAmount = "ethSendMinGasAmount",
    PolygonSwapMinGasAmount = "polygonSwapMinGasAmount",
    PolygonSendMinGasAmount = "polygonSendMinGasAmount",
    AvalancheSwapMinGasAmount = "avalancheSwapMinGasAmount",
    AvalancheSendMinGasAmount = "avalancheSendMinGasAmount",
    CeloSwapMinGasAmount = "celoSwapMinGasAmount",
    CeloSendMinGasAmount = "celoSendMinGasAmount",
    MonSwapMinGasAmount = "monSwapMinGasAmount",
    MonSendMinGasAmount = "monSendMinGasAmount",
    GenericL2SwapMinGasAmount = "genericL2SwapMinGasAmount",
    GenericL2SendMinGasAmount = "genericL2SendMinGasAmount"
}
export declare enum NetworkRequestsConfigKey {
    BalanceMaxRefetchAttempts = "balanceMaxRefetchAttempts"
}
export declare enum ChainsConfigKey {
    OrderedChainIds = "orderedChainIds",
    NewChainIds = "newChainIds"
}
export declare enum ForceUpgradeConfigKey {
    Status = "status"
}
export declare enum HomeScreenExploreTokensConfigKey {
    EthChainId = "ethChainId",
    Tokens = "tokens"
}
export declare enum OnDeviceRecoveryConfigKey {
    AppLoadingTimeoutMs = "appLoadingTimeoutMs",
    MaxMnemonicsToLoad = "maxMnemonicsToLoad"
}
export declare enum UwuLinkConfigKey {
    Allowlist = "allowlist"
}
export type GasStrategyType = 'general' | 'swap';
export type GasStrategyConditions = {
    name: string;
    chainId: number;
    types: GasStrategyType;
    isActive: boolean;
};
export type GasStrategyWithConditions = {
    strategy: GasStrategy;
    conditions: GasStrategyConditions;
};
export type GasStrategies = {
    strategies: GasStrategyWithConditions[];
};
export declare enum MainnetPrivateRpcConfigKey {
    UseFlashbots = "use_flashbots",
    SendFlashbotsAuthenticationHeader = "send_authentication_header"
}
export declare enum QuickRouteChainsConfigKey {
    Chains = "quick_route_chains"
}
export declare enum AstroChainConfigKey {
    Url = "url"
}
export type DynamicConfigKeys = {
    [DynamicConfigs.Swap]: SwapConfigKey;
    [DynamicConfigs.NetworkRequests]: NetworkRequestsConfigKey;
    [DynamicConfigs.Chains]: ChainsConfigKey;
    [DynamicConfigs.HomeScreenExploreTokens]: HomeScreenExploreTokensConfigKey;
    [DynamicConfigs.ForceUpgrade]: ForceUpgradeConfigKey;
    [DynamicConfigs.OnDeviceRecovery]: OnDeviceRecoveryConfigKey;
    [DynamicConfigs.UwuLink]: UwuLinkConfigKey;
    [DynamicConfigs.MainnetPrivateRpc]: MainnetPrivateRpcConfigKey;
    [DynamicConfigs.QuickRouteChains]: QuickRouteChainsConfigKey;
    [DynamicConfigs.AstroChain]: AstroChainConfigKey;
};
//# sourceMappingURL=configs.d.ts.map