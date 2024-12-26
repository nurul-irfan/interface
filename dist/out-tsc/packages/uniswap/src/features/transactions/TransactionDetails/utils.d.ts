import { Percent } from '@uniswap/sdk-core';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { TokenProtectionWarning } from 'uniswap/src/features/tokens/safetyUtils';
import { FeeOnTransferFeeGroupProps, FoTFeeType, TokenFeeInfo, TokenWarningProps } from 'uniswap/src/features/transactions/TransactionDetails/types';
import { DerivedSwapInfo } from 'uniswap/src/features/transactions/swap/types/derivedSwapInfo';
export declare function getFeeSeverity(fee: Percent): {
    severity: WarningSeverity;
    tokenProtectionWarning: TokenProtectionWarning;
};
export declare function getHighestFeeSeverity(feeOnTransferProps: FeeOnTransferFeeGroupProps | undefined): {
    highestFeeTokenInfo?: TokenFeeInfo;
    tokenProtectionWarning: TokenProtectionWarning;
    severity: WarningSeverity;
    feeType?: FoTFeeType;
};
export declare function getShouldDisplayTokenWarningCard({ feeOnTransferProps, tokenWarningProps, }: {
    tokenWarningProps: TokenWarningProps;
    feeOnTransferProps?: FeeOnTransferFeeGroupProps;
}): {
    shouldDisplayTokenWarningCard: boolean;
    tokenProtectionWarningToDisplay: TokenProtectionWarning;
    feePercent: number | undefined;
    feeType: FoTFeeType | undefined;
    tokenFeeInfo: TokenFeeInfo | undefined;
    currencyInfoToDisplay: Maybe<CurrencyInfo>;
    showFeeSeverityWarning: boolean;
};
export declare function getRelevantTokenWarningSeverity(acceptedDerivedSwapInfo?: DerivedSwapInfo<CurrencyInfo, CurrencyInfo>): TokenWarningProps;
//# sourceMappingURL=utils.d.ts.map