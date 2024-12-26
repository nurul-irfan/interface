import { Account, BackupType } from 'wallet/src/features/wallet/accounts/types';
export declare enum EditAccountAction {
    AddBackupMethod = "AddBackupMethod",
    RemoveBackupMethod = "RemoveBackupMethod",
    Rename = "Rename",
    Remove = "Remove",
    TogglePushNotification = "TogglePushNotification",
    ToggleTestnetSettings = "ToggleTestnetSettings",
    UpdateLanguage = "UpdateLanguage"
}
interface EditParamsBase {
    type: EditAccountAction;
    address?: Address;
}
interface RenameParams extends EditParamsBase {
    type: EditAccountAction.Rename;
    newName: string;
}
interface RemoveParams extends EditParamsBase {
    type: EditAccountAction.Remove;
    accounts: Account[];
}
interface AddBackupMethodParams extends EditParamsBase {
    type: EditAccountAction.AddBackupMethod;
    backupMethod: BackupType;
}
interface RemoveBackupMethodParams extends EditParamsBase {
    type: EditAccountAction.RemoveBackupMethod;
    backupMethod: BackupType;
}
export interface TogglePushNotificationParams extends EditParamsBase {
    type: EditAccountAction.TogglePushNotification;
    enabled: boolean;
}
export interface ToggleTestnetSettingsParams extends EditParamsBase {
    type: EditAccountAction.ToggleTestnetSettings;
    enabled: boolean;
}
export interface UpdateLanguageParams extends EditParamsBase {
    type: EditAccountAction.UpdateLanguage;
    locale: string;
}
export type EditAccountParams = AddBackupMethodParams | RemoveBackupMethodParams | RenameParams | RemoveParams | TogglePushNotificationParams | ToggleTestnetSettingsParams | UpdateLanguageParams;
export declare const editAccountSagaName: string, editAccountSaga: () => Generator<unknown, any, unknown>, editAccountReducer: import("@reduxjs/toolkit/dist/createReducer").ReducerWithInitialState<import("wallet/src/utils/saga").SagaState>, editAccountActions: {
    trigger: import("@reduxjs/toolkit").ActionCreatorWithPayload<EditAccountParams, string>;
    cancel: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
    progress: import("@reduxjs/toolkit").ActionCreatorWithPayload<import("wallet/src/utils/saga").SagaStatus, string>;
    error: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
    reset: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
};
export {};
//# sourceMappingURL=editAccountSaga.d.ts.map