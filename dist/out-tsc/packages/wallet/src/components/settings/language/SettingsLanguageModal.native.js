import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import { Button, Flex, Text } from 'ui/src';
import { Language } from 'ui/src/components/icons';
import { colors, opacify } from 'ui/src/theme';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { isAndroid } from 'utilities/src/platform';
const openLanguageSettings = async () => {
    if (isAndroid) {
        await Linking.openSettings();
    }
    else {
        await Linking.openURL('app-settings:');
    }
};
export function SettingsLanguageModal({ onClose }) {
    const { t } = useTranslation();
    return (_jsxs(Modal, { name: ModalName.LanguageSelector, onClose: onClose, children: [_jsx(Flex, { centered: true, mt: "$spacing16", children: _jsx(Flex, { backgroundColor: opacify(10, colors.bluePastel), borderRadius: "$rounded12", p: "$spacing12", children: _jsx(Language, { color: "$bluePastel", size: "$icon.24", strokeWidth: 1.5 }) }) }), _jsxs(Flex, { gap: "$spacing24", pt: "$spacing24", px: "$spacing24", children: [_jsxs(Flex, { gap: "$spacing8", children: [_jsx(Text, { textAlign: "center", variant: "subheading1", children: t('settings.setting.language.title') }), _jsx(Text, { color: "$neutral2", textAlign: "center", variant: "body3", children: t('settings.setting.language.description.mobile') })] }), _jsx(Button, { testID: TestID.OpenDeviceLanguageSettings, theme: "tertiary", onPress: openLanguageSettings, children: t('settings.setting.language.button.navigate') })] })] }));
}
//# sourceMappingURL=SettingsLanguageModal.native.js.map