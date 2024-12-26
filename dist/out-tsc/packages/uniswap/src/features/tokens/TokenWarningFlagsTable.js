import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Flex, Text } from 'ui/src';
import { Flag } from 'ui/src/components/icons/Flag';
import { TokenList } from 'uniswap/src/features/dataApi/types';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { WarningModalInfoContainer } from 'uniswap/src/features/tokens/WarningInfoModalContainer';
import { TokenProtectionWarning, getFeeColor } from 'uniswap/src/features/tokens/safetyUtils';
function getWarningFlags({ currencyInfo, formatPercent, t, tokenProtectionWarning, }) {
    var _a;
    const flags = [];
    const isToken = currencyInfo.currency.isToken;
    if (isToken && currencyInfo.currency.buyFeeBps) {
        const buyFeePercent = currencyInfo.currency.buyFeeBps.toNumber() / 100;
        const buyFeeColor = getFeeColor(buyFeePercent);
        flags.push(_jsx(WarningFlag, { children: _jsx(Trans, { i18nKey: "token.safety.warning.feeDescription", components: {
                    fee: (_jsxs(Text, { variant: "body3", color: buyFeeColor, children: [formatPercent(buyFeePercent), " ", t('common.fee').toLowerCase()] })),
                }, values: {
                    action: t('common.bought').toLowerCase(),
                } }) }, "buy-fee"));
    }
    if (isToken && currencyInfo.currency.sellFeeBps) {
        const sellFeePercent = currencyInfo.currency.sellFeeBps.toNumber() / 100;
        const sellFeeColor = getFeeColor(sellFeePercent);
        flags.push(_jsx(WarningFlag, { children: _jsx(Trans, { i18nKey: "token.safety.warning.feeDescription", components: {
                    fee: (_jsxs(Text, { variant: "body3", color: sellFeeColor, children: [formatPercent(sellFeePercent), " ", t('common.fee').toLowerCase()] })),
                }, values: {
                    action: t('common.sold').toLowerCase(),
                } }) }, "sell-fee"));
    }
    if (tokenProtectionWarning === TokenProtectionWarning.SpamAirdrop) {
        flags.push(_jsx(WarningFlag, { children: t('token.safety.warning.spamsUsers') }, "spam-warning"));
    }
    if (tokenProtectionWarning === TokenProtectionWarning.MaliciousImpersonator) {
        flags.push(_jsx(WarningFlag, { children: t('token.safety.warning.impersonator') }, "impersonator-warning"));
    }
    if (tokenProtectionWarning === TokenProtectionWarning.MaliciousGeneral) {
        flags.push(_jsx(WarningFlag, { children: t('token.safety.warning.flaggedAsMalicious') }, "malicious-general-warning"));
    }
    if (((_a = currencyInfo.safetyInfo) === null || _a === void 0 ? void 0 : _a.tokenList) === TokenList.NonDefault) {
        flags.push(_jsx(WarningFlag, { children: t('token.safety.warning.notListedOnExchanges') }, "exchange-warning"));
    }
    return flags;
}
function WarningFlag({ children }) {
    return (_jsxs(Flex, { row: true, width: "100%", alignItems: "center", justifyContent: "flex-start", gap: "$spacing8", children: [_jsx(Flag, { size: "$icon.16", color: "$neutral2" }), _jsx(Text, { variant: "body3", color: "$neutral2", children: children })] }));
}
export function TokenWarningFlagsTable({ currencyInfo, tokenProtectionWarning, }) {
    const { t } = useTranslation();
    const { formatPercent } = useLocalizationContext();
    const flags = useMemo(() => getWarningFlags({ currencyInfo, formatPercent, t, tokenProtectionWarning }), [currencyInfo, formatPercent, t, tokenProtectionWarning]);
    if (flags.length === 0) {
        return null;
    }
    return (_jsx(WarningModalInfoContainer, { gap: "$spacing8", py: "$spacing12", children: flags }));
}
//# sourceMappingURL=TokenWarningFlagsTable.js.map