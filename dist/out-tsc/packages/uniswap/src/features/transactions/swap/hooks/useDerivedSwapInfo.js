import { TradeType } from '@uniswap/sdk-core';
import { useMemo } from 'react';
import { useAccountMeta } from 'uniswap/src/contexts/UniswapContext';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { useOnChainCurrencyBalance } from 'uniswap/src/features/portfolio/api';
import { ValueType, getCurrencyAmount } from 'uniswap/src/features/tokens/getCurrencyAmount';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { useTransactionSettingsContext } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
import { useTrade } from 'uniswap/src/features/transactions/swap/hooks/useTrade';
import { useUSDCValue } from 'uniswap/src/features/transactions/swap/hooks/useUSDCPrice';
import { getWrapType, isWrapAction } from 'uniswap/src/features/transactions/swap/utils/wrap';
import { CurrencyField } from 'uniswap/src/types/currency';
import { buildCurrencyId } from 'uniswap/src/utils/currencyId';
/** Returns information derived from the current swap state */
export function useDerivedSwapInfo({ isDebouncing, ...state }) {
    var _a, _b, _c;
    const { [CurrencyField.INPUT]: currencyAssetIn, [CurrencyField.OUTPUT]: currencyAssetOut, exactAmountFiat, exactAmountToken, exactCurrencyField, focusOnCurrencyField = CurrencyField.INPUT, selectingCurrencyField, txId, } = state;
    const { customSlippageTolerance, customDeadline, selectedProtocols } = useTransactionSettingsContext();
    const account = useAccountMeta();
    const { defaultChainId } = useEnabledChains();
    const currencyInInfo = useCurrencyInfo(currencyAssetIn ? buildCurrencyId(currencyAssetIn.chainId, currencyAssetIn.address) : undefined, { refetch: true });
    const currencyOutInfo = useCurrencyInfo(currencyAssetOut ? buildCurrencyId(currencyAssetOut.chainId, currencyAssetOut.address) : undefined, { refetch: true });
    const currencies = useMemo(() => {
        return {
            [CurrencyField.INPUT]: currencyInInfo,
            [CurrencyField.OUTPUT]: currencyOutInfo,
        };
    }, [currencyInInfo, currencyOutInfo]);
    const currencyIn = currencyInInfo === null || currencyInInfo === void 0 ? void 0 : currencyInInfo.currency;
    const currencyOut = currencyOutInfo === null || currencyOutInfo === void 0 ? void 0 : currencyOutInfo.currency;
    const chainId = (_b = (_a = currencyIn === null || currencyIn === void 0 ? void 0 : currencyIn.chainId) !== null && _a !== void 0 ? _a : currencyOut === null || currencyOut === void 0 ? void 0 : currencyOut.chainId) !== null && _b !== void 0 ? _b : defaultChainId;
    const { balance: tokenInBalance } = useOnChainCurrencyBalance(currencyIn, account === null || account === void 0 ? void 0 : account.address);
    const { balance: tokenOutBalance } = useOnChainCurrencyBalance(currencyOut, account === null || account === void 0 ? void 0 : account.address);
    const isExactIn = exactCurrencyField === CurrencyField.INPUT;
    const wrapType = getWrapType(currencyIn, currencyOut);
    const otherCurrency = isExactIn ? currencyOut : currencyIn;
    const exactCurrency = isExactIn ? currencyIn : currencyOut;
    const isWrap = isWrapAction(wrapType);
    // amountSpecified, otherCurrency, tradeType fully defines a trade
    const amountSpecified = useMemo(() => {
        return getCurrencyAmount({
            value: exactAmountToken,
            valueType: ValueType.Exact,
            currency: exactCurrency,
        });
    }, [exactAmountToken, exactCurrency]);
    const otherAmountForWrap = useMemo(() => {
        //  we only use otherAmountForWrap when it's a wrap action,
        //  otherwise parsing exactAmountToken using otherCurrency can lead to errors,
        //  e.g. otherCurrency.decimals !== exactCurrency.decimals
        if (isWrap) {
            return getCurrencyAmount({
                value: exactAmountToken,
                valueType: ValueType.Exact,
                currency: otherCurrency,
            });
        }
        return undefined;
    }, [exactAmountToken, isWrap, otherCurrency]);
    const sendPortionEnabled = useFeatureFlag(FeatureFlags.PortionFields);
    const tradeParams = {
        account,
        amountSpecified: isWrap ? null : amountSpecified,
        otherCurrency,
        tradeType: isExactIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT,
        customSlippageTolerance,
        customDeadline,
        selectedProtocols,
        sendPortionEnabled,
        isDebouncing,
    };
    const trade = useTrade(tradeParams);
    const displayableTrade = (_c = trade.trade) !== null && _c !== void 0 ? _c : trade.indicativeTrade;
    const currencyAmounts = useMemo(() => isWrap
        ? {
            [CurrencyField.INPUT]: amountSpecified,
            [CurrencyField.OUTPUT]: otherAmountForWrap,
        }
        : {
            [CurrencyField.INPUT]: exactCurrencyField === CurrencyField.INPUT ? amountSpecified : displayableTrade === null || displayableTrade === void 0 ? void 0 : displayableTrade.inputAmount,
            [CurrencyField.OUTPUT]: exactCurrencyField === CurrencyField.OUTPUT ? amountSpecified : displayableTrade === null || displayableTrade === void 0 ? void 0 : displayableTrade.outputAmount,
        }, [
        isWrap,
        exactCurrencyField,
        amountSpecified,
        otherAmountForWrap,
        displayableTrade === null || displayableTrade === void 0 ? void 0 : displayableTrade.inputAmount,
        displayableTrade === null || displayableTrade === void 0 ? void 0 : displayableTrade.outputAmount,
    ]);
    const inputCurrencyUSDValue = useUSDCValue(currencyAmounts[CurrencyField.INPUT]);
    const outputCurrencyUSDValue = useUSDCValue(currencyAmounts[CurrencyField.OUTPUT]);
    const currencyAmountsUSDValue = useMemo(() => {
        return {
            [CurrencyField.INPUT]: inputCurrencyUSDValue,
            [CurrencyField.OUTPUT]: outputCurrencyUSDValue,
        };
    }, [inputCurrencyUSDValue, outputCurrencyUSDValue]);
    const currencyBalances = useMemo(() => {
        return {
            [CurrencyField.INPUT]: tokenInBalance,
            [CurrencyField.OUTPUT]: tokenOutBalance,
        };
    }, [tokenInBalance, tokenOutBalance]);
    return useMemo(() => {
        return {
            chainId,
            currencies,
            currencyAmounts,
            currencyAmountsUSDValue,
            currencyBalances,
            trade,
            exactAmountToken,
            exactAmountFiat,
            exactCurrencyField,
            focusOnCurrencyField,
            wrapType,
            selectingCurrencyField,
            txId,
        };
    }, [
        chainId,
        currencies,
        currencyAmounts,
        currencyAmountsUSDValue,
        currencyBalances,
        exactAmountFiat,
        exactAmountToken,
        exactCurrencyField,
        focusOnCurrencyField,
        selectingCurrencyField,
        trade,
        txId,
        wrapType,
    ]);
}
//# sourceMappingURL=useDerivedSwapInfo.js.map