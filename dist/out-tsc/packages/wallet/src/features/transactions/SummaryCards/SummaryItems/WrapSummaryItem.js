import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { SplitLogo } from 'uniswap/src/components/CurrencyLogo/SplitLogo';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useNativeCurrencyInfo, useWrappedNativeCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { getFormattedCurrencyAmount } from 'uniswap/src/utils/currency';
import { TransactionSummaryLayout } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/TransactionSummaryLayout';
import { TXN_HISTORY_ICON_SIZE } from 'wallet/src/features/transactions/SummaryCards/utils';
export function WrapSummaryItem({ transaction, index, }) {
    const formatter = useLocalizationContext();
    const { unwrapped } = transaction.typeInfo;
    const nativeCurrencyInfo = useNativeCurrencyInfo(transaction.chainId);
    const wrappedCurrencyInfo = useWrappedNativeCurrencyInfo(transaction.chainId);
    const caption = useMemo(() => {
        if (!nativeCurrencyInfo || !wrappedCurrencyInfo) {
            return '';
        }
        const inputCurrencyInfo = unwrapped ? wrappedCurrencyInfo : nativeCurrencyInfo;
        const outputCurrencyInfo = unwrapped ? nativeCurrencyInfo : wrappedCurrencyInfo;
        const { currency: inputCurrency } = inputCurrencyInfo;
        const { currency: outputCurrency } = outputCurrencyInfo;
        const currencyAmount = getFormattedCurrencyAmount(inputCurrency, transaction.typeInfo.currencyAmountRaw, formatter);
        const otherCurrencyAmount = getFormattedCurrencyAmount(outputCurrency, transaction.typeInfo.currencyAmountRaw, formatter);
        return `${currencyAmount}${inputCurrency.symbol} → ${otherCurrencyAmount}${outputCurrency.symbol}`;
    }, [nativeCurrencyInfo, transaction.typeInfo.currencyAmountRaw, unwrapped, wrappedCurrencyInfo, formatter]);
    const icon = useMemo(() => (_jsx(SplitLogo, { chainId: transaction.chainId, inputCurrencyInfo: unwrapped ? wrappedCurrencyInfo : nativeCurrencyInfo, outputCurrencyInfo: unwrapped ? nativeCurrencyInfo : wrappedCurrencyInfo, size: TXN_HISTORY_ICON_SIZE })), [nativeCurrencyInfo, transaction.chainId, unwrapped, wrappedCurrencyInfo]);
    return _jsx(TransactionSummaryLayout, { caption: caption, icon: icon, index: index, transaction: transaction });
}
//# sourceMappingURL=WrapSummaryItem.js.map