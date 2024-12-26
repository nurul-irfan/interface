import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @deprecated
 *
 * TODO(WALL-4677): remove this file
 */
import { useTranslation } from 'react-i18next';
import { Button, Flex, Text, isWeb } from 'ui/src';
import { imageSizes } from 'ui/src/theme';
import { TokenLogo } from 'uniswap/src/components/CurrencyLogo/TokenLogo';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { LearnMoreLink } from 'uniswap/src/components/text/LearnMoreLink';
import WarningIcon from 'uniswap/src/components/warnings/WarningIcon';
import { getWarningButtonProps, getWarningIconColors, safetyLevelToWarningSeverity, } from 'uniswap/src/components/warnings/utils';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { SafetyLevel } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { getTokenSafetyHeaderText } from 'uniswap/src/features/tokens/deprecatedSafetyUtils';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
function getTokenSafetyBodyText(safetyLevel, t) {
    switch (safetyLevel) {
        case SafetyLevel.MediumWarning:
            return t('token.safetyLevel.medium.message');
        case SafetyLevel.StrongWarning:
            return t('token.safetyLevel.strong.message');
        case SafetyLevel.Blocked:
            return t('token.safetyLevel.blocked.message');
        default:
            return '';
    }
}
/**
 * @deprecated Use TokenWarningModal instead
 */
export default function DeprecatedTokenWarningModal({ isVisible, safetyLevel, disableAccept, tokenLogoUrl, onClose, onAccept, }) {
    const { t } = useTranslation();
    const severity = safetyLevelToWarningSeverity(safetyLevel);
    const { backgroundColor: warningIconBackgroundColor, textColor } = getWarningIconColors(severity);
    const { buttonTextColor, theme } = getWarningButtonProps(severity);
    // always hide accept button if blocked token
    const hideAcceptButton = disableAccept || safetyLevel === SafetyLevel.Blocked;
    const closeButtonText = hideAcceptButton ? t('common.button.close') : t('common.button.back');
    const showWarningIcon = safetyLevel === SafetyLevel.StrongWarning || safetyLevel === SafetyLevel.Blocked;
    return (_jsx(Modal, { isModalOpen: isVisible, maxWidth: 420, name: ModalName.TokenWarningModal, onClose: onClose, children: _jsxs(Flex, { centered: true, gap: "$spacing16", pb: isWeb ? '$none' : '$spacing12', pt: "$spacing12", px: isWeb ? '$none' : '$spacing24', children: [showWarningIcon ? (_jsxs(Flex, { centered: true, gap: "$spacing16", children: [_jsx(Flex, { centered: true, borderRadius: "$rounded12", p: "$spacing12", backgroundColor: warningIconBackgroundColor, children: _jsx(WarningIcon, { safetyLevel: safetyLevel, size: "$icon.24" }) }), _jsx(Text, { color: textColor, variant: "subheading1", children: getTokenSafetyHeaderText(safetyLevel, t) })] })) : (_jsx(TokenLogo, { size: imageSizes.image48, url: tokenLogoUrl })), _jsxs(Flex, { centered: true, gap: "$spacing12", width: "90%", children: [_jsxs(Text, { color: "$neutral2", textAlign: "center", variant: "body2", children: [getTokenSafetyBodyText(safetyLevel, t), ' '] }), _jsx(LearnMoreLink, { url: uniswapUrls.helpArticleUrls.tokenWarning })] }), _jsxs(Flex, { centered: true, row: true, gap: "$spacing12", mt: "$spacing16", width: "100%", children: [_jsx(Button, { flex: 1, flexBasis: 1, testID: TestID.Cancel, theme: "tertiary", onPress: onClose, children: closeButtonText }), !hideAcceptButton && (_jsx(Button, { color: buttonTextColor, flex: 1, flexBasis: 1, testID: TestID.TokenWarningAccept, theme: theme, onPress: onAccept, children: showWarningIcon ? t('common.button.understand') : t('common.button.continue') }))] })] }) }));
}
//# sourceMappingURL=DeprecatedTokenWarningModal.js.map