import { BigNumber } from 'ethers';
const formatAsHexString = (input) => input !== undefined ? BigNumber.from(input).toHexString() : input;
// hexlifyTransaction is idempotent so it's safe to call more than once on a singular transaction request
export function hexlifyTransaction(transferTxRequest) {
    const { value, nonce, gasLimit, gasPrice, maxPriorityFeePerGas, maxFeePerGas } = transferTxRequest;
    return {
        ...transferTxRequest,
        nonce: formatAsHexString(nonce),
        value: formatAsHexString(value),
        gasLimit: formatAsHexString(gasLimit),
        // only pass in for legacy chains
        ...(gasPrice ? { gasPrice: formatAsHexString(gasPrice) } : {}),
        // only pass in for eip1559 tx
        ...(maxPriorityFeePerGas
            ? {
                maxPriorityFeePerGas: formatAsHexString(maxPriorityFeePerGas),
                maxFeePerGas: formatAsHexString(maxFeePerGas),
            }
            : {}),
    };
}
//# sourceMappingURL=transaction.js.map