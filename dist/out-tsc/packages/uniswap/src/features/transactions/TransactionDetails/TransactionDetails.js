import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SwapEventName } from '@uniswap/analytics-events';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, Button, Flex, Popover, Separator, Text, TouchableArea } from 'ui/src';
import { AlertTriangleFilled } from 'ui/src/components/icons/AlertTriangleFilled';
import { AnglesMaximize } from 'ui/src/components/icons/AnglesMaximize';
import { AnglesMinimize } from 'ui/src/components/icons/AnglesMinimize';
import { NetworkFee } from 'uniswap/src/components/gas/NetworkFee';
import { getAlertColor } from 'uniswap/src/components/modals/WarningModal/getAlertColor';
import { TransactionFailureReason } from 'uniswap/src/data/tradingApi/__generated__';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { FeeOnTransferFeeGroup } from 'uniswap/src/features/transactions/TransactionDetails/FeeOnTransferFee';
import { SwapFee } from 'uniswap/src/features/transactions/TransactionDetails/SwapFee';
import { SwapReviewTokenWarningCard } from 'uniswap/src/features/transactions/TransactionDetails/SwapReviewTokenWarningCard';
import { EstimatedTime } from 'uniswap/src/features/transactions/swap/review/EstimatedTime';
import { TransactionSettingsModal } from 'uniswap/src/features/transactions/swap/settings/TransactionSettingsModal';
import { SlippageUpdate } from 'uniswap/src/features/transactions/swap/settings/configs/SlippageUpdate';
import { openUri } from 'uniswap/src/utils/linking';
import { isInterface } from 'utilities/src/platform';
// eslint-disable-next-line complexity
export function TransactionDetails({ banner, children, showExpandedChildren, chainId, gasFee, outputCurrency, uniswapXGasBreakdown, swapFee, swapFeeUsd, showGasFeeError = true, showSeparatorToggle = true, showWarning, warning, feeOnTransferProps, tokenWarningProps, tokenWarningChecked, setTokenWarningChecked, onShowWarning, indicative = false, isSwap, transactionUSDValue, txSimulationErrors, isBridgeTrade, AccountDetails, estimatedBridgingTime, RoutingInfo, RateInfo, }) {
    const { t } = useTranslation();
    const tokenProtectionEnabled = useFeatureFlag(FeatureFlags.TokenProtection);
    const [showChildren, setShowChildren] = useState(showExpandedChildren);
    const onPressToggleShowChildren = () => {
        if (!showChildren) {
            sendAnalyticsEvent(SwapEventName.SWAP_DETAILS_EXPANDED);
        }
        setShowChildren(!showChildren);
    };
    // Used to show slippage settings on mobile, where the modal needs to be added outside of the conditional expected failure banner
    const [showSlippageSettings, setShowSlippageSettings] = useState(false);
    const showExpectedFailureBanner = isSwap &&
        ((showGasFeeError && gasFee.error) ||
            (txSimulationErrors === null || txSimulationErrors === void 0 ? void 0 : txSimulationErrors.includes(TransactionFailureReason.SIMULATION_ERROR)) ||
            (txSimulationErrors === null || txSimulationErrors === void 0 ? void 0 : txSimulationErrors.includes(TransactionFailureReason.SLIPPAGE_TOO_LOW)));
    return (_jsxs(Flex, { children: [showExpectedFailureBanner && (_jsx(ExpectedFailureBanner, { txFailureReasons: txSimulationErrors, onSlippageEditPress: () => setShowSlippageSettings(true) })), !showWarning && banner && _jsx(Flex, { py: "$spacing16", children: banner }), children && showSeparatorToggle ? (_jsx(ListSeparatorToggle, { closedText: t('common.button.showMore'), isOpen: showChildren, openText: t('common.button.showLess'), onPress: onPressToggleShowChildren })) : null, _jsxs(Flex, { gap: "$spacing16", pb: "$spacing8", children: [_jsxs(Flex, { gap: "$spacing8", px: "$spacing8", children: [RateInfo, feeOnTransferProps && _jsx(FeeOnTransferFeeGroup, { ...feeOnTransferProps }), isSwap && isBridgeTrade && _jsx(EstimatedTime, { visibleIfLong: true, timeMs: estimatedBridgingTime }), isSwap && outputCurrency && (_jsx(SwapFee, { currency: outputCurrency, loading: indicative, swapFee: swapFee, swapFeeUsd: swapFeeUsd })), _jsx(NetworkFee, { chainId: chainId, gasFee: gasFee, indicative: indicative, transactionUSDValue: transactionUSDValue, uniswapXGasBreakdown: uniswapXGasBreakdown }), isSwap && RoutingInfo, AccountDetails, showChildren ? (_jsx(AnimatePresence, { children: _jsx(Flex, { animation: "fast", exitStyle: { opacity: 0 }, enterStyle: { opacity: 0 }, gap: "$spacing8", children: children }) })) : null] }), tokenProtectionEnabled && setTokenWarningChecked && tokenWarningProps && (_jsx(SwapReviewTokenWarningCard, { checked: !!tokenWarningChecked, setChecked: setTokenWarningChecked, feeOnTransferProps: feeOnTransferProps, tokenWarningProps: tokenWarningProps }))] }), showWarning && warning && onShowWarning && (_jsx(TransactionWarning, { warning: warning, onShowWarning: onShowWarning })), isSwap && (_jsx(TransactionSettingsModal, { settings: [SlippageUpdate], initialSelectedSetting: SlippageUpdate, isOpen: showSlippageSettings, onClose: () => setShowSlippageSettings(false) }))] }));
}
export const ListSeparatorToggle = ({ onPress, isOpen, openText, closedText, }) => {
    return (_jsxs(Flex, { centered: true, row: true, gap: "$spacing16", mb: "$spacing16", px: "$spacing12", children: [_jsx(Separator, {}), _jsxs(TouchableArea, { alignItems: "center", flexDirection: "row", justifyContent: "center", pb: "$spacing4", pt: "$spacing8", onPress: onPress, children: [_jsx(Text, { color: "$neutral3", variant: "body3", children: isOpen ? openText : closedText }), isOpen ? (_jsx(AnglesMinimize, { color: "$neutral3", size: "$icon.20" })) : (_jsx(AnglesMaximize, { color: "$neutral3", size: "$icon.20" }))] }), _jsx(Separator, {})] }));
};
const TransactionWarning = ({ warning, onShowWarning, }) => {
    const { t } = useTranslation();
    const warningColor = getAlertColor(warning === null || warning === void 0 ? void 0 : warning.severity);
    return (_jsx(TouchableArea, { mt: "$spacing6", onPress: onShowWarning, children: _jsxs(Flex, { row: true, alignItems: "flex-start", p: "$spacing12", borderRadius: "$rounded16", backgroundColor: "$surface2", gap: "$spacing12", children: [_jsx(Flex, { centered: true, p: "$spacing8", borderRadius: "$rounded12", backgroundColor: warningColor.background, children: _jsx(AlertTriangleFilled, { color: warningColor.text, size: "$icon.16" }) }), _jsxs(Flex, { gap: "$spacing4", flex: 1, children: [_jsx(Text, { color: warningColor.text, variant: "body3", children: warning.title }), _jsx(Text, { color: "$neutral2", variant: "body3", children: warning.message }), _jsx(TouchableArea, { onPress: async (e) => {
                                const link = warning.link;
                                if (link) {
                                    e.stopPropagation();
                                    await openUri(link);
                                }
                            }, children: _jsx(Text, { color: "$neutral1", variant: "body3", children: t('common.button.learn') }) })] })] }) }));
};
const ExpectedFailureBanner = ({ txFailureReasons, onSlippageEditPress, }) => {
    const { t } = useTranslation();
    const showSlippageWarning = txFailureReasons === null || txFailureReasons === void 0 ? void 0 : txFailureReasons.includes(TransactionFailureReason.SLIPPAGE_TOO_LOW);
    return (_jsxs(Flex, { row: true, justifyContent: "space-between", alignItems: "center", borderRadius: "$rounded16", borderColor: "$surface3", borderWidth: 1, gap: "$spacing12", p: "$spacing12", children: [_jsxs(Flex, { row: true, justifyContent: "flex-start", gap: "$spacing12", alignItems: "center", children: [_jsx(AlertTriangleFilled, { color: "$DEP_accentWarning", size: "$icon.20" }), _jsxs(Flex, { gap: "$spacing4", children: [_jsx(Text, { color: "$statusWarning", variant: "buttonLabel3", children: t('swap.warning.expectedFailure.titleMay') }), showSlippageWarning && (_jsx(Text, { color: "$neutral2", variant: "body4", children: t('swap.warning.expectedFailure.increaseSlippage') }))] })] }), showSlippageWarning && _jsx(SlippageEdit, { onWalletSlippageEditPress: onSlippageEditPress })] }));
};
const SlippageEdit = ({ onWalletSlippageEditPress: onSlippageEditPress, }) => {
    const { t } = useTranslation();
    const [showInterfaceSlippageSettings, setShowInterfaceSlippageSettings] = useState(false);
    const editButton = (_jsx(Button, { fontSize: "$micro", size: "small", theme: "secondary", borderRadius: "$rounded16", onPress: () => (isInterface ? setShowInterfaceSlippageSettings(true) : onSlippageEditPress === null || onSlippageEditPress === void 0 ? void 0 : onSlippageEditPress()), children: t('common.button.edit') }));
    if (!isInterface) {
        return editButton;
    }
    // Web needs to use a popover, so we need to wrap both the button and the modal in a popover
    return (_jsxs(Popover, { placement: "bottom-end", open: showInterfaceSlippageSettings, onOpenChange: (open) => {
            if (!open && isInterface) {
                setShowInterfaceSlippageSettings(false);
            }
        }, children: [_jsx(Popover.Trigger, { asChild: true, children: editButton }), _jsx(TransactionSettingsModal, { settings: [SlippageUpdate], initialSelectedSetting: SlippageUpdate, isOpen: showInterfaceSlippageSettings, onClose: () => setShowInterfaceSlippageSettings(false) })] }));
};
//# sourceMappingURL=TransactionDetails.js.map