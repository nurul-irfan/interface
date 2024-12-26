/**
 * Experiment parameter names
 *
 * These must match parameter names on Statsig within an experiment
 */
export declare enum Experiments {
    ArbitrumXV2OpenOrders = "arbitrum_uniswapx_openorders_v2",
    AccountCTAs = "signin_login_connect_ctas"
}
export declare enum ArbitrumXV2ExperimentGroup {
    Test = "Test",
    Control = "Control"
}
export declare enum ArbitrumXV2OpenOrderProperties {
    PriceImprovementBps = "priceImprovementBps",
    ForceOpenOrders = "forceOpenOrders",
    DeadlineBufferSecs = "deadlineBufferSecs",
    SlippageTolerance = "slippageTolerance"
}
export declare enum AccountCTAsExperimentGroup {
    Control = "Control",// Get the app / Connect
    SignInSignUp = "SignIn-SignUp",
    LogInCreateAccount = "LogIn-CreateAccount"
}
export type ExperimentProperties = {
    [Experiments.ArbitrumXV2OpenOrders]: ArbitrumXV2OpenOrderProperties;
};
//# sourceMappingURL=experiments.d.ts.map