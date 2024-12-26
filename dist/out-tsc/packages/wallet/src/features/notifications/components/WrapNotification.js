import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { SplitLogo } from 'uniswap/src/components/CurrencyLogo/SplitLogo';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useNativeCurrencyInfo, useWrappedNativeCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { TransactionStatus } from 'uniswap/src/features/transactions/types/transactionDetails';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { NotificationToast } from 'wallet/src/features/notifications/components/NotificationToast';
import { NOTIFICATION_ICON_SIZE } from 'wallet/src/features/notifications/constants';
import { formWrapNotificationTitle } from 'wallet/src/features/notifications/utils';
import { useCreateWrapFormState } from 'wallet/src/features/transactions/hooks';
export function WrapNotification({ notification: { txId, txStatus, currencyAmountRaw, address, hideDelay, unwrapped, chainId }, }) {
    const { t } = useTranslation();
    const formatter = useLocalizationContext();
    const nativeCurrencyInfo = useNativeCurrencyInfo(chainId);
    const wrappedCurrencyInfo = useWrappedNativeCurrencyInfo(chainId);
    const inputCurrencyInfo = unwrapped ? wrappedCurrencyInfo : nativeCurrencyInfo;
    const outputCurrencyInfo = unwrapped ? nativeCurrencyInfo : wrappedCurrencyInfo;
    const title = formWrapNotificationTitle(formatter, txStatus, inputCurrencyInfo === null || inputCurrencyInfo === void 0 ? void 0 : inputCurrencyInfo.currency, outputCurrencyInfo === null || outputCurrencyInfo === void 0 ? void 0 : outputCurrencyInfo.currency, currencyAmountRaw, unwrapped);
    const wrapFormState = useCreateWrapFormState(address, chainId, txId, inputCurrencyInfo === null || inputCurrencyInfo === void 0 ? void 0 : inputCurrencyInfo.currency, outputCurrencyInfo === null || outputCurrencyInfo === void 0 ? void 0 : outputCurrencyInfo.currency);
    const { navigateToAccountActivityList, navigateToSwapFlow } = useWalletNavigation();
    const onRetry = () => {
        navigateToSwapFlow(wrapFormState ? { initialState: wrapFormState } : undefined);
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
//# sourceMappingURL=WrapNotification.js.map