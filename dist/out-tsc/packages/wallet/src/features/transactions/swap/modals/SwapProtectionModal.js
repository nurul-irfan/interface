import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { useSporeColors } from 'ui/src';
import { ShieldCheck } from 'ui/src/components/icons';
import { WarningModal } from 'uniswap/src/components/modals/WarningModal/WarningModal';
import { LearnMoreLink } from 'uniswap/src/components/text/LearnMoreLink';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
export function SwapProtectionInfoModal({ isOpen, onClose }) {
    const colors = useSporeColors();
    const { t } = useTranslation();
    return (_jsx(WarningModal, { backgroundIconColor: colors.DEP_accentSuccessSoft.val, caption: t('swap.settings.protection.description'), rejectText: t('common.button.close'), rejectButtonTheme: "tertiary", icon: _jsx(ShieldCheck, { color: "$statusSuccess", size: "$icon.24" }), isOpen: isOpen, modalName: ModalName.SwapProtection, title: t('swap.settings.protection.title'), onClose: onClose, children: _jsx(LearnMoreLink, { url: uniswapUrls.helpArticleUrls.swapProtection }) }));
}
//# sourceMappingURL=SwapProtectionModal.js.map