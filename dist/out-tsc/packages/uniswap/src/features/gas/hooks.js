import { BigNumber } from 'ethers/lib/ethers';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isWeb } from 'ui/src';
import { WarningAction, WarningLabel, WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { useAccountMeta, useProvider } from 'uniswap/src/contexts/UniswapContext';
import { useGasFeeQuery } from 'uniswap/src/data/apiClients/uniswapApi/useGasFeeQuery';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { areEqualGasStrategies, } from 'uniswap/src/features/gas/types';
import { hasSufficientFundsIncludingGas } from 'uniswap/src/features/gas/utils';
import { DynamicConfigs } from 'uniswap/src/features/gating/configs';
import { Statsig, useConfig } from 'uniswap/src/features/gating/sdk/statsig';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useOnChainNativeCurrencyBalance } from 'uniswap/src/features/portfolio/api';
import { NativeCurrency } from 'uniswap/src/features/tokens/NativeCurrency';
import { ValueType, getCurrencyAmount } from 'uniswap/src/features/tokens/getCurrencyAmount';
import { usePollingIntervalByChain } from 'uniswap/src/features/transactions/swap/hooks/usePollingIntervalByChain';
import { useUSDCValueWithStatus } from 'uniswap/src/features/transactions/swap/hooks/useUSDCPrice';
import { CurrencyField } from 'uniswap/src/types/currency';
import { NumberType } from 'utilities/src/format/types';
import { logger } from 'utilities/src/logger/logger';
import { isInterface } from 'utilities/src/platform';
import { ONE_SECOND_MS } from 'utilities/src/time/time';
// The default "Urgent" strategy that was previously hardcoded in the gas service
export const DEFAULT_GAS_STRATEGY = {
    limitInflationFactor: 1.15,
    displayLimitInflationFactor: 1.15,
    priceInflationFactor: 1.5,
    percentileThresholdFor1559Fee: 75,
    minPriorityFeeGwei: 2,
    maxPriorityFeeGwei: 9,
};
// Helper function to check if the config value is a valid GasStrategies object
function isValidGasStrategies(value) {
    return (typeof value === 'object' &&
        value !== null &&
        'strategies' in value &&
        Array.isArray(value.strategies));
}
// Hook to use active GasStrategy for a specific chain.
export function useActiveGasStrategy(chainId, type) {
    const { isLoading } = useConfig(DynamicConfigs.GasStrategies);
    return useMemo(() => {
        if (isLoading) {
            return DEFAULT_GAS_STRATEGY;
        }
        const config = Statsig.getConfig(DynamicConfigs.GasStrategies);
        const gasStrategies = isValidGasStrategies(config.value) ? config.value : undefined;
        const activeStrategy = gasStrategies === null || gasStrategies === void 0 ? void 0 : gasStrategies.strategies.find((s) => s.conditions.chainId === chainId && s.conditions.types === type && s.conditions.isActive);
        return activeStrategy ? activeStrategy.strategy : DEFAULT_GAS_STRATEGY;
    }, [isLoading, chainId, type]);
}
// Hook to use shadow GasStrategies for a specific chain.
export function useShadowGasStrategies(chainId, type) {
    const { isLoading } = useConfig(DynamicConfigs.GasStrategies);
    return useMemo(() => {
        if (isLoading) {
            return [];
        }
        const config = Statsig.getConfig(DynamicConfigs.GasStrategies);
        const gasStrategies = isValidGasStrategies(config.value) ? config.value : undefined;
        const shadowStrategies = gasStrategies === null || gasStrategies === void 0 ? void 0 : gasStrategies.strategies.filter((s) => s.conditions.chainId === chainId && s.conditions.types === type && !s.conditions.isActive).map((s) => s.strategy);
        return shadowStrategies !== null && shadowStrategies !== void 0 ? shadowStrategies : [];
    }, [isLoading, chainId, type]);
}
/**
 * Converts a gas fee calculated with the provided gas strategy to a display value.
 * When calculating the gas fee, the gas limit is multiplied by the `limitInflationFactor`,
 * but in the vast majority of cases, the transaction uses only the originally estimated gas limit.
 * We use the `displayLimitInflationFactor` to calculate the display value, which can be
 * different from the `limitInflationFactor` so that the gas fee displayed is more accurate.
 *
 * More info: https://www.notion.so/uniswaplabs/Gas-Limit-Experiment-14ac52b2548b80ea932ff2edfdab6683
 *
 * @param gasFee - The gas fee value to convert.
 * @param gasStrategy - The gas strategy used to calculate the gas fee.
 * @returns The display value of the gas fee.
 */
export function convertGasFeeToDisplayValue(gasFee, gasStrategy) {
    if (!gasFee || !gasStrategy || gasStrategy.limitInflationFactor === 0) {
        return gasFee;
    }
    const PRECISION = 1000000;
    const { displayLimitInflationFactor, limitInflationFactor } = gasStrategy;
    // Scale the inflation factors to integers
    const scaledDisplayFactor = Math.round(displayLimitInflationFactor * PRECISION);
    const scaledLimitFactor = Math.round(limitInflationFactor * PRECISION);
    return BigNumber.from(gasFee)
        .mul(BigNumber.from(scaledDisplayFactor))
        .div(BigNumber.from(scaledLimitFactor))
        .toString();
}
export function useTransactionGasFee(tx, skip, refetchInterval, fallbackGasLimit) {
    var _a;
    const pollingIntervalForChain = usePollingIntervalByChain(tx === null || tx === void 0 ? void 0 : tx.chainId);
    const activeGasStrategy = useActiveGasStrategy(tx === null || tx === void 0 ? void 0 : tx.chainId, 'general');
    const shadowGasStrategies = useShadowGasStrategies(tx === null || tx === void 0 ? void 0 : tx.chainId, 'general');
    const { defaultChainId } = useEnabledChains();
    const txWithGasStrategies = useMemo(() => ({ ...tx, gasStrategies: [activeGasStrategy, ...(shadowGasStrategies !== null && shadowGasStrategies !== void 0 ? shadowGasStrategies : [])] }), [tx, activeGasStrategy, shadowGasStrategies]);
    const { data, error, isLoading } = useGasFeeQuery({
        params: skip || !tx ? undefined : txWithGasStrategies,
        refetchInterval,
        staleTime: pollingIntervalForChain,
        immediateGcTime: pollingIntervalForChain + 15 * ONE_SECOND_MS,
    });
    // Gas Fee API currently errors on gas estimations on disconnected state & insufficient funds
    // Fallback to clientside estimate using provider.estimateGas
    const [clientsideGasEstimate, setClientsideGasEstimate] = useState({
        isLoading: true,
        error: null,
    });
    const account = useAccountMeta();
    const provider = useProvider((_a = tx === null || tx === void 0 ? void 0 : tx.chainId) !== null && _a !== void 0 ? _a : defaultChainId);
    useEffect(() => {
        async function calculateClientsideGasEstimate() {
            if (skip || !tx) {
                setClientsideGasEstimate({
                    isLoading: false,
                    error: null,
                });
            }
            try {
                if (!provider) {
                    throw new Error('No provider for clientside gas estimation');
                }
                const gasUseEstimate = (await provider.estimateGas({ from: account === null || account === void 0 ? void 0 : account.address, ...tx })).toNumber() * 10e9;
                setClientsideGasEstimate({
                    value: gasUseEstimate.toString(),
                    // These estimates don't inflate the gas limit, so we can use the same value for display
                    displayValue: gasUseEstimate.toString(),
                    isLoading: false,
                    error: null,
                });
            }
            catch (e) {
                // provider.estimateGas will error if the account doesn't have sufficient ETH balance, but we should show an estimated cost anyway
                setClientsideGasEstimate({
                    value: fallbackGasLimit === null || fallbackGasLimit === void 0 ? void 0 : fallbackGasLimit.toString(),
                    // These estimates don't inflate the gas limit, so we can use the same value for display
                    displayValue: fallbackGasLimit === null || fallbackGasLimit === void 0 ? void 0 : fallbackGasLimit.toString(),
                    isLoading: false,
                    error: fallbackGasLimit ? null : e,
                });
            }
        }
        calculateClientsideGasEstimate().catch(() => undefined);
    }, [account === null || account === void 0 ? void 0 : account.address, fallbackGasLimit, provider, skip, tx]);
    return useMemo(() => {
        var _a, _b;
        if (error && isInterface) {
            // TODO(WEB-5086): Remove clientside fallback when Gas Fee API fixes errors
            // Not currently necessary to run this fallback logic on mob/ext since they have workarounds for failing Gas Fee API (will never be disconnected + just hides gas fee display entirely when insufficient funds)
            logger.debug('features/gas/hooks.ts', 'useTransactionGasFee', 'Error estimating gas from Gas Fee API, falling back to clientside estimate', error);
            return clientsideGasEstimate;
        }
        if (!data) {
            return { error: error !== null && error !== void 0 ? error : null, isLoading };
        }
        const activeEstimate = (_a = data.gasEstimates) === null || _a === void 0 ? void 0 : _a.find((e) => areEqualGasStrategies(e.strategy, activeGasStrategy));
        if (!activeEstimate) {
            return { error: error !== null && error !== void 0 ? error : new Error('Could not get gas estimate'), isLoading };
        }
        return {
            value: activeEstimate.gasFee,
            displayValue: convertGasFeeToDisplayValue(activeEstimate.gasFee, activeGasStrategy),
            isLoading,
            error: error !== null && error !== void 0 ? error : null,
            params: extractGasFeeParams(activeEstimate),
            gasEstimates: {
                activeEstimate,
                shadowEstimates: (_b = data.gasEstimates) === null || _b === void 0 ? void 0 : _b.filter((e) => e !== activeEstimate),
            },
        };
    }, [clientsideGasEstimate, data, error, isLoading, activeGasStrategy]);
}
export function useUSDValueOfGasFee(chainId, feeValueInWei) {
    const currencyAmount = getCurrencyAmount({
        value: feeValueInWei,
        valueType: ValueType.Raw,
        currency: chainId ? NativeCurrency.onChain(chainId) : undefined,
    });
    const { value, isLoading } = useUSDCValueWithStatus(currencyAmount);
    return { isLoading, value: value === null || value === void 0 ? void 0 : value.toExact() };
}
// Same as useUSDValueOfGasFee, but returns a CurrencyAmount<Currency> instead of a string
export function useUSDCurrencyAmountOfGasFee(chainId, feeValueInWei) {
    const currencyAmount = getCurrencyAmount({
        value: feeValueInWei,
        valueType: ValueType.Raw,
        currency: chainId ? NativeCurrency.onChain(chainId) : undefined,
    });
    const { value } = useUSDCValueWithStatus(currencyAmount);
    return value;
}
export function useFormattedUniswapXGasFeeInfo(uniswapXGasBreakdown, chainId) {
    const { convertFiatAmountFormatted } = useLocalizationContext();
    const { value: approvalCostUsd } = useUSDValueOfGasFee(chainId, uniswapXGasBreakdown === null || uniswapXGasBreakdown === void 0 ? void 0 : uniswapXGasBreakdown.approvalCost);
    const { value: wrapCostUsd } = useUSDValueOfGasFee(chainId, uniswapXGasBreakdown === null || uniswapXGasBreakdown === void 0 ? void 0 : uniswapXGasBreakdown.wrapCost);
    return useMemo(() => {
        var _a;
        if (!uniswapXGasBreakdown) {
            return undefined;
        }
        const { approvalCost, wrapCost, inputTokenSymbol } = uniswapXGasBreakdown;
        // Without uniswapx, the swap would have costed approval price + classic swap fee. A separate wrap tx would not have occurred.
        const preSavingsGasCostUsd = Number(approvalCostUsd !== null && approvalCostUsd !== void 0 ? approvalCostUsd : 0) + Number((_a = uniswapXGasBreakdown === null || uniswapXGasBreakdown === void 0 ? void 0 : uniswapXGasBreakdown.classicGasUseEstimateUSD) !== null && _a !== void 0 ? _a : 0);
        const preSavingsGasFeeFormatted = convertFiatAmountFormatted(preSavingsGasCostUsd, NumberType.FiatGasPrice);
        // Swap submission will always cost 0, since it's not an on-chain tx.
        const swapFeeFormatted = convertFiatAmountFormatted(0, NumberType.FiatGasPrice);
        return {
            approvalFeeFormatted: approvalCost
                ? convertFiatAmountFormatted(approvalCostUsd, NumberType.FiatGasPrice)
                : undefined,
            wrapFeeFormatted: wrapCost ? convertFiatAmountFormatted(wrapCostUsd, NumberType.FiatGasPrice) : undefined,
            preSavingsGasFeeFormatted,
            swapFeeFormatted,
            inputTokenSymbol,
        };
    }, [uniswapXGasBreakdown, approvalCostUsd, convertFiatAmountFormatted, wrapCostUsd]);
}
export function useGasFeeHighRelativeToValue(gasFeeUSD, value) {
    return useMemo(() => {
        if (!value) {
            return false;
        }
        const tenthOfOutputValue = parseFloat(value.toExact()) / 10;
        return Number(gasFeeUSD !== null && gasFeeUSD !== void 0 ? gasFeeUSD : 0) > tenthOfOutputValue;
    }, [gasFeeUSD, value]);
}
export function useTransactionGasWarning({ account, derivedInfo, gasFee, }) {
    const { chainId, currencyAmounts, currencyBalances } = derivedInfo;
    const { t } = useTranslation();
    const { balance: nativeCurrencyBalance } = useOnChainNativeCurrencyBalance(chainId, account === null || account === void 0 ? void 0 : account.address);
    const currencyAmountIn = currencyAmounts[CurrencyField.INPUT];
    const currencyBalanceIn = currencyBalances[CurrencyField.INPUT];
    // insufficient funds for gas
    const nativeAmountIn = (currencyAmountIn === null || currencyAmountIn === void 0 ? void 0 : currencyAmountIn.currency.isNative)
        ? currencyAmountIn
        : undefined;
    const hasGasFunds = hasSufficientFundsIncludingGas({
        transactionAmount: nativeAmountIn,
        gasFee,
        nativeCurrencyBalance,
    });
    const balanceInsufficient = currencyAmountIn && (currencyBalanceIn === null || currencyBalanceIn === void 0 ? void 0 : currencyBalanceIn.lessThan(currencyAmountIn));
    return useMemo(() => {
        // if balance is already insufficient, dont need to show warning about network fee
        if (gasFee === undefined || balanceInsufficient || !nativeCurrencyBalance || hasGasFunds) {
            return undefined;
        }
        return {
            type: WarningLabel.InsufficientGasFunds,
            severity: WarningSeverity.Medium,
            action: WarningAction.DisableSubmit,
            title: t('swap.warning.insufficientGas.title', {
                currencySymbol: nativeCurrencyBalance.currency.symbol,
            }),
            buttonText: isWeb
                ? t('swap.warning.insufficientGas.button', {
                    currencySymbol: nativeCurrencyBalance.currency.symbol,
                })
                : undefined,
            message: undefined,
            currency: nativeCurrencyBalance.currency,
        };
    }, [gasFee, balanceInsufficient, nativeCurrencyBalance, hasGasFunds, t]);
}
function extractGasFeeParams(estimate) {
    if ('maxFeePerGas' in estimate) {
        return {
            maxFeePerGas: estimate.maxFeePerGas,
            maxPriorityFeePerGas: estimate.maxPriorityFeePerGas,
            gasLimit: estimate.gasLimit,
        };
    }
    else {
        return {
            gasPrice: estimate.gasPrice,
            gasLimit: estimate.gasLimit,
        };
    }
}
/**
 * Returns formatted fiat amounts based on a gas fee. Will format a USD price if a quote
 * is available, otherwise will return a formatted native currency amount.
 *
 * If no placeholder is defined, the response can be null. If a placeholder is defined,
 * the gas fee amount will always be a string.
 */
export function useGasFeeFormattedDisplayAmounts({ gasFee, chainId, placeholder, }) {
    const { convertFiatAmountFormatted, formatNumberOrString } = useLocalizationContext();
    const { value: gasFeeUSD, isLoading: gasFeeUSDIsLoading } = useUSDValueOfGasFee(chainId, gasFee === null || gasFee === void 0 ? void 0 : gasFee.displayValue);
    // In testnet mode, use native currency values as USD pricing may be unreliable
    const { isTestnetModeEnabled } = useEnabledChains();
    const nativeCurrency = NativeCurrency.onChain(chainId);
    const nativeCurrencyAmount = getCurrencyAmount({
        currency: nativeCurrency,
        value: gasFee === null || gasFee === void 0 ? void 0 : gasFee.displayValue,
        valueType: ValueType.Raw,
    });
    const fiatAmountFormatted = convertFiatAmountFormatted(gasFeeUSD, NumberType.FiatGasPrice);
    const nativeAmountFormatted = formatNumberOrString({
        value: nativeCurrencyAmount === null || nativeCurrencyAmount === void 0 ? void 0 : nativeCurrencyAmount.toExact(),
        type: NumberType.TokenNonTx,
    });
    const emptyState = placeholder !== null && placeholder !== void 0 ? placeholder : null;
    const gasFeeFormatted = useMemo(() => {
        // Gas fee not available
        if (!(gasFee === null || gasFee === void 0 ? void 0 : gasFee.displayValue)) {
            return emptyState;
        }
        // Gas fee available, USD not available - return native currency amount (always do this in testnet mode)
        if (!gasFeeUSD || isTestnetModeEnabled) {
            return gasFee.isLoading || gasFeeUSDIsLoading ? emptyState : `${nativeAmountFormatted} ${nativeCurrency.symbol}`;
        }
        // Gas fee and USD both available
        return fiatAmountFormatted;
    }, [
        emptyState,
        fiatAmountFormatted,
        gasFee === null || gasFee === void 0 ? void 0 : gasFee.isLoading,
        gasFee === null || gasFee === void 0 ? void 0 : gasFee.displayValue,
        gasFeeUSD,
        gasFeeUSDIsLoading,
        isTestnetModeEnabled,
        nativeAmountFormatted,
        nativeCurrency.symbol,
    ]);
    return {
        gasFeeUSD,
        gasFeeFormatted,
    };
}
//# sourceMappingURL=hooks.js.map