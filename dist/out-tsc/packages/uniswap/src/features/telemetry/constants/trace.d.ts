import { InterfaceElementName, InterfaceModalName, InterfacePageName, InterfaceSectionName } from '@uniswap/analytics-events';
import { OnboardingCardLoggingName } from 'uniswap/src/features/telemetry/types';
export declare const ModalName: {
    readonly AccountBlocked: "account-blocked-modal";
    readonly AccountEdit: "account-edit-modal";
    readonly AccountEditLabel: "account-edit--label-modal";
    readonly AccountSwitcher: "account-switcher-modal";
    readonly AcrossRoutingInfo: "across-routing-info-modal";
    readonly AddLiquidity: "add-liquidity";
    readonly AddressClaim: "address-claim-modal";
    readonly AddressQR: "address-qr-modal";
    readonly AddWallet: "add-wallet-modal";
    readonly AppRatingModal: "app-rating-modal";
    readonly BackupReminder: "backup-reminder-modal";
    readonly BackupReminderWarning: "backup-reminder-warning-modal";
    readonly BlockedAddress: "blocked-address";
    readonly BridgingWarning: "bridging-warning-modal";
    readonly BuyNativeToken: "buy-native-token-modal";
    readonly CancelOrders: "cancel-orders-modal";
    readonly ChooseProfilePhoto: "choose-profile-photo-modal";
    readonly ChooseProviderModal: "choose-provider-modal";
    readonly ClaimFee: "claim-fee-modal";
    readonly CloudBackupInfo: "cloud-backup-info-modal";
    readonly ConnectionError: "connection-error-modal";
    readonly CreatePosition: "create-position-modal";
    readonly CurrencySearch: "currency-search-modal";
    readonly DappRequest: "dapp-request";
    readonly DownloadApp: "download-app-modal";
    readonly Dialog: "dialog-modal";
    readonly ENSClaimPeriod: "ens-claim-period";
    readonly EnterPassword: "enter-password-modal";
    readonly EstimatedTimeInfo: "estimated-time-info-modal";
    readonly ExchangeTransferModal: "exchange-transfer-modal";
    readonly Experiments: "experiments";
    readonly Explore: "explore-modal";
    readonly FaceIDWarning: "face-id-warning";
    readonly FeatureFlags: "feature-flags-modal";
    readonly FeeClaim: "fee-claim-modal";
    readonly FeeTierSearch: "fee-tier-search-modal";
    readonly FiatCurrencySelector: "fiat-currency-selector";
    readonly FiatOnramp: "fiat-onramp-modal";
    readonly FiatOnRampAggregator: "fiat-on-ramp-aggregator";
    readonly FiatOnRampCountryList: "fiat-on-ramp-country-list";
    readonly FiatOnRampTokenSelector: "fiat-on-ramp-token-selector";
    readonly ForceUpgradeModal: "force-upgrade-modal";
    readonly ForgotPassword: "forgot-password";
    readonly FOTInfo: "fee-on-transfer";
    readonly FundWallet: "fund-wallet";
    readonly HiddenNFTInfoModal: "hidden-nft-info-modal";
    readonly HiddenTokenInfoModal: "hidden-token-info-modal";
    readonly Hook: "hook";
    readonly KoreaCexTransferInfoModal: "korea-cex-transfer-info-modal";
    readonly LanguageSelector: "language-selector-modal";
    readonly Legal: "legal";
    readonly MigrateLiquidity: "migrate-liquidity";
    readonly NewAddressWarning: "new-address-warning-modal";
    readonly NetworkFeeInfo: "network-fee-info";
    readonly NetworkSelector: "network-selector-modal";
    readonly NftCollection: "nft-collection";
    readonly OffchainActivity: "offchain-activity-modal";
    readonly OnDeviceRecoveryConfirmation: "on-device-recovery-confirmation";
    readonly OtpInputExpired: "otp-input-expired";
    readonly OtpScanInput: "otp-scan-input";
    readonly PriceImpact: "price-impact-modal";
    readonly PrivacyChoices: "privacy-choices-modal";
    readonly QRCodeNetworkInfo: "qr-code-network-info";
    readonly QueuedOrderModal: "queued-order-modal";
    readonly ReceiveCryptoModal: "receive-crypto-modal";
    readonly RecipientSelectErc20Warning: "recipient-select-erc20-warning";
    readonly RecipientSelectNewWarning: "recipient-select-new-warning";
    readonly RecipientSelectSelfSendWarning: "recipient-select-self-send-warning";
    readonly RecipientSelectSmartContractWarning: "recipient-select-smart-contract-warning";
    readonly RecipientSelectViewOnlyWarning: "recipient-select-view-only-warning";
    readonly RecoverySpeedBump: "recovery-speed-bump";
    readonly RemoveLiquidity: "remove-liquidity";
    readonly RemoveSeedPhraseWarningModal: "remove-seed-phrase-warning-modal";
    readonly RemoveWallet: "remove-wallet-modal";
    readonly ResetCreatePositionsForm: "reset-create-positions-form";
    readonly RestoreWallet: "restore-wallet-modal";
    readonly Scantastic: "scantastic";
    readonly ScreenshotWarning: "screenshot-warning";
    readonly SeedPhraseWarningModal: "seed-phrase-warning-modal";
    readonly Send: "send-modal";
    readonly SendReview: "send-review-modal";
    readonly SendWarning: "send-warning-modal";
    readonly SlippageInfo: "slippage-info-modal";
    readonly SlippageWarningModal: "slippage-warning-modal";
    readonly StorageWarning: "storage-warning-modal";
    readonly Swap: "swap-modal";
    readonly SwapError: "swap-error-modal";
    readonly SwapProtection: "swap-protection-modal";
    readonly SwapReview: "swap-review-modal";
    readonly SwapSettings: "swap-settings-modal";
    readonly SwapWarning: "swap-warning-modal";
    readonly TestnetMode: "testnet-mode-modal";
    readonly TestnetSwitchModal: "testnet-switch-modal";
    readonly TokenSafety: "token-safety-modal";
    readonly TokenSelector: "token-selector";
    readonly TokenWarning: "token-warning";
    readonly TokenWarningModal: "token-warning-modal";
    readonly TooltipContent: "tooltip-content";
    readonly TransactionActions: "transaction-actions";
    readonly TransactionConfirmation: "transaction-confirmation-modal";
    readonly TransactionDetails: "transaction-details";
    readonly UkDisclaimer: "uk-disclaimer-modal";
    readonly UniconsDevModal: "unicons-dev-modal";
    readonly UniconsV2: "unicons-v2-intro-modal";
    readonly UniswapXInfo: "uniswapx-info-modal";
    readonly UnitagsChange: "unitags-change-modal";
    readonly UnitagsChangeConfirm: "unitags-change-confirm-modal";
    readonly UnitagsDelete: "unitags-delete-modal";
    readonly UnitagsIntro: "unitags-intro-modal";
    readonly UniWalletConnect: "uniwallet-connect-modal";
    readonly UnsupportedCurrency: "unsupported-currency-modal";
    readonly UwULinkErc20SendModal: "uwulink-erc20-send-modal";
    readonly ViewOnlyExplainer: "view-only-explainer-modal";
    readonly ViewSeedPhraseWarning: "view-seed-phrase-warning";
    readonly WalletConnectScan: "wallet-connect-scan-modal";
    readonly WCDappConnectedNetworks: "wc-dapp-connected-networks-modal";
    readonly WCPendingConnection: "wc-pending-connection-modal";
    readonly WCSignRequest: "wc-sign-request-modal";
    readonly WCViewOnlyWarning: "wc-view-only-warning-modal";
};
export type ModalNameType = (typeof ModalName)[keyof typeof ModalName] | InterfaceModalName;
/**
 * Possible names for the telement property in TraceContext
 */
