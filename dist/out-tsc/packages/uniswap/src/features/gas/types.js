export function areEqualGasStrategies(a, b) {
    if (!a || !b) {
        return false;
    }
    // displayLimitInflationFactor is not returned by the server, so it's ignored here
    return (a.limitInflationFactor === b.limitInflationFactor &&
        a.priceInflationFactor === b.priceInflationFactor &&
        a.percentileThresholdFor1559Fee === b.percentileThresholdFor1559Fee &&
        a.minPriorityFeeGwei === b.minPriorityFeeGwei &&
        a.maxPriorityFeeGwei === b.maxPriorityFeeGwei);
}
export function getGasPrice(estimate) {
    return 'gasPrice' in estimate ? estimate.gasPrice : estimate.maxFeePerGas;
}
export function validateGasFeeResult(gasFee) {
    if (gasFee.value === undefined || gasFee.error) {
        return undefined;
    }
    return { ...gasFee, value: gasFee.value, error: null };
}
//# sourceMappingURL=types.js.map