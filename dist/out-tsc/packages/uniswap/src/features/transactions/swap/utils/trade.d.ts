import providers from '@ethersproject/providers';
import { Protocol } from '@uniswap/router-sdk';
import { NullablePermit, Permit } from 'uniswap/src/data/tradingApi/__generated__/index';
import { LocalizationContextState } from 'uniswap/src/features/language/LocalizationContext';
import { IndicativeTrade, Trade } from 'uniswap/src/features/transactions/swap/types/trade';
import { BridgeTransactionInfo, ExactInputSwapTransactionInfo, ExactOutputSwapTransactionInfo, GasFeeEstimates } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function tradeToTransactionInfo(trade: Trade, transactedUSDValue?: number, gasEstimates?: GasFeeEstimates): ExactInputSwapTransactionInfo | ExactOutputSwapTransactionInfo | BridgeTransactionInfo;
export declare function requireAcceptNewTrade(oldTrade: Maybe<Trade>, newTrade: Maybe<Trade>): boolean;
export declare const getRateToDisplay: (formatter: LocalizationContextState, trade: Trade | IndicativeTrade, showInverseRate: boolean) => string;
export declare function getProtocolVersionFromTrade(trade: Trade): Protocol | undefined;
export type ValidatedTransactionRequest = providers.TransactionRequest & {
    to: string;
    chainId: number;
};
export declare function validateTransactionRequest(request?: providers.TransactionRequest | null): ValidatedTransactionRequest | undefined;
type RemoveUndefined<T> = {
    [P in keyof T]-?: Exclude<T[P], undefined>;
};
export type ValidatedPermit = RemoveUndefined<Permit>;
export declare function validatePermit(permit: NullablePermit | undefined): ValidatedPermit | undefined;
export {};
//# sourceMappingURL=trade.d.ts.map