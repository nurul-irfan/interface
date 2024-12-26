import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Trans } from 'react-i18next';
import { Text } from 'ui/src';
import { WarningLabel } from 'uniswap/src/components/modals/WarningModal/types';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { getChainLabel, toSupportedChainId } from 'uniswap/src/features/chains/utils';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { NativeCurrency } from 'uniswap/src/features/tokens/NativeCurrency';
import { ValueType, getCurrencyAmount } from 'uniswap/src/features/tokens/getCurrencyAmount';
import { useNativeCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { INSUFFICIENT_NATIVE_TOKEN_TEXT_VARIANT } from 'uniswap/src/features/transactions/InsufficientNativeTokenWarning/constants';
import { useUSDCValue } from 'uniswap/src/features/transactions/swap/hooks/useUSDCPrice';
import { useNetworkColors } from 'uniswap/src/utils/colors';
import { NumberType } from 'utilities/src/format/types';
import { logger } from 'utilities/src/logger/logger';
export function useInsufficientNativeTokenWarning({ flow, gasFee, warnings, }) {
    var _a;
    const { defaultChainId } = useEnabledChains();
    const { convertFiatAmountFormatted } = useLocalizationContext();
    const warning = warnings.find((w) => w.type === WarningLabel.InsufficientGasFunds);
    const nativeCurrency = warning === null || warning === void 0 ? void 0 : warning.currency;
    const chainId = (_a = nativeCurrency === null || nativeCurrency === void 0 ? void 0 : nativeCurrency.chainId) !== null && _a !== void 0 ? _a : defaultChainId;
    const nativeCurrencyInfo = useNativeCurrencyInfo(chainId);
    const networkColors = useNetworkColors(chainId);
    const gasAmount = useMemo(() => getCurrencyAmount({
        value: gasFee.value,
        valueType: ValueType.Raw,
        currency: (nativeCurrency === null || nativeCurrency === void 0 ? void 0 : nativeCurrency.chainId) ? NativeCurrency.onChain(nativeCurrency.chainId) : undefined,
    }), [gasFee.value, nativeCurrency === null || nativeCurrency === void 0 ? void 0 : nativeCurrency.chainId]);
    const gasAmountUsd = useUSDCValue(gasAmount);
    const gasAmountFiatFormatted = convertFiatAmountFormatted(gasAmountUsd === null || gasAmountUsd === void 0 ? void 0 : gasAmountUsd.toExact(), NumberType.FiatGasPrice);
    if (!warning || !nativeCurrency || !nativeCurrencyInfo) {
        return null;
    }
    if (!gasAmount) {
        logger.warn('useInsufficientNativeTokenWarning', 'useInsufficientNativeTokenWarning', 'No `gasAmount` found when trying to render `InsufficientNativeTokenWarning`', {
            warning,
            gasFee,
            nativeCurrency,
            nativeCurrencyInfo,
        });
        return null;
    }
    const supportedChainId = toSupportedChainId(nativeCurrency.chainId);
    if (!supportedChainId) {
        throw new Error(`Unsupported chain ID: ${nativeCurrency.chainId}`);
    }
    const networkName = getChainLabel(supportedChainId);
    const modalOrTooltipMainMessage = (_jsx(Trans, { components: {
            // TODO(WALL-3901): move this to `value` once the bug in i18next is fixed.
            // We need to pass this as a `component` instead of a `value` because there seems to be a bug in i18next
            // which causes the value `<$0.01` to be incorrectly escaped.
            fiatTokenAmount: (_jsx(Text, { color: "$neutral2", variant: INSUFFICIENT_NATIVE_TOKEN_TEXT_VARIANT, children: gasAmountFiatFormatted })),
        }, i18nKey: "transaction.warning.insufficientGas.modal.message", values: {
            networkName,
            tokenSymbol: nativeCurrency.symbol,
            tokenAmount: gasAmount.toSignificant(2),
        } }));
    return {
        flow,
        gasAmount,
        gasAmountFiatFormatted,
        nativeCurrency,
        nativeCurrencyInfo,
        networkColors,
        networkName,
        modalOrTooltipMainMessage,
        warning,
    };
}
//# sourceMappingURL=useInsufficientNativeTokenWarning.js.map