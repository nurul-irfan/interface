import { Currency } from '@uniswap/sdk-core';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { TransactionState } from 'uniswap/src/features/transactions/types/transactionState';
interface Props {
    transactionDetails: TransactionDetails;
    inputCurrency: Maybe<Currency>;
    outputCurrency: Maybe<Currency>;
}
/**
 * Used to synchronously create swap form state given a transaction and relevant currencies.
 */
export declare function createSwapFormFromTxDetails({ transactionDetails, inputCurrency, outputCurrency, }: Props): TransactionState | undefined;
/**
 * Used to synchronously create wrap form state given a transaction and relevant currencies.
 */
export declare function createWrapFormFromTxDetails({ transactionDetails, inputCurrency, outputCurrency, }: Props): TransactionState | undefined;
export {};
//# sourceMappingURL=createSwapFormFromTxDetails.d.ts.map