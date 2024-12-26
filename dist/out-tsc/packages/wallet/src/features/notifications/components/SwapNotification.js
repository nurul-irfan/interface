import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { SplitLogo } from 'uniswap/src/components/CurrencyLogo/SplitLogo';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { TransactionStatus } from 'uniswap/src/features/transactions/types/transactionDetails';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
import { NOTIFICATION_ICON_SIZE } from 'wallet/src/features/notifications/constants';
import { formSwapNotificationTitle } from 'wallet/src/features/notifications/utils';
import { useCreateSwapFormState } from 'wallet/src/features/transactions/hooks';
export function SwapNotification({ notification: { chainId, txId, txStatus, inputCurrencyId, inputCurrencyAmountRaw, outputCurrencyId, outputCurrencyAmountRaw, tradeType, address, hideDelay, }, }) {
    const formatter = useLocalizationContext();
    const inputCurrencyInfo = useCurrencyInfo(inputCurrencyId);
    const outputCurrencyInfo = useCurrencyInfo(outputCurrencyId);
    const title = formSwapNotificationTitle(formatter, txStatus, inputCurrencyInfo === null || inputCurrencyInfo === void 0 ? void 0 : inputCurrencyInfo.currency, outputCurrencyInfo === null || outputCurrencyInfo === void 0 ? void 0 : outputCurrencyInfo.currency, inputCurrencyId, outputCurrencyId, inputCurrencyAmountRaw, outputCurrencyAmountRaw, tradeType);
    const { t } = useTranslation();
    const { navigateToAccountActivityList, navigateToSwapFlow } = useWalletNavigation();
    const swapFormState = useCreateSwapFormState(address, chainId, txId);
    const onRetry = () => {
        navigateToSwapFlow(swapFormState ? { initialState: swapFormState } : undefined);
    };
    const retryButton = txStatus === TransactionStatus.Failed
        ? {
            title: t('common.button.retry'),
            onPress: onRetry,
        }
        : undefined;
    const icon = (_jsx(SplitLogo, { chainId: chainId, inputCurrencyInfo: inputCurrencyInfo, outputCurrencyInfo: outputCurrencyInfo, size: NOTIFICATION_ICON_SIZE }));
    return (_jsx(NotificationToast, { actionButton: retryButton, address: address, hideDelay: hideDelay, icon: icon, title: title, onPress: navigateToAccountActivityList }));
}
//# sourceMappingURL=SwapNotification.js.map