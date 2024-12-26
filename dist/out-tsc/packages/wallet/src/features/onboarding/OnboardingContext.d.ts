import { PropsWithChildren } from 'react';
import { UnitagClaim } from 'uniswap/src/features/unitags/types';
import { ImportType } from 'uniswap/src/types/onboarding';
import { ExtensionOnboardingFlow } from 'uniswap/src/types/screens/extension';
import { BackupType, SignerMnemonicAccount } from 'wallet/src/features/wallet/accounts/types';
export declare const NUMBER_OF_WALLETS_TO_GENERATE = 10;
interface ImportMnemonicArgs {
    mnemonic: string;
    password?: string;
    allowOverwrite?: boolean;
}
interface GenerateImportedAccountsArgs {
    mnemonicId: string;
    backupType: BackupType.Cloud | BackupType.Manual;
}
export interface OnboardingContext {
    importMnemonicToKeychain: ({ mnemonic, password, allowOverwrite }: ImportMnemonicArgs) => Promise<void>;
    generateOnboardingAccount: (password?: string) => Promise<void>;
    generateInitialAddresses: () => Promise<void>;
    generateAdditionalAddresses: () => Promise<void>;
    generateImportedAccounts: ({ mnemonicId, backupType }: GenerateImportedAccountsArgs) => Promise<void>;
    generateAccountsAndImportAddresses: (selectedAddresses: string[]) => Promise<SignerMnemonicAccount[] | undefined>;
    addBackupMethod: (backupMethod: BackupType) => void;
    hasBackup: (address: string, backupType?: BackupType) => boolean | undefined;
    enableNotifications: () => void;
    selectImportedAccounts: (accountAddresses: string[]) => Promise<SignerMnemonicAccount[]>;
    finishOnboarding: ({ importType, accounts, extensionOnboardingFlow, createdFromOnboardingRedesign, }: {
        importType: ImportType;
        accounts?: SignerMnemonicAccount[];
        extensionOnboardingFlow?: ExtensionOnboardingFlow;
        createdFromOnboardingRedesign?: boolean;
    }) => Promise<void>;
    getAllOnboardingAccounts: () => SignerMnemonicAccount[];
    getOnboardingAccount: () => SignerMnemonicAccount | undefined;
    getOnboardingAccountAddress: () => string | undefined;
    getGeneratedAddresses: () => Promise<string[] | undefined>;
    getImportedAccounts: () => SignerMnemonicAccount[] | undefined;
    getOnboardingOrImportedAccount: () => SignerMnemonicAccount | undefined;
    setRecoveredImportedAccounts: (accounts: SignerMnemonicAccount[]) => void;
    getImportedAccountsAddresses: () => string[] | undefined;
    getUnitagClaim: () => UnitagClaim | undefined;
    addUnitagClaim: (unitag: UnitagClaim) => void;
    addOnboardingAccountMnemonic: (mnemonic: string[]) => void;
    getOnboardingAccountMnemonic: () => string[] | undefined;
    getOnboardingAccountMnemonicString: () => string | undefined;
    retrieveOnboardingAccountMnemonic: () => Promise<void>;
    setPendingWalletName: (walletName: string) => void;
    resetOnboardingContextData: () => void;
}
/**
 * Context responsible for persisting and modifying pending accounts during onboarding flow.
 * It's used for both creating  new accounts and importing existing accounts using mnemonics
 * or cloud. It is also reponsible for finalizing onboarding flow by adding active accounts
 * to redux store.
 */
export declare function OnboardingContextProvider({ children }: PropsWithChildren<unknown>): JSX.Element;
export declare function useOnboardingContext(): OnboardingContext;
/**
 * Initiates pending account when there is no already existing one.
 * Extracted into hook for reusability.
 */
export declare function useCreateOnboardingAccountIfNone(): void;
/**
 * Triggers onboarding finish on screen mount for extension only
 * Extracted into hook for reusability.
 */
export declare function useFinishOnboarding(callback?: () => void, extensionOnboardingFlow?: ExtensionOnboardingFlow, pendingClaim?: boolean): void;
export {};
//# sourceMappingURL=OnboardingContext.d.ts.map