import { NativeModules } from 'react-native';
import { NotImplementedError } from 'utilities/src/errors';
const { RNEthersRS } = NativeModules;
/**
 * Simple wrapper around RNEthersRS
 */
class NativeKeyring {
    removeAllMnemonicsAndPrivateKeys() {
        throw new NotImplementedError('removeAllMnemonicsAndPrivateKeys');
    }
    isUnlocked() {
        throw new NotImplementedError('isUnlocked');
    }
    removeMnemonic(mnemonicId) {
        return RNEthersRS.removeMnemonic(mnemonicId);
    }
    removePrivateKey(address) {
        return RNEthersRS.removePrivateKey(address);
    }
    removePassword() {
        // n/a on mobile
        throw new NotImplementedError('removePassword');
    }
    unlock() {
        return Promise.resolve(true);
    }
    lock() {
        return Promise.resolve(true);
    }
    // Not used on mobile
    checkPassword(_password) {
        throw new NotImplementedError('checkPassword');
    }
    // Not used on mobile
    changePassword(_newPassword) {
        throw new NotImplementedError('changePassword');
    }
    getMnemonicIds() {
        return RNEthersRS.getMnemonicIds();
    }
    // returns the mnemonicId (derived address at index 0) of the imported mnemonic
    importMnemonic(mnemonic) {
        return RNEthersRS.importMnemonic(mnemonic);
    }
    // Not used on mobile
    retrieveMnemonicUnlocked(_address) {
        throw new NotImplementedError('retrieveMnemonic');
    }
    // returns the mnemonicId (derived address at index 0) of the stored mnemonic
    generateAndStoreMnemonic() {
        return RNEthersRS.generateAndStoreMnemonic();
    }
    getAddressesForStoredPrivateKeys() {
        return RNEthersRS.getAddressesForStoredPrivateKeys();
    }
    // returns the address for a given mnemonic
    generateAddressForMnemonic(mnemonic, derivationIndex) {
        return RNEthersRS.generateAddressForMnemonic(mnemonic, derivationIndex);
    }
    generateAddressesForMnemonic(_mnemonicId, _startIndex, _stopIndex) {
        throw new NotImplementedError('generateAddressesForMnemonic');
    }
    generateAddressesForMnemonicId(_mnemonicId, _startIndex, _stopIndex) {
        throw new NotImplementedError('generateAddressesForMnemonicId');
    }
    // returns the address of the generated key
    generateAndStorePrivateKey(mnemonicId, derivationIndex) {
        return RNEthersRS.generateAndStorePrivateKey(mnemonicId, derivationIndex);
    }
    signTransactionHashForAddress(address, hash, chainId) {
        return RNEthersRS.signTransactionHashForAddress(address, hash, chainId);
    }
    signMessageForAddress(address, message) {
        return RNEthersRS.signMessageForAddress(address, message);
    }
    signHashForAddress(address, hash, chainId) {
        return RNEthersRS.signHashForAddress(address, hash, chainId);
    }
}
export const Keyring = new NativeKeyring();
//# sourceMappingURL=Keyring.native.js.map