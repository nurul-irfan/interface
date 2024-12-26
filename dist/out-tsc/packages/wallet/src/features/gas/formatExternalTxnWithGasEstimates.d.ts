import { providers } from 'ethers';
import { GasFeeResult } from 'uniswap/src/features/gas/types';
/**
 * This util should be used for formatting all external txn requests with gas estimates. This is
 * primarily WC transactions and dapp transactions on extension.
 *
 * Always use our own gas estimates and override and values from the provider txn request.
 *
 */
export declare function formatExternalTxnWithGasEstimates({ transaction, gasFeeResult, }: {
    transaction: providers.TransactionRequest;
    gasFeeResult: GasFeeResult;
}): providers.TransactionRequest;
//# sourceMappingURL=formatExternalTxnWithGasEstimates.d.ts.map