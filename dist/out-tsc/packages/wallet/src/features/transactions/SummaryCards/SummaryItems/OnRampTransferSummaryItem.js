import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AssetType } from 'uniswap/src/entities/assets';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { buildCurrencyId } from 'uniswap/src/utils/currencyId';
import { NumberType } from 'utilities/src/format/types';
import { logger } from 'utilities/src/logger/logger';
import { LogoWithTxStatus } from 'wallet/src/components/CurrencyLogo/LogoWithTxStatus';
import { TransactionSummaryLayout } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/TransactionSummaryLayout';
import { TXN_HISTORY_ICON_SIZE } from 'wallet/src/features/transactions/SummaryCards/utils';
export function OnRampTransferSummaryItem({ transaction, }) {
    const { t } = useTranslation();
    const { formatNumberOrString } = useLocalizationContext();
    const { chainId, typeInfo } = transaction;
    const { destinationTokenSymbol, destinationTokenAddress, destinationTokenAmount } = typeInfo;
    const outputCurrencyInfo = useCurrencyInfo(buildCurrencyId(chainId, destinationTokenAddress));
    const cryptoPurchaseAmount = formatNumberOrString({ value: destinationTokenAmount }) + ' ' + destinationTokenSymbol;
    const formatFiatTokenPrice = (purchaseInfo) => {
        try {
            return formatNumberOrString({
                value: purchaseInfo.sourceAmount,
                type: NumberType.FiatTokenPrice,
                currencyCode: purchaseInfo.sourceCurrency,
            });
        }
        catch (error) {
            logger.error(error, {
                tags: {
                    file: 'OnRampTransferSummaryItem.tsx',
                    function: 'formatFiatTokenPrice',
                },
            });
            return '-';
        }
    };
    const caption = typeInfo.type === TransactionType.OnRampPurchase
        ? t('fiatOnRamp.summary.total', {
            cryptoAmount: cryptoPurchaseAmount,
            fiatAmount: formatFiatTokenPrice(typeInfo),
        })
        : cryptoPurchaseAmount;
    const icon = useMemo(() => (_jsx(LogoWithTxStatus, { assetType: AssetType.Currency, chainId: transaction.chainId, currencyInfo: outputCurrencyInfo, size: TXN_HISTORY_ICON_SIZE, txStatus: transaction.status, txType: transaction.typeInfo.type })), [outputCurrencyInfo, transaction.chainId, transaction.status, transaction.typeInfo.type]);
    return _jsx(TransactionSummaryLayout, { caption: caption, icon: icon, transaction: transaction });
}
//# sourceMappingURL=OnRampTransferSummaryItem.js.map