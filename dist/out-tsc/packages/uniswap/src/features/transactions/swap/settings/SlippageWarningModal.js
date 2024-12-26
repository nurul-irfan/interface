import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Flex, Text, TouchableArea } from 'ui/src';
import { AlertTriangleFilled } from 'ui/src/components/icons/AlertTriangleFilled';
import { X } from 'ui/src/components/icons/X';
import { iconSizes } from 'ui/src/theme';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { Trans } from 'uniswap/src/i18n/Trans';
import { isMobileApp, isMobileWeb } from 'utilities/src/platform';
export default function SlippageWarningModal({ isOpen, onClose }) {
    return (_jsxs(Modal, { isDismissible: true, name: ModalName.SlippageWarningModal, gap: "$gap16", padding: isMobileApp ? '$spacing24' : '$spacing16', height: "max-content", isModalOpen: isOpen, maxWidth: 420, onClose: onClose, children: [!isMobileApp && !isMobileWeb && (_jsx(TouchableArea, { alignSelf: "flex-end", onPress: onClose, children: _jsx(X, { color: "$neutral2", size: iconSizes.icon24 }) })), _jsxs(Flex, { flexDirection: "column", alignItems: "center", gap: "$gap24", children: [_jsx(Flex, { gap: "$gap16", backgroundColor: "$statusCritical2", borderRadius: "$rounded12", p: "$spacing12", children: _jsx(AlertTriangleFilled, { color: "$statusCritical", size: "$icon.24" }) }), _jsxs(Flex, { centered: true, rowGap: "$spacing8", children: [_jsx(Text, { variant: "subheading1", children: _jsx(Trans, { i18nKey: "swap.settings.slippage.warning" }) }), _jsx(Text, { variant: "body2", color: "$neutral2", px: "$spacing8", textAlign: "center", children: _jsx(Trans, { i18nKey: "swap.settings.slippage.warning.description" }) })] }), _jsx(Flex, { centered: true, row: true, width: "100%", px: isMobileApp ? '$spacing24' : '$spacing6', children: _jsx(Button, { theme: "secondary", width: "100%", borderRadius: "$rounded12", py: "$spacing12", mt: "$spacing4", onPress: onClose, children: _jsx(Text, { variant: "buttonLabel3", color: "$neutral1", children: _jsx(Trans, { i18nKey: "common.close" }) }) }) })] })] }));
}
//# sourceMappingURL=SlippageWarningModal.js.map