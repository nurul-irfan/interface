import isEqual from 'lodash/isEqual';
import { WarningAction, WarningLabel, WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { getNetworkWarning } from 'uniswap/src/features/transactions/hooks/useParsedTransactionWarnings';
import { CurrencyField } from 'uniswap/src/types/currency';
import { currencyAddress } from 'uniswap/src/utils/currencyId';
import { useIsOffline } from 'utilities/src/connection/useIsOffline';
import { useMemoCompare } from 'utilities/src/react/hooks';
export function getSendWarnings(t, derivedSendInfo, offline) {
    var _a, _b;
    const warnings = [];
    if (offline) {
        warnings.push(getNetworkWarning(t));
    }
    const { currencyBalances, currencyAmounts, recipient, currencyInInfo, nftIn, chainId } = derivedSendInfo;
    const currencyBalanceIn = currencyBalances[CurrencyField.INPUT];
    const currencyAmountIn = currencyAmounts[CurrencyField.INPUT];
    const isMissingRequiredParams = checkIsMissingRequiredParams(currencyInInfo, nftIn, chainId, recipient, !!currencyAmountIn, !!currencyBalanceIn);
    // insufficient balance
    if (currencyAmountIn && (currencyBalanceIn === null || currencyBalanceIn === void 0 ? void 0 : currencyBalanceIn.lessThan(currencyAmountIn))) {
        warnings.push({
            type: WarningLabel.InsufficientFunds,
            severity: WarningSeverity.None,
            action: WarningAction.DisableReview,
            title: t('send.warning.insufficientFunds.title', {
                currencySymbol: (_a = currencyAmountIn.currency) === null || _a === void 0 ? void 0 : _a.symbol,
            }),
            message: t('send.warning.insufficientFunds.message', {
                currencySymbol: (_b = currencyAmountIn.currency) === null || _b === void 0 ? void 0 : _b.symbol,
            }),
        });
    }
    // send form is missing fields
    if (isMissingRequiredParams) {
        warnings.push({
            type: WarningLabel.FormIncomplete,
            severity: WarningSeverity.None,
            action: WarningAction.DisableReview,
        });
    }
    return warnings;
}
export function useSendWarnings(t, derivedSendInfo) {
    const offline = useIsOffline();
    return useMemoCompare(() => getSendWarnings(t, derivedSendInfo, offline), isEqual);
}
const checkIsMissingRequiredParams = (currencyInInfo, nftIn, chainId, recipient, hasCurrencyAmount, hasCurrencyBalance) => {
    var _a;
    const tokenAddress = currencyInInfo ? currencyAddress(currencyInInfo.currency) : (_a = nftIn === null || nftIn === void 0 ? void 0 : nftIn.nftContract) === null || _a === void 0 ? void 0 : _a.address;
    if (!tokenAddress || !chainId || !recipient) {
        return true;
    }
    if (!currencyInInfo && !nftIn) {
        return true;
    }
    if (currencyInInfo && (!hasCurrencyAmount || !hasCurrencyBalance)) {
        return true;
    }
    return false;
};
//# sourceMappingURL=useSendWarnings.js.map