import { WalletState } from 'wallet/src/state/walletReducer';
export declare const selectHasSkippedUnitagPrompt: (state: WalletState) => boolean;
export declare const selectHasCompletedUnitagsIntroModal: (state: WalletState) => boolean;
export declare const selectHasViewedWelcomeWalletCard: (state: WalletState) => boolean;
export declare const selectBackupReminderLastSeenTs: (state: WalletState) => number | undefined;
export declare const selectHasUsedExplore: (state: WalletState) => boolean;
export declare const selectHasViewedOffRampTooltip: (state: WalletState) => boolean;
export declare const selectHasViewedDappRequestBridgingBanner: (state: WalletState, dappUrl: string) => boolean;
//# sourceMappingURL=selectors.d.ts.map