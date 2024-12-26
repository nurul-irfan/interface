import { arrayify, isHexString } from 'ethers/lib/utils';
import { signTypedData } from 'uniswap/src/features/transactions/signing';
import { ensureLeading0x } from 'uniswap/src/utils/addresses';
// https://docs.ethers.io/v5/api/signer/#Signer--signing-methods
export async function signMessage(message, account, signerManager) {
    const signer = await signerManager.getSignerForAccount(account);
    const formattedMessage = isHexString(message) ? arrayify(message) : message;
    const signature = await signer.signMessage(formattedMessage);
    return ensureLeading0x(signature);
}
export async function signTypedDataMessage(message, account, signerManager, _provider) {
    const parsedData = JSON.parse(message);
    // ethers computes EIP712Domain type for you, so we should not pass it in directly
    // or else ethers will get confused about which type is the primary type
    // https://github.com/ethers-io/ethers.js/issues/687#issuecomment-714069471
    delete parsedData.types.EIP712Domain;
    const signer = await signerManager.getSignerForAccount(account);
    return signTypedData(parsedData.domain, parsedData.types, parsedData.message, signer);
}
//# sourceMappingURL=signing.native.js.map