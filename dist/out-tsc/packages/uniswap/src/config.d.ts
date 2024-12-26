/**
 * Naming requirements for different environments:
 * - Web ENV vars: must have process.env.REACT_APP_<var_name>
 * - Extension ENV vars: must have process.env.<var_name>
 * - Mobile ENV vars: must have BOTH process.env.<var_name> and <var_name>
 *
 *  The CI requires web vars to have the required 'REACT_APP_' prefix. The react-dot-env library doesnt integrate with CI correctly,
 *  so we pull from github secrets directly with process.env.<var_name> for both extension and mobile. <var_name> is used for local mobile builds.
 */
export interface Config {
    appsflyerApiKey: string;
    appsflyerAppId: string;
    datadogClientToken: string;
    datadogProjectId: string;
    uniswapApiKey: string;
    infuraKey: string;
    onesignalAppId: string;
    openaiApiKey: string;
    sentryDsn: string;
    simpleHashApiKey: string;
    simpleHashApiUrl: string;
    statSigProxyUrl: string;
    walletConnectProjectId: string;
    quicknodeArbitrumRpcUrl: string;
    quicknodeAvaxRpcUrl: string;
    quicknodeBaseRpcUrl: string;
    quicknodeBlastRpcUrl: string;
    quicknodeBnbRpcUrl: string;
    quicknodeCeloRpcUrl: string;
    quicknodeOpRpcUrl: string;
    quicknodePolygonRpcUrl: string;
    quicknodeZoraRpcUrl: string;
    quicknodeZkSyncRpcUrl: string;
    quicknodeWorldChainRpcUrl: string;
    quicknodeUnichainSepoliaRpcUrl: string;
    quicknodeMonadTestnetRpcUrl: string;
    quicknodeMainnetRpcUrl: string;
    quicknodeSepoliaRpcUrl: string;
    tradingApiKey: string;
    firebaseAppCheckDebugToken: string;
}
export declare const config: Readonly<Config>;
//# sourceMappingURL=config.d.ts.map