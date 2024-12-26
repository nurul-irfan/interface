import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TradeType } from '@uniswap/sdk-core';
import { Flex, Loader, Text, TouchableArea, useSporeColors } from 'ui/src';
import { Arrow } from 'ui/src/components/arrow/Arrow';
import { fonts, iconSizes } from 'ui/src/theme';
import { CurrencyLogo } from 'uniswap/src/components/CurrencyLogo/CurrencyLogo';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { isConfirmedSwapTypeInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { useTokenDetailsNavigation } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/hooks';
import { useFormattedCurrencyAmountAndUSDValue } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/utils';
import { getAmountsFromTrade } from 'wallet/src/features/transactions/getAmountsFromTrade';
export function SwapTransactionDetails({ typeInfo, onClose, disableClick, }) {
    const inputCurrency = useCurrencyInfo(typeInfo.inputCurrencyId);
    const outputCurrency = useCurrencyInfo(typeInfo.outputCurrencyId);
    const isConfirmed = isConfirmedSwapTypeInfo(typeInfo);
    const { inputCurrencyAmountRaw, outputCurrencyAmountRaw } = getAmountsFromTrade(typeInfo);
    return (_jsx(SwapTransactionContent, { disableClick: disableClick, inputCurrency: inputCurrency, inputCurrencyAmountRaw: inputCurrencyAmountRaw, isConfirmed: isConfirmed, outputCurrency: outputCurrency, outputCurrencyAmountRaw: outputCurrencyAmountRaw, tradeType: typeInfo.tradeType, onClose: onClose }));
}
export function SwapTransactionContent({ inputCurrency, outputCurrency, isConfirmed, inputCurrencyAmountRaw, outputCurrencyAmountRaw, tradeType, onClose, disableClick, }) {
    const colors = useSporeColors();
    const formatter = useLocalizationContext();
    const { tilde: inputTilde, amount: inputAmount, value: inputValue, } = useFormattedCurrencyAmountAndUSDValue({
        currency: inputCurrency === null || inputCurrency === void 0 ? void 0 : inputCurrency.currency,
        currencyAmountRaw: inputCurrencyAmountRaw,
        formatter,
        isApproximateAmount: isConfirmed ? false : tradeType === TradeType.EXACT_OUTPUT,
    });
    const { tilde: outputTilde, amount: outputAmount, value: outputValue, } = useFormattedCurrencyAmountAndUSDValue({
        currency: outputCurrency === null || outputCurrency === void 0 ? void 0 : outputCurrency.currency,
        currencyAmountRaw: outputCurrencyAmountRaw,
        formatter,
        isApproximateAmount: isConfirmed ? false : tradeType === TradeType.EXACT_INPUT,
    });
    const inputSymbol = getSymbolDisplayText(inputCurrency === null || inputCurrency === void 0 ? void 0 : inputCurrency.currency.symbol);
    const outputSymbol = getSymbolDisplayText(outputCurrency === null || outputCurrency === void 0 ? void 0 : outputCurrency.currency.symbol);
    const onPressInputToken = useTokenDetailsNavigation(inputCurrency, onClose);
    const onPressOutputToken = useTokenDetailsNavigation(outputCurrency, onClose);
    return (_jsxs(Flex, { gap: "$spacing16", px: "$spacing8", py: "$spacing12", children: [_jsx(TouchableArea, { cursor: disableClick ? 'default' : 'pointer', onPress: disableClick ? undefined : onPressInputToken, children: _jsxs(Flex, { centered: true, row: true, justifyContent: "space-between", children: [_jsxs(Flex, { children: [_jsxs(Text, { variant: "heading3", children: [inputTilde, inputAmount, " ", inputSymbol] }), _jsx(ValueText, { value: inputValue })] }), _jsx(CurrencyLogo, { hideNetworkLogo: true, currencyInfo: inputCurrency, size: iconSizes.icon40 })] }) }), _jsx(Flex, { children: _jsx(Arrow, { color: colors.neutral3.val, direction: "s", size: iconSizes.icon20 }) }), _jsx(TouchableArea, { onPress: disableClick ? undefined : onPressOutputToken, children: _jsxs(Flex, { centered: true, row: true, justifyContent: "space-between", children: [_jsxs(Flex, { children: [_jsxs(Text, { variant: "heading3", children: [outputTilde, outputAmount, " ", outputSymbol] }), _jsx(ValueText, { value: outputValue })] }), _jsx(CurrencyLogo, { hideNetworkLogo: true, currencyInfo: outputCurrency, size: iconSizes.icon40 })] }) })] }));
}
export function ValueText({ value }) {
    const isLoading = value === '-';
    return isLoading ? (_jsx(Loader.Box, { height: fonts.body3.lineHeight, width: iconSizes.icon36 })) : (_jsx(Text, { color: "$neutral2", variant: "body3", children: value }));
}
//# sourceMappingURL=SwapTransactionDetails.js.map