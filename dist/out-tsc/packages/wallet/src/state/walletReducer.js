import { combineReducers } from 'redux';
import { timingReducer } from 'uniswap/src/features/timing/slice';
import { uniswapPersistedStateList, uniswapReducers } from 'uniswap/src/state/uniswapReducer';
import { appearanceSettingsReducer } from 'wallet/src/features/appearance/slice';
import { behaviorHistoryReducer } from 'wallet/src/features/behaviorHistory/slice';
import { telemetryReducer } from 'wallet/src/features/telemetry/slice';
import { walletReducer } from 'wallet/src/features/wallet/slice';
export const walletReducers = {
    ...uniswapReducers,
    appearanceSettings: appearanceSettingsReducer,
    behaviorHistory: behaviorHistoryReducer,
    telemetry: telemetryReducer,
    timing: timingReducer,
    wallet: walletReducer,
};
// used to type RootState
export const walletRootReducer = combineReducers(walletReducers);
export const walletPersistedStateList = [
    ...uniswapPersistedStateList,
    'appearanceSettings',
    'behaviorHistory',
    'notifications',
    'telemetry',
    'wallet',
];
//# sourceMappingURL=walletReducer.js.map