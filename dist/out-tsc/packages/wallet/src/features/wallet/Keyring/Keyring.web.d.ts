import { IKeyring } from 'wallet/src/features/wallet/Keyring/Keyring';
import { PersistedStorage } from 'wallet/src/utils/persistedStorage';
/**
 * Provides the generation, storage, and signing logic for mnemonics and private keys on web.
 *
 * Mnemonics and private keys are stored and accessed in secure local key-value store via associated keys formed from concatenating a constant prefix with the associated public address.
 *
 * @link https://github.com/Uniswap/universe/blob/main/apps/mobile/ios/RNEthersRS.swift
 */
export declare class WebKeyring implements IKeyring {
    private storage;
    private session;
    constructor(storage?: PersistedStorage, session?: PersistedStorage);
    /**
     * Fetches all mnemonic IDs, which are used as keys to access the actual mnemonics
     * in key-value store.
     * @param mnemonic
     * @returns array of mnemonic IDs
     */
    getMnemonicIds(): Promise<string[]>;
    removeAllMnemonicsAndPrivateKeys(): Promise<boolean>;
    isUnlocked(): Promise<boolean>;
    /** Tries to unlock the wallet with the provided password.  */
    unlock(password: string): Promise<boolean>;
    lock(): Promise<boolean>;
    checkPassword(password: string): Promise<boolean>;
    removePassword(): Promise<boolean>;
    /**
     * Changes the password by re-encrypting the mnemonic with a new password
     * @param newPassword new password to encrypt with
     * @returns true if successful
     */
    changePassword(newPassword: string): Promise<boolean>;
    /**
     * Derives private key from mnemonic with derivation index 0 and retrieves
     * associated public address. Stores imported mnemonic in store with the
     * mnemonic ID key as the public address.
  
     * @param mnemonic the mnemonic phrase to import
     * @param password the password to encrypt the mnemonic. Marked as optional depending on the platform.
  *                    Currently only used on web.
     * @returns public address from the mnemonic's first derived private key
     */
    importMnemonic(mnemonic: string, password: string, changingPassword?: boolean): Promise<string>;
    /**
     * Removes the mnemonic from storage.
     * @param mnemonicId key string associated with mnemonic to remove
     */
    removeMnemonic(mnemonicId: string): Promise<boolean>;
    /**
     * Generates a new mnemonic and retrieves associated public address. Stores new mnemonic in native keychain with the mnemonic ID key as the public address.
     * @param password the password to encrypt the mnemonic
     * @returns public address from the mnemonic's first derived private key
     */
    generateAndStoreMnemonic(password: string): Promise<string>;
    private storeNewMnemonic;
    private keyForMnemonicId;
    private retrieveMnemonic;
    retrieveMnemonicUnlocked(mnemonicId: string): Promise<string>;
    /**
     * Fetches all public addresses from private keys stored under `privateKeyPrefix` in store.
     * Used from to verify the store has the private key for an account that is attempting create a NativeSigner that calls signing methods
     * @returns public addresses for all stored private keys
     */
    getAddressesForStoredPrivateKeys(): Promise<string[]>;
    /**
     * Derives public address from mnemonic for a given `derivationIndex`.
     * @param mnemonic mnemonic to generate public address for
     * @param derivationIndex number used to specify a which derivation index to use for deriving a private key from the mnemonic
     * @returns public address associated with private key generated from the mnemonic at given derivation index
     */
    generateAddressForMnemonic(mnemonic: string, derivationIndex: number): Promise<string>;
    /**
     * Derives public addresses from a mnemonic for a range of derivation indexes, non inclusive
     *
     * @param mnemonic mnemonic to generate private key for (current convention is to
     * use the public address associated with mnemonic at derivation index 0)
     * @param startIndex number used to specify the derivation index at which to start deriving private keys
     * from the mnemonic
     * @param stopIndex number used to specify the derivation index at which to stop deriving private keys
     * from the mnemonic, non-inclusive
     * @returns public addresses associated with the private keys generated from the mnemonic at the given derivation index range
     */
    generateAddressesForMnemonic(mnemonic: string, startIndex: number, stopIndex: number): Promise<string[]>;
    /**
     * Derives public addresses from `mnemonicId` for a range of derivation indexes, non inclusive
     *
     * @param mnemonicId key string associated with mnemonic to generate private key for (current convention is to
     * use the public address associated with mnemonic at derivation index 0)
     * @param startIndex number used to specify the derivation index at which to start deriving private keys
     * from the mnemonic
     * @param stopIndex number used to specify the derivation index at which to stop deriving private keys
     * from the mnemonic
     * @returns public addresses associated with the private keys generated from the mnemonic at the given derivation index range
     */
    generateAddressesForMnemonicId(mnemonicId: string, startIndex: number, stopIndex: number): Promise<string[]>;
    /**
     * Derives private key and public address from mnemonic associated with `mnemonicId` for given `derivationIndex`. Stores the private key in store with key.
     * @param mnemonicId key string associated with mnemonic to generate private key for (currently convention is to use public address associated with mnemonic)
     * @param derivationIndex number used to specify a which derivation index to use for deriving a private key from the mnemonic
     * @returns public address associated with private key generated from the mnemonic at given derivation index
     */
    generateAndStorePrivateKey(mnemonicId: string, derivationIndex: number): Promise<string>;
    /**
     * Removes the private key from storage for the given address.
     * @param address account address to remove private key for
     * @returns success of removal
     */
    removePrivateKey(address: string): Promise<boolean>;
    /** @returns address if the store call was successful. */
    private storeNewPrivateKey;
    private retrievePrivateKey;
    private keyForPrivateKey;
    /**
     * @returns the Signature of the signed transaction in string form.
     **/
    signTransactionHashForAddress(address: string, hash: string, chainId: number): Promise<string>;
    signMessageForAddress(address: string, message: string): Promise<string>;
    /**
     * signs raw 32-byte hashes
     * @returns the Signature of the signed hash in string form.
     **/
    signHashForAddress(address: string, hash: string, _chainId: number): Promise<string>;
}
export declare const Keyring: WebKeyring;
//# sourceMappingURL=Keyring.web.d.ts.map