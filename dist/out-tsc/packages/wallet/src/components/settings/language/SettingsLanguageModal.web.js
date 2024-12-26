import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Button, Flex, Text } from 'ui/src';
import { Language } from 'ui/src/components/icons';
import { DEP_accentColors, opacify } from 'ui/src/theme';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
export function SettingsLanguageModal({ onClose }) {
    const { t } = useTranslation();
    return (_jsx(Modal, { name: ModalName.LanguageSelector, onClose: onClose, children: _jsxs(Flex, { p: "$spacing4", pt: "$spacing8", children: [_jsx(Flex, { centered: true, children: _jsx(Flex, { backgroundColor: opacify(10, DEP_accentColors.blue300), borderRadius: "$rounded12", p: "$spacing12", children: _jsx(Language, { color: DEP_accentColors.blue300, size: "$icon.24", strokeWidth: 1.5 }) }) }), _jsxs(Flex, { gap: "$spacing24", pt: "$spacing24", children: [_jsxs(Flex, { gap: "$spacing8", children: [_jsx(Text, { textAlign: "center", variant: "subheading1", children: t('settings.setting.language.title') }), _jsx(Text, { color: "$neutral2", textAlign: "center", variant: "body3", children: t('settings.setting.language.description.extension') })] }), _jsx(Button, { theme: "tertiary", onPress: () => onClose(), children: t('common.button.close') })] })] }) }));
}
//# sourceMappingURL=SettingsLanguageModal.web.js.map