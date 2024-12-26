import { BridgeTransactionInfo, ConfirmedSwapTransactionInfo, ExactInputSwapTransactionInfo, ExactOutputSwapTransactionInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function getAmountsFromTrade(typeInfo: ExactInputSwapTransactionInfo | ExactOutputSwapTransactionInfo | ConfirmedSwapTransactionInfo | BridgeTransactionInfo): {
    inputCurrencyAmountRaw: string;
    outputCurrencyAmountRaw: string;
};
//# sourceMappingURL=getAmountsFromTrade.d.ts.map