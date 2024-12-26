import { TransactionDescription } from 'no-yolo-signatures';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { EthTransaction } from 'uniswap/src/types/walletConnect';
export declare function useNoYoloParser(transaction: EthTransaction, chainId?: UniverseChainId): {
    parsedTransactionData: TransactionDescription | undefined;
    isLoading: boolean;
};
//# sourceMappingURL=useNoYoloParser.d.ts.map