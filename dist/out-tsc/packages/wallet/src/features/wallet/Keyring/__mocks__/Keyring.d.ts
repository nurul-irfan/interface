import { providers, utils } from 'ethers';
import { IKeyring } from 'wallet/src/features/wallet/Keyring/Keyring';
declare class MockKeyring implements IKeyring {
    removeAllMnemonicsAndPrivateKeys(): Promise<boolean>;
    isUnlocked(): Promise<boolean>;
    unlock(p: string): Promise<boolean>;
    lock(): Promise<boolean>;
    checkPassword(_password: string): Promise<boolean>;
    changePassword(_newPassword: string): Promise<boolean>;
    removePassword(): Promise<boolean>;
    getMnemonicIds(): Promise<string[]>;
    importMnemonic(mnemonic: string): Promise<string>;
    removeMnemonic(mnemonicId: string): Promise<boolean>;
    retrieveMnemonicUnlocked(address: string): Promise<string | undefined>;
    generateAndStoreMnemonic(): Promise<string>;
    getAddressesForStoredPrivateKeys(): Promise<string[]>;
    generateAddressForMnemonic(mnemonic: string, derivationIndex: number): Promise<string>;
    generateAddressesForMnemonic(mnemonic: string, startDerivationIndex: number, endDerivationIndex: number): Promise<Array<string>>;
    generateAddressesForMnemonicId(mnemonicId: string, startDerivationIndex: number, endDerivationIndex: number): Promise<Array<string>>;
    generateAndStorePrivateKey(mnemonicId: string, derivationIndex: number): Promise<string>;
    removePrivateKey(address: string): Promise<boolean>;
    signTransactionForAddress(address: string, transaction: providers.TransactionRequest): Promise<string>;
    signMessageForAddress(address: string, message: string | utils.Bytes): Promise<string>;
    signTransactionHashForAddress(): Promise<string>;
    signHashForAddress(): Promise<string>;
}
export declare const Keyring: MockKeyring;
export {};
//# sourceMappingURL=Keyring.d.ts.map