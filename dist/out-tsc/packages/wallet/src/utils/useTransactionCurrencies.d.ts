import { TransactionDescription } from 'no-yolo-signatures';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
export declare function useTransactionCurrencies(args: {
    chainId?: UniverseChainId;
    to?: string;
    parsedTransactionData?: TransactionDescription;
}): CurrencyInfo[];
//# sourceMappingURL=useTransactionCurrencies.d.ts.map