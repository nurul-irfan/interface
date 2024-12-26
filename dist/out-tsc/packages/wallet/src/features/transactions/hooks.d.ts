import { Currency } from '@uniswap/sdk-core';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { QueuedOrderStatus, TransactionDetails, TransactionStatus, TransactionType, UniswapXOrderDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { TransactionState } from 'uniswap/src/features/transactions/types/transactionState';
export declare function usePendingTransactions(address: Address | null, ignoreTransactionTypes?: TransactionType[]): TransactionDetails[] | undefined;
declare const ERRORED_QUEUE_STATUSES: readonly [QueuedOrderStatus.AppClosed, QueuedOrderStatus.ApprovalFailed, QueuedOrderStatus.WrapFailed, QueuedOrderStatus.SubmissionFailed, QueuedOrderStatus.Stale];
export type ErroredQueuedOrderStatus = (typeof ERRORED_QUEUE_STATUSES)[number];
export type ErroredQueuedOrder = UniswapXOrderDetails & {
    status: TransactionStatus.Pending;
    queueStatus: ErroredQueuedOrderStatus;
};
export declare function useErroredQueuedOrders(address: Address | null): ErroredQueuedOrder[] | undefined;
export declare function useSortedPendingTransactions(address: Address | null): TransactionDetails[] | undefined;
export declare function useSelectTransaction(address: Address | undefined, chainId: UniverseChainId | undefined, txId: string | undefined): TransactionDetails | undefined;
export declare function useCreateSwapFormState(address: Address | undefined, chainId: UniverseChainId | undefined, txId: string | undefined): TransactionState | undefined;
export declare function useCreateWrapFormState(address: Address | undefined, chainId: UniverseChainId | undefined, txId: string | undefined, inputCurrency: Maybe<Currency>, outputCurrency: Maybe<Currency>): TransactionState | undefined;
/**
 * Merge local and remote transactions. If duplicated hash found use data from local store.
 */
export declare function useMergeLocalAndRemoteTransactions(address: Address, remoteTransactions: TransactionDetails[] | undefined): TransactionDetails[] | undefined;
export declare function useIsQueuedTransaction(tx: TransactionDetails): boolean;
export {};
//# sourceMappingURL=hooks.d.ts.map