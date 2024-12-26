import { ConfirmedSwapTransactionInfo, TransactionDetails, TransactionListQueryResponse } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function extractUniswapXOrderDetails(transaction: TransactionListQueryResponse): TransactionDetails | null;
export default function parseUniswapXOrderTransaction(transaction: NonNullable<TransactionListQueryResponse>): ConfirmedSwapTransactionInfo | null;
//# sourceMappingURL=extractUniswapXOrderDetails.d.ts.map