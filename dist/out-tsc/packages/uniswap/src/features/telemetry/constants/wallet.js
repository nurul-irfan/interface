import { SharedEventName, SwapEventName } from '@uniswap/analytics-events';
import { ExtensionEventName } from 'uniswap/src/features/telemetry/constants/extension';
export var WalletEventName;
(function (WalletEventName) {
    WalletEventName["BackupMethodAdded"] = "Backup Method Added";
    WalletEventName["BackupMethodRemoved"] = "Backup Method Removed";
    WalletEventName["DappRequestCardPressed"] = "DappRequestCardPressed";
    WalletEventName["DappRequestCardClosed"] = "DappRequestCardClosed";
    WalletEventName["GasEstimateAccuracy"] = "Gas Estimate Accuracy";
    WalletEventName["ExploreSearchCancel"] = "Explore Search Cancel";
    WalletEventName["ModalClosed"] = "Modal Closed";
    WalletEventName["NFTVisibilityChanged"] = "NFT Visibility Changed";
    WalletEventName["NFTsLoaded"] = "NFTs Loaded";
    WalletEventName["NetworkFilterSelected"] = "Network Filter Selected";
    WalletEventName["ExternalLinkOpened"] = "External Link Opened";
    WalletEventName["OnboardingIntroCardSwiped"] = "Onboarding Intro Card Swiped";
    WalletEventName["OnboardingIntroCardPressed"] = "Onboarding Intro Card Pressed";
    WalletEventName["OnboardingIntroCardClosed"] = "Onboarding Intro Card Closed";
    WalletEventName["PendingTransactionTimeout"] = "Pending Transaction Timeout";
    WalletEventName["PerformanceGraphql"] = "Performance GraphQL";
    WalletEventName["PortfolioBalanceFreshnessLag"] = "Portfolio Balance Freshness Lag";
    WalletEventName["SendRecipientSelected"] = "Send Recipient Selected";
    WalletEventName["ShareButtonClicked"] = "Share Button Clicked";
    WalletEventName["SwapSubmitted"] = "Swap Submitted to Provider";
    WalletEventName["TestnetEvent"] = "Testnet Event";
    WalletEventName["TokenVisibilityChanged"] = "Token Visibility Changed";
    WalletEventName["TestnetModeToggled"] = "Testnet Mode Toggled";
    WalletEventName["TransferCompleted"] = "Transfer Completed";
    WalletEventName["TransferSubmitted"] = "Transfer Submitted";
    WalletEventName["ViewRecoveryPhrase"] = "View Recovery Phrase";
    WalletEventName["WalletAdded"] = "Wallet Added";
    WalletEventName["WalletRemoved"] = "Wallet Removed";
})(WalletEventName || (WalletEventName = {}));
export const WALLET_TESTNET_CONFIG = {
    allowlistEvents: [
        WalletEventName.NetworkFilterSelected,
        WalletEventName.TransferCompleted,
        WalletEventName.TransferSubmitted,
        SharedEventName.PAGE_VIEWED,
        SwapEventName.SWAP_TRANSACTION_COMPLETED,
        SwapEventName.SWAP_TRANSACTION_FAILED,
        ExtensionEventName.DappRequest,
        WalletEventName.SwapSubmitted,
        WalletEventName.TransferSubmitted,
        WalletEventName.TransferCompleted,
    ],
    passthroughAllowlistEvents: [
        ExtensionEventName.DappConnect,
        ExtensionEventName.DappDisconnect,
        ExtensionEventName.DappDisconnectAll,
        ExtensionEventName.DappTroubleConnecting,
    ],
    aggregateEventName: WalletEventName.TestnetEvent,
};
//# sourceMappingURL=wallet.js.map