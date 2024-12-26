import { _TypedDataEncoder } from '@ethersproject/hash';
import { Signer, providers, utils } from 'ethers';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { toSupportedChainId } from 'uniswap/src/features/chains/utils';
import { areAddressesEqual } from 'uniswap/src/utils/addresses';
import { Keyring } from 'wallet/src/features/wallet/Keyring/Keyring';
/**
 * A signer that uses a native keyring to access keys
 * NOTE: provide Keyring.platform.ts at runtime.
 */
export class NativeSigner extends Signer {
    constructor(address, provider) {
        super();
        this.address = address;
        if (provider && !providers.Provider.isProvider(provider)) {
            throw new Error(`Invalid provider: ${provider}`);
        }
        utils.defineReadOnly(this, 'provider', provider);
    }
    getAddress() {
        return Promise.resolve(this.address);
    }
    signMessage(message) {
        return Keyring.signMessageForAddress(this.address, message);
    }
    // reference: https://github.com/ethers-io/ethers.js/blob/ce8f1e4015c0f27bf178238770b1325136e3351a/packages/wallet/src.ts/index.ts#L135
    async _signTypedData(domain, types, value) {
        const signature = await Keyring.signHashForAddress(this.address, _TypedDataEncoder.hash(domain, types, value), 
        // TODO: WALL-4919: Remove hardcoded Mainnet
        toSupportedChainId(domain.chainId) || UniverseChainId.Mainnet);
        return signature;
    }
    async signTransaction(transaction) {
        const tx = await utils.resolveProperties(transaction);
        if (tx.chainId === undefined) {
            throw new Error('Attempted to sign transaction with an undefined chain');
        }
        if (tx.from != null) {
            if (!areAddressesEqual(tx.from, this.address)) {
                throw new Error(`Signing address does not match the tx 'from' address`);
            }
            delete tx.from;
        }
        const ut = tx;
        const hashedTx = utils.keccak256(utils.serializeTransaction(ut));
        const signature = await Keyring.signTransactionHashForAddress(this.address, hashedTx, 
        // TODO: WALL-4919: Remove hardcoded Mainnet
        tx.chainId || UniverseChainId.Mainnet);
        return utils.serializeTransaction(ut, signature);
    }
    connect(provider) {
        return new NativeSigner(this.address, provider);
    }
}
//# sourceMappingURL=NativeSigner.web.js.map