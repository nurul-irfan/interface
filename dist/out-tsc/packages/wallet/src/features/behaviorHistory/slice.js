import { createSlice } from '@reduxjs/toolkit';
export const initialBehaviorHistoryState = {
    hasSkippedUnitagPrompt: false,
    hasCompletedUnitagsIntroModal: false,
    hasViewedWelcomeWalletCard: false,
    hasUsedExplore: false,
    backupReminderLastSeenTs: undefined,
    hasViewedOffRampTooltip: false,
    hasViewedDappRequestBridgingBanner: {},
};
const slice = createSlice({
    name: 'behaviorHistory',
    initialState: initialBehaviorHistoryState,
    reducers: {
        setHasSkippedUnitagPrompt: (state, action) => {
            state.hasSkippedUnitagPrompt = action.payload;
        },
        setHasCompletedUnitagsIntroModal: (state, action) => {
            state.hasCompletedUnitagsIntroModal = action.payload;
        },
        setHasViewedWelcomeWalletCard: (state, action) => {
            state.hasViewedWelcomeWalletCard = action.payload;
        },
        setHasUsedExplore: (state, action) => {
            state.hasUsedExplore = action.payload;
        },
        setBackupReminderLastSeenTs: (state, action) => {
            state.backupReminderLastSeenTs = action.payload;
        },
        setHasViewedOffRampTooltip: (state, action) => {
            state.hasViewedOffRampTooltip = action.payload;
        },
        setHasViewedDappRequestBridgingBanner: (state, action) => {
            var _a;
            (_a = state.hasViewedDappRequestBridgingBanner) !== null && _a !== void 0 ? _a : (state.hasViewedDappRequestBridgingBanner = {});
            state.hasViewedDappRequestBridgingBanner[action.payload.dappUrl] = action.payload.hasViewed;
        },
        // Should only be used for testing
        resetWalletBehaviorHistory: (_state, _action) => {
            return {
                ...initialBehaviorHistoryState,
            };
        },
    },
});
export const { setHasSkippedUnitagPrompt, setHasCompletedUnitagsIntroModal, setHasViewedWelcomeWalletCard, setHasUsedExplore, setBackupReminderLastSeenTs, setHasViewedOffRampTooltip, setHasViewedDappRequestBridgingBanner, resetWalletBehaviorHistory, } = slice.actions;
export const behaviorHistoryReducer = slice.reducer;
//# sourceMappingURL=slice.js.map