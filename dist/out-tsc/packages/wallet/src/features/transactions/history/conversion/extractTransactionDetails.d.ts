import { TransactionDetails, TransactionListQueryResponse } from 'uniswap/src/features/transactions/types/transactionDetails';
/**
 * Parses txn API response item and identifies known txn type. Helps strictly
 * type txn summary data to be used within UI.
 *
 * @param transaction Transaction api response item to parse.
 * @returns Formatted TransactionDetails object.
 */
export default function extractTransactionDetails(transaction: TransactionListQueryResponse): TransactionDetails | null;
//# sourceMappingURL=extractTransactionDetails.d.ts.map