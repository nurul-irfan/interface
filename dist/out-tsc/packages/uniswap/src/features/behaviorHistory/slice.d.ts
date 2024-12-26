/**
 * Used to store persisted info about a users interactions with UI.
 * We use this to show conditional UI, usually only for the first time a user views a new feature.
 */
export interface UniswapBehaviorHistoryState {
    hasViewedBridgingBanner?: boolean;
    hasDismissedBridgingWarning?: boolean;
}
export declare const initialUniswapBehaviorHistoryState: UniswapBehaviorHistoryState;
export declare const setHasViewedBridgingBanner: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "uniswapBehaviorHistory/setHasViewedBridgingBanner">, setHasDismissedBridgingWarning: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "uniswapBehaviorHistory/setHasDismissedBridgingWarning">, resetUniswapBehaviorHistory: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"uniswapBehaviorHistory/resetUniswapBehaviorHistory">;
export declare const uniswapBehaviorHistoryReducer: import("redux").Reducer<UniswapBehaviorHistoryState>;
//# sourceMappingURL=slice.d.ts.map