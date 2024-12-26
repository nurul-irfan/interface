import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AssetType } from 'uniswap/src/entities/assets';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { buildCurrencyId } from 'uniswap/src/utils/currencyId';
import { NumberType } from 'utilities/src/format/types';
import { LogoWithTxStatus } from 'wallet/src/components/CurrencyLogo/LogoWithTxStatus';
import { TransactionSummaryLayout } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/TransactionSummaryLayout';
import { TXN_HISTORY_ICON_SIZE } from 'wallet/src/features/transactions/SummaryCards/utils';
const INFINITE_AMOUNT = 'INF';
const ZERO_AMOUNT = '0.0';
export function ApproveSummaryItem({ transaction, index, }) {
    var _a;
    const { t } = useTranslation();
    const { formatNumberOrString } = useLocalizationContext();
    const currencyInfo = useCurrencyInfo(buildCurrencyId(transaction.chainId, transaction.typeInfo.tokenAddress));
    const { approvalAmount } = transaction.typeInfo;
    const amount = approvalAmount === INFINITE_AMOUNT
        ? t('transaction.amount.unlimited')
        : approvalAmount && approvalAmount !== ZERO_AMOUNT
            ? formatNumberOrString({ value: approvalAmount, type: NumberType.TokenNonTx })
            : '';
    const caption = `${amount ? amount + ' ' : ''}${(_a = getSymbolDisplayText(currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency.symbol)) !== null && _a !== void 0 ? _a : ''}`;
    const icon = useMemo(() => (_jsx(LogoWithTxStatus, { assetType: AssetType.Currency, chainId: transaction.chainId, currencyInfo: currencyInfo, size: TXN_HISTORY_ICON_SIZE, txStatus: transaction.status, txType: TransactionType.Approve })), [currencyInfo, transaction.chainId, transaction.status]);
    return _jsx(TransactionSummaryLayout, { caption: caption, icon: icon, index: index, transaction: transaction });
}
//# sourceMappingURL=ApproveSummaryItem.js.map