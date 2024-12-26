import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Button, Flex, Text, TouchableArea, isWeb } from 'ui/src';
import { HelpCenter } from 'ui/src/components/icons/HelpCenter';
import { X } from 'ui/src/components/icons/X';
import { WarningModalContent } from 'uniswap/src/components/modals/WarningModal/WarningModal';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { ProtocolItems } from 'uniswap/src/data/tradingApi/__generated__';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { TransactionModalInnerContainer } from 'uniswap/src/features/transactions/TransactionModal/TransactionModal';
import { useTransactionModalContext } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalContext';
import { TransactionStepFailedError, getErrorContent } from 'uniswap/src/features/transactions/errors';
import { useTransactionSettingsContext } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
import { TransactionStepType } from 'uniswap/src/features/transactions/swap/types/steps';
import { openUri } from 'uniswap/src/utils/linking';
export function SwapErrorScreen({ submissionError, setSubmissionError, resubmitSwap, onClose, }) {
    const { t } = useTranslation();
    const { bottomSheetViewStyles } = useTransactionModalContext();
    const { updateTransactionSettings, selectedProtocols } = useTransactionSettingsContext();
    const { title, message, supportArticleURL } = getErrorContent(t, submissionError);
    const isUniswapXBackendError = submissionError instanceof TransactionStepFailedError &&
        submissionError.isBackendRejection &&
        submissionError.step.type === TransactionStepType.UniswapXSignature;
    const handleTryAgain = () => {
        if (isUniswapXBackendError) {
            // Update swap preferences for this session to exclude UniswapX if Uniswap x failed
            const updatedProtocols = selectedProtocols.filter((protocol) => protocol !== ProtocolItems.UNISWAPX_V2);
            updateTransactionSettings({ selectedProtocols: updatedProtocols });
        }
        else {
            resubmitSwap();
        }
        setSubmissionError(undefined);
    };
    const onPressGetHelp = async () => {
        await openUri(supportArticleURL !== null && supportArticleURL !== void 0 ? supportArticleURL : uniswapUrls.helpUrl);
    };
    return (_jsx(TransactionModalInnerContainer, { bottomSheetViewStyles: bottomSheetViewStyles, fullscreen: false, children: _jsxs(Flex, { gap: "$spacing16", children: [isWeb && (_jsxs(Flex, { row: true, justifyContent: "flex-end", m: "$spacing12", gap: "$spacing12", children: [_jsx(TouchableArea, { hoverable: true, p: "$padding6", borderColor: "$surface3", borderWidth: 1, borderRadius: "$rounded12", onPress: onPressGetHelp, children: _jsxs(Flex, { row: true, centered: true, gap: "$spacing4", children: [_jsx(HelpCenter, { color: "$neutral1", size: "$icon.16" }), ' ', _jsx(Text, { variant: "body4", color: "$neutral1", children: t('common.getHelp.button') })] }) }), _jsx(Button, { backgroundColor: "$transparent", color: "$neutral2", icon: _jsx(X, { size: "$icon.20" }), p: "$none", theme: "secondary", onPress: onClose })] })), _jsx(Flex, { animation: "quick", enterStyle: { opacity: 0 }, exitStyle: { opacity: 0 }, children: _jsx(WarningModalContent, { modalName: ModalName.SwapError, title: title, caption: message, severity: WarningSeverity.Low, rejectText: t('common.button.tryAgain'), onReject: handleTryAgain }) })] }) }));
}
//# sourceMappingURL=SwapErrorScreen.js.map