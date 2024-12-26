import { createSlice } from '@reduxjs/toolkit';
export const initialUniswapBehaviorHistoryState = {
    hasViewedBridgingBanner: false,
    hasDismissedBridgingWarning: false,
};
const slice = createSlice({
    name: 'uniswapBehaviorHistory',
    initialState: initialUniswapBehaviorHistoryState,
    reducers: {
        setHasViewedBridgingBanner: (state, action) => {
            state.hasViewedBridgingBanner = action.payload;
        },
        setHasDismissedBridgingWarning: (state, action) => {
            state.hasDismissedBridgingWarning = action.payload;
        },
        // Should only be used for testing
        resetUniswapBehaviorHistory: (_state, _action) => {
            return initialUniswapBehaviorHistoryState;
        },
    },
});
export const { setHasViewedBridgingBanner, setHasDismissedBridgingWarning, resetUniswapBehaviorHistory } = slice.actions;
export const uniswapBehaviorHistoryReducer = slice.reducer;
//# sourceMappingURL=slice.js.map