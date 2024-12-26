import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import { t } from 'i18next';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Flex, Separator, Text, isWeb, useIsShortMobileDevice } from 'ui/src';
import { AlertTriangleFilled } from 'ui/src/components/icons';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { LearnMoreLink } from 'uniswap/src/components/text/LearnMoreLink';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { AssetType } from 'uniswap/src/entities/assets';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { useSelectAddressTransactions } from 'uniswap/src/features/transactions/selectors';
import { updateTransaction } from 'uniswap/src/features/transactions/slice';
import { QueuedOrderStatus, TransactionStatus, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { CurrencyField } from 'uniswap/src/types/currency';
import { currencyAddress } from 'uniswap/src/utils/currencyId';
import { isMobileApp } from 'utilities/src/platform';
import { ErrorBoundary } from 'wallet/src/components/ErrorBoundary/ErrorBoundary';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { SwapTransactionDetails } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/SwapTransactionDetails';
import { isSwapTransactionInfo } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/types';
import { useErroredQueuedOrders } from 'wallet/src/features/transactions/hooks';
import { useActiveSignerAccount } from 'wallet/src/features/wallet/hooks';
const QUEUE_STATUS_TO_MESSAGE = {
    [QueuedOrderStatus.AppClosed]: t('swap.warning.queuedOrder.appClosed'),
    [QueuedOrderStatus.ApprovalFailed]: t('swap.warning.queuedOrder.approvalFailed'),
    [QueuedOrderStatus.WrapFailed]: t('swap.warning.queuedOrder.wrapFailed'),
    [QueuedOrderStatus.SubmissionFailed]: t('swap.warning.queuedOrder.submissionFailed'),
    [QueuedOrderStatus.Stale]: t('swap.warning.queuedOrder.stale'),
};
export function QueuedOrderModal() {
    var _a, _b;
    const uniswapXEnabled = useFeatureFlag(FeatureFlags.UniswapX);
    const isShortMobileDevice = useIsShortMobileDevice();
    const account = useActiveSignerAccount();
    const erroredQueuedOrders = useErroredQueuedOrders((_a = account === null || account === void 0 ? void 0 : account.address) !== null && _a !== void 0 ? _a : null);
    const currentFailedOrder = erroredQueuedOrders === null || erroredQueuedOrders === void 0 ? void 0 : erroredQueuedOrders[0];
    const dispatch = useDispatch();
    const onCancel = useCallback(() => {
        if (!currentFailedOrder) {
            return;
        }
        dispatch(updateTransaction({ ...currentFailedOrder, status: TransactionStatus.Canceled }));
    }, [dispatch, currentFailedOrder]);
    const { navigateToSwapFlow } = useWalletNavigation();
    const transactionState = useTransactionState(currentFailedOrder);
    const onRetry = useCallback(() => {
        if (transactionState) {
            navigateToSwapFlow({ initialState: transactionState });
            onCancel();
        }
    }, [transactionState, navigateToSwapFlow, onCancel]);
    const localTransactions = useSelectAddressTransactions((_b = account === null || account === void 0 ? void 0 : account.address) !== null && _b !== void 0 ? _b : null);
    // If a wrap tx was involved as part of the order flow, show a message indicating that the user now has WETH,
    // unless the wrap failed, in which case the user still has ETH and the message should not be shown.
    const showWrapMessage = useMemo(() => {
        if (!currentFailedOrder || (currentFailedOrder === null || currentFailedOrder === void 0 ? void 0 : currentFailedOrder.queueStatus) === QueuedOrderStatus.WrapFailed) {
            return false;
        }
        return localTransactions === null || localTransactions === void 0 ? void 0 : localTransactions.some((tx) => tx.typeInfo.type === TransactionType.Wrap && tx.typeInfo.swapTxId === (currentFailedOrder === null || currentFailedOrder === void 0 ? void 0 : currentFailedOrder.id));
    }, [localTransactions, currentFailedOrder]);
    // If there are no failed orders tracked in state, return nothing.
    if (!uniswapXEnabled || !currentFailedOrder || !isSwapTransactionInfo(currentFailedOrder.typeInfo)) {
        return null;
    }
    const reason = QUEUE_STATUS_TO_MESSAGE[currentFailedOrder.queueStatus];
    const buttonSize = isShortMobileDevice ? 'small' : 'medium';
    const platformButtonStyling = isWeb ? { flex: 1, flexBasis: 1 } : undefined;
    return (_jsx(ErrorBoundary, { showNotification: true, fallback: null, name: ModalName.QueuedOrderModal, onError: onCancel, children: _jsx(Modal, { isDismissible: true, alignment: "top", name: ModalName.TransactionDetails, onClose: onCancel, children: _jsxs(Flex, { gap: "$spacing12", pb: isWeb ? '$none' : '$spacing12', px: isWeb ? '$none' : '$spacing24', children: [_jsxs(Flex, { centered: true, gap: "$spacing8", children: [_jsx(Flex, { centered: true, backgroundColor: "$surface2", borderRadius: "$rounded12", mb: "$spacing8", p: "$spacing12", children: _jsx(AlertTriangleFilled, { color: "$black", size: "$icon.24" }) }), _jsx(Text, { textAlign: "center", variant: "subheading1", children: t('swap.warning.queuedOrder.title') }), _jsxs(Text, { color: "$neutral2", textAlign: "center", variant: "body3", children: [reason, showWrapMessage && ' ', showWrapMessage && t('swap.warning.queuedOrder.wrap.message')] }), _jsx(LearnMoreLink, { textColor: "$neutral1", textVariant: "buttonLabel2", url: uniswapUrls.helpArticleUrls.uniswapXFailure })] }), _jsx(Separator, {}), _jsx(SwapTransactionDetails, { disableClick: isMobileApp, typeInfo: currentFailedOrder.typeInfo }), _jsxs(Flex, { gap: "$spacing8", row: isWeb, children: [_jsx(Button, { disabled: !transactionState, theme: "primary", ...platformButtonStyling, size: buttonSize, onPress: onRetry, children: _jsx(Text, { color: "$white", variant: "buttonLabel2", children: t('common.button.retry') }) }), _jsx(Button, { ...platformButtonStyling, size: buttonSize, theme: "secondary", onPress: onCancel, children: _jsx(Text, { variant: "buttonLabel2", children: t('common.button.cancel') }) })] })] }) }) }));
}
function useTransactionState(transaction) {
    var _a, _b;
    const { typeInfo } = transaction !== null && transaction !== void 0 ? transaction : {};
    const isSwap = typeInfo && isSwapTransactionInfo(typeInfo);
    const inputCurrency = (_a = useCurrencyInfo(isSwap ? typeInfo.inputCurrencyId : undefined)) === null || _a === void 0 ? void 0 : _a.currency;
    const outputCurrency = (_b = useCurrencyInfo(isSwap ? typeInfo.outputCurrencyId : undefined)) === null || _b === void 0 ? void 0 : _b.currency;
    return useMemo(() => {
        if (!isSwap || !inputCurrency || !outputCurrency) {
            return undefined;
        }
        const input = {
            address: currencyAddress(inputCurrency),
            chainId: inputCurrency.chainId,
            type: AssetType.Currency,
        };
        const output = {
            address: currencyAddress(outputCurrency),
            chainId: inputCurrency.chainId,
            type: AssetType.Currency,
        };
        const exactCurrency = typeInfo.tradeType === TradeType.EXACT_INPUT ? inputCurrency : outputCurrency;
        const exactCurrencyField = typeInfo.tradeType === TradeType.EXACT_INPUT ? CurrencyField.INPUT : CurrencyField.OUTPUT;
        const exactAmountTokenRaw = typeInfo.tradeType === TradeType.EXACT_INPUT ? typeInfo.inputCurrencyAmountRaw : typeInfo.outputCurrencyAmountRaw;
        const exactAmountToken = CurrencyAmount.fromRawAmount(exactCurrency, exactAmountTokenRaw).toExact();
        return {
            input,
            output,
            exactCurrencyField,
            exactAmountToken,
            customSlippageTolerance: typeInfo.slippageTolerance,
        };
    }, [isSwap, typeInfo, inputCurrency, outputCurrency]);
}
//# sourceMappingURL=QueuedOrderModal.js.map