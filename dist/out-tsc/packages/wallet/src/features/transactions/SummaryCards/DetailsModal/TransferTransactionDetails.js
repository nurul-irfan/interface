import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SharedEventName } from '@uniswap/analytics-events';
import { Flex, Loader, Text, TouchableArea, isWeb } from 'ui/src';
import { fonts, iconSizes } from 'ui/src/theme';
import { CurrencyLogo } from 'uniswap/src/components/CurrencyLogo/CurrencyLogo';
import { AssetType } from 'uniswap/src/entities/assets';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { ElementName, ModalName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { NftTransactionDetails } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/NftTransactionDetails';
import { useFormattedCurrencyAmountAndUSDValue } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/utils';
import { buildCurrencyId } from 'wallet/src/utils/currencyId';
export function TransferTransactionDetails({ transactionDetails, typeInfo, onClose, }) {
    const formatter = useLocalizationContext();
    const isCurrency = typeInfo.assetType === AssetType.Currency;
    const currencyInfo = useCurrencyInfo(isCurrency ? buildCurrencyId(transactionDetails.chainId, typeInfo.tokenAddress) : undefined);
    const { amount, value } = useFormattedCurrencyAmountAndUSDValue({
        currency: currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency,
        currencyAmountRaw: typeInfo.currencyAmountRaw,
        formatter,
        isApproximateAmount: false,
    });
    const symbol = getSymbolDisplayText(currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency.symbol);
    const tokenAmountWithSymbol = symbol ? amount + ' ' + symbol : amount; // Prevents 'undefined' from being displayed
    return isCurrency ? (_jsx(CurrencyTransferContent, { currencyInfo: currencyInfo, tokenAmountWithSymbol: tokenAmountWithSymbol, value: value, onClose: onClose })) : (_jsx(NftTransactionDetails, { transactionDetails: transactionDetails, typeInfo: typeInfo, onClose: onClose }));
}
export function CurrencyTransferContent({ tokenAmountWithSymbol, currencyInfo, value, onClose, showValueAsHeading = false, }) {
    const { navigateToTokenDetails } = useWalletNavigation();
    const onPressToken = () => {
        if (currencyInfo) {
            sendAnalyticsEvent(SharedEventName.ELEMENT_CLICKED, {
                element: ElementName.TokenItem,
                modal: ModalName.TransactionDetails,
            });
            navigateToTokenDetails(currencyInfo.currencyId);
            if (!isWeb) {
                onClose();
            }
        }
    };
    const headingText = showValueAsHeading ? value : tokenAmountWithSymbol;
    const subtitleText = showValueAsHeading ? tokenAmountWithSymbol : value;
    const headingIsLoading = headingText === '-';
    const subtitleIsLoading = subtitleText === '-';
    return (_jsx(TouchableArea, { onPress: onPressToken, children: _jsxs(Flex, { centered: true, gap: "$spacing8", p: "$spacing32", children: [headingIsLoading ? (_jsx(Loader.Box, { height: fonts.heading2.lineHeight, width: iconSizes.icon100 })) : (_jsx(Text, { variant: "heading2", textAlign: "center", children: headingText })), _jsxs(Flex, { centered: true, row: true, gap: "$spacing8", children: [_jsx(CurrencyLogo, { currencyInfo: currencyInfo, size: iconSizes.icon20 }), subtitleIsLoading ? (_jsx(Loader.Box, { height: fonts.body2.lineHeight, width: iconSizes.icon48 })) : (_jsx(Text, { color: "$neutral2", variant: "body2", children: subtitleText }))] })] }) }));
}
//# sourceMappingURL=TransferTransactionDetails.js.map