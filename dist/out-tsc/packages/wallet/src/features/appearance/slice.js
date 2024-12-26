import { createSlice } from '@reduxjs/toolkit';
export var AppearanceSettingType;
(function (AppearanceSettingType) {
    AppearanceSettingType["System"] = "system";
    AppearanceSettingType["Light"] = "light";
    AppearanceSettingType["Dark"] = "dark";
})(AppearanceSettingType || (AppearanceSettingType = {}));
export const initialAppearanceSettingsState = {
    selectedAppearanceSettings: AppearanceSettingType.System,
    hapticsEnabled: true,
};
const slice = createSlice({
    name: 'appearanceSettings',
    initialState: initialAppearanceSettingsState,
    reducers: {
        setSelectedAppearanceSettings: (state, action) => {
            state.selectedAppearanceSettings = action.payload;
        },
        resetSettings: () => initialAppearanceSettingsState,
        setHapticsUserSettingEnabled: (state, { payload }) => {
            state.hapticsEnabled = payload;
        },
    },
});
export const { setSelectedAppearanceSettings, resetSettings, setHapticsUserSettingEnabled } = slice.actions;
export const selectHapticsEnabled = (state) => state.appearanceSettings.hapticsEnabled;
export const appearanceSettingsReducer = slice.reducer;
//# sourceMappingURL=slice.js.map