import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'ui/src';
import { iconSizes } from 'ui/src/theme';
import { NetworkLogo } from 'uniswap/src/components/CurrencyLogo/NetworkLogo';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
/**
 * Component to display bridge swaps with two logos and currency amounts
 * 💶Token -> 💴Token
 */
export function BridgingCurrencyRow({ inputCurrencyInfo, outputCurrencyInfo, formattedInputTokenAmount, formattedOutputTokenAmount, }) {
    var _a, _b, _c, _d;
    return (_jsxs(Flex, { grow: true, row: true, py: "$spacing2", gap: "$spacing4", alignItems: "center", children: [_jsx(CurrencyAmount, { chainId: (_a = inputCurrencyInfo === null || inputCurrencyInfo === void 0 ? void 0 : inputCurrencyInfo.currency.chainId) !== null && _a !== void 0 ? _a : null, amount: formattedInputTokenAmount, symbol: (_b = getSymbolDisplayText(inputCurrencyInfo === null || inputCurrencyInfo === void 0 ? void 0 : inputCurrencyInfo.currency.symbol)) !== null && _b !== void 0 ? _b : '' }), _jsx(Text, { children: "\u2192" }), _jsx(CurrencyAmount, { chainId: (_c = outputCurrencyInfo === null || outputCurrencyInfo === void 0 ? void 0 : outputCurrencyInfo.currency.chainId) !== null && _c !== void 0 ? _c : null, amount: formattedOutputTokenAmount, symbol: (_d = getSymbolDisplayText(outputCurrencyInfo === null || outputCurrencyInfo === void 0 ? void 0 : outputCurrencyInfo.currency.symbol)) !== null && _d !== void 0 ? _d : '' })] }));
}
function CurrencyAmount({ chainId, amount, symbol, }) {
    return (_jsxs(Flex, { row: true, gap: "$spacing4", alignItems: "center", children: [_jsx(NetworkLogo, { chainId: chainId, size: iconSizes.icon16, borderRadius: 6 }), _jsxs(Text, { color: "$neutral1", variant: "body2", children: [amount, symbol] })] }));
}
//# sourceMappingURL=BridgingCurrencyRow.js.map