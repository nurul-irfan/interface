export const selectHasSkippedUnitagPrompt = (state) => state.behaviorHistory.hasSkippedUnitagPrompt;
export const selectHasCompletedUnitagsIntroModal = (state) => state.behaviorHistory.hasCompletedUnitagsIntroModal;
export const selectHasViewedWelcomeWalletCard = (state) => state.behaviorHistory.hasViewedWelcomeWalletCard;
export const selectBackupReminderLastSeenTs = (state) => state.behaviorHistory.backupReminderLastSeenTs;
export const selectHasUsedExplore = (state) => state.behaviorHistory.hasUsedExplore;
export const selectHasViewedOffRampTooltip = (state) => state.behaviorHistory.hasViewedOffRampTooltip;
export const selectHasViewedDappRequestBridgingBanner = (state, dappUrl) => { var _a, _b; return (_b = (_a = state.behaviorHistory.hasViewedDappRequestBridgingBanner) === null || _a === void 0 ? void 0 : _a[dappUrl]) !== null && _b !== void 0 ? _b : false; };
//# sourceMappingURL=selectors.js.map