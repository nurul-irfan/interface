import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Popover, Text, TouchableArea, isWeb, useSporeColors } from 'ui/src';
import { RotatableChevron } from 'ui/src/components/icons/RotatableChevron';
import { iconSizes } from 'ui/src/theme';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { TransactionSettingsContext, useTransactionSettingsContext, } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
import { SwapFormContext, useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { SwapSettingRow } from 'uniswap/src/features/transactions/swap/settings/SwapSettingsRow';
import { isExtension, isInterface } from 'utilities/src/platform';
const POPOVER_WIDTH = 320;
const TransactionSettingsModalContent = ({ settings, defaultTitle, initialSelectedSetting, onClose, }) => {
    const { t } = useTranslation();
    const { customSlippageTolerance } = useTransactionSettingsContext();
    const [SelectedSetting, setSelectedSetting] = useState();
    const title = SelectedSetting ? SelectedSetting.renderTitle(t) : defaultTitle !== null && defaultTitle !== void 0 ? defaultTitle : t('swap.settings.title');
    const screen = (SelectedSetting === null || SelectedSetting === void 0 ? void 0 : SelectedSetting.Screen) ? (_jsx(SelectedSetting.Screen, {})) : (_jsx(Flex, { gap: "$spacing8", py: "$spacing12", children: settings.map((setting, index) => (_jsx(SwapSettingRow, { setSelectedSetting: setSelectedSetting, setting: setting, customSlippageTolerance: customSlippageTolerance }, `swap-setting-${index}`))) }));
    return (_jsxs(Flex, { gap: "$spacing16", px: isWeb ? '$spacing4' : '$spacing24', py: isWeb ? '$spacing4' : '$spacing12', width: "100%", children: [!(SelectedSetting === null || SelectedSetting === void 0 ? void 0 : SelectedSetting.hideTitle) && (_jsxs(Flex, { row: true, justifyContent: "space-between", children: [_jsx(TouchableArea, { onPress: () => setSelectedSetting(undefined), children: _jsx(RotatableChevron, { color: SelectedSetting === undefined || SelectedSetting === initialSelectedSetting
                                ? '$transparent'
                                : '$neutral3', height: iconSizes.icon24, width: iconSizes.icon24 }) }), _jsx(Text, { textAlign: "center", variant: "body1", children: title }), _jsx(Flex, { width: iconSizes.icon24 })] })), screen, _jsx(Flex, { centered: true, row: true, children: _jsx(Button, { fill: true, testID: "swap-settings-close", theme: "secondary", onPress: onClose, children: (SelectedSetting === null || SelectedSetting === void 0 ? void 0 : SelectedSetting.renderCloseButtonText) ? SelectedSetting.renderCloseButtonText(t) : t('common.button.close') }) })] }));
};
function TransactionSettingsModalInterface({ settings, defaultTitle, initialSelectedSetting, onClose, }) {
    return (_jsx(Popover.Content, { animation: [
            'quick',
            {
                opacity: {
                    overshootClamping: true,
                },
            },
        ], borderColor: "$surface3", borderRadius: "$rounded24", borderWidth: "$spacing1", enterStyle: { y: -10, opacity: 0 }, exitStyle: { y: -10, opacity: 0 }, p: "$spacing12", shadowColor: "$shadowColor", shadowOpacity: 0.06, shadowRadius: 6, width: POPOVER_WIDTH, children: _jsx(TransactionSettingsModalContent, { defaultTitle: defaultTitle, initialSelectedSetting: initialSelectedSetting, settings: settings, onClose: onClose }) }));
}
function TransactionSettingsModalWallet({ settings, initialSelectedSetting, onClose, isOpen, }) {
    const swapFormContext = useSwapFormContext();
    const transactionSettingsContext = useTransactionSettingsContext();
    const colors = useSporeColors();
    return (_jsx(Modal, { alignment: isExtension ? 'top' : undefined, backgroundColor: colors.surface1.val, isModalOpen: isOpen, name: ModalName.SwapSettings, onClose: onClose, children: _jsx(TransactionSettingsContext.Provider, { value: transactionSettingsContext, children: _jsx(SwapFormContext.Provider, { value: swapFormContext, children: _jsx(TransactionSettingsModalContent, { initialSelectedSetting: initialSelectedSetting, settings: settings, onClose: onClose }) }) }) }));
}
export function TransactionSettingsModal(props) {
    if (isInterface) {
        return _jsx(TransactionSettingsModalInterface, { ...props });
    }
    return _jsx(TransactionSettingsModalWallet, { ...props });
}
//# sourceMappingURL=TransactionSettingsModal.js.map