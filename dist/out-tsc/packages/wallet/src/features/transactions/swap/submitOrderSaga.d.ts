import { DutchQuoteV2, PriorityQuote, Routing } from 'uniswap/src/data/tradingApi/__generated__/index';
import { AccountMeta } from 'uniswap/src/features/accounts/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { getBaseTradeAnalyticsProperties } from 'uniswap/src/features/transactions/swap/analytics';
import { ValidatedPermit } from 'uniswap/src/features/transactions/swap/utils/trade';
import { TransactionTypeInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare const ORDER_STALENESS_THRESHOLD: number;
export interface SubmitUniswapXOrderParams {
    txId?: string;
    quote: DutchQuoteV2 | PriorityQuote;
    routing: Routing.DUTCH_V2 | Routing.PRIORITY;
    permit: ValidatedPermit;
    chainId: UniverseChainId;
    account: AccountMeta;
    typeInfo: TransactionTypeInfo;
    analytics: ReturnType<typeof getBaseTradeAnalyticsProperties>;
    approveTxHash?: string;
    wrapTxHash?: string;
    onSuccess: () => void;
    onFailure: () => void;
}
export declare function submitUniswapXOrder(params: SubmitUniswapXOrderParams): Generator<import("redux-saga/effects").TakeEffect | import("redux-saga/effects").PutEffect<{
    payload: import("uniswap/src/features/notifications/types").AppNotification;
    type: "notifications/pushNotification";
}> | import("redux-saga/effects").CallEffect<void> | import("redux-saga/effects").CallEffect<import("../../wallet/signing/SignerManager").SignerManager> | import("redux-saga/effects").CallEffect<import("ethers").Signer> | import("redux-saga/effects").PutEffect<{
    payload: import("uniswap/src/features/transactions/types/transactionDetails").TransactionDetails;
    type: "transactions/addTransaction";
}> | import("redux-saga/effects").PutEffect<{
    payload: import("uniswap/src/features/transactions/types/transactionDetails").TransactionDetails;
    type: "transactions/updateTransaction";
}> | import("redux-saga/effects").CallEffect<string> | import("redux-saga/effects").CallEffect<import("uniswap/src/data/tradingApi/__generated__/index").OrderResponse>, void, unknown>;
//# sourceMappingURL=submitOrderSaga.d.ts.map