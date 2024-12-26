import { Percent } from '@uniswap/sdk-core';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isWeb } from 'ui/src';
import { WarningAction, WarningLabel, WarningSeverity, } from 'uniswap/src/components/modals/WarningModal/types';
import { uniswapUrls } from 'uniswap/src/constants/urls';
import { useAccountMeta } from 'uniswap/src/contexts/UniswapContext';
import { FetchError, isRateLimitFetchError } from 'uniswap/src/data/apiClients/FetchError';
import { Err404 } from 'uniswap/src/data/tradingApi/__generated__';
import { selectHasDismissedBridgingWarning } from 'uniswap/src/features/behaviorHistory/selectors';
import { TokenList } from 'uniswap/src/features/dataApi/types';
import { useTransactionGasWarning } from 'uniswap/src/features/gas/hooks';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { getTokenWarningSeverity } from 'uniswap/src/features/tokens/safetyUtils';
import { useDismissedTokenWarnings } from 'uniswap/src/features/tokens/slice/hooks';
import { getNetworkWarning, useFormattedWarnings, } from 'uniswap/src/features/transactions/hooks/useParsedTransactionWarnings';
import { useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { useSwapTxContext } from 'uniswap/src/features/transactions/swap/contexts/SwapTxContext';
import { isBridge } from 'uniswap/src/features/transactions/swap/utils/routing';
import { CurrencyField } from 'uniswap/src/types/currency';
import { currencyId } from 'uniswap/src/utils/currencyId';
import { useIsOffline } from 'utilities/src/connection/useIsOffline';
import { normalizePriceImpact } from 'utilities/src/format/normalizePriceImpact';
import { isInterface } from 'utilities/src/platform';
import { useMemoCompare } from 'utilities/src/react/hooks';
const PRICE_IMPACT_THRESHOLD_MEDIUM = new Percent(3, 100); // 3%
const PRICE_IMPACT_THRESHOLD_HIGH = new Percent(5, 100); // 5%
export function getSwapWarnings(t, formatPercent, derivedSwapInfo, offline) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const warnings = [];
    if (offline) {
        warnings.push(getNetworkWarning(t));
    }
    const { currencyBalances, currencyAmounts, currencies, trade } = derivedSwapInfo;
    // token is blocked
    const isInputTokenBlocked = ((_b = (_a = currencies[CurrencyField.INPUT]) === null || _a === void 0 ? void 0 : _a.safetyInfo) === null || _b === void 0 ? void 0 : _b.tokenList) === TokenList.Blocked;
    const isOutputTokenBlocked = ((_d = (_c = currencies[CurrencyField.OUTPUT]) === null || _c === void 0 ? void 0 : _c.safetyInfo) === null || _d === void 0 ? void 0 : _d.tokenList) === TokenList.Blocked;
    if (isInputTokenBlocked || isOutputTokenBlocked) {
        warnings.push({
            type: WarningLabel.BlockedToken,
            severity: WarningSeverity.Blocked,
            action: WarningAction.DisableReview,
            buttonText: t('swap.warning.tokenBlocked.button', {
                tokenSymbol: (_g = (isInputTokenBlocked
                    ? (_e = currencies[CurrencyField.INPUT]) === null || _e === void 0 ? void 0 : _e.currency.symbol
                    : (_f = currencies[CurrencyField.OUTPUT]) === null || _f === void 0 ? void 0 : _f.currency.symbol)) !== null && _g !== void 0 ? _g : 'Token',
            }),
        });
    }
    // insufficient balance for swap
    const currencyBalanceIn = currencyBalances[CurrencyField.INPUT];
    const currencyAmountIn = currencyAmounts[CurrencyField.INPUT];
    const swapBalanceInsufficient = currencyAmountIn && (currencyBalanceIn === null || currencyBalanceIn === void 0 ? void 0 : currencyBalanceIn.lessThan(currencyAmountIn));
    if (swapBalanceInsufficient) {
        warnings.push({
            type: WarningLabel.InsufficientFunds,
            severity: WarningSeverity.None,
            action: WarningAction.DisableReview,
            title: t('swap.warning.insufficientBalance.title', {
                currencySymbol: (_h = currencyAmountIn.currency) === null || _h === void 0 ? void 0 : _h.symbol,
            }),
            buttonText: isWeb
                ? t('common.insufficientTokenBalance.error.simple', {
                    tokenSymbol: (_j = currencyAmountIn.currency) === null || _j === void 0 ? void 0 : _j.symbol,
                })
                : undefined,
            currency: currencyAmountIn.currency,
        });
    }
    if (trade.error) {
        warnings.push(getSwapWarningFromError(trade.error, t));
    }
    // swap form is missing input, output fields
    if (formIncomplete(derivedSwapInfo)) {
        warnings.push({
            type: WarningLabel.FormIncomplete,
            severity: WarningSeverity.None,
            action: WarningAction.DisableReview,
        });
    }
    // price impact warning
    const priceImpact = (_k = trade.trade) === null || _k === void 0 ? void 0 : _k.priceImpact;
    const priceImpactValue = priceImpact ? formatPercent(normalizePriceImpact(priceImpact)) : undefined;
    if (priceImpact === null || priceImpact === void 0 ? void 0 : priceImpact.greaterThan(PRICE_IMPACT_THRESHOLD_MEDIUM)) {
        const highImpact = !priceImpact.lessThan(PRICE_IMPACT_THRESHOLD_HIGH);
        warnings.push({
            type: highImpact ? WarningLabel.PriceImpactHigh : WarningLabel.PriceImpactMedium,
            severity: highImpact ? WarningSeverity.High : WarningSeverity.Medium,
            action: WarningAction.WarnBeforeSubmit,
            title: highImpact
                ? t('swap.warning.priceImpact.title.veryHigh', {
                    priceImpactValue,
                })
                : t('swap.warning.priceImpact.title', {
                    priceImpactValue,
                }),
            message: highImpact
                ? t('swap.warning.priceImpact.message.veryHigh', { priceImpactValue })
                : t('swap.warning.priceImpact.message', {
                    outputCurrencySymbol: (_l = currencies[CurrencyField.OUTPUT]) === null || _l === void 0 ? void 0 : _l.currency.symbol,
                    inputCurrencySymbol: (_m = currencies[CurrencyField.INPUT]) === null || _m === void 0 ? void 0 : _m.currency.symbol,
                }),
            link: uniswapUrls.helpArticleUrls.priceImpact,
        });
    }
    return warnings;
}
function useSwapWarnings(derivedSwapInfo) {
    const { t } = useTranslation();
    const { formatPercent } = useLocalizationContext();
    const offline = useIsOffline();
    return useMemoCompare(() => getSwapWarnings(t, formatPercent, derivedSwapInfo, offline), isEqual);
}
function formIncomplete(derivedSwapInfo) {
    const { currencyAmounts, currencies, exactCurrencyField } = derivedSwapInfo;
    return (!currencies[CurrencyField.INPUT] ||
        !currencies[CurrencyField.OUTPUT] ||
        (exactCurrencyField === CurrencyField.INPUT && !currencyAmounts[CurrencyField.INPUT]) ||
        (exactCurrencyField === CurrencyField.OUTPUT && !currencyAmounts[CurrencyField.OUTPUT]));
}
export function useNeedsBridgingWarning(derivedSwapInfo) {
    const isBridgeTrade = derivedSwapInfo.trade.trade !== null && isBridge(derivedSwapInfo.trade.trade);
    const hasDismissedBridgingWarning = useSelector(selectHasDismissedBridgingWarning);
    return isBridgeTrade && !hasDismissedBridgingWarning;
}
/*
 * Display token protection warning modal on swap button click.
 * For **interface use only**, where the swap component might be prefilled with a token that has a protection warning.
 * i.e. via TDP swap component or URL /swap?inputCurrency=0x123
 * In mobile & extension, token protection warnings for prefilled tokens are already surfaced earlier on, on the previous Buy/Sell button click.
 */
export function usePrefilledNeedsTokenProtectionWarning(derivedSwapInfo, prefilledCurrencies) {
    const inputCurrencyInfo = derivedSwapInfo.currencies.input;
    const outputCurrencyInfo = derivedSwapInfo.currencies.output;
    const { tokenWarningDismissed: inputTokenWarningPreviouslyDismissed } = useDismissedTokenWarnings(inputCurrencyInfo === null || inputCurrencyInfo === void 0 ? void 0 : inputCurrencyInfo.currency);
    const { tokenWarningDismissed: outputTokenWarningPreviouslyDismissed } = useDismissedTokenWarnings(outputCurrencyInfo === null || outputCurrencyInfo === void 0 ? void 0 : outputCurrencyInfo.currency);
    const currenciesWithProtectionWarnings = useMemo(() => {
        const tokens = [];
        // We only display protection warnings for prefilled tokens on swap button click, bc users should have already seen warning if picked via token selector
        const inputCurrencyId = inputCurrencyInfo && currencyId(inputCurrencyInfo.currency);
        const outputCurrencyId = outputCurrencyInfo && currencyId(outputCurrencyInfo.currency);
        const isInputPrefilled = inputCurrencyId &&
            (prefilledCurrencies === null || prefilledCurrencies === void 0 ? void 0 : prefilledCurrencies.some((currency) => currencyId(currency).toLowerCase() === inputCurrencyId.toLowerCase()));
        const isOutputPrefilled = outputCurrencyId &&
            (prefilledCurrencies === null || prefilledCurrencies === void 0 ? void 0 : prefilledCurrencies.some((currency) => currencyId(currency).toLowerCase() === outputCurrencyId.toLowerCase()));
        if (inputCurrencyInfo &&
            !inputTokenWarningPreviouslyDismissed &&
            isInputPrefilled &&
            getTokenWarningSeverity(inputCurrencyInfo) !== WarningSeverity.None) {
            tokens.push(inputCurrencyInfo);
        }
        if (outputCurrencyInfo &&
            !outputTokenWarningPreviouslyDismissed &&
            isOutputPrefilled &&
            getTokenWarningSeverity(outputCurrencyInfo) !== WarningSeverity.None) {
            tokens.push(outputCurrencyInfo);
        }
        return tokens;
    }, [
        inputCurrencyInfo,
        outputCurrencyInfo,
        prefilledCurrencies,
        inputTokenWarningPreviouslyDismissed,
        outputTokenWarningPreviouslyDismissed,
    ]);
    if (!isInterface) {
        return {
            needsTokenProtectionWarning: false,
            currenciesWithProtectionWarnings: [],
        };
    }
    return {
        needsTokenProtectionWarning: currenciesWithProtectionWarnings.length >= 1,
        currenciesWithProtectionWarnings,
    };
}
export function useParsedSwapWarnings() {
    const account = useAccountMeta();
    const { derivedSwapInfo } = useSwapFormContext();
    const { gasFee } = useSwapTxContext();
    const swapWarnings = useSwapWarnings(derivedSwapInfo);
    const gasWarning = useTransactionGasWarning({ account, derivedInfo: derivedSwapInfo, gasFee: gasFee.value });
    const allWarnings = useMemo(() => {
        return !gasWarning ? swapWarnings : [...swapWarnings, gasWarning];
    }, [gasWarning, swapWarnings]);
    return useFormattedWarnings(allWarnings);
}
function getSwapWarningFromError(error, t) {
    if (error instanceof FetchError) {
        // Special case: rate limit errors are not parsed by errorCode
        if (isRateLimitFetchError(error)) {
            return {
                type: WarningLabel.RateLimit,
                severity: WarningSeverity.Medium,
                action: WarningAction.DisableReview,
                title: t('swap.warning.rateLimit.title'),
                message: t('swap.warning.rateLimit.message'),
            };
        }
        // Map errorCode to Warning
        switch (error.data.errorCode) {
            case Err404.errorCode.QUOTE_AMOUNT_TOO_LOW_ERROR: {
                return {
                    type: WarningLabel.EnterLargerAmount,
                    severity: WarningSeverity.Low,
                    action: WarningAction.DisableReview,
                    title: t('swap.warning.enterLargerAmount.title'),
                    message: '',
                };
            }
            case Err404.errorCode.RESOURCE_NOT_FOUND: {
                return {
                    type: WarningLabel.NoRoutesError,
                    severity: WarningSeverity.Low,
                    action: WarningAction.DisableReview,
                    title: t('swap.warning.noRoutesFound.title'),
                    message: t('swap.warning.noRoutesFound.message'),
                };
            }
        }
    }
    // Generic routing error if we can't parse a specific case
    return {
        type: WarningLabel.SwapRouterError,
        severity: WarningSeverity.Low,
        action: WarningAction.DisableReview,
        title: t('swap.warning.router.title'),
        message: t('swap.warning.router.message'),
    };
}
//# sourceMappingURL=useSwapWarnings.js.map