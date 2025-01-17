import { SharedEventName } from '@uniswap/analytics-events';
import { useCallback } from 'react';
import { isWeb } from 'ui/src';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { ElementName, ModalName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { ValueType } from 'uniswap/src/features/tokens/getCurrencyAmount';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { isFinalizedTx } from 'uniswap/src/features/transactions/types/transactionDetails';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { useFormattedCurrencyAmountAndUSDValue } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/utils';
import { buildCurrencyId, buildNativeCurrencyId } from 'wallet/src/utils/currencyId';
export function useNetworkFee(transactionDetails) {
    var _a;
    const formatter = useLocalizationContext();
    const currencyId = transactionDetails.networkFee
        ? buildCurrencyId(transactionDetails.chainId, transactionDetails.networkFee.tokenAddress)
        : buildNativeCurrencyId(transactionDetails.chainId);
    const currencyInfo = useCurrencyInfo(currencyId);
    const currencyAmountRaw = ((_a = transactionDetails.networkFee) === null || _a === void 0 ? void 0 : _a.quantity) != null
        ? transactionDetails.networkFee.quantity
        : isFinalizedTx(transactionDetails)
            ? '0'
            : undefined;
    return useFormattedCurrencyAmountAndUSDValue({
        currency: currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency,
        currencyAmountRaw,
        valueType: ValueType.Exact,
        formatter,
        isApproximateAmount: false,
        isUniswapX: isUniswapX(transactionDetails),
    });
}
export function useTokenDetailsNavigation(currency, onClose) {
    const { navigateToTokenDetails } = useWalletNavigation();
    return useCallback(() => {
        if (currency) {
            sendAnalyticsEvent(SharedEventName.ELEMENT_CLICKED, {
                element: ElementName.TokenItem,
                modal: ModalName.TransactionDetails,
            });
            navigateToTokenDetails(currency.currencyId);
            if (!isWeb) {
                onClose === null || onClose === void 0 ? void 0 : onClose();
            }
        }
    }, [currency, navigateToTokenDetails, onClose]);
}
//# sourceMappingURL=hooks.js.map