import { PlatformSplitStubError } from 'utilities/src/errors';
/** Dummy Keyring implementation.  */
class NullKeyring {
    removeAllMnemonicsAndPrivateKeys() {
        throw new PlatformSplitStubError('removeAllMnemonicsAndPrivateKeys');
    }
    generateAddressesForMnemonic(_mnemonic, _startDerivationIndex, _endDerivationIndex) {
        throw new PlatformSplitStubError('generateAddressesForMnemonic');
    }
    generateAddressesForMnemonicId(_mnemonicId, _startDerivationIndex, _endDerivationIndex) {
        throw new PlatformSplitStubError('generateAddressesForMnemonicId');
    }
    isUnlocked() {
        throw new PlatformSplitStubError('isUnlocked');
    }
    unlock() {
        return Promise.resolve(true);
    }
    lock() {
        return Promise.resolve(true);
    }
    checkPassword(_password) {
        throw new PlatformSplitStubError('checkPassword');
    }
    changePassword(_newPassword) {
        throw new PlatformSplitStubError('changePassword');
    }
    removePassword() {
        throw new PlatformSplitStubError('removePassword');
    }
    getMnemonicIds() {
        throw new PlatformSplitStubError('getMnemonicIds');
    }
    // returns the mnemonicId (derived address at index 0) of the imported mnemonic
    importMnemonic(_mnemonic, _password, _allowOverwrite) {
        throw new PlatformSplitStubError('importMnemonic');
    }
    removeMnemonic(_menemonicId) {
        throw new PlatformSplitStubError('removeMnemonic');
    }
    retrieveMnemonicUnlocked(_address) {
        throw new PlatformSplitStubError('retrieveMnemonicUnlocked');
    }
    // returns the mnemonicId (derived address at index 0) of the stored mnemonic
    generateAndStoreMnemonic(_password) {
        throw new PlatformSplitStubError('generateAndStoreMnemonic');
    }
    getAddressesForStoredPrivateKeys() {
        throw new PlatformSplitStubError('getAddressesForStoredPrivateKeys');
    }
    // returns the address for a given mnemonic
    generateAddressForMnemonic(_menemonic, _derivationIndex) {
        throw new PlatformSplitStubError('generateAddressForMnemonic');
    }
    // returns the address of the generated key
    generateAndStorePrivateKey(_menemonicId, _derivationIndex) {
        throw new PlatformSplitStubError('generateAndStorePrivateKey');
    }
    removePrivateKey(_address) {
        throw new PlatformSplitStubError('removePrivateKey');
    }
    signTransactionHashForAddress(_address, _hash, _chainId) {
        throw new PlatformSplitStubError('signTransactionHashForAddress');
    }
    signMessageForAddress(_address, _message) {
        throw new PlatformSplitStubError('signMessageForAddress');
    }
    signHashForAddress(_address, _hash, _chainId) {
        throw new PlatformSplitStubError('signHashForAddress');
    }
}
// Will be overridden by the compiler with platform-specific Keyring
export const Keyring = new NullKeyring();
//# sourceMappingURL=Keyring.js.map