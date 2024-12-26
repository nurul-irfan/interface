import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Popover, Text, TouchableArea } from 'ui/src';
import { Eye } from 'ui/src/components/icons/Eye';
import { iconSizes } from 'ui/src/theme';
import { useAccountMeta } from 'uniswap/src/contexts/UniswapContext';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { ViewOnlyModal } from 'uniswap/src/features/transactions/modals/ViewOnlyModal';
import { useTransactionSettingsContext } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
import { SwapFormSettingsButton } from 'uniswap/src/features/transactions/swap/form/SwapFormSettingsButton';
import SlippageWarningModal from 'uniswap/src/features/transactions/swap/settings/SlippageWarningModal';
import { TransactionSettingsModal } from 'uniswap/src/features/transactions/swap/settings/TransactionSettingsModal';
import { useSlippageSettings } from 'uniswap/src/features/transactions/swap/settings/useSlippageSettings';
import { dismissNativeKeyboard } from 'utilities/src/device/keyboard';
import { isExtension, isInterface, isMobileApp, isMobileWeb } from 'utilities/src/platform';
export function SwapFormSettings({ settings, adjustTopAlignment = true, adjustRightAlignment = true, position = 'absolute', iconColor = '$neutral2', iconSize, defaultTitle, isBridgeTrade, }) {
    const { t } = useTranslation();
    const account = useAccountMeta();
    const { customSlippageTolerance, slippageWarningModalSeen, updateTransactionSettings } = useTransactionSettingsContext();
    const { autoSlippageTolerance } = useSlippageSettings();
    const [showTransactionSettingsModal, setShowSettingsModal] = useState(false);
    const [showViewOnlyModal, setShowViewOnlyModal] = useState(false);
    const [showSlippageWarningModal, setShowSlippageWarningModal] = useState(false);
    const onPressSwapSettings = useCallback(() => {
        setShowSettingsModal(true);
        dismissNativeKeyboard();
    }, []);
    const onPressViewOnlyModal = useCallback(() => {
        setShowViewOnlyModal(true);
    }, []);
    const onCloseSettingsModal = useCallback(() => {
        const shouldShowSlippageWarning = !slippageWarningModalSeen && customSlippageTolerance && customSlippageTolerance >= 20;
        if (shouldShowSlippageWarning) {
            // Leave swap settings modal open for mobile app (to layer modals), but close for web apps
            if (!isMobileApp) {
                setShowSettingsModal(false);
            }
            // Delay showing the slippage warning modal to avoid conflict with popover dismissal for a smoother UX
            setTimeout(() => {
                setShowSlippageWarningModal(true);
                updateTransactionSettings({ slippageWarningModalSeen: true });
            }, 80);
        }
        else {
            setShowSettingsModal(false);
        }
    }, [slippageWarningModalSeen, customSlippageTolerance, updateTransactionSettings]);
    const isViewOnlyWallet = (account === null || account === void 0 ? void 0 : account.type) === AccountType.Readonly;
    const topAlignment = adjustTopAlignment ? (isInterface ? -34 : 6) : 0;
    const rightAlignment = adjustRightAlignment ? (isMobileApp ? 24 : 4) : 0;
    const showCustomSlippage = customSlippageTolerance && !isBridgeTrade;
    const showSettingsIconTooltip = useMemo(() => {
        const meetsPlatformConditions = (isInterface || isExtension) && !isMobileWeb;
        const exceedsSlippageTolerance = !!customSlippageTolerance && customSlippageTolerance > autoSlippageTolerance;
        return meetsPlatformConditions && exceedsSlippageTolerance && !showTransactionSettingsModal;
    }, [customSlippageTolerance, showTransactionSettingsModal, autoSlippageTolerance]);
    return (_jsxs(Flex, { row: true, gap: "$spacing4", position: position, top: topAlignment, right: rightAlignment, zIndex: "$default", children: [_jsx(ViewOnlyModal, { isOpen: showViewOnlyModal, onDismiss: () => setShowViewOnlyModal(false) }), isViewOnlyWallet && (_jsx(TouchableArea, { backgroundColor: "$surface2", borderRadius: "$rounded12", justifyContent: "center", px: "$spacing8", py: "$spacing4", onPress: onPressViewOnlyModal, children: _jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing4", children: [_jsx(Eye, { color: "$neutral2", size: iconSizes.icon16 }), _jsx(Text, { color: "$neutral2", variant: "buttonLabel2", children: t('swap.header.viewOnly') })] }) })), !isViewOnlyWallet && (_jsxs(Popover, { placement: "bottom-end", open: showTransactionSettingsModal, onOpenChange: (open) => {
                    // Only close on interface because SwapSettings are rendered in a modal on mobile/extension
                    // and when click is triggered inside extension Modal it causes onOpenChange to trigger
                    if (!open && isInterface) {
                        onCloseSettingsModal();
                    }
                }, children: [_jsx(SwapFormSettingsButton, { showCustomSlippage: !!showCustomSlippage, customSlippageTolerance: customSlippageTolerance, showTooltip: showSettingsIconTooltip, iconColor: iconColor, iconSize: iconSize, onPress: onPressSwapSettings }), _jsx(TransactionSettingsModal, { settings: settings, defaultTitle: defaultTitle, isOpen: showTransactionSettingsModal, onClose: onCloseSettingsModal })] })), _jsx(SlippageWarningModal, { isOpen: showSlippageWarningModal, onClose: () => setShowSlippageWarningModal(false) })] }));
}
//# sourceMappingURL=SwapFormSettings.js.map