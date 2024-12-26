import { jsx as _jsx } from "react/jsx-runtime";
import { TouchableArea } from 'ui/src';
import { InlineWarningCard } from 'uniswap/src/components/InlineWarningCard/InlineWarningCard';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import Trace from 'uniswap/src/features/telemetry/Trace';
import { ElementName } from 'uniswap/src/features/telemetry/constants';
import { TokenProtectionWarning, getCardHeaderText, getCardSubtitleText, getFeeOnTransfer, getSeverityFromTokenProtectionWarning, getTokenProtectionWarning, getTokenWarningSeverity, useTokenWarningCardText, } from 'uniswap/src/features/tokens/safetyUtils';
import { useTranslation } from 'uniswap/src/i18n';
import { currencyIdToAddress } from 'uniswap/src/utils/currencyId';
function useTokenWarningOverrides(currencyInfo, tokenProtectionWarningOverride, feeOnTransferOverride) {
    var _a, _b;
    const { t } = useTranslation();
    const { formatPercent } = useLocalizationContext();
    const { heading: headingDefault, description: descriptionDefault } = useTokenWarningCardText(currencyInfo);
    const { buyFeePercent, sellFeePercent } = getFeeOnTransfer(currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency);
    const severity = tokenProtectionWarningOverride
        ? getSeverityFromTokenProtectionWarning(tokenProtectionWarningOverride)
        : getTokenWarningSeverity(currencyInfo);
    const headingOverride = getCardHeaderText({
        t,
        tokenProtectionWarning: tokenProtectionWarningOverride !== null && tokenProtectionWarningOverride !== void 0 ? tokenProtectionWarningOverride : TokenProtectionWarning.None,
    });
    const descriptionOverride = getCardSubtitleText({
        t,
        tokenProtectionWarning: tokenProtectionWarningOverride !== null && tokenProtectionWarningOverride !== void 0 ? tokenProtectionWarningOverride : TokenProtectionWarning.None,
        tokenSymbol: currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency.symbol,
        buyFeePercent: (_a = feeOnTransferOverride === null || feeOnTransferOverride === void 0 ? void 0 : feeOnTransferOverride.buyFeePercent) !== null && _a !== void 0 ? _a : buyFeePercent,
        sellFeePercent: (_b = feeOnTransferOverride === null || feeOnTransferOverride === void 0 ? void 0 : feeOnTransferOverride.sellFeePercent) !== null && _b !== void 0 ? _b : sellFeePercent,
        formatPercent,
    });
    const heading = tokenProtectionWarningOverride ? headingOverride : headingDefault;
    const description = tokenProtectionWarningOverride ? descriptionOverride : descriptionDefault;
    return { severity, heading, description };
}
export function TokenWarningCard({ currencyInfo, tokenProtectionWarningOverride, feeOnTransferOverride, headingTestId, descriptionTestId, hideCtaIcon, checked, setChecked, onPress, }) {
    var _a, _b;
    const { t } = useTranslation();
    const { severity, heading, description } = useTokenWarningOverrides(currencyInfo, tokenProtectionWarningOverride, feeOnTransferOverride);
    if (!currencyInfo || !severity || !description) {
        return null;
    }
    const { buyFeePercent, sellFeePercent } = getFeeOnTransfer(currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency);
    const analyticsProperties = {
        tokenSymbol: currencyInfo.currency.symbol,
        chainId: currencyInfo.currency.chainId,
        tokenAddress: currencyIdToAddress(currencyInfo.currencyId),
        warningSeverity: WarningSeverity[severity],
        tokenProtectionWarning: TokenProtectionWarning[tokenProtectionWarningOverride !== null && tokenProtectionWarningOverride !== void 0 ? tokenProtectionWarningOverride : getTokenProtectionWarning(currencyInfo)],
        buyFeePercent: (_a = feeOnTransferOverride === null || feeOnTransferOverride === void 0 ? void 0 : feeOnTransferOverride.buyFeePercent) !== null && _a !== void 0 ? _a : buyFeePercent,
        sellFeePercent: (_b = feeOnTransferOverride === null || feeOnTransferOverride === void 0 ? void 0 : feeOnTransferOverride.sellFeePercent) !== null && _b !== void 0 ? _b : sellFeePercent,
        safetyInfo: currencyInfo.safetyInfo,
    };
    return (_jsx(Trace, { logPress: !!onPress, element: ElementName.TokenWarningCard, properties: analyticsProperties, children: _jsx(TouchableArea, { onPress: onPress, children: _jsx(InlineWarningCard, { hideCtaIcon: hideCtaIcon, severity: severity, checkboxLabel: setChecked ? t('common.button.understand') : undefined, heading: heading !== null && heading !== void 0 ? heading : undefined, description: description, headingTestId: headingTestId, descriptionTestId: descriptionTestId, checked: checked, setChecked: setChecked, analyticsProperties: analyticsProperties, onPressCtaButton: onPress }) }) }));
}
//# sourceMappingURL=TokenWarningCard.js.map