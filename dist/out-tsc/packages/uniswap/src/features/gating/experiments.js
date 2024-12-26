/**
 * Experiment parameter names
 *
 * These must match parameter names on Statsig within an experiment
 */
export var Experiments;
(function (Experiments) {
    Experiments["ArbitrumXV2OpenOrders"] = "arbitrum_uniswapx_openorders_v2";
    Experiments["AccountCTAs"] = "signin_login_connect_ctas";
})(Experiments || (Experiments = {}));
export var ArbitrumXV2ExperimentGroup;
(function (ArbitrumXV2ExperimentGroup) {
    ArbitrumXV2ExperimentGroup["Test"] = "Test";
    ArbitrumXV2ExperimentGroup["Control"] = "Control";
})(ArbitrumXV2ExperimentGroup || (ArbitrumXV2ExperimentGroup = {}));
export var ArbitrumXV2OpenOrderProperties;
(function (ArbitrumXV2OpenOrderProperties) {
    ArbitrumXV2OpenOrderProperties["PriceImprovementBps"] = "priceImprovementBps";
    ArbitrumXV2OpenOrderProperties["ForceOpenOrders"] = "forceOpenOrders";
    ArbitrumXV2OpenOrderProperties["DeadlineBufferSecs"] = "deadlineBufferSecs";
    ArbitrumXV2OpenOrderProperties["SlippageTolerance"] = "slippageTolerance";
})(ArbitrumXV2OpenOrderProperties || (ArbitrumXV2OpenOrderProperties = {}));
export var AccountCTAsExperimentGroup;
(function (AccountCTAsExperimentGroup) {
    AccountCTAsExperimentGroup["Control"] = "Control";
    AccountCTAsExperimentGroup["SignInSignUp"] = "SignIn-SignUp";
    AccountCTAsExperimentGroup["LogInCreateAccount"] = "LogIn-CreateAccount";
})(AccountCTAsExperimentGroup || (AccountCTAsExperimentGroup = {}));
//# sourceMappingURL=experiments.js.map