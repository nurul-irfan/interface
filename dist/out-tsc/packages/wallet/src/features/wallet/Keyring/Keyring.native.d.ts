declare module 'react-native' {
    interface NativeModulesStatic {
        RNEthersRS: IKeyring;
    }
}
import { IKeyring } from 'wallet/src/features/wallet/Keyring/Keyring';
/**
 * Simple wrapper around RNEthersRS
 */
declare class NativeKeyring implements IKeyring {
    removeAllMnemonicsAndPrivateKeys(): Promise<boolean>;
    isUnlocked(): Promise<boolean>;
    removeMnemonic(mnemonicId: string): Promise<boolean>;
    removePrivateKey(address: string): Promise<boolean>;
    removePassword(): Promise<boolean>;
    unlock(): Promise<boolean>;
    lock(): Promise<boolean>;
    checkPassword(_password: string): Promise<boolean>;
    changePassword(_newPassword: string): Promise<boolean>;
    getMnemonicIds(): Promise<string[]>;
    importMnemonic(mnemonic: string): Promise<string>;
    retrieveMnemonicUnlocked(_address: string): Promise<string>;
    generateAndStoreMnemonic(): Promise<string>;
    getAddressesForStoredPrivateKeys(): Promise<string[]>;
    generateAddressForMnemonic(mnemonic: string, derivationIndex: number): Promise<string>;
    generateAddressesForMnemonic(_mnemonicId: string, _startIndex: number, _stopIndex: number): Promise<string[]>;
    generateAddressesForMnemonicId(_mnemonicId: string, _startIndex: number, _stopIndex: number): Promise<string[]>;
    generateAndStorePrivateKey(mnemonicId: string, derivationIndex: number): Promise<string>;
    signTransactionHashForAddress(address: string, hash: string, chainId: number): Promise<string>;
    signMessageForAddress(address: string, message: string): Promise<string>;
    signHashForAddress(address: string, hash: string, chainId: number): Promise<string>;
}
export declare const Keyring: NativeKeyring;
export {};
//# sourceMappingURL=Keyring.native.d.ts.map