export declare const ElementName: {
    readonly AcceptNewRate: "accept-new-rate";
    readonly AccountCard: "account-card";
    readonly AddManualBackup: "add-manual-backup";
    readonly AddViewOnlyWallet: "add-view-only-wallet";
    readonly AddCloudBackup: "add-cloud-backup";
    readonly AddHook: "add-hook";
    readonly AlreadyHaveWalletSignIn: "already-have-wallet-sign-in";
    readonly BackButton: "back-button";
    readonly Buy: "buy";
    readonly BuyNativeTokenButton: "buy-native-token-button";
    readonly BridgeNativeTokenButton: "bridge-native-token-button";
    readonly Cancel: "cancel";
    readonly ChainEthereum: "chain-ethereum";
    readonly ChainSepolia: "chain-sepolia";
    readonly ChainOptimism: "chain-optimism";
    readonly ChainArbitrum: "chain-arbitrum";
    readonly ChainPolygon: "chain-polygon";
    readonly ChainCelo: "chain-celo";
    readonly ChainBNB: "chain-bnb";
    readonly ChainAvalanche: "chain-avalanche";
    readonly ChainBase: "chain-base";
    readonly ChainBlast: "chain-blast";
    readonly ChainMonadTestnet: "chain-monad-testnet";
    readonly ChainWorldChain: "chain-world-chain";
    readonly ChainZora: "chain-zora";
    readonly ChainZkSync: "chain-zksync";
    readonly ChooseInputToken: "choose-input-token";
    readonly ChooseOutputToken: "choose-output-token";
    readonly Confirm: "confirm";
    readonly Continue: "continue";
    readonly Copy: "copy";
    readonly CopyAddress: "copy-address";
    readonly CreateAccount: "create-account";
    readonly EmptyStateBuy: "empty-state-buy";
    readonly EmptyStateImport: "empty-state-get-import";
    readonly EmptyStateReceive: "empty-state-receive";
    readonly Enable: "enable";
    readonly EtherscanView: "etherscan-view";
    readonly ExtensionPopupOpenButton: "extension-popup-open-button";
    readonly FiatOnRampTokenSelector: "fiat-on-ramp-token-selector";
    readonly FiatOnRampWidgetButton: "fiat-on-ramp-widget-button";
    readonly FiatOnRampCountryPicker: "fiat-on-ramp-country-picker";
    readonly GetHelp: "get-help";
    readonly ImportAccount: "import-account";
    readonly InlineWarningCardCheckbox: "inline-warning-card-checkbox";
    readonly LimitOrderButton: "limit-order-button";
    readonly MaybeLaterButton: "maybe-later-button";
    readonly MoonpayExplorerView: "moonpay-explorer-view";
    readonly NetworkButton: "network-button";
    readonly Next: "next";
    readonly NftItem: "nft-item";
    readonly OK: "ok";
    readonly OnboardingIntroCardFundWallet: "onboarding-intro-card-fund-wallet";
    readonly OnboardingImportBackup: "onboarding-import-backup";
    readonly OnboardingImportSeedPhrase: "onboarding-import-seed-phrase";
    readonly OnDeviceRecoveryImportOther: "on-device-recovery-import-other";
    readonly OnDeviceRecoveryWallet: "on-device-recovery-wallet";
    readonly OnDeviceRecoveryModalCancel: "on-device-recovery-modal-cancel";
    readonly OnDeviceRecoveryModalConfirm: "on-device-recovery-modal-confirm";
    readonly OpenCameraRoll: "open-camera-roll";
    readonly OpenNftsList: "open-nfts-list";
    readonly QRCodeModalToggle: "qr-code-modal-toggle";
    readonly Receive: "receive";
    readonly RecoveryHelpButton: "recovery-help-button";
    readonly Remove: "remove";
    readonly RestoreFromCloud: "restore-from-cloud";
    readonly Sell: "sell";
    readonly Send: "send";
    readonly SetMaxInput: "set-max-input";
    readonly SetMaxOutput: "set-max-output";
    readonly Skip: "skip";
    readonly Swap: "swap";
    readonly SwapFormHeader: "swap-form-header";
    readonly SwapReview: "swap-review";
    readonly SendReview: "send-review";
    readonly SwapRoutingPreferenceDefault: "swap-routing-preference-default";
    readonly SwapRoutingPreferenceUniswapX: "swap-routing-preference-UniswapX";
    readonly SwapRoutingPreferenceV2: "swap-routing-preference-v2";
    readonly SwapRoutingPreferenceV3: "swap-routing-preference-v3";
    readonly SwapRoutingPreferenceV4: "swap-routing-preference-v4";
    readonly SwitchCurrenciesButton: "switch-currencies-button";
    readonly TimeFrame1H: "time-frame-1H";
    readonly TimeFrame1D: "time-frame-1D";
    readonly TimeFrame1W: "time-frame-1W";
    readonly TimeFrame1M: "time-frame-1M";
    readonly TimeFrame1Y: "time-frame-1Y";
    readonly TimeFrameAll: "time-frame-All";
    readonly TokenAddress: "token-address";
    readonly TokenInputSelector: "token-input-selector";
    readonly TokenItem: "token-item";
    readonly TokenLinkEtherscan: "token-link-etherscan";
    readonly TokenLinkTwitter: "token-link-twitter";
    readonly TokenLinkWebsite: "token-link-website";
    readonly TokenOutputSelector: "token-output-selector";
    readonly TokenWarningCard: "token-warning-card";
    readonly Unwrap: "unwrap";
    readonly WalletCard: "wallet-card";
    readonly WalletConnectScan: "wallet-connect-scan";
    readonly WalletQRCode: "wallet-qr-code";
    readonly Wrap: "wrap";
};
export type ElementNameType = (typeof ElementName)[keyof typeof ElementName] | InterfaceElementName | OnboardingCardLoggingName;
/**
 * Possible names for the section property in TraceContext
 */
