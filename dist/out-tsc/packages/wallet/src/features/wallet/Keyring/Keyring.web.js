/* eslint-disable max-lines */
import { HDKey } from '@scure/bip32';
import { Wallet, utils } from 'ethers';
import { SigningKey, defaultPath, joinSignature } from 'ethers/lib/utils';
import { logger } from 'utilities/src/logger/logger';
import { PBKDF2_PARAMS, convertBase64SeedToCryptoKey, decodeFromStorage, decrypt, encodeForStorage, encrypt, exportKey, generateNewIV, generateNewSalt, getEncryptionKeyFromPassword, } from 'wallet/src/features/wallet/Keyring/crypto';
import { ENCRYPTION_KEY_STORAGE_KEY, PersistedStorage, prefix } from 'wallet/src/utils/persistedStorage';
const mnemonicPrefix = '.mnemonic.';
const privateKeyPrefix = '.privateKey.';
const entireMnemonicPrefix = prefix + mnemonicPrefix;
const entirePrivateKeyPrefix = prefix + privateKeyPrefix;
var ErrorType;
(function (ErrorType) {
    ErrorType["StoreMnemonicError"] = "storeMnemonicError";
    ErrorType["RetrieveMnemonicError"] = "retrieveMnemonicError";
    ErrorType["RetrievePasswordError"] = "retrievePasswordError";
})(ErrorType || (ErrorType = {}));
/**
 * Provides the generation, storage, and signing logic for mnemonics and private keys on web.
 *
 * Mnemonics and private keys are stored and accessed in secure local key-value store via associated keys formed from concatenating a constant prefix with the associated public address.
 *
 * @link https://github.com/Uniswap/universe/blob/main/apps/mobile/ios/RNEthersRS.swift
 */
export class WebKeyring {
    constructor(storage = new PersistedStorage('local'), session = new PersistedStorage('session')) {
        this.storage = storage;
        this.session = session;
        this.generateAndStoreMnemonic = this.generateAndStoreMnemonic.bind(this);
        this.generateAddressForMnemonic = this.generateAddressForMnemonic.bind(this);
        this.generateAddressesForMnemonic = this.generateAddressesForMnemonic.bind(this);
        this.generateAddressesForMnemonicId = this.generateAddressesForMnemonicId.bind(this);
        this.generateAndStorePrivateKey = this.generateAndStorePrivateKey.bind(this);
        this.getMnemonicIds = this.getMnemonicIds.bind(this);
        this.importMnemonic = this.importMnemonic.bind(this);
        this.keyForMnemonicId = this.keyForMnemonicId.bind(this);
        this.keyForPrivateKey = this.keyForPrivateKey.bind(this);
        this.retrieveMnemonic = this.retrieveMnemonic.bind(this);
        this.retrieveMnemonicUnlocked = this.retrieveMnemonicUnlocked.bind(this);
        this.storeNewMnemonic = this.storeNewMnemonic.bind(this);
        this.unlock = this.unlock.bind(this);
        this.lock = this.lock.bind(this);
    }
    /**
     * Fetches all mnemonic IDs, which are used as keys to access the actual mnemonics
     * in key-value store.
     * @param mnemonic
     * @returns array of mnemonic IDs
     */
    async getMnemonicIds() {
        const allKeys = Object.keys(await this.storage.getAll());
        const mnemonicIds = allKeys
            .filter((k) => k.includes(mnemonicPrefix))
            .map((k) => k.replaceAll(entireMnemonicPrefix, ''));
        return mnemonicIds;
    }
    async removeAllMnemonicsAndPrivateKeys() {
        const allKeys = Object.keys(await this.storage.getAll());
        const mnemonicStorageKeys = allKeys.filter((k) => k.includes(mnemonicPrefix));
        const privateKeyStorageKeys = allKeys.filter((k) => k.includes(privateKeyPrefix));
        await this.storage.removeItem(mnemonicStorageKeys);
        await this.storage.removeItem(privateKeyStorageKeys);
        return true;
    }
    async isUnlocked() {
        const firstMnemonicId = (await this.getMnemonicIds())[0];
        if (!firstMnemonicId) {
            return false;
        }
        try {
            const mnemonic = await this.retrieveMnemonicUnlocked(firstMnemonicId);
            return !!mnemonic;
        }
        catch {
            return false;
        }
    }
    /** Tries to unlock the wallet with the provided password.  */
    async unlock(password) {
        try {
            // assumes every mnemonic is encrypted withe same password
            const firstMnemonicId = (await this.getMnemonicIds())[0];
            if (!firstMnemonicId) {
                throw new Error(`${ErrorType.RetrieveMnemonicError}: Attempted to unlock wallet, but storage is empty.`);
            }
            const mnemonicKey = this.keyForMnemonicId(firstMnemonicId);
            const storedSecretPayload = await this.storage.getItem(mnemonicKey);
            if (!storedSecretPayload) {
                throw new Error('No stored secret payload found');
            }
            const secretPayload = JSON.parse(storedSecretPayload);
            if (!secretPayload) {
                throw new Error('Could not parse secret payload');
            }
            const encryptionKey = await getEncryptionKeyFromPassword(password, secretPayload);
            await this.retrieveMnemonic(secretPayload, encryptionKey, firstMnemonicId);
            const keyBase64 = await exportKey(encryptionKey);
            await this.session.setItem(ENCRYPTION_KEY_STORAGE_KEY, keyBase64);
            return true;
        }
        catch {
            return false;
        }
    }
    async lock() {
        await this.session.removeItem(ENCRYPTION_KEY_STORAGE_KEY); // Clear password
        return true;
    }
    async checkPassword(password) {
        try {
            const currentPasswordBase64String = await this.session.getItem(ENCRYPTION_KEY_STORAGE_KEY);
            const firstMnemonicId = (await this.getMnemonicIds())[0];
            if (!firstMnemonicId) {
                return false;
            }
            const keyForMnemonicId = this.keyForMnemonicId(firstMnemonicId);
            const storedSecretPayload = await this.storage.getItem(keyForMnemonicId);
            if (!storedSecretPayload) {
                return false;
            }
            const secretPayload = JSON.parse(storedSecretPayload);
            if (!secretPayload || !secretPayload.ciphertext) {
                return false;
            }
            const passwordPasswordEncryptionKey = await getEncryptionKeyFromPassword(password, secretPayload);
            const passwordPasswordBase64String = await exportKey(passwordPasswordEncryptionKey);
            return currentPasswordBase64String === passwordPasswordBase64String;
        }
        catch (_e) {
            return false;
        }
    }
    async removePassword() {
        await this.session.removeItem(ENCRYPTION_KEY_STORAGE_KEY);
        return true;
    }
    /**
     * Changes the password by re-encrypting the mnemonic with a new password
     * @param newPassword new password to encrypt with
     * @returns true if successful
     */
    async changePassword(newPassword) {
        try {
            const firstMnemonicId = (await this.getMnemonicIds())[0];
            if (!firstMnemonicId) {
                throw new Error(`${ErrorType.RetrieveMnemonicError}: Attempted to change password, but storage is empty.`);
            }
            const mnemonic = await this.retrieveMnemonicUnlocked(firstMnemonicId);
            await this.importMnemonic(mnemonic, newPassword, true);
            return true;
        }
        catch (err) {
            logger.error(err, { tags: { file: 'Keyring.web.ts', function: 'changePassword' } });
            return false;
        }
    }
    /**
     * Derives private key from mnemonic with derivation index 0 and retrieves
     * associated public address. Stores imported mnemonic in store with the
     * mnemonic ID key as the public address.
  
     * @param mnemonic the mnemonic phrase to import
     * @param password the password to encrypt the mnemonic. Marked as optional depending on the platform.
  *                    Currently only used on web.
     * @returns public address from the mnemonic's first derived private key
     */
    async importMnemonic(mnemonic, password, changingPassword = false) {
        const wallet = Wallet.fromMnemonic(mnemonic);
        const address = wallet.address;
        const mnemonicId = await this.storeNewMnemonic(mnemonic, password, address, changingPassword);
        if (!mnemonicId) {
            throw changingPassword
                ? new Error(`${ErrorType.StoreMnemonicError}: Failed to store mnemonic with new password`)
                : new Error(`${ErrorType.StoreMnemonicError}: Failed to import mnemonic`);
        }
        return mnemonicId;
    }
    /**
     * Removes the mnemonic from storage.
     * @param mnemonicId key string associated with mnemonic to remove
     */
    async removeMnemonic(mnemonicId) {
        const key = this.keyForMnemonicId(mnemonicId);
        await this.storage.removeItem(key);
        return true;
    }
    /**
     * Generates a new mnemonic and retrieves associated public address. Stores new mnemonic in native keychain with the mnemonic ID key as the public address.
     * @param password the password to encrypt the mnemonic
     * @returns public address from the mnemonic's first derived private key
     */
    async generateAndStoreMnemonic(password) {
        const newWallet = Wallet.createRandom();
        const mnemonic = newWallet.mnemonic.phrase;
        const address = newWallet.address;
        if (!(await this.storeNewMnemonic(mnemonic, password, address))) {
            throw new Error(`${ErrorType.StoreMnemonicError}: Failed to generate and store mnemonic`);
        }
        return address;
    }
    async storeNewMnemonic(mnemonic, password, address, forceOverwrite = false) {
        const mnemonicKey = this.keyForMnemonicId(address);
        const mnemonicStorageValue = await this.storage.getItem(mnemonicKey);
        if (mnemonicStorageValue !== undefined && !forceOverwrite) {
            logger.debug('Keyring.web', 'storeNewMnemonic', 'mnemonic already stored. Did you mean to reimport?');
            return address;
        }
        const salt = generateNewSalt();
        const iv = generateNewIV();
        const secretPayload = {
            ...PBKDF2_PARAMS,
            iv: encodeForStorage(iv),
            salt: encodeForStorage(salt),
        };
        const encryptionKey = await getEncryptionKeyFromPassword(password, secretPayload);
        const ciphertext = await encrypt({
            plaintext: mnemonic,
            encryptionKey,
            iv,
            additionalData: address,
        });
        secretPayload.ciphertext = ciphertext;
        await this.storage.setItem(mnemonicKey, JSON.stringify(secretPayload));
        const keyBase64 = await exportKey(encryptionKey);
        await this.session.setItem(ENCRYPTION_KEY_STORAGE_KEY, keyBase64);
        return address;
    }
    keyForMnemonicId(mnemonicId) {
        // NOTE: small difference with mobile implementation--native keychain prepends a custom prefix, but we must do it ourselves here.
        return entireMnemonicPrefix + mnemonicId;
    }
    async retrieveMnemonic(secretPayload, encryptionKey, expectedAddress) {
        try {
            if (!secretPayload.ciphertext) {
                throw new Error('No ciphertext found in secret payload');
            }
            const mnemonic = await decrypt({
                encryptionKey,
                ciphertext: decodeFromStorage(secretPayload.ciphertext),
                iv: decodeFromStorage(secretPayload.iv),
                additionalData: expectedAddress,
            });
            if (!mnemonic) {
                throw new Error('No mnemonic found in encrypted storage');
            }
            // validate mnemonic (will throw if invalid)
            Wallet.fromMnemonic(mnemonic);
            return mnemonic;
        }
        catch (e) {
            throw new Error(`${ErrorType.RetrieveMnemonicError}: ${e}`);
        }
    }
    async retrieveMnemonicUnlocked(mnemonicId) {
        const encryptionKeyString = await this.session.getItem(ENCRYPTION_KEY_STORAGE_KEY);
        if (!encryptionKeyString) {
            throw new Error(ErrorType.RetrievePasswordError);
        }
        const encryptionKey = await convertBase64SeedToCryptoKey(encryptionKeyString);
        const mnemonicKey = this.keyForMnemonicId(mnemonicId);
        const storedSecretPayload = await this.storage.getItem(mnemonicKey);
        if (!storedSecretPayload) {
            throw new Error(ErrorType.RetrieveMnemonicError);
        }
        const secretPayload = JSON.parse(storedSecretPayload);
        if (!secretPayload) {
            throw new Error(ErrorType.RetrieveMnemonicError);
        }
        return await this.retrieveMnemonic(secretPayload, encryptionKey, mnemonicId);
    }
    /**
     * Fetches all public addresses from private keys stored under `privateKeyPrefix` in store.
     * Used from to verify the store has the private key for an account that is attempting create a NativeSigner that calls signing methods
     * @returns public addresses for all stored private keys
     */
    async getAddressesForStoredPrivateKeys() {
        const addresses = Object.keys(await this.storage.getAll())
            .filter((k) => k.includes(privateKeyPrefix))
            .map((k) => k.replaceAll(entirePrivateKeyPrefix, ''));
        return addresses;
    }
    /**
     * Derives public address from mnemonic for a given `derivationIndex`.
     * @param mnemonic mnemonic to generate public address for
     * @param derivationIndex number used to specify a which derivation index to use for deriving a private key from the mnemonic
     * @returns public address associated with private key generated from the mnemonic at given derivation index
     */
    async generateAddressForMnemonic(mnemonic, derivationIndex) {
        const derivationPath = defaultPath + derivationIndex;
        const walletAtIndex = Wallet.fromMnemonic(mnemonic, derivationPath);
        return walletAtIndex.address;
    }
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
    async generateAddressesForMnemonic(mnemonic, startIndex, stopIndex) {
        if (startIndex >= stopIndex) {
            throw new Error('End derivation index must be greater than start derivation index');
        }
        const node = utils.HDNode.fromMnemonic(mnemonic);
        // the `defaultPath` from ethers appends the specific derivation index to the path
        // and we need to remove the last two elements "/0" to get the account node
        const accountNode = node.derivePath(defaultPath.slice(0, -2));
        const xpub = accountNode.neuter().extendedKey;
        const hdKey = HDKey.fromExtendedKey(xpub);
        const addresses = [];
        for (let i = startIndex; i < stopIndex; i++) {
            const pubKey = hdKey.deriveChild(i).publicKey;
            if (!pubKey) {
                continue;
            }
            const address = utils.computeAddress(pubKey);
            addresses.push(address);
        }
        return addresses;
    }
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
    async generateAddressesForMnemonicId(mnemonicId, startIndex, stopIndex) {
        const mnemonic = await this.retrieveMnemonicUnlocked(mnemonicId);
        return await this.generateAddressesForMnemonic(mnemonic, startIndex, stopIndex);
    }
    /**
     * Derives private key and public address from mnemonic associated with `mnemonicId` for given `derivationIndex`. Stores the private key in store with key.
     * @param mnemonicId key string associated with mnemonic to generate private key for (currently convention is to use public address associated with mnemonic)
     * @param derivationIndex number used to specify a which derivation index to use for deriving a private key from the mnemonic
     * @returns public address associated with private key generated from the mnemonic at given derivation index
     */
    async generateAndStorePrivateKey(mnemonicId, derivationIndex) {
        const mnemonic = await this.retrieveMnemonicUnlocked(mnemonicId);
        const derivationPath = defaultPath + derivationIndex;
        const walletAtIndex = Wallet.fromMnemonic(mnemonic, derivationPath);
        const privateKey = walletAtIndex.privateKey;
        const address = walletAtIndex.address;
        return await this.storeNewPrivateKey(address, privateKey);
    }
    /**
     * Removes the private key from storage for the given address.
     * @param address account address to remove private key for
     * @returns success of removal
     */
    async removePrivateKey(address) {
        const key = this.keyForPrivateKey(address);
        try {
            await this.storage.removeItem(key);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /** @returns address if the store call was successful. */
    async storeNewPrivateKey(address, privateKey) {
        const checkStored = await this.retrievePrivateKey(address);
        if (checkStored !== undefined) {
            logger.debug('Keyring.web', 'storeNewPrivateKey', 'privateKey already stored. Did you mean to reimport?');
            return address;
        }
        const encryptionKeyString = await this.session.getItem(ENCRYPTION_KEY_STORAGE_KEY);
        if (!encryptionKeyString) {
            throw new Error(ErrorType.RetrievePasswordError);
        }
        const encryptionKey = await convertBase64SeedToCryptoKey(encryptionKeyString);
        try {
            const salt = generateNewSalt();
            const iv = generateNewIV();
            const secretPayload = {
                ...PBKDF2_PARAMS,
                iv: encodeForStorage(iv),
                salt: encodeForStorage(salt),
            };
            const ciphertext = await encrypt({
                plaintext: privateKey,
                encryptionKey,
                iv,
                additionalData: address,
            });
            secretPayload.ciphertext = ciphertext;
            const newPrivateKeyStorageKey = this.keyForPrivateKey(address);
            logger.debug('Keyring.web', 'storeNewPrivateKey', 'storing new private key');
            await this.storage.setItem(newPrivateKeyStorageKey, JSON.stringify(secretPayload));
            return address;
        }
        catch (e) {
            throw new Error(ErrorType.StoreMnemonicError + `: ${e}`);
        }
    }
    async retrievePrivateKey(address) {
        const key = this.keyForPrivateKey(address);
        const result = await this.storage.getItem(key);
        if (!result) {
            return undefined;
        }
        try {
            const maybeSecretPayload = JSON.parse(result);
            const encryptionKeyString = await this.session.getItem(ENCRYPTION_KEY_STORAGE_KEY);
            if (!encryptionKeyString || !(maybeSecretPayload === null || maybeSecretPayload === void 0 ? void 0 : maybeSecretPayload.ciphertext)) {
                throw new Error(ErrorType.RetrievePasswordError);
            }
            const encryptionKey = await convertBase64SeedToCryptoKey(encryptionKeyString);
            const privateKey = await decrypt({
                encryptionKey,
                ciphertext: decodeFromStorage(maybeSecretPayload.ciphertext),
                iv: decodeFromStorage(maybeSecretPayload.iv),
                additionalData: address,
            });
            if (!privateKey) {
                return undefined;
            }
            // validate private key (will throw if invalid)
            const wallet = new Wallet(privateKey);
            if (!wallet) {
                throw new Error('Invalid private key');
            }
            return privateKey;
        }
        catch (e) {
            throw new Error(`${ErrorType.RetrieveMnemonicError}: ${e}`);
        }
    }
    keyForPrivateKey(address) {
        return entirePrivateKeyPrefix + address;
    }
    /**
     * @returns the Signature of the signed transaction in string form.
     **/
    async signTransactionHashForAddress(address, hash, chainId) {
        // Ethers.js doesn't differentiate between signing a random hash and signing a transaction hash
        return this.signHashForAddress(address, hash, chainId);
    }
    // adds EIP-191 prefix
    // https://docs.ethers.org/v5/api/signer/#Signer-signMessage
    async signMessageForAddress(address, message) {
        const privateKey = await this.retrievePrivateKey(address);
        if (!privateKey) {
            throw Error('No private key found for address');
        }
        const wallet = new Wallet(privateKey);
        return wallet.signMessage(message);
    }
    /**
     * signs raw 32-byte hashes
     * @returns the Signature of the signed hash in string form.
     **/
    async signHashForAddress(address, hash, _chainId) {
        const privateKey = await this.retrievePrivateKey(address);
        if (!privateKey) {
            throw Error('No private key found for address');
        }
        const signingKey = new SigningKey(privateKey);
        const signature = signingKey.signDigest(hash);
        return joinSignature(signature);
    }
}
export const Keyring = new WebKeyring();
//# sourceMappingURL=Keyring.web.js.map