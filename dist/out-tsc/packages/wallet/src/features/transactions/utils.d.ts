import { providers } from 'ethers';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { FinalizedTransactionStatus, TransactionDetails, TransactionReceipt, TransactionStatus } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function getSerializableTransactionRequest(request: providers.TransactionRequest, chainId?: UniverseChainId): providers.TransactionRequest;
export declare const ANIMATE_SPRING_CONFIG: {
    stiffness: number;
    damping: number;
    mass: number;
};
export declare function getFinalizedTransactionStatus(currentStatus: TransactionStatus, receiptStatus?: number): FinalizedTransactionStatus;
export declare function getIsCancelable(tx: TransactionDetails): boolean;
export declare function receiptFromEthersReceipt(ethersReceipt: providers.TransactionReceipt | undefined): TransactionReceipt | undefined;
export declare function isOnRampTransaction(tx: TransactionDetails): boolean;
export declare function getDiff(value1: number | string | undefined, value2: number | undefined): number | undefined;
export declare function getPercentageError(diff: number | undefined, estimated: number | string | undefined): number | undefined;
//# sourceMappingURL=utils.d.ts.map