export declare const SectionName: {
    readonly CurrencyInputPanel: "currency-input-panel";
    readonly CurrencyOutputPanel: "currency-output-panel";
    readonly ExploreFavoriteTokensSection: "explore-favorite-tokens-section";
    readonly ExploreSearch: "explore-search";
    readonly ExploreTopTokensSection: "explore-top-tokens-section";
    readonly HomeActivityTab: "home-activity-tab";
    readonly HomeExploreTab: "home-explore-tab";
    readonly HomeFeedTab: "home-feed-tab";
    readonly HomeNFTsTab: "home-nfts-tab";
    readonly HomeTokensTab: "home-tokens-tab";
    readonly ImportAccountForm: "import-account-form";
    readonly ProfileActivityTab: "profile-activity-tab";
    readonly ProfileNftsTab: "profile-nfts-tab";
    readonly ProfileTokensTab: "profile-tokens-tab";
    readonly SwapForm: "swap-form";
    readonly SwapPending: "swap-pending";
    readonly SwapReview: "swap-review";
    readonly TokenSelector: "token-selector";
    readonly TokenDetails: "token-details";
    readonly SendForm: "transfer-form";
    readonly SendReview: "transfer-review";
    readonly SendRecipientSelectFullScreen: "send-recipient-select";
    readonly ChainSelector: "chain-selector";
    readonly CreatePositionDepositStep: "create-position-deposit-step";
    readonly CreatePositionPriceRangeStep: "create-position-price-range-step";
    readonly CreatePositionSelectTokensStep: "create-position-select-tokens-step";
};
export type SectionNameType = (typeof SectionName)[keyof typeof SectionName] | InterfaceSectionName;
export declare const InterfacePageNameLocal: {
    Send: string;
    Limit: string;
    Buy: string;
    Positions: string;
    PositionDetails: string;
    CreatePosition: string;
    MigrateV2: string;
    MigrateV2Pair: string;
    MigrateV3: string;
};
export type InterfacePageNameType = (typeof InterfacePageNameLocal)[keyof typeof InterfacePageNameLocal] | InterfacePageName;
//# sourceMappingURL=trace.d.ts.map