import { Signer } from 'ethers';
import { PlatformSplitStubError } from 'utilities/src/errors';
/**
 * A signer that uses a native keyring to access keys
 * NOTE: provide Keyring.platform.ts at runtime.
 */
export class NativeSigner extends Signer {
    constructor(_address, _provider) {
        super();
        this._address = _address;
        throw new PlatformSplitStubError('NativeSigner');
    }
    getAddress() {
        throw new PlatformSplitStubError('getAddress');
    }
    signMessage(_message) {
        throw new PlatformSplitStubError('signMessage');
    }
    // reference: https://github.com/ethers-io/ethers.js/blob/ce8f1e4015c0f27bf178238770b1325136e3351a/packages/wallet/src.ts/index.ts#L135
    async _signTypedData(_domain, _types, _value) {
        throw new PlatformSplitStubError('_signTypedData');
    }
    async signTransaction(_transaction) {
        throw new PlatformSplitStubError('signTransaction');
    }
    connect(_provider) {
        throw new PlatformSplitStubError('connect');
    }
}
//# sourceMappingURL=NativeSigner.js.map