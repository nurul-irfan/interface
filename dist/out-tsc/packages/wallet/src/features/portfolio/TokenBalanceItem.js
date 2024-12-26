import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Shine, Text, TouchableArea, isWeb } from 'ui/src';
import { TokenLogo } from 'uniswap/src/components/CurrencyLogo/TokenLogo';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { NumberType } from 'utilities/src/format/types';
import { RelativeChange } from 'wallet/src/components/text/RelativeChange';
import { useTokenBalanceMainPartsFragment, useTokenBalanceQuantityPartsFragment, } from 'wallet/src/features/portfolio/fragments';
import { disableOnPress } from 'wallet/src/utils/disableOnPress';
/**
 * If you add any props to this component, make sure you use the react-devtools profiler to confirm that this doesn't break the memoization.
 * This component needs to be as fast as possible and shouldn't re-render often or else it causes performance issues.
 */
export const TokenBalanceItem = memo(function _TokenBalanceItem({ portfolioBalanceId, currencyInfo, onPressToken, isLoading, padded, }) {
    var _a, _b;
    const { currency } = currencyInfo;
    const onPress = useCallback(() => {
        onPressToken === null || onPressToken === void 0 ? void 0 : onPressToken(currencyInfo.currencyId);
    }, [currencyInfo.currencyId, onPressToken]);
    const shortenedSymbol = getSymbolDisplayText(currency.symbol);
    return (_jsxs(TouchableArea, { hoverable: true, alignItems: "flex-start", backgroundColor: "$surface1", borderRadius: "$rounded16", flexDirection: "row", justifyContent: "space-between", px: padded ? '$spacing24' : '$spacing8', py: "$spacing8", onLongPress: disableOnPress, onPress: onPress, children: [_jsxs(Flex, { row: true, shrink: true, alignItems: "center", gap: "$spacing12", overflow: "hidden", children: [_jsx(TokenLogo, { chainId: currency.chainId, name: currency.name, symbol: currency.symbol, url: (_a = currencyInfo.logoUrl) !== null && _a !== void 0 ? _a : undefined }), _jsxs(Flex, { shrink: true, alignItems: "flex-start", children: [_jsx(Text, { ellipsizeMode: "tail", numberOfLines: 1, variant: isWeb ? 'body2' : 'body1', children: (_b = currency.name) !== null && _b !== void 0 ? _b : shortenedSymbol }), _jsx(Flex, { row: true, alignItems: "center", gap: "$spacing8", minHeight: 20, children: _jsx(TokenBalanceQuantity, { portfolioBalanceId: portfolioBalanceId, shortenedSymbol: shortenedSymbol }) })] })] }), _jsx(TokenBalanceRightSideColumn, { portfolioBalanceId: portfolioBalanceId, isLoading: isLoading })] }));
});
function TokenBalanceQuantity({ portfolioBalanceId, shortenedSymbol, }) {
    const { formatNumberOrString } = useLocalizationContext();
    // By relying on this cached fragment instead of a query with many fields, we can avoid re-renders unless these specific fields change.
    const { data: tokenBalance } = useTokenBalanceQuantityPartsFragment({ id: portfolioBalanceId });
    return (_jsxs(Text, { color: "$neutral2", numberOfLines: 1, variant: isWeb ? 'body3' : 'body2', children: [`${formatNumberOrString({ value: tokenBalance.quantity })}`, " ", shortenedSymbol] }));
}
function TokenBalanceRightSideColumn({ portfolioBalanceId, isLoading, }) {
    var _a, _b, _c;
    const { t } = useTranslation();
    const { isTestnetModeEnabled } = useEnabledChains();
    const { convertFiatAmountFormatted } = useLocalizationContext();
    // By relying on this cached fragment instead of a query with many fields, we can avoid re-renders unless these specific fields change.
    const { data: tokenBalance } = useTokenBalanceMainPartsFragment({ id: portfolioBalanceId });
    const balanceUSD = (_a = tokenBalance === null || tokenBalance === void 0 ? void 0 : tokenBalance.denominatedValue) === null || _a === void 0 ? void 0 : _a.value;
    const relativeChange24 = (_c = (_b = tokenBalance === null || tokenBalance === void 0 ? void 0 : tokenBalance.tokenProjectMarket) === null || _b === void 0 ? void 0 : _b.relativeChange24) === null || _c === void 0 ? void 0 : _c.value;
    const balance = convertFiatAmountFormatted(balanceUSD, NumberType.FiatTokenQuantity);
    const isTestnetModeWithNoBalance = isTestnetModeEnabled && !balanceUSD;
    return isTestnetModeWithNoBalance ? (_jsx(_Fragment, {})) : (_jsx(Flex, { justifyContent: "space-between", position: "relative", children: _jsx(Shine, { disabled: !isLoading, children: !balanceUSD ? (_jsx(Flex, { centered: true, fill: true, children: _jsx(Text, { color: "$neutral2", children: t('common.text.notAvailable') }) })) : (_jsxs(Flex, { alignItems: "flex-end", pl: "$spacing8", children: [_jsx(Text, { color: "$neutral1", numberOfLines: 1, variant: isWeb ? 'body2' : 'body1', children: balance }), _jsx(RelativeChange, { alignRight: true, change: relativeChange24, negativeChangeColor: "$statusCritical", positiveChangeColor: "$statusSuccess", variant: isWeb ? 'body3' : 'body2' })] })) }) }));
}
//# sourceMappingURL=TokenBalanceItem.js.map