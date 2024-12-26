import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Flex, Text } from 'ui/src';
import { iconSizes } from 'ui/src/theme';
import { CurrencyLogo } from 'uniswap/src/components/CurrencyLogo/CurrencyLogo';
import { useUSDValueOfGasFee } from 'uniswap/src/features/gas/hooks';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { ValueType, getCurrencyAmount } from 'uniswap/src/features/tokens/getCurrencyAmount';
import { useNativeCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { NumberType } from 'utilities/src/format/types';
import { isMobileApp } from 'utilities/src/platform';
import { ContentRow } from 'wallet/src/features/transactions/TransactionRequest/ContentRow';
export function SpendingEthDetails({ value, chainId }) {
    const variant = isMobileApp ? 'body3' : 'body4';
    const { t } = useTranslation();
    const { convertFiatAmountFormatted, formatCurrencyAmount } = useLocalizationContext();
    const nativeCurrencyInfo = useNativeCurrencyInfo(chainId);
    const nativeCurrencyAmount = nativeCurrencyInfo
        ? getCurrencyAmount({
            value,
            valueType: ValueType.Raw,
            currency: nativeCurrencyInfo.currency,
        })
        : null;
    const { value: usdValue } = useUSDValueOfGasFee(chainId, value);
    const tokenAmountWithSymbol = formatCurrencyAmount({ value: nativeCurrencyAmount, type: NumberType.TokenTx }) +
        ' ' +
        getSymbolDisplayText(nativeCurrencyInfo === null || nativeCurrencyInfo === void 0 ? void 0 : nativeCurrencyInfo.currency.symbol);
    const fiatAmount = convertFiatAmountFormatted(usdValue, NumberType.FiatTokenPrice);
    return (_jsx(ContentRow, { label: t('walletConnect.request.details.label.sending'), variant: variant, children: _jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing4", children: [_jsx(CurrencyLogo, { currencyInfo: nativeCurrencyInfo, size: iconSizes.icon16 }), _jsx(Text, { variant: variant, children: tokenAmountWithSymbol }), _jsxs(Text, { color: "$neutral2", loading: !usdValue, variant: variant, children: ["(", fiatAmount, ")"] })] }) }));
}
export function SpendingDetails({ currencyInfo, showLabel, tokenCount, }) {
    const variant = isMobileApp ? 'body3' : 'body4';
    const { t } = useTranslation();
    const labelCopy = tokenCount > 1 ? t('walletConnect.request.details.label.tokens') : t('walletConnect.request.details.label.token');
    return (_jsx(ContentRow, { label: showLabel ? labelCopy : '', variant: variant, children: _jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing4", children: [_jsx(CurrencyLogo, { currencyInfo: currencyInfo, size: iconSizes.icon16 }), _jsx(Text, { variant: variant, children: getSymbolDisplayText(currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency.symbol) })] }) }));
}
//# sourceMappingURL=SpendingDetails.js.map