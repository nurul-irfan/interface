import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ElementAfterText } from 'ui/src';
import { Unitag } from 'ui/src/components/icons';
import { AssetType } from 'uniswap/src/entities/assets';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { useENS } from 'uniswap/src/features/ens/useENS';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { useUnitagByAddress } from 'uniswap/src/features/unitags/hooks';
import { getFormattedCurrencyAmount, getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { buildCurrencyId } from 'uniswap/src/utils/currencyId';
import { shortenAddress } from 'utilities/src/addresses';
import { LogoWithTxStatus } from 'wallet/src/components/CurrencyLogo/LogoWithTxStatus';
import { TransactionSummaryLayout } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/TransactionSummaryLayout';
import { TXN_HISTORY_ICON_SIZE } from 'wallet/src/features/transactions/SummaryCards/utils';
export function TransferTokenSummaryItem({ transactionType, otherAddress, transaction, index, }) {
    var _a, _b, _c, _d, _e, _f;
    const { t } = useTranslation();
    const formatter = useLocalizationContext();
    const currencyInfo = useCurrencyInfo(transaction.typeInfo.assetType === AssetType.Currency
        ? buildCurrencyId(transaction.chainId, transaction.typeInfo.tokenAddress)
        : undefined);
    const isCurrency = transaction.typeInfo.assetType === AssetType.Currency;
    const currencyAmount = currencyInfo &&
        transaction.typeInfo.currencyAmountRaw &&
        getFormattedCurrencyAmount(currencyInfo.currency, transaction.typeInfo.currencyAmountRaw, formatter);
    const icon = useMemo(() => {
        var _a;
        if (isCurrency) {
            return (_jsx(LogoWithTxStatus, { assetType: AssetType.Currency, chainId: transaction.chainId, currencyInfo: currencyInfo, size: TXN_HISTORY_ICON_SIZE, txStatus: transaction.status, txType: transaction.typeInfo.type }));
        }
        return (_jsx(LogoWithTxStatus, { assetType: AssetType.ERC721, chainId: transaction.chainId, nftImageUrl: (_a = transaction.typeInfo.nftSummaryInfo) === null || _a === void 0 ? void 0 : _a.imageURL, size: TXN_HISTORY_ICON_SIZE, txStatus: transaction.status, txType: transaction.typeInfo.type }));
    }, [
        currencyInfo,
        isCurrency,
        transaction.chainId,
        transaction.status,
        (_a = transaction.typeInfo.nftSummaryInfo) === null || _a === void 0 ? void 0 : _a.imageURL,
        transaction.typeInfo.type,
    ]);
    // Search for matching ENS
    const { name: ensName } = useENS(UniverseChainId.Mainnet, otherAddress, true);
    const { unitag } = useUnitagByAddress(otherAddress);
    const personDisplayName = (_c = (_b = unitag === null || unitag === void 0 ? void 0 : unitag.username) !== null && _b !== void 0 ? _b : ensName) !== null && _c !== void 0 ? _c : shortenAddress(otherAddress);
    const tokenAmountWithSymbol = isCurrency
        ? (currencyAmount !== null && currencyAmount !== void 0 ? currencyAmount : '') + ((_e = getSymbolDisplayText((_d = currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency) === null || _d === void 0 ? void 0 : _d.symbol)) !== null && _e !== void 0 ? _e : '')
        : (_f = transaction.typeInfo.nftSummaryInfo) === null || _f === void 0 ? void 0 : _f.name;
    let captionText = '';
    if (transactionType === TransactionType.Send) {
        captionText = t('transaction.summary.received', {
            recipientAddress: personDisplayName,
            tokenAmountWithSymbol,
        });
    }
    else {
        captionText = t('transaction.summary.sent', {
            senderAddress: personDisplayName,
            tokenAmountWithSymbol,
        });
    }
    const caption = useMemo(() => (_jsx(ElementAfterText, { wrapperProps: {
            grow: true,
            shrink: true,
        }, element: (unitag === null || unitag === void 0 ? void 0 : unitag.username) ? _jsx(Unitag, { size: "$icon.24" }) : undefined, text: captionText })), [captionText, unitag === null || unitag === void 0 ? void 0 : unitag.username]);
    return _jsx(TransactionSummaryLayout, { caption: caption, icon: icon, index: index, transaction: transaction });
}
//# sourceMappingURL=TransferTokenSummaryItem.js.map