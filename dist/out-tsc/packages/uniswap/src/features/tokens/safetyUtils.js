/* eslint-disable consistent-return */
import { NativeCurrency } from '@uniswap/sdk-core';
import { useTranslation } from 'react-i18next';
import { getAlertColor } from 'uniswap/src/components/modals/WarningModal/getAlertColor';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { ProtectionResult } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { AttackType, TokenList } from 'uniswap/src/features/dataApi/types';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { isInterface } from 'utilities/src/platform';
export var TokenProtectionWarning;
(function (TokenProtectionWarning) {
    // THESE NUMERIC VALUES MATTER -- they are used for severity comparison
    TokenProtectionWarning[TokenProtectionWarning["Blocked"] = 10] = "Blocked";
    TokenProtectionWarning[TokenProtectionWarning["MaliciousHoneypot"] = 9] = "MaliciousHoneypot";
    TokenProtectionWarning[TokenProtectionWarning["FotVeryHigh"] = 8] = "FotVeryHigh";
    TokenProtectionWarning[TokenProtectionWarning["MaliciousImpersonator"] = 7] = "MaliciousImpersonator";
    TokenProtectionWarning[TokenProtectionWarning["FotHigh"] = 6] = "FotHigh";
    TokenProtectionWarning[TokenProtectionWarning["MaliciousGeneral"] = 5] = "MaliciousGeneral";
    TokenProtectionWarning[TokenProtectionWarning["SpamAirdrop"] = 4] = "SpamAirdrop";
    TokenProtectionWarning[TokenProtectionWarning["FotLow"] = 3] = "FotLow";
    TokenProtectionWarning[TokenProtectionWarning["NonDefault"] = 2] = "NonDefault";
    TokenProtectionWarning[TokenProtectionWarning["None"] = 1] = "None";
})(TokenProtectionWarning || (TokenProtectionWarning = {}));
export const TOKEN_PROTECTION_FOT_HONEYPOT_BREAKPOINT = 100;
export const TOKEN_PROTECTION_FOT_HIGH_FEE_BREAKPOINT = 80;
export const TOKEN_PROTECTION_FOT_FEE_BREAKPOINT = 5;
export function getFeeOnTransfer(currency) {
    var _a, _b, _c, _d;
    if (!currency || currency.isNative) {
        return {
            buyFeePercent: 0,
            sellFeePercent: 0,
            maxFeePercent: 0,
        };
    }
    const sellFeeBps = ((_b = (_a = currency.sellFeeBps) === null || _a === void 0 ? void 0 : _a.toNumber()) !== null && _b !== void 0 ? _b : 0) / 100;
    const buyFeeBps = ((_d = (_c = currency.buyFeeBps) === null || _c === void 0 ? void 0 : _c.toNumber()) !== null && _d !== void 0 ? _d : 0) / 100;
    // Returns the percent (i.e. 5.1 for 5.1%)
    return {
        buyFeePercent: buyFeeBps,
        sellFeePercent: sellFeeBps,
        maxFeePercent: Math.max(sellFeeBps, buyFeeBps),
    };
}
// eslint-disable-next-line complexity
export function getTokenProtectionWarning(currencyInfo) {
    if (!(currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency) || !(currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.safetyInfo)) {
        return TokenProtectionWarning.NonDefault;
    }
    const { currency, safetyInfo } = currencyInfo;
    const { protectionResult, attackType } = safetyInfo;
    if (currency instanceof NativeCurrency) {
        return TokenProtectionWarning.None;
    }
    const { maxFeePercent: feeOnTransfer } = getFeeOnTransfer(currency);
    // prioritize high > medium > low warning levels
    if (safetyInfo.tokenList === TokenList.Blocked) {
        return TokenProtectionWarning.Blocked;
    }
    else if (feeOnTransfer === TOKEN_PROTECTION_FOT_HONEYPOT_BREAKPOINT) {
        return TokenProtectionWarning.MaliciousHoneypot;
    }
    else if (feeOnTransfer >= TOKEN_PROTECTION_FOT_HIGH_FEE_BREAKPOINT ||
        ((protectionResult === ProtectionResult.Malicious || protectionResult === ProtectionResult.Spam) &&
            attackType === AttackType.HighFees)) {
        return TokenProtectionWarning.FotVeryHigh;
    }
    else if ((protectionResult === ProtectionResult.Malicious || protectionResult === ProtectionResult.Spam) &&
        attackType === AttackType.Impersonator) {
        return TokenProtectionWarning.MaliciousImpersonator;
    }
    else if (feeOnTransfer >= TOKEN_PROTECTION_FOT_FEE_BREAKPOINT) {
        return TokenProtectionWarning.FotHigh;
    }
    else if (protectionResult === ProtectionResult.Malicious && attackType === AttackType.Other) {
        return TokenProtectionWarning.MaliciousGeneral;
    }
    else if (protectionResult === ProtectionResult.Spam && attackType === AttackType.Airdrop) {
        return TokenProtectionWarning.SpamAirdrop;
    }
    else if (feeOnTransfer > 0 && feeOnTransfer < TOKEN_PROTECTION_FOT_FEE_BREAKPOINT) {
        return TokenProtectionWarning.FotLow;
    }
    else if (safetyInfo.tokenList === TokenList.NonDefault) {
        return TokenProtectionWarning.NonDefault;
    }
    return TokenProtectionWarning.None;
}
export function getIsFeeRelatedWarning(tokenProtectionWarning) {
    return (tokenProtectionWarning === TokenProtectionWarning.MaliciousHoneypot ||
        tokenProtectionWarning === TokenProtectionWarning.FotVeryHigh ||
        tokenProtectionWarning === TokenProtectionWarning.FotHigh ||
        tokenProtectionWarning === TokenProtectionWarning.FotLow);
}
export function getFeeWarning(feePercent) {
    // WarningSeverity for styling. Same logic as getTokenWarningSeverity but without non-fee-related cases.
    // If fee >= 5% then HIGH, else 0% < fee < 5% then MEDIUM, else NONE
    let tokenProtectionWarning = TokenProtectionWarning.None;
    if (feePercent >= TOKEN_PROTECTION_FOT_HONEYPOT_BREAKPOINT) {
        tokenProtectionWarning = TokenProtectionWarning.MaliciousHoneypot;
    }
    else if (feePercent >= TOKEN_PROTECTION_FOT_HIGH_FEE_BREAKPOINT) {
        tokenProtectionWarning = TokenProtectionWarning.FotVeryHigh;
    }
    else if (feePercent >= TOKEN_PROTECTION_FOT_FEE_BREAKPOINT) {
        tokenProtectionWarning = TokenProtectionWarning.FotHigh;
    }
    else if (feePercent > 0) {
        tokenProtectionWarning = TokenProtectionWarning.FotLow;
    }
    return tokenProtectionWarning;
}
export function getTokenWarningSeverity(currencyInfo) {
    if (!currencyInfo) {
        return WarningSeverity.None;
    }
    const tokenProtectionWarning = getTokenProtectionWarning(currencyInfo);
    return getSeverityFromTokenProtectionWarning(tokenProtectionWarning);
}
export function getSeverityFromTokenProtectionWarning(tokenProtectionWarning) {
    switch (tokenProtectionWarning) {
        case TokenProtectionWarning.Blocked:
            return WarningSeverity.Blocked;
        case TokenProtectionWarning.MaliciousHoneypot:
        case TokenProtectionWarning.MaliciousImpersonator:
        case TokenProtectionWarning.MaliciousGeneral:
        case TokenProtectionWarning.FotVeryHigh:
        case TokenProtectionWarning.FotHigh:
            return WarningSeverity.High;
        case TokenProtectionWarning.SpamAirdrop:
        case TokenProtectionWarning.FotLow:
            return WarningSeverity.Medium;
        case TokenProtectionWarning.NonDefault:
            return WarningSeverity.Low;
        case TokenProtectionWarning.None:
            return WarningSeverity.None;
    }
}
// Only combine into one plural-languaged modal if there are two tokens prefilled at the same time, and BOTH are low or BOTH are blocked
// i.e. interface PDP, or interface prefilled via URL `?inputCurrency=0x...&outputCurrency=0x...`
export function getShouldHaveCombinedPluralTreatment(currencyInfo0, currencyInfo1) {
    const designTreatment0 = getTokenWarningSeverity(currencyInfo0);
    const designTreatment1 = getTokenWarningSeverity(currencyInfo1);
    const pluralLowWarnings = currencyInfo1 && designTreatment0 === WarningSeverity.Low && designTreatment1 === WarningSeverity.Low;
    const pluralBlockedWarnings = currencyInfo1 && designTreatment0 === WarningSeverity.Blocked && designTreatment1 === WarningSeverity.Blocked;
    const plural = pluralLowWarnings || pluralBlockedWarnings;
    return plural !== null && plural !== void 0 ? plural : false;
}
export function useModalHeaderText(currencyInfo0, currencyInfo1) {
    var _a, _b;
    const shouldHavePluralTreatment = getShouldHaveCombinedPluralTreatment(currencyInfo0, currencyInfo1);
    if (!shouldHavePluralTreatment && currencyInfo1) {
        throw new Error('Should only combine into one plural-languaged modal if BOTH are low or BOTH are blocked');
    }
    const { t } = useTranslation();
    const tokenProtectionWarning = getTokenProtectionWarning(currencyInfo0);
    if (!tokenProtectionWarning) {
        return null;
    }
    const tokenSymbol0 = (_a = currencyInfo0.currency) === null || _a === void 0 ? void 0 : _a.symbol;
    const tokenSymbol1 = (_b = currencyInfo1 === null || currencyInfo1 === void 0 ? void 0 : currencyInfo1.currency) === null || _b === void 0 ? void 0 : _b.symbol;
    return getModalHeaderText({ t, tokenSymbol0, tokenSymbol1, tokenProtectionWarning, shouldHavePluralTreatment });
}
export function getModalHeaderText({ t, tokenProtectionWarning, tokenSymbol0, tokenSymbol1, shouldHavePluralTreatment, }) {
    if (!tokenProtectionWarning) {
        return null;
    }
    switch (tokenProtectionWarning) {
        case TokenProtectionWarning.Blocked:
            return shouldHavePluralTreatment
                ? t('token.safety.blocked.title.tokensNotAvailable', {
                    tokenSymbol0,
                    tokenSymbol1,
                })
                : t('token.safety.blocked.title.tokenNotAvailable', { tokenSymbol: tokenSymbol0 });
        case TokenProtectionWarning.MaliciousHoneypot:
            return t('token.safety.warning.sellFee100.title');
        case TokenProtectionWarning.FotVeryHigh:
            return t('token.safety.warning.fotVeryHigh.title');
        case TokenProtectionWarning.MaliciousImpersonator:
            return t('token.safety.warning.impersonator.title');
        case TokenProtectionWarning.FotHigh:
            return t('token.safety.warning.fotHigh.title');
        case TokenProtectionWarning.MaliciousGeneral:
            return t('token.safety.warning.malicious.title');
        case TokenProtectionWarning.SpamAirdrop:
            return t('token.safety.warning.spam.title');
        case TokenProtectionWarning.FotLow:
            return t('token.safety.warning.fotLow.title');
        case TokenProtectionWarning.NonDefault:
            return t('token.safety.warning.alwaysDoYourResearch');
        case TokenProtectionWarning.None:
            return null;
    }
}
export function useModalSubtitleText(currencyInfo0, currencyInfo1) {
    const shouldHavePluralTreatment = getShouldHaveCombinedPluralTreatment(currencyInfo0, currencyInfo1);
    if (!shouldHavePluralTreatment && currencyInfo1) {
        throw new Error('Should only combine into one plural-languaged modal if BOTH are low or BOTH are blocked');
    }
    const { t } = useTranslation();
    const { formatPercent } = useLocalizationContext();
    const tokenProtectionWarning = getTokenProtectionWarning(currencyInfo0);
    const { buyFeePercent, sellFeePercent } = getFeeOnTransfer(currencyInfo0.currency);
    return getModalSubtitleText({
        t,
        tokenProtectionWarning,
        tokenSymbol: currencyInfo0.currency.symbol,
        buyFeePercent,
        sellFeePercent,
        shouldHavePluralTreatment,
        formatPercent,
    });
}
export function getModalSubtitleText({ t, tokenProtectionWarning, tokenSymbol, buyFeePercent, sellFeePercent, shouldHavePluralTreatment, formatPercent, }) {
    if (!tokenProtectionWarning) {
        return null;
    }
    const formattedBuyFeePercent = buyFeePercent > 0 ? formatPercent(buyFeePercent) : undefined;
    const formattedSellFeePercent = sellFeePercent > 0 ? formatPercent(sellFeePercent) : undefined;
    const warningCopy = getModalSubtitleTokenWarningText({
        t,
        tokenProtectionWarning,
        tokenSymbol,
        formattedBuyFeePercent,
        formattedSellFeePercent,
        shouldHavePluralTreatment,
    });
    return warningCopy;
}
export function getModalSubtitleTokenWarningText({ t, tokenProtectionWarning, tokenSymbol, formattedBuyFeePercent, formattedSellFeePercent, shouldHavePluralTreatment, }) {
    switch (tokenProtectionWarning) {
        case TokenProtectionWarning.Blocked:
            return t('token.safetyLevel.blocked.message');
        case TokenProtectionWarning.MaliciousHoneypot:
            return t('token.safety.warning.honeypot.message', { tokenSymbol });
        case TokenProtectionWarning.MaliciousGeneral:
            return (t('token.safety.warning.malicious.general.message', { tokenSymbol }) +
                ' ' +
                t('token.safety.warning.doYourOwnResearch'));
        case TokenProtectionWarning.MaliciousImpersonator:
            return t('token.safety.warning.malicious.impersonator.message', { tokenSymbol });
        case TokenProtectionWarning.SpamAirdrop:
            return t('token.safety.warning.spam.message', { tokenSymbol }) + ' ' + t('token.safety.warning.doYourOwnResearch');
        case TokenProtectionWarning.FotVeryHigh:
        case TokenProtectionWarning.FotHigh:
        case TokenProtectionWarning.FotLow: {
            const feePercentCopy = !!formattedBuyFeePercent && !!formattedSellFeePercent
                ? t('token.safety.warning.tokenChargesFee.both.message', {
                    tokenSymbol,
                    buyFeePercent: formattedBuyFeePercent,
                    sellFeePercent: formattedSellFeePercent,
                })
                : formattedBuyFeePercent
                    ? t('token.safety.warning.tokenChargesFee.buy.message', {
                        tokenSymbol,
                        feePercent: formattedBuyFeePercent,
                    })
                    : t('token.safety.warning.tokenChargesFee.sell.message', {
                        tokenSymbol,
                        feePercent: formattedSellFeePercent,
                    });
            return (feePercentCopy +
                ' ' +
                t('token.safety.warning.mayResultInLoss') +
                ' ' +
                t('token.safety.fees.uniswapLabsDoesNotReceive'));
        }
        case TokenProtectionWarning.NonDefault:
            if (shouldHavePluralTreatment) {
                return t('token.safetyLevel.medium.message.plural');
            }
            return t('token.safety.warning.medium.heading.named', { tokenSymbol });
        case TokenProtectionWarning.None:
            return null;
    }
}
export function useTokenWarningCardText(currencyInfo) {
    const { t } = useTranslation();
    const { formatPercent } = useLocalizationContext();
    if (!currencyInfo) {
        return {
            heading: null,
            description: null,
        };
    }
    const tokenProtectionWarning = getTokenProtectionWarning(currencyInfo);
    const { buyFeePercent, sellFeePercent } = getFeeOnTransfer(currencyInfo.currency);
    return {
        heading: getCardHeaderText({ t, tokenProtectionWarning }),
        description: getCardSubtitleText({
            t,
            tokenProtectionWarning,
            tokenSymbol: currencyInfo.currency.symbol,
            buyFeePercent,
            sellFeePercent,
            formatPercent,
        }),
    };
}
export function getCardHeaderText({ t, tokenProtectionWarning, }) {
    switch (tokenProtectionWarning) {
        case TokenProtectionWarning.MaliciousHoneypot:
            return t('token.safety.warning.honeypot.title');
        case TokenProtectionWarning.FotVeryHigh:
            return t('token.safety.warning.fotVeryHigh.title');
        case TokenProtectionWarning.MaliciousImpersonator:
            return t('token.safety.warning.impersonator.title');
        case TokenProtectionWarning.FotHigh:
            return t('token.safety.warning.fotHigh.title');
        case TokenProtectionWarning.MaliciousGeneral:
            return t('token.safety.warning.malicious.title');
        case TokenProtectionWarning.SpamAirdrop:
            return t('token.safety.warning.spam.title');
        case TokenProtectionWarning.FotLow:
            return t('token.safety.warning.fotLow.title');
        case TokenProtectionWarning.NonDefault:
        case TokenProtectionWarning.None:
        default:
            return null;
    }
}
export function getCardSubtitleText({ t, tokenProtectionWarning, tokenSymbol, buyFeePercent, sellFeePercent, formatPercent, }) {
    const formattedBuyFeePercent = buyFeePercent > 0 ? formatPercent(buyFeePercent) : undefined;
    const formattedSellFeePercent = sellFeePercent > 0 ? formatPercent(sellFeePercent) : undefined;
    switch (tokenProtectionWarning) {
        case TokenProtectionWarning.Blocked:
            return isInterface
                ? t('token.safety.warning.blocked.description.default_one')
                : t('token.safetyLevel.blocked.message');
        case TokenProtectionWarning.MaliciousHoneypot:
            return t('token.safety.warning.sellFee100.message', { tokenSymbol });
        case TokenProtectionWarning.MaliciousGeneral:
            return t('token.safety.warning.malicious.general.message', { tokenSymbol });
        case TokenProtectionWarning.MaliciousImpersonator:
            return t('token.safety.warning.malicious.impersonator.message.short', { tokenSymbol });
        case TokenProtectionWarning.SpamAirdrop:
            return t('token.safety.warning.spam.message', { tokenSymbol });
        case TokenProtectionWarning.FotVeryHigh:
        case TokenProtectionWarning.FotHigh:
        case TokenProtectionWarning.FotLow: {
            const feePercentCopy = !!formattedBuyFeePercent && !!formattedSellFeePercent
                ? t('token.safety.warning.tokenChargesFee.both.message', {
                    tokenSymbol,
                    buyFeePercent: formattedBuyFeePercent,
                    sellFeePercent: formattedSellFeePercent,
                })
                : formattedBuyFeePercent
                    ? t('token.safety.warning.tokenChargesFee.buy.message', {
                        tokenSymbol,
                        feePercent: formattedBuyFeePercent,
                    })
                    : t('token.safety.warning.tokenChargesFee.sell.message', {
                        tokenSymbol,
                        feePercent: formattedSellFeePercent,
                    });
            return feePercentCopy;
        }
        case TokenProtectionWarning.NonDefault:
            return t('token.safety.warning.medium.heading.named', { tokenSymbol });
        case TokenProtectionWarning.None:
            return null;
    }
}
export function getFeeColor(feePercent) {
    const tokenProtectionWarning = getFeeWarning(feePercent);
    const severity = getSeverityFromTokenProtectionWarning(tokenProtectionWarning);
    const { headerText: textColor } = getAlertColor(severity);
    return textColor;
}
//# sourceMappingURL=safetyUtils.js.map