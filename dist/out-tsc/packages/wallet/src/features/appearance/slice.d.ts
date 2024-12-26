import { WalletState } from 'wallet/src/state/walletReducer';
export declare enum AppearanceSettingType {
    System = "system",
    Light = "light",
    Dark = "dark"
}
export interface AppearanceSettingsState {
    selectedAppearanceSettings: AppearanceSettingType;
    hapticsEnabled: boolean;
}
export declare const initialAppearanceSettingsState: AppearanceSettingsState;
export declare const setSelectedAppearanceSettings: import("@reduxjs/toolkit").ActionCreatorWithPayload<AppearanceSettingType, "appearanceSettings/setSelectedAppearanceSettings">, resetSettings: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"appearanceSettings/resetSettings">, setHapticsUserSettingEnabled: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "appearanceSettings/setHapticsUserSettingEnabled">;
export declare const selectHapticsEnabled: (state: WalletState) => boolean;
export declare const appearanceSettingsReducer: import("redux").Reducer<AppearanceSettingsState>;
//# sourceMappingURL=slice.d.ts.map