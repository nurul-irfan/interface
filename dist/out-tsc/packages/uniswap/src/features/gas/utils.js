import { areEqualGasStrategies } from 'uniswap/src/features/gas/types';
import { DynamicConfigs, } from 'uniswap/src/features/gating/configs';
import { Statsig } from 'uniswap/src/features/gating/sdk/statsig';
import { ValueType, getCurrencyAmount } from 'uniswap/src/features/tokens/getCurrencyAmount';
function getNativeCurrencyTotalSpend(value, gasFee, nativeCurrency) {
    if (!gasFee || !nativeCurrency) {
        return value;
    }
    const gasFeeAmount = getCurrencyAmount({
        value: gasFee,
        valueType: ValueType.Raw,
        currency: nativeCurrency,
    });
    return value && gasFeeAmount ? gasFeeAmount.add(value) : gasFeeAmount;
}
export function hasSufficientFundsIncludingGas(params) {
    const { transactionAmount, gasFee, nativeCurrencyBalance } = params;
    const totalSpend = getNativeCurrencyTotalSpend(transactionAmount, gasFee, nativeCurrencyBalance === null || nativeCurrencyBalance === void 0 ? void 0 : nativeCurrencyBalance.currency);
    return !totalSpend || !(nativeCurrencyBalance === null || nativeCurrencyBalance === void 0 ? void 0 : nativeCurrencyBalance.lessThan(totalSpend));
}
// Function to find the name of a gas strategy based on the GasEstimate
export function findLocalGasStrategy(gasEstimate, type) {
    const gasStrategies = Statsig.getConfig(DynamicConfigs.GasStrategies).value;
    return gasStrategies.strategies.find((s) => s.conditions.types === type && areEqualGasStrategies(s.strategy, gasEstimate.strategy));
}
//# sourceMappingURL=utils.js.map