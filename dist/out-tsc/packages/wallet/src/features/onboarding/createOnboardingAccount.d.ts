import { BackupType, SignerMnemonicAccount } from 'wallet/src/features/wallet/accounts/types';
/**
 * Takes a list of existing mnemonic accounts to use as reference for pulling the next derivation index
 */
export declare const createOnboardingAccount: (sortedMnemonicAccounts: SignerMnemonicAccount[], password?: string) => Promise<SignerMnemonicAccount>;
export declare function getNewAccountParams(sortedAccounts: SignerMnemonicAccount[], password?: string): Promise<{
    nextDerivationIndex: number;
    mnemonicId: string;
    existingBackups?: BackupType[];
}>;
export declare function getNextDerivationIndex(sortedAccounts: SignerMnemonicAccount[]): number;
//# sourceMappingURL=createOnboardingAccount.d.ts.map