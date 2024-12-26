export var WalletConnectEvent;
(function (WalletConnectEvent) {
    WalletConnectEvent[WalletConnectEvent["Connected"] = 0] = "Connected";
    WalletConnectEvent[WalletConnectEvent["Disconnected"] = 1] = "Disconnected";
    WalletConnectEvent[WalletConnectEvent["NetworkChanged"] = 2] = "NetworkChanged";
    WalletConnectEvent[WalletConnectEvent["TransactionConfirmed"] = 3] = "TransactionConfirmed";
    WalletConnectEvent[WalletConnectEvent["TransactionFailed"] = 4] = "TransactionFailed";
})(WalletConnectEvent || (WalletConnectEvent = {}));
// derived from this list https://docs.walletconnect.com/json-rpc-api-methods/ethereum#eth_signtypeddata
export var EthMethod;
(function (EthMethod) {
    EthMethod["EthSign"] = "eth_sign";
    EthMethod["EthSendTransaction"] = "eth_sendTransaction";
    EthMethod["SignTypedData"] = "eth_signTypedData";
    EthMethod["SignTypedDataV4"] = "eth_signTypedData_v4";
    EthMethod["SwitchChain"] = "wallet_switchEthereumChain";
    EthMethod["AddChain"] = "wallet_addEthereumChain";
    EthMethod["PersonalSign"] = "personal_sign";
})(EthMethod || (EthMethod = {}));
export var UwULinkMethod;
(function (UwULinkMethod) {
    UwULinkMethod["Erc20Send"] = "erc20_send";
})(UwULinkMethod || (UwULinkMethod = {}));
export var EthEvent;
(function (EthEvent) {
    EthEvent["AccountsChanged"] = "accountsChanged";
    EthEvent["ChainChanged"] = "chainChanged";
})(EthEvent || (EthEvent = {}));
export var WCEventType;
(function (WCEventType) {
    WCEventType["SessionConnected"] = "session_connected";
    WCEventType["NetworkChanged"] = "network_changed";
    WCEventType["SessionDisconnected"] = "session_disconnected";
    WCEventType["SessionPending"] = "session_pending";
    WCEventType["Error"] = "error";
    WCEventType["SignRequest"] = "sign_request";
    WCEventType["TransactionRequest"] = "transaction_request";
})(WCEventType || (WCEventType = {}));
export var WCRequestOutcome;
(function (WCRequestOutcome) {
    WCRequestOutcome["Confirm"] = "confirm";
    WCRequestOutcome["Reject"] = "reject";
})(WCRequestOutcome || (WCRequestOutcome = {}));
export function isPrimaryTypePermit(message) {
    return message.primaryType === 'Permit';
}
//# sourceMappingURL=walletConnect.js.map