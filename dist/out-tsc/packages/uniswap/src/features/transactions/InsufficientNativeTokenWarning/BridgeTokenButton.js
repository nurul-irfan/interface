import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, isWeb } from 'ui/src';
import { opacify, validColor } from 'ui/src/theme';
import { AssetType } from 'uniswap/src/entities/assets';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import Trace from 'uniswap/src/features/telemetry/Trace';
import { ElementName } from 'uniswap/src/features/telemetry/constants';
import { getDefaultState, useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { useNetworkColors } from 'uniswap/src/utils/colors';
import { currencyIdToAddress } from 'uniswap/src/utils/currencyId';
export function BridgeTokenButton({ inputToken, outputToken, outputNetworkName, }) {
    var _a, _b;
    const { t } = useTranslation();
    const { foreground, background } = useNetworkColors((_b = (_a = outputToken.currency) === null || _a === void 0 ? void 0 : _a.chainId) !== null && _b !== void 0 ? _b : UniverseChainId.Mainnet);
    const primaryColor = validColor(foreground);
    const backgroundColor = validColor(background);
    const onPressColor = validColor(opacify(50, foreground));
    const { defaultChainId } = useEnabledChains();
    const { updateSwapForm } = useSwapFormContext();
    const onPressBridgeToken = useCallback(() => {
        updateSwapForm({
            ...getDefaultState(defaultChainId),
            input: {
                address: currencyIdToAddress(inputToken.currencyId),
                chainId: inputToken.currency.chainId,
                type: AssetType.Currency,
            },
            output: {
                address: currencyIdToAddress(outputToken.currencyId),
                chainId: outputToken.currency.chainId,
                type: AssetType.Currency,
            },
        });
    }, [
        defaultChainId,
        inputToken.currency.chainId,
        inputToken.currencyId,
        outputToken.currency.chainId,
        outputToken.currencyId,
        updateSwapForm,
    ]);
    if (!outputToken.currency.symbol) {
        throw new Error('Unexpected render of `BridgeTokenButton` without a token symbol for currency ' + outputToken.currencyId);
    }
    return (_jsx(Trace, { logPress: true, element: ElementName.BuyNativeTokenButton, children: _jsx(Button, { backgroundColor: backgroundColor, color: primaryColor, pressStyle: { backgroundColor: onPressColor }, size: isWeb ? 'small' : 'medium', theme: "primary", width: "100%", onPress: onPressBridgeToken, children: t('swap.warning.insufficientGas.button.bridge', {
                tokenSymbol: outputToken.currency.symbol,
                networkName: outputNetworkName,
            }) }) }));
}
//# sourceMappingURL=BridgeTokenButton.js.map