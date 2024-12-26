import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CUSTOM_DEADLINE } from 'uniswap/src/features/transactions/swap/settings/useDeadlineSettings';
import { DEFAULT_PROTOCOL_OPTIONS, } from 'uniswap/src/features/transactions/swap/utils/protocols';
// The settingKey is used to identify the settings slice in the redux store
// TransactionSettings components are shared between swap and lp, but we want
// to keep the custom settings themselves separate.
export var TransactionSettingKey;
(function (TransactionSettingKey) {
    TransactionSettingKey["Swap"] = "swap";
    TransactionSettingKey["LP"] = "lp";
})(TransactionSettingKey || (TransactionSettingKey = {}));
export const initialTransactionSettingsState = {
    customDeadline: DEFAULT_CUSTOM_DEADLINE,
    selectedProtocols: DEFAULT_PROTOCOL_OPTIONS,
    isOnlyV2Allowed: false,
    slippageWarningModalSeen: false,
};
const slice = createSlice({
    name: 'transactionSettings',
    initialState: {
        [TransactionSettingKey.Swap]: initialTransactionSettingsState,
        [TransactionSettingKey.LP]: initialTransactionSettingsState,
    },
    reducers: {
        setTransactionSettings: (state, { payload }) => {
            if (!payload.settingKey) {
                throw new Error('TransactionSettingsState settingKey not provided');
            }
            const { settingKey, ...settings } = payload;
            Object.assign(state[settingKey], settings);
        },
    },
});
export const { setTransactionSettings } = slice.actions;
export const transactionSettingsReducer = slice.reducer;
//# sourceMappingURL=slice.js.map