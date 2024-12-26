import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Button, Flex, Text, isWeb, useSporeColors } from 'ui/src';
import { opacify } from 'ui/src/theme';
import { Modal } from 'uniswap/src/components/modals/Modal';
import WarningIcon from 'uniswap/src/components/warnings/WarningIcon';
import { SafetyLevel } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
/**
 * Warning when selecting unsupported tokens for offramp.
 */
export default function UnsupportedTokenModal({ isVisible, onBack, onClose, onAccept }) {
    const { t } = useTranslation();
    const colors = useSporeColors();
    return (_jsx(Modal, { isModalOpen: isVisible, maxWidth: 420, name: ModalName.TokenWarningModal, onClose: onClose, children: _jsxs(Flex, { centered: true, gap: "$spacing16", pb: isWeb ? '$none' : '$spacing12', pt: "$spacing12", px: isWeb ? '$none' : '$spacing24', children: [_jsxs(Flex, { centered: true, gap: "$spacing16", children: [_jsx(Flex, { centered: true, borderRadius: "$rounded12", p: "$spacing12", style: {
                                backgroundColor: opacify(12, colors.DEP_accentWarning.val),
                            }, children: _jsx(WarningIcon, { safetyLevel: SafetyLevel.MediumWarning, size: "$icon.24" }) }), _jsx(Text, { variant: "subheading1", children: t('fiatOffRamp.unsupportedToken.title') })] }), _jsx(Flex, { centered: true, gap: "$spacing12", width: "90%", children: _jsx(Text, { color: "$neutral2", textAlign: "center", variant: "body3", children: t('fiatOffRamp.unsupportedToken.message') }) }), _jsxs(Flex, { centered: true, gap: "$spacing12", mt: "$spacing16", width: "100%", children: [_jsx(Button, { theme: "secondary", width: "100%", onPress: onBack, children: t('fiatOffRamp.unsupportedToken.back') }), _jsx(Button, { theme: "primary", width: "100%", onPress: onAccept, children: t('fiatOffRamp.unsupportedToken.swap') })] })] }) }));
}
//# sourceMappingURL=UnsupportedTokenModal.js.map