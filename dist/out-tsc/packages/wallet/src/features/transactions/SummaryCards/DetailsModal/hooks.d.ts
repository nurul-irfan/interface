import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function useNetworkFee(transactionDetails: TransactionDetails): {
    value: string;
    amount: string;
};
export declare function useTokenDetailsNavigation(currency: Maybe<CurrencyInfo>, onClose?: () => void): () => void;
//# sourceMappingURL=hooks.d.ts.map