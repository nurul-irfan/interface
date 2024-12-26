import { AccountType } from 'uniswap/src/features/accounts/types';
import { BackupType, ReadOnlyAccount, SignerMnemonicAccount, WalletAccountFields } from 'wallet/src/features/wallet/accounts/types';
/**
 * Base fixtures
 */
export declare const accountBaseFields: {
    <O extends Partial<WalletAccountFields>>(overrides: O): Omit<{
        type: AccountType;
        address: string;
        timeImportedMs: number;
        name: string;
    }, keyof O> & O;
    (): {
        type: AccountType;
        address: string;
        timeImportedMs: number;
        name: string;
    };
};
export declare const signerMnemonicAccount: {
    <O extends Partial<SignerMnemonicAccount>>(overrides: O): Omit<{
        type: AccountType.SignerMnemonic;
        derivationIndex: number;
        mnemonicId: string;
        backups: BackupType[];
        address: string;
        timeImportedMs: number;
        name: string;
    }, keyof O> & O;
    (): {
        type: AccountType.SignerMnemonic;
        derivationIndex: number;
        mnemonicId: string;
        backups: BackupType[];
        address: string;
        timeImportedMs: number;
        name: string;
    };
};
export declare const readOnlyAccount: {
    <O extends Partial<ReadOnlyAccount>>(overrides: O): Omit<{
        type: AccountType.Readonly;
        address: string;
        timeImportedMs: number;
        name: string;
    }, keyof O> & O;
    (): {
        type: AccountType.Readonly;
        address: string;
        timeImportedMs: number;
        name: string;
    };
};
/**
 * Static fixtures
 */
export declare const ACCOUNT: Omit<{
    type: AccountType.SignerMnemonic;
    derivationIndex: number;
    mnemonicId: string;
    backups: BackupType[];
    address: string;
    timeImportedMs: number;
    name: string;
}, "type" | "address" | "derivationIndex" | "mnemonicId" | "name" | "backups" | "timeImportedMs"> & {
    type: AccountType.SignerMnemonic;
    address: string;
    derivationIndex: number;
    name: string;
    timeImportedMs: number;
    mnemonicId: string;
    backups: BackupType.Cloud[];
};
export declare const ACCOUNT2: Omit<{
    type: AccountType.SignerMnemonic;
    derivationIndex: number;
    mnemonicId: string;
    backups: BackupType[];
    address: string;
    timeImportedMs: number;
    name: string;
}, "type" | "address" | "derivationIndex" | "mnemonicId" | "name" | "backups" | "timeImportedMs"> & {
    type: AccountType.SignerMnemonic;
    address: string;
    derivationIndex: number;
    name: string;
    timeImportedMs: number;
    mnemonicId: string;
    backups: BackupType.Manual[];
};
export declare const ACCOUNT3: Omit<{
    type: AccountType.SignerMnemonic;
    derivationIndex: number;
    mnemonicId: string;
    backups: BackupType[];
    address: string;
    timeImportedMs: number;
    name: string;
}, "type" | "address" | "derivationIndex" | "mnemonicId" | "name" | "backups" | "timeImportedMs"> & {
    type: AccountType.SignerMnemonic;
    address: string;
    derivationIndex: number;
    name: string;
    timeImportedMs: number;
    mnemonicId: string;
    backups: BackupType.Manual[];
};
//# sourceMappingURL=accounts.d.ts.map