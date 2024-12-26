import { FORTransaction, FiatOnRampTransactionDetails } from 'uniswap/src/features/fiatOnRamp/types';
import { TransactionDetails, TransactionListQueryResponse } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function extractFiatOnRampTransactionDetails(transaction: FORTransaction): FiatOnRampTransactionDetails | undefined;
export declare function extractOnRampTransactionDetails(transaction: TransactionListQueryResponse): TransactionDetails | null;
//# sourceMappingURL=extractFiatOnRampTransactionDetails.d.ts.map