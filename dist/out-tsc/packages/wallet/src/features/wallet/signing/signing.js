import { PlatformSplitStubError } from 'utilities/src/errors';
// https://docs.ethers.io/v5/api/signer/#Signer--signing-methods
export async function signMessage(_message, _account, _signerManager, _provider) {
    throw new PlatformSplitStubError('signMessage');
}
export async function signTypedDataMessage(_message, _account, _signerManager, _provider) {
    throw new PlatformSplitStubError('signTypedDataMessage');
}
//# sourceMappingURL=signing.js.map