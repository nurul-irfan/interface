import { all, call, put, select } from 'typed-redux-saga';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { WalletEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { logger } from 'utilities/src/logger/logger';
import { unique } from 'utilities/src/primitives/array';
import { Keyring } from 'wallet/src/features/wallet/Keyring/Keyring';
import { selectAccounts } from 'wallet/src/features/wallet/selectors';
import { editAccount as editInStore, removeAccounts as removeAccountsInStore } from 'wallet/src/features/wallet/slice';
import { createMonitoredSaga } from 'wallet/src/utils/saga';
export var EditAccountAction;
(function (EditAccountAction) {
    EditAccountAction["AddBackupMethod"] = "AddBackupMethod";
    EditAccountAction["RemoveBackupMethod"] = "RemoveBackupMethod";
    EditAccountAction["Rename"] = "Rename";
    EditAccountAction["Remove"] = "Remove";
    EditAccountAction["TogglePushNotification"] = "TogglePushNotification";
    EditAccountAction["ToggleTestnetSettings"] = "ToggleTestnetSettings";
    EditAccountAction["UpdateLanguage"] = "UpdateLanguage";
    // May need a reorder action here eventually
})(EditAccountAction || (EditAccountAction = {}));
function* editAccount(params) {
    const { type, address } = params;
    if (type === EditAccountAction.Remove) {
        yield* call(removeAccounts, params);
        return;
    }
    if (!address) {
        throw new Error('Address is required for editAccount actions other than Remove');
    }
    const accounts = yield* select(selectAccounts);
    const account = accounts[address];
    if (!account) {
        throw new Error(`No account found for ${address}`);
    }
    switch (type) {
        case EditAccountAction.Rename:
            yield* call(renameAccount, params, account);
            break;
        case EditAccountAction.AddBackupMethod:
            yield* call(addBackupMethod, params, account);
            break;
        case EditAccountAction.RemoveBackupMethod:
            yield* call(removeBackupMethod, params, account);
            break;
        default:
            break;
    }
    logger.debug('editAccountSaga', 'editAccount', 'Account updated:', address);
}
function* renameAccount(params, account) {
    const { newName } = params;
    logger.debug('editAccountSaga', 'renameAccount', 'Renaming account', account.address, 'to ', newName);
    yield* put(editInStore({
        address: account.address,
        updatedAccount: {
            ...account,
            name: newName,
        },
    }));
}
function* removeAccounts(params) {
    const { accounts } = params;
    const addresses = accounts.map((a) => a.address);
    logger.debug('editAccountSaga', 'removeAccounts', 'Removing accounts', addresses);
    yield* put(removeAccountsInStore(addresses));
    yield* all(addresses.map((address) => call([Keyring, Keyring.removePrivateKey], address)));
}
// Adds the backup to all accounts that share the same seed phrase
function* addBackupMethod(params, account) {
    var _a;
    if (account.type !== AccountType.SignerMnemonic) {
        return;
    }
    const { backupMethod } = params;
    const accounts = yield* select(selectAccounts);
    const mnemonicAccounts = Object.values(accounts).filter((a) => a.type === AccountType.SignerMnemonic && a.mnemonicId === account.mnemonicId);
    const updatedBackups = unique([...((_a = account.backups) !== null && _a !== void 0 ? _a : []), backupMethod]);
    yield* all(mnemonicAccounts.map((mnemonicAccount) => {
        return put(editInStore({
            address: mnemonicAccount.address,
            updatedAccount: {
                ...mnemonicAccount,
                backups: updatedBackups,
            },
        }));
    }));
    sendAnalyticsEvent(WalletEventName.BackupMethodAdded, {
        backupMethodType: backupMethod,
        newBackupCount: updatedBackups.length,
    });
    logger.debug('editAccountSaga', 'addBackupMethod', 'Adding backup method', mnemonicAccounts.map((a) => a.address));
}
// Removes the backup method from all accounts that share the same seed phrase
function* removeBackupMethod(params, account) {
    var _a, _b;
    if (account.type !== AccountType.SignerMnemonic) {
        return;
    }
    const { backupMethod } = params;
    const accounts = yield* select(selectAccounts);
    const mnemonicAccounts = Object.values(accounts).filter((a) => a.type === AccountType.SignerMnemonic && a.mnemonicId === account.mnemonicId);
    const updatedBackups = (_a = account.backups) === null || _a === void 0 ? void 0 : _a.filter((backup) => backup !== backupMethod);
    yield* all(mnemonicAccounts.map((mnemonicAccount) => {
        return put(editInStore({
            address: mnemonicAccount.address,
            updatedAccount: {
                ...mnemonicAccount,
                backups: updatedBackups,
            },
        }));
    }));
    sendAnalyticsEvent(WalletEventName.BackupMethodRemoved, {
        backupMethodType: backupMethod,
        newBackupCount: (_b = updatedBackups === null || updatedBackups === void 0 ? void 0 : updatedBackups.length) !== null && _b !== void 0 ? _b : 0,
    });
    logger.debug('editAccountSaga', 'removeBackupMethod', 'Removing backup method', mnemonicAccounts.map((a) => a.address));
}
export const { name: editAccountSagaName, wrappedSaga: editAccountSaga, reducer: editAccountReducer, actions: editAccountActions, } = createMonitoredSaga(editAccount, 'editAccount');
//# sourceMappingURL=editAccountSaga.js.map