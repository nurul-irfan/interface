import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text, TouchableArea, useSporeColors } from 'ui/src';
import { ArrowDown } from 'ui/src/components/icons/ArrowDown';
import { iconSizes, validColor } from 'ui/src/theme';
import { CurrencyLogo } from 'uniswap/src/components/CurrencyLogo/CurrencyLogo';
import { NetworkLogo } from 'uniswap/src/components/CurrencyLogo/NetworkLogo';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { getChainLabel, toSupportedChainId } from 'uniswap/src/features/chains/utils';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { useNetworkColors } from 'uniswap/src/utils/colors';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { ValueText } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/SwapTransactionDetails';
import { useTokenDetailsNavigation } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/hooks';
import { useFormattedCurrencyAmountAndUSDValue } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/utils';
export function BridgeTransactionDetails({ typeInfo, onClose, disableClick, }) {
    const colors = useSporeColors();
    const formatter = useLocalizationContext();
    const inputCurrency = useCurrencyInfo(typeInfo.inputCurrencyId);
    const outputCurrency = useCurrencyInfo(typeInfo.outputCurrencyId);
    const { amount: inputAmount, value: inputValue } = useFormattedCurrencyAmountAndUSDValue({
        currency: inputCurrency === null || inputCurrency === void 0 ? void 0 : inputCurrency.currency,
        currencyAmountRaw: typeInfo.inputCurrencyAmountRaw,
        formatter,
        isApproximateAmount: false,
    });
    const { amount: outputAmount, value: outputValue } = useFormattedCurrencyAmountAndUSDValue({
        currency: outputCurrency === null || outputCurrency === void 0 ? void 0 : outputCurrency.currency,
        currencyAmountRaw: typeInfo.outputCurrencyAmountRaw,
        formatter,
        isApproximateAmount: false,
    });
    // This should never happen. It's just to keep TS happy.
    if (!inputCurrency || !outputCurrency) {
        throw new Error('Missing required `currencyAmount` to render `TransactionAmountsReview`');
    }
    const onPressInputToken = useTokenDetailsNavigation(inputCurrency, onClose);
    const onPressOutputToken = useTokenDetailsNavigation(outputCurrency, onClose);
    return (_jsxs(Flex, { "$short": { gap: '$spacing8' }, gap: "$spacing16", px: "$spacing8", py: "$spacing12", children: [_jsx(TouchableArea, { onPress: disableClick ? undefined : onPressInputToken, children: _jsx(CurrencyValueWithIcon, { currencyInfo: inputCurrency, formattedFiatAmount: inputValue, formattedTokenAmount: inputAmount }) }), _jsx(ArrowDown, { color: colors.neutral3.get(), size: 20 }), _jsx(TouchableArea, { onPress: disableClick ? undefined : onPressOutputToken, children: _jsx(CurrencyValueWithIcon, { currencyInfo: outputCurrency, formattedFiatAmount: outputValue, formattedTokenAmount: outputAmount }) })] }));
}
export function CurrencyValueWithIcon({ currencyInfo, formattedFiatAmount, formattedTokenAmount, }) {
    var _a;
    const { defaultChainId } = useEnabledChains();
    const chainId = (_a = toSupportedChainId(currencyInfo.currency.chainId)) !== null && _a !== void 0 ? _a : defaultChainId;
    const networkColors = useNetworkColors(chainId);
    const networkLabel = getChainLabel(chainId);
    const networkColor = validColor(networkColors.foreground);
    return (_jsxs(Flex, { centered: true, grow: true, row: true, children: [_jsxs(Flex, { grow: true, gap: "$spacing4", children: [_jsxs(Flex, { row: true, gap: "$spacing4", alignItems: "center", children: [_jsx(NetworkLogo, { chainId: currencyInfo.currency.chainId, size: iconSizes.icon16 }), _jsx(Text, { color: networkColor, variant: "buttonLabel3", children: networkLabel })] }), _jsxs(Text, { color: "$neutral1", variant: "heading3", children: [formattedTokenAmount, " ", getSymbolDisplayText(currencyInfo.currency.symbol)] }), _jsx(ValueText, { value: formattedFiatAmount })] }), _jsx(CurrencyLogo, { currencyInfo: currencyInfo, size: iconSizes.icon40 })] }));
}
//# sourceMappingURL=BridgeTransactionDetails.js.map