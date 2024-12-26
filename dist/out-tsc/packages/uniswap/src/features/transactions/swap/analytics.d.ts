import { Currency, CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import { Routing } from 'uniswap/src/data/tradingApi/__generated__';
import { LocalizationContextState } from 'uniswap/src/features/language/LocalizationContext';
import { SwapRouting, SwapTradeBaseProperties } from 'uniswap/src/features/telemetry/types';
import { TransactionSettingsContextState } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
import { DerivedSwapInfo } from 'uniswap/src/features/transactions/swap/types/derivedSwapInfo';
import { Trade } from 'uniswap/src/features/transactions/swap/types/trade';
import { ITraceContext } from 'utilities/src/telemetry/trace/TraceContext';
export declare function useSwapAnalytics(derivedSwapInfo: DerivedSwapInfo): void;
export declare function getBaseTradeAnalyticsProperties({ formatter, trade, currencyInAmountUSD, currencyOutAmountUSD, portfolioBalanceUsd, trace, }: {
    formatter: LocalizationContextState;
    trade: Trade<Currency, Currency, TradeType>;
    currencyInAmountUSD?: Maybe<CurrencyAmount<Currency>>;
    currencyOutAmountUSD?: Maybe<CurrencyAmount<Currency>>;
    portfolioBalanceUsd?: number;
    trace: ITraceContext;
}): SwapTradeBaseProperties;
export declare function getBaseTradeAnalyticsPropertiesFromSwapInfo({ transactionSettings, derivedSwapInfo, formatter, trace, }: {
    transactionSettings: TransactionSettingsContextState;
    derivedSwapInfo: DerivedSwapInfo;
    formatter: LocalizationContextState;
    trace: ITraceContext;
}): SwapTradeBaseProperties;
export declare function logSwapQuoteFetch({ chainId, isUSDQuote, isQuickRoute, }: {
    chainId: number;
    isUSDQuote?: boolean;
    isQuickRoute?: boolean;
}): void;
export declare function tradeRoutingToFillType({ routing, indicative, }: {
    routing: Routing;
    indicative: boolean;
}): SwapRouting;
//# sourceMappingURL=analytics.d.ts.map