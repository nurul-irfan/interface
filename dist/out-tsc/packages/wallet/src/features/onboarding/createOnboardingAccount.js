import dayjs from 'dayjs';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { Keyring } from 'wallet/src/features/wallet/Keyring/Keyring';
/**
 * Takes a list of existing mnemonic accounts to use as reference for pulling the next derivation index
 */
export const createOnboardingAccount = async (sortedMnemonicAccounts, password) => {
    const { nextDerivationIndex, mnemonicId, existingBackups } = await getNewAccountParams(sortedMnemonicAccounts, password);
    const address = await Keyring.generateAndStorePrivateKey(mnemonicId, nextDerivationIndex);
    return {
        type: AccountType.SignerMnemonic,
        address,
        timeImportedMs: dayjs().valueOf(),
        derivationIndex: nextDerivationIndex,
        mnemonicId,
        backups: existingBackups,
        name: `Wallet ${nextDerivationIndex + 1}`,
    };
};
export async function getNewAccountParams(sortedAccounts, password) {
    if (sortedAccounts.length === 0 || !sortedAccounts[0]) {
        const mnemonicId = await Keyring.generateAndStoreMnemonic(password);
        return { nextDerivationIndex: 0, mnemonicId };
    }
    return {
        nextDerivationIndex: getNextDerivationIndex(sortedAccounts),
        mnemonicId: sortedAccounts[0].mnemonicId,
        existingBackups: sortedAccounts[0].backups,
    };
}
export function getNextDerivationIndex(sortedAccounts) {
    // if there is a missing index in the series (0, 1, _, 3), return this missing index
    let nextIndex = 0;
    for (const account of sortedAccounts) {
        if (account.derivationIndex !== nextIndex) {
            return Math.min(account.derivationIndex, nextIndex);
        }
        nextIndex += 1;
    }
    // if all exist, nextDerivation = sortedMnemonicAccounts.length + 1
    return nextIndex;
}
//# sourceMappingURL=createOnboardingAccount.js.map