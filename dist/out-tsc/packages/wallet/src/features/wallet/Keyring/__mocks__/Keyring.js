import { faker } from '@faker-js/faker';
import { Wallet } from 'ethers';
const pathFromIndex = (index) => `m/44'/60'/0'/0/${index}`;
const mnemonics = {};
const privateKeys = {};
const password = faker.word.noun();
class MockKeyring {
    removeAllMnemonicsAndPrivateKeys() {
        return Promise.resolve(false);
    }
    isUnlocked() {
        return Promise.resolve(false);
    }
    unlock(p) {
        return Promise.resolve(password === p);
    }
    lock() {
        return Promise.resolve(true);
    }
    checkPassword(_password) {
        return Promise.resolve(true);
    }
    changePassword(_newPassword) {
        return Promise.resolve(true);
    }
    removePassword() {
        return Promise.resolve(true);
    }
    getMnemonicIds() {
        return Promise.resolve(Object.keys(mnemonics));
    }
    // returns the mnemonicId (derived address at index 0) of the imported mnemonic
    importMnemonic(mnemonic) {
        const wallet = Wallet.fromMnemonic(mnemonic);
        mnemonics[wallet.address] = mnemonic;
        return Promise.resolve(wallet.address);
    }
    removeMnemonic(mnemonicId) {
        delete mnemonics[mnemonicId];
        return Promise.resolve(true);
    }
    retrieveMnemonicUnlocked(address) {
        return Promise.resolve(mnemonics[address]);
    }
    // returns the mnemonicId (derived address at index 0) of the stored mnemonic
    generateAndStoreMnemonic() {
        const wallet = Wallet.createRandom();
        mnemonics[wallet.address] = wallet.mnemonic.phrase;
        return Promise.resolve(wallet.address);
    }
    getAddressesForStoredPrivateKeys() {
        return Promise.resolve(Object.keys(privateKeys));
    }
    // returns the address for a given mnemonic
    generateAddressForMnemonic(mnemonic, derivationIndex) {
        const wallet = Wallet.fromMnemonic(mnemonic, pathFromIndex(derivationIndex));
        return Promise.resolve(wallet.address);
    }
    generateAddressesForMnemonic(mnemonic, startDerivationIndex, endDerivationIndex) {
        const addresses = [];
        for (let i = startDerivationIndex; i <= endDerivationIndex; i++) {
            const wallet = Wallet.fromMnemonic(mnemonic, pathFromIndex(i));
            addresses.push(wallet.address);
        }
        return Promise.resolve(addresses);
    }
    generateAddressesForMnemonicId(mnemonicId, startDerivationIndex, endDerivationIndex) {
        const mnemonic = mnemonics[mnemonicId];
        if (!mnemonic) {
            return Promise.reject(new Error(`No mnemonic found for ${mnemonicId}`));
        }
        const addresses = [];
        for (let i = startDerivationIndex; i <= endDerivationIndex; i++) {
            const wallet = Wallet.fromMnemonic(mnemonic, pathFromIndex(i));
            addresses.push(wallet.address);
        }
        return Promise.resolve(addresses);
    }
    // returns the address of the generated key
    generateAndStorePrivateKey(mnemonicId, derivationIndex) {
        const mnemonic = mnemonics[mnemonicId];
        if (!mnemonic) {
            return Promise.reject(`No mnemonic found for ${mnemonicId}`);
        }
        const wallet = Wallet.fromMnemonic(mnemonic, pathFromIndex(derivationIndex));
        privateKeys[wallet.address] = wallet.privateKey;
        return Promise.resolve(wallet.address);
    }
    removePrivateKey(address) {
        delete privateKeys[address];
        return Promise.resolve(true);
    }
    async signTransactionForAddress(address, transaction) {
        const privateKey = privateKeys[address];
        if (!privateKey) {
            return Promise.reject(`No private key found for ${address}`);
        }
        const wallet = new Wallet(privateKey);
        const signature = await wallet.signTransaction(transaction);
        return signature;
    }
    async signMessageForAddress(address, message) {
        const privateKey = privateKeys[address];
        if (!privateKey) {
            return Promise.reject(`No private key found for ${address}`);
        }
        const wallet = new Wallet(privateKey);
        const signature = await wallet.signMessage(message);
        return signature;
    }
    async signTransactionHashForAddress() {
        throw new Error('Not implemented');
    }
    async signHashForAddress() {
        throw new Error('Not implemented');
    }
}
export const Keyring = new MockKeyring();
//# sourceMappingURL=Keyring.js.map