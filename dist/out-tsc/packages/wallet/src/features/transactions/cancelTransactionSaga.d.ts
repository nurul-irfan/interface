import { providers } from 'ethers';
import { TransactionDetails, UniswapXOrderDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function attemptCancelTransaction(transaction: TransactionDetails, cancelRequest: providers.TransactionRequest): Generator<import("redux-saga/effects").CallEffect<void>, void, unknown>;
export declare function getCancelOrderTxRequest(tx: UniswapXOrderDetails): Promise<providers.TransactionRequest | undefined>;
//# sourceMappingURL=cancelTransactionSaga.d.ts.map