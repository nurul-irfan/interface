import { ColorTokens, GeneratedIcon } from 'ui/src';
import { ThemeNames } from 'ui/src/theme';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { SafetyLevel } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
export declare function safetyLevelToWarningSeverity(safetyLevel: Maybe<SafetyLevel>): WarningSeverity;
export declare function getWarningIcon(severity: WarningSeverity, tokenProtectionEnabled?: boolean): GeneratedIcon | null;
export declare function getWarningIconColors(severity?: WarningSeverity): {
    color: ColorTokens;
    /** `colorSecondary` used instead of `color` in certain places, such as token selector & mobile search */
    colorSecondary: ColorTokens | undefined;
    backgroundColor: ColorTokens;
    textColor: ColorTokens;
};
export declare function getWarningButtonProps(severity?: WarningSeverity): {
    theme: ThemeNames;
    buttonTextColor: ColorTokens;
};
//# sourceMappingURL=utils.d.ts.map