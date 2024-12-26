import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Button, isWeb } from 'ui/src';
import { opacify, validColor } from 'ui/src/theme';
import { useUniswapContext } from 'uniswap/src/contexts/UniswapContext';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { useIsSupportedFiatOnRampCurrency } from 'uniswap/src/features/fiatOnRamp/hooks';
import Trace from 'uniswap/src/features/telemetry/Trace';
import { ElementName } from 'uniswap/src/features/telemetry/constants';
import { useNetworkColors } from 'uniswap/src/utils/colors';
export function BuyNativeTokenButton({ nativeCurrencyInfo, canBridge, }) {
    var _a, _b, _c;
    const { t } = useTranslation();
    const { defaultChainId } = useEnabledChains();
    const { foreground, background } = useNetworkColors((_b = (_a = nativeCurrencyInfo.currency) === null || _a === void 0 ? void 0 : _a.chainId) !== null && _b !== void 0 ? _b : defaultChainId);
    const primaryColor = validColor(foreground);
    const backgroundColor = validColor(background);
    const onPressColor = validColor(opacify(50, foreground));
    const { navigateToFiatOnRamp } = useUniswapContext();
    const fiatOnRampCurrency = useIsSupportedFiatOnRampCurrency((_c = nativeCurrencyInfo === null || nativeCurrencyInfo === void 0 ? void 0 : nativeCurrencyInfo.currencyId) !== null && _c !== void 0 ? _c : '', !nativeCurrencyInfo);
    const onPressBuyFiatOnRamp = () => {
        navigateToFiatOnRamp({ prefilledCurrency: fiatOnRampCurrency });
    };
    return (_jsx(Trace, { logPress: true, element: ElementName.BuyNativeTokenButton, children: _jsx(Button, { ...(canBridge
                ? undefined
                : {
                    backgroundColor,
                    color: primaryColor,
                    pressStyle: { backgroundColor: onPressColor },
                }), size: isWeb ? 'small' : 'medium', theme: canBridge ? 'secondary' : 'primary', width: "100%", onPress: onPressBuyFiatOnRamp, children: canBridge
                ? t('swap.warning.insufficientGas.button.buyWithCard')
                : t('swap.warning.insufficientGas.button.buy', { tokenSymbol: nativeCurrencyInfo.currency.symbol }) }) }));
}
//# sourceMappingURL=BuyNativeTokenButton.js.map