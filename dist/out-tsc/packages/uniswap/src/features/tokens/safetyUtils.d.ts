import { Currency } from '@uniswap/sdk-core';
import { TFunction } from 'i18next';
import { ColorTokens } from 'ui/src';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
export declare enum TokenProtectionWarning {
    Blocked = 10,
    MaliciousHoneypot = 9,// 100% fot
    FotVeryHigh = 8,// [80, 100)% fot
    MaliciousImpersonator = 7,
    FotHigh = 6,// [5, 80)% fot
    MaliciousGeneral = 5,
    SpamAirdrop = 4,
    FotLow = 3,// (0, 5)% fot
    NonDefault = 2,
    None = 1
}
export declare const TOKEN_PROTECTION_FOT_HONEYPOT_BREAKPOINT = 100;
export declare const TOKEN_PROTECTION_FOT_HIGH_FEE_BREAKPOINT = 80;
export declare const TOKEN_PROTECTION_FOT_FEE_BREAKPOINT = 5;
export declare function getFeeOnTransfer(currency?: Currency): {
    buyFeePercent: number;
    sellFeePercent: number;
    maxFeePercent: number;
};
export declare function getTokenProtectionWarning(currencyInfo?: Maybe<CurrencyInfo>): TokenProtectionWarning;
export declare function getIsFeeRelatedWarning(tokenProtectionWarning?: TokenProtectionWarning): boolean;
export declare function getFeeWarning(feePercent: number): TokenProtectionWarning;
export declare function getTokenWarningSeverity(currencyInfo: Maybe<CurrencyInfo>): WarningSeverity;
export declare function getSeverityFromTokenProtectionWarning(tokenProtectionWarning: TokenProtectionWarning): WarningSeverity;
export declare function getShouldHaveCombinedPluralTreatment(currencyInfo0: CurrencyInfo, currencyInfo1?: CurrencyInfo): boolean;
export declare function useModalHeaderText(currencyInfo0: CurrencyInfo, currencyInfo1?: CurrencyInfo): string | null;
export declare function getModalHeaderText({ t, tokenProtectionWarning, tokenSymbol0, tokenSymbol1, shouldHavePluralTreatment, }: {
    t: TFunction;
    tokenProtectionWarning?: TokenProtectionWarning;
    tokenSymbol0?: string;
    tokenSymbol1?: string;
    shouldHavePluralTreatment?: boolean;
}): string | null;
export declare function useModalSubtitleText(currencyInfo0: CurrencyInfo, currencyInfo1?: CurrencyInfo): string | null;
export declare function getModalSubtitleText({ t, tokenProtectionWarning, tokenSymbol, buyFeePercent, sellFeePercent, shouldHavePluralTreatment, formatPercent, }: {
    t: TFunction;
    tokenProtectionWarning: TokenProtectionWarning | undefined;
    tokenSymbol?: string;
    buyFeePercent: number;
    sellFeePercent: number;
    shouldHavePluralTreatment?: boolean;
    formatPercent: (value: Maybe<string | number>) => string;
}): string | null;
export declare function getModalSubtitleTokenWarningText({ t, tokenProtectionWarning, tokenSymbol, formattedBuyFeePercent, formattedSellFeePercent, shouldHavePluralTreatment, }: {
    t: TFunction;
    tokenProtectionWarning: TokenProtectionWarning;
    tokenSymbol?: string;
    formattedBuyFeePercent?: string;
    formattedSellFeePercent?: string;
    shouldHavePluralTreatment?: boolean;
}): string | null;
export declare function useTokenWarningCardText(currencyInfo: Maybe<CurrencyInfo>): {
    heading: string | null;
    description: string | null;
};
export declare function getCardHeaderText({ t, tokenProtectionWarning, }: {
    t: TFunction;
    tokenProtectionWarning: TokenProtectionWarning;
}): string | null;
export declare function getCardSubtitleText({ t, tokenProtectionWarning, tokenSymbol, buyFeePercent, sellFeePercent, formatPercent, }: {
    t: TFunction;
    tokenProtectionWarning: TokenProtectionWarning;
    tokenSymbol?: string;
    buyFeePercent: number;
    sellFeePercent: number;
    formatPercent: (value: Maybe<string | number>) => string;
}): string | null;
export declare function getFeeColor(feePercent: number): ColorTokens;
//# sourceMappingURL=safetyUtils.d.ts.map