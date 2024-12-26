import { CurrencyAmount, NativeCurrency } from '@uniswap/sdk-core';
import { GasEstimate } from 'uniswap/src/data/tradingApi/types';
import { GasStrategyType, GasStrategyWithConditions } from 'uniswap/src/features/gating/configs';
export declare function hasSufficientFundsIncludingGas(params: {
    transactionAmount?: CurrencyAmount<NativeCurrency>;
    gasFee?: string;
    nativeCurrencyBalance?: CurrencyAmount<NativeCurrency>;
}): boolean;
export declare function findLocalGasStrategy(gasEstimate: GasEstimate, type: GasStrategyType): GasStrategyWithConditions | undefined;
//# sourceMappingURL=utils.d.ts.map