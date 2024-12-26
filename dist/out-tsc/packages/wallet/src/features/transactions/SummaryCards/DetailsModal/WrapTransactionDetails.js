import { jsx as _jsx } from "react/jsx-runtime";
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { SwapTransactionContent } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/SwapTransactionDetails';
import { buildNativeCurrencyId, buildWrappedNativeCurrencyId } from 'wallet/src/utils/currencyId';
export function WrapTransactionDetails({ transactionDetails, typeInfo, onClose, }) {
    const nativeCurrency = useCurrencyInfo(buildNativeCurrencyId(transactionDetails.chainId));
    const wrappedNativeCurrency = useCurrencyInfo(buildWrappedNativeCurrencyId(transactionDetails.chainId));
    const inputCurrency = typeInfo.unwrapped ? wrappedNativeCurrency : nativeCurrency;
    const outputCurrency = typeInfo.unwrapped ? nativeCurrency : wrappedNativeCurrency;
    return (_jsx(SwapTransactionContent, { isConfirmed: true, inputCurrency: inputCurrency, inputCurrencyAmountRaw: typeInfo.currencyAmountRaw, outputCurrency: outputCurrency, outputCurrencyAmountRaw: typeInfo.currencyAmountRaw, onClose: onClose }));
}
//# sourceMappingURL=WrapTransactionDetails.js.map