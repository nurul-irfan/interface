import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Flex, Text } from 'ui/src';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useUSDCPrice } from 'uniswap/src/features/transactions/swap/hooks/useUSDCPrice';
import { getRateToDisplay } from 'uniswap/src/features/transactions/swap/utils/trade';
import { NumberType } from 'utilities/src/format/types';
export function SwapRateRatio({ trade, styling = 'primary', initialInverse = false, }) {
    const formatter = useLocalizationContext();
    const { convertFiatAmountFormatted } = formatter;
    const [showInverseRate, setShowInverseRate] = useState(initialInverse);
    const latestPrice = trade === null || trade === void 0 ? void 0 : trade.executionPrice;
    const { price: latestUSDPrice } = useUSDCPrice(showInverseRate ? latestPrice === null || latestPrice === void 0 ? void 0 : latestPrice.quoteCurrency : latestPrice === null || latestPrice === void 0 ? void 0 : latestPrice.baseCurrency);
    const latestFiatPriceFormatted = convertFiatAmountFormatted(latestUSDPrice === null || latestUSDPrice === void 0 ? void 0 : latestUSDPrice.toSignificant(), NumberType.FiatTokenPrice);
    const latestRate = trade && getRateToDisplay(formatter, trade, showInverseRate);
    const isPrimary = styling === 'primary';
    if (!trade) {
        return null;
    }
    return (_jsx(Flex, { pressStyle: { opacity: 0.2 }, onPress: () => setShowInverseRate(!showInverseRate), children: _jsxs(Text, { adjustsFontSizeToFit: true, color: isPrimary ? '$neutral1' : '$neutral2', numberOfLines: 1, variant: "body3", children: [latestRate, _jsx(Text, { color: isPrimary ? '$neutral1' : '$neutral3', variant: "body3", children: latestUSDPrice && ` (${latestFiatPriceFormatted})` })] }) }));
}
//# sourceMappingURL=SwapRateRatio.js.map