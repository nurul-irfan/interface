import { providers } from 'ethers';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export type CancelationGasFeeDetails = {
    cancelRequest: providers.TransactionRequest;
    cancelationGasFeeDisplayValue: string;
};
/**
 * Construct cancelation transaction with increased gas (based on current network conditions),
 * then use it to compute new gas info.
 */
export declare function useCancelationGasFeeInfo(transaction: TransactionDetails): CancelationGasFeeDetails | undefined;
//# sourceMappingURL=hooks.d.ts.map