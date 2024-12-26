import { providers } from 'ethers';
import { BridgeTransactionDetails, ClassicTransactionDetails, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function attemptReplaceTransaction(transaction: ClassicTransactionDetails | BridgeTransactionDetails, newTxRequest: providers.TransactionRequest, isCancellation?: boolean): Generator<import("redux-saga/effects").PutEffect<{
    payload: import("uniswap/src/features/notifications/types").AppNotification;
    type: "notifications/pushNotification";
}> | import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<import("../wallet/signing/SignerManager").SignerManager> | import("redux-saga/effects").CallEffect<providers.JsonRpcProvider> | import("redux-saga/effects").PutEffect<{
    payload: TransactionDetails;
    type: "transactions/addTransaction";
}> | import("redux-saga/effects").CallEffect<{
    transactionResponse: providers.TransactionResponse;
    populatedRequest: providers.TransactionRequest;
}> | import("redux-saga/effects").PutEffect<{
    payload: import("uniswap/src/features/transactions/types/transactionDetails").TransactionId & {
        address: string;
    };
    type: "transactions/deleteTransaction";
}>, void, unknown>;
//# sourceMappingURL=replaceTransactionSaga.d.ts.map