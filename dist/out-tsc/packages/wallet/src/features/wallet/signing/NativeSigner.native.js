import { _TypedDataEncoder } from '@ethersproject/hash';
import { Signer, providers, utils } from 'ethers';
import { hexlify } from 'ethers/lib/utils';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { toSupportedChainId } from 'uniswap/src/features/chains/utils';
import { areAddressesEqual, ensureLeading0x } from 'uniswap/src/utils/addresses';
import { Keyring } from 'wallet/src/features/wallet/Keyring/Keyring.native';
// A signer that uses native keystore to access keys
export class NativeSigner extends Signer {
    constructor(address, provider) {
        super();
        this.address = address;
        if (provider && !providers.Provider.isProvider(provider)) {
            throw new Error('invalid provider' + provider);
        }
        utils.defineReadOnly(this, 'provider', provider);
    }
    getAddress() {
        return Promise.resolve(this.address);
    }
    signMessage(message) {
        const signaturePromise = typeof message === 'string'
            ? Keyring.signMessageForAddress(this.address, message)
            : // chainID isn't available here, but is not needed for signing hashes so just default to Mainnet
                Keyring.signHashForAddress(this.address, hexlify(message).slice(2), UniverseChainId.Mainnet);
        return signaturePromise.then((signature) => ensureLeading0x(signature));
    }
    // reference: https://github.com/ethers-io/ethers.js/blob/ce8f1e4015c0f27bf178238770b1325136e3351a/packages/wallet/src.ts/index.ts#L135
    async _signTypedData(domain, types, value) {
        const signature = await Keyring.signHashForAddress(this.address, _TypedDataEncoder.hash(domain, types, value).slice(2), 
        // TODO: WALL-4919: Remove hardcoded Mainnet
        toSupportedChainId(domain.chainId) || UniverseChainId.Mainnet);
        return signature;
    }
    async signTransaction(transaction) {
        const tx = await utils.resolveProperties(transaction);
        if (tx.chainId === undefined) {
            throw new Error('Expected chainId to be defined');
        }
        if (tx.from != null) {
            if (!areAddressesEqual(tx.from, this.address)) {
                throw new Error('transaction from address mismatch');
            }
            delete tx.from;
        }
        const ut = tx;
        const hashedTx = utils.keccak256(utils.serializeTransaction(ut));
        const signature = await Keyring.signTransactionHashForAddress(this.address, hashedTx.slice(2), tx.chainId);
        return utils.serializeTransaction(ut, `0x${signature}`);
    }
    connect(provider) {
        return new NativeSigner(this.address, provider);
    }
}
//# sourceMappingURL=NativeSigner.native.js.map