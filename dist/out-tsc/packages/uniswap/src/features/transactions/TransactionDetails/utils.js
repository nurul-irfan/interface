import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { TokenProtectionWarning, getFeeWarning, getIsFeeRelatedWarning, getSeverityFromTokenProtectionWarning, getTokenProtectionWarning, } from 'uniswap/src/features/tokens/safetyUtils';
export function getFeeSeverity(fee) {
    // WarningSeverity for styling. Same logic as getTokenWarningSeverity but without non-fee-related cases.
    // If fee >= 5% then HIGH, else 0% < fee < 5% then MEDIUM, else NONE
    const tokenProtectionWarning = getFeeWarning(parseFloat(fee.toFixed()));
    const severity = getSeverityFromTokenProtectionWarning(tokenProtectionWarning);
    return { severity, tokenProtectionWarning };
}
export function getHighestFeeSeverity(feeOnTransferProps) {
    if (!feeOnTransferProps) {
        return { severity: WarningSeverity.None, tokenProtectionWarning: TokenProtectionWarning.None };
    }
    const { inputTokenInfo, outputTokenInfo } = feeOnTransferProps;
    if (!inputTokenInfo.fee.greaterThan(0) && !outputTokenInfo.fee.greaterThan(0)) {
        return { severity: WarningSeverity.None, tokenProtectionWarning: TokenProtectionWarning.None };
    }
    const isInputFeeHigher = inputTokenInfo.fee.greaterThan(outputTokenInfo.fee);
    const feeType = isInputFeeHigher ? 'sell' : 'buy';
    const highestFeeTokenInfo = isInputFeeHigher ? inputTokenInfo : outputTokenInfo;
    return { feeType, highestFeeTokenInfo, ...getFeeSeverity(highestFeeTokenInfo.fee) };
}
export function getShouldDisplayTokenWarningCard({ feeOnTransferProps, tokenWarningProps, }) {
    const { tokenProtectionWarning, severity, currencyInfo } = tokenWarningProps;
    const { severity: feeSeverity, tokenProtectionWarning: feeWarning, highestFeeTokenInfo, feeType, } = getHighestFeeSeverity(feeOnTransferProps);
    const feePercent = highestFeeTokenInfo ? parseFloat(highestFeeTokenInfo.fee.toFixed()) : undefined;
    const feeWarningMoreSevere = feeWarning > tokenProtectionWarning;
    const tokenWarningIsFeeRelated = getIsFeeRelatedWarning(tokenProtectionWarning);
    const tokenFeeWarningNotRelevant = tokenWarningIsFeeRelated && (feeSeverity === severity || !highestFeeTokenInfo);
    // We want to show the feeWarning over the tokenWarning IF
    // 1) the fewWarning is a higher priority than the tokenWarning
    // 2) if the tokenWarning is fee-related and feeWarning and tokenWarning of are equal severity, since the feeWarning's fee % is fresher (simulated trade from TradingApi)
    // 3) if the tokenWarning is fee-related but there is no feeWarning (for example if the token has a buy tax but we're selling the token)
    const showFeeSeverityWarning = feeWarningMoreSevere || tokenFeeWarningNotRelevant;
    const severityToDisplay = showFeeSeverityWarning ? feeSeverity : severity;
    const tokenProtectionWarningToDisplay = showFeeSeverityWarning ? feeWarning : tokenProtectionWarning;
    const currencyInfoToDisplay = showFeeSeverityWarning ? highestFeeTokenInfo === null || highestFeeTokenInfo === void 0 ? void 0 : highestFeeTokenInfo.currencyInfo : currencyInfo;
    return {
        shouldDisplayTokenWarningCard: severityToDisplay === WarningSeverity.High,
        tokenProtectionWarningToDisplay,
        feePercent,
        feeType,
        tokenFeeInfo: highestFeeTokenInfo,
        currencyInfoToDisplay,
        showFeeSeverityWarning,
    };
}
export function getRelevantTokenWarningSeverity(acceptedDerivedSwapInfo) {
    // We only care about a non-fee-related warning on the output token, since the user already owns the input token, so only sell-tax warning are relevant
    const outputCurrency = acceptedDerivedSwapInfo === null || acceptedDerivedSwapInfo === void 0 ? void 0 : acceptedDerivedSwapInfo.currencies.output;
    const outputWarning = getTokenProtectionWarning(outputCurrency);
    const outputSeverity = getSeverityFromTokenProtectionWarning(outputWarning);
    return {
        currencyInfo: outputCurrency,
        tokenProtectionWarning: outputWarning,
        severity: outputSeverity,
    };
}
//# sourceMappingURL=utils.js.map