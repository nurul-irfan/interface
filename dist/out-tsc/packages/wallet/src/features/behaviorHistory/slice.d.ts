/**
 * Used to store persisted info about a users interactions with UI.
 * We use this to show conditional UI, usually only for the first time a user views a new feature.
 */
export interface BehaviorHistoryState {
    hasSkippedUnitagPrompt: boolean;
    hasCompletedUnitagsIntroModal: boolean;
    hasViewedWelcomeWalletCard: boolean;
    hasUsedExplore: boolean;
    backupReminderLastSeenTs?: number;
    hasViewedOffRampTooltip: boolean;
    hasDismissedBridgingWarning?: boolean;
    hasViewedDappRequestBridgingBanner?: {
        [dappUrl: string]: boolean;
    };
}
export declare const initialBehaviorHistoryState: BehaviorHistoryState;
export declare const setHasSkippedUnitagPrompt: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "behaviorHistory/setHasSkippedUnitagPrompt">, setHasCompletedUnitagsIntroModal: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "behaviorHistory/setHasCompletedUnitagsIntroModal">, setHasViewedWelcomeWalletCard: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "behaviorHistory/setHasViewedWelcomeWalletCard">, setHasUsedExplore: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "behaviorHistory/setHasUsedExplore">, setBackupReminderLastSeenTs: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<number | undefined, "behaviorHistory/setBackupReminderLastSeenTs">, setHasViewedOffRampTooltip: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "behaviorHistory/setHasViewedOffRampTooltip">, setHasViewedDappRequestBridgingBanner: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    dappUrl: string;
    hasViewed: boolean;
}, "behaviorHistory/setHasViewedDappRequestBridgingBanner">, resetWalletBehaviorHistory: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"behaviorHistory/resetWalletBehaviorHistory">;
export declare const behaviorHistoryReducer: import("redux").Reducer<BehaviorHistoryState>;
//# sourceMappingURL=slice.d.ts.map