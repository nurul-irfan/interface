import { createAction, createSlice } from '@reduxjs/toolkit';
import { FiatCurrency } from 'uniswap/src/features/fiatCurrency/constants';
import { Language } from 'uniswap/src/features/language/constants';
import { WALLET_TESTNET_CONFIG } from 'uniswap/src/features/telemetry/constants';
// eslint-disable-next-line no-restricted-imports
import { analytics } from 'utilities/src/telemetry/analytics/analytics';
export const initialUserSettingsState = {
    currentLanguage: Language.English,
    currentCurrency: FiatCurrency.UnitedStatesDollar,
    hideSmallBalances: true,
    hideSpamTokens: true,
    isTestnetModeEnabled: false,
};
const slice = createSlice({
    name: 'userSettings',
    initialState: initialUserSettingsState,
    reducers: {
        setHideSmallBalances: (state, { payload }) => {
            state.hideSmallBalances = payload;
        },
        setHideSpamTokens: (state, { payload }) => {
            state.hideSpamTokens = payload;
        },
        setCurrentLanguage: (state, action) => {
            state.currentLanguage = action.payload;
        },
        setCurrentFiatCurrency: (state, action) => {
            state.currentCurrency = action.payload;
        },
        /**
         * IMPORTANT: minimize and thoroughly vet every usage of this action so that testnets are **never** unintentionally toggled on
         */
        setIsTestnetModeEnabled: (state, { payload }) => {
            state.isTestnetModeEnabled = payload;
            analytics.setTestnetMode(payload, WALLET_TESTNET_CONFIG);
        },
        resetSettings: () => initialUserSettingsState,
    },
});
export const { setHideSmallBalances, setHideSpamTokens, setCurrentLanguage, setCurrentFiatCurrency, setIsTestnetModeEnabled, } = slice.actions;
export const updateLanguage = createAction('language/updateLanguage');
export const syncAppWithDeviceLanguage = () => updateLanguage(null);
export const userSettingsReducer = slice.reducer;
//# sourceMappingURL=slice.js.map