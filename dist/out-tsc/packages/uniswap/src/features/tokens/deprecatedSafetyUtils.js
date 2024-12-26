import { SafetyLevel } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
export function getTokenSafetyHeaderText(safetyLevel, t) {
    switch (safetyLevel) {
        case SafetyLevel.MediumWarning:
            return t('token.safetyLevel.medium.header');
        case SafetyLevel.StrongWarning:
            return t('token.safetyLevel.strong.header');
        case SafetyLevel.Blocked:
            return t('token.safetyLevel.blocked.header');
        default:
            return undefined;
    }
}
//# sourceMappingURL=deprecatedSafetyUtils.js.map