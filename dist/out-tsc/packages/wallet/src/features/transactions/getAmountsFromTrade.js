import { TradeType } from '@uniswap/sdk-core';
import { isBridgeTypeInfo, isConfirmedSwapTypeInfo, } from 'uniswap/src/features/transactions/types/transactionDetails';
export function getAmountsFromTrade(typeInfo) {
    if (isConfirmedSwapTypeInfo(typeInfo) || isBridgeTypeInfo(typeInfo)) {
        const { inputCurrencyAmountRaw, outputCurrencyAmountRaw } = typeInfo;
        return { inputCurrencyAmountRaw, outputCurrencyAmountRaw };
    }
    return typeInfo.tradeType === TradeType.EXACT_OUTPUT
        ? {
            inputCurrencyAmountRaw: typeInfo.expectedInputCurrencyAmountRaw,
            outputCurrencyAmountRaw: typeInfo.outputCurrencyAmountRaw,
        }
        : {
            inputCurrencyAmountRaw: typeInfo.inputCurrencyAmountRaw,
            outputCurrencyAmountRaw: typeInfo.expectedOutputCurrencyAmountRaw,
        };
}
//# sourceMappingURL=getAmountsFromTrade.js.map