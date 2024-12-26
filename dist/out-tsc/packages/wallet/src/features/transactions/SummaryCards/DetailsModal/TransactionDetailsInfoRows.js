import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable complexity */
import { useTranslation } from 'react-i18next';
import { Flex, Loader, Text, TouchableArea, UniswapXText, UniversalImage, UniversalImageResizeMode, useIsDarkMode, } from 'ui/src';
import { ExternalLink, UniswapX } from 'ui/src/components/icons';
import { borderRadii, fonts, iconSizes } from 'ui/src/theme';
import { NetworkLogo } from 'uniswap/src/components/CurrencyLogo/NetworkLogo';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { ValueType, getCurrencyAmount } from 'uniswap/src/features/tokens/getCurrencyAmount';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { ExplorerDataType, getExplorerLink, openUri } from 'uniswap/src/utils/linking';
import { shortenAddress } from 'utilities/src/addresses';
import { NumberType } from 'utilities/src/format/types';
import { InfoRow } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/InfoRow';
import { TransactionParticipantRow } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/TransactionParticipantRow';
import { useNetworkFee } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/hooks';
import { getFormattedSwapRatio, hasInterfaceFees, shortenHash, } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/utils';
import { getAmountsFromTrade } from 'wallet/src/features/transactions/getAmountsFromTrade';
import { openTransactionLink } from 'wallet/src/utils/linking';
const UNISWAP_FEE = 0.0025;
export function TransactionDetailsInfoRows({ transactionDetails, isShowingMore, onClose, }) {
    const rows = useTransactionDetailsInfoRows(transactionDetails, isShowingMore, onClose);
    return (_jsx(Flex, { gap: "$spacing8", px: "$spacing8", children: rows }));
}
export function useTransactionDetailsInfoRows(transactionDetails, isShowingMore, onClose) {
    const { t } = useTranslation();
    const isDarkMode = useIsDarkMode();
    const { typeInfo } = transactionDetails;
    const defaultRows = [
        _jsx(NetworkFeeRow, { transactionDetails: transactionDetails }, "networkFee"),
        _jsx(TransactionHashRow, { transactionDetails: transactionDetails }, "transactionId"),
    ];
    const specificRows = [];
    switch (typeInfo.type) {
        case TransactionType.Approve:
        case TransactionType.NFTApprove:
        case TransactionType.NFTMint:
            if (typeInfo.dappInfo && typeInfo.dappInfo.name) {
                specificRows.push(_jsx(DappInfoRow, { label: t('transaction.details.dappName'), iconUrl: typeInfo.dappInfo.icon, name: typeInfo.dappInfo.name }, "dappInfo"));
            }
            break;
        case TransactionType.WCConfirm:
            specificRows.push(_jsx(DappInfoRow, { label: t('transaction.details.dappName'), iconUrl: typeInfo.dapp.icon, name: typeInfo.dapp.name }, "dappInfo"));
            break;
        case TransactionType.Receive:
            specificRows.push(_jsx(TransactionParticipantRow, { address: typeInfo.sender, onClose: onClose }, "txnParticipant"));
            break;
        case TransactionType.Send:
            specificRows.push(_jsx(TransactionParticipantRow, { isSend: true, address: typeInfo.recipient, onClose: onClose }, "txnParticipant"));
            break;
        case TransactionType.OnRampPurchase:
        case TransactionType.OnRampTransfer:
            specificRows.push(_jsxs(InfoRow, { label: t('transaction.details.from'), children: [_jsx(UniversalImage, { size: {
                            width: iconSizes.icon16,
                            height: iconSizes.icon16,
                            resizeMode: UniversalImageResizeMode.Contain,
                        }, style: {
                            image: {
                                borderRadius: borderRadii.rounded4,
                            },
                        }, uri: isDarkMode ? typeInfo.serviceProvider.logoDarkUrl : typeInfo.serviceProvider.logoLightUrl }), _jsx(Text, { variant: "body3", children: typeInfo.serviceProvider.name })] }, "onRampSender"));
            break;
        case TransactionType.Bridge:
            if (isShowingMore) {
                if (typeInfo.routingDappInfo && typeInfo.routingDappInfo.name) {
                    const dappInfo = (_jsx(DappInfoRow, { label: t('swap.details.orderRouting'), iconUrl: typeInfo.routingDappInfo.icon, name: typeInfo.routingDappInfo.name }, "dappInfo"));
                    specificRows.splice(1, 0, dappInfo);
                }
                specificRows.push(_jsx(SwapRateRow, { typeInfo: typeInfo }, "swapRate"));
            }
            break;
        case TransactionType.Swap:
            if (isShowingMore) {
                specificRows.push(_jsx(SwapRateRow, { typeInfo: typeInfo }, "swapRate"));
                // TODO (WALL-4189): blocked on backend. This is hard-coded to always return false for now
                if (hasInterfaceFees({
                    swapTimestampMs: transactionDetails.addedTime,
                })) {
                    specificRows.push(_jsx(UniswapFeeRow, { typeInfo: typeInfo }, "uniswapFee"));
                }
            }
            break;
        case TransactionType.Wrap:
        case TransactionType.NFTTrade:
            // For now, these cases don't add any specific rows
            break;
        case TransactionType.Unknown:
            if (typeInfo.dappInfo) {
                if (typeInfo.dappInfo.name) {
                    specificRows.push(_jsx(DappInfoRow, { label: t('transaction.details.dappName'), iconUrl: typeInfo.dappInfo.icon, name: typeInfo.dappInfo.name }, "dappInfo"));
                }
                specificRows.push(_jsxs(InfoRow, { label: t('common.text.contract'), children: [_jsx(Text, { variant: "body3", children: shortenAddress(typeInfo.dappInfo.address) }), _jsx(TouchableArea, { onPress: async () => {
                                var _a;
                                if ((_a = typeInfo.dappInfo) === null || _a === void 0 ? void 0 : _a.address) {
                                    await openUri(getExplorerLink(transactionDetails.chainId, typeInfo.dappInfo.address, ExplorerDataType.ADDRESS));
                                }
                            }, children: _jsx(ExternalLink, { color: "$neutral3", size: "$icon.16" }) })] }, "contract"));
            }
            break;
        default:
            break;
    }
    // Combine specific rows and default rows
    // In the future, you can modify this logic to omit or change default rows for specific types
    return [...specificRows, ...defaultRows];
}
function NetworkFeeRow({ transactionDetails }) {
    const { t } = useTranslation();
    const { value: networkFeeValue } = useNetworkFee(transactionDetails);
    const isLoading = networkFeeValue === '-';
    const Logo = isUniswapX(transactionDetails) ? UniswapX : NetworkLogo;
    const GasText = isUniswapX(transactionDetails) ? UniswapXText : Text;
    return (_jsxs(InfoRow, { label: t('transaction.details.networkFee'), children: [_jsx(Logo, { chainId: transactionDetails.chainId, size: iconSizes.icon16 }), isLoading ? (_jsx(Loader.Box, { height: fonts.body3.lineHeight, width: iconSizes.icon36 })) : (_jsx(GasText, { variant: "body3", children: networkFeeValue }))] }, "networkFee"));
}
function TransactionHashRow({ transactionDetails }) {
    const { hash, chainId } = transactionDetails;
    const { t } = useTranslation();
    if (!hash) {
        return null;
    }
    return (_jsx(InfoRow, { label: t('transaction.details.transaction'), children: _jsxs(TouchableArea, { alignItems: "center", flexDirection: "row", gap: "$spacing6", justifyContent: "center", onPress: () => openTransactionLink(hash, chainId), children: [_jsx(Text, { variant: "body3", children: shortenHash(hash) }), _jsx(ExternalLink, { color: "$neutral3", size: "$icon.16" })] }) }, "transactionId"));
}
function DappInfoRow({ label, name, iconUrl }) {
    return (_jsxs(InfoRow, { label: label, children: [iconUrl && (_jsx(UniversalImage, { size: {
                    width: iconSizes.icon16,
                    height: iconSizes.icon16,
                    resizeMode: UniversalImageResizeMode.Contain,
                }, style: {
                    image: {
                        borderRadius: borderRadii.roundedFull,
                    },
                }, uri: iconUrl })), _jsx(Text, { variant: "body3", children: name })] }));
}
function SwapRateRow({ typeInfo }) {
    const { t } = useTranslation();
    const formatter = useLocalizationContext();
    const inputCurrency = useCurrencyInfo(typeInfo.inputCurrencyId);
    const outputCurrency = useCurrencyInfo(typeInfo.outputCurrencyId);
    const formattedLine = inputCurrency && outputCurrency
        ? getFormattedSwapRatio({
            typeInfo,
            inputCurrency,
            outputCurrency,
            formatter,
        })
        : '-';
    return (_jsx(InfoRow, { label: t('transaction.details.swapRate'), children: _jsx(Text, { variant: "body3", children: formattedLine }) }));
}
function UniswapFeeRow({ typeInfo }) {
    const { t } = useTranslation();
    const formatter = useLocalizationContext();
    const outputCurrency = useCurrencyInfo(typeInfo.outputCurrencyId);
    const { outputCurrencyAmountRaw } = getAmountsFromTrade(typeInfo);
    const currencyAmount = getCurrencyAmount({
        value: outputCurrencyAmountRaw,
        valueType: ValueType.Raw,
        currency: outputCurrency === null || outputCurrency === void 0 ? void 0 : outputCurrency.currency,
    });
    const amountExact = currencyAmount ? parseFloat(currencyAmount.toExact()) : null;
    // Using the equation (1 - 0.25 / 100) * (actualOutputValue + uniswapFee) = actualOutputValue
    const approximateFee = amountExact ? (UNISWAP_FEE / (1 - UNISWAP_FEE)) * amountExact : null;
    const feeSymbol = (outputCurrency === null || outputCurrency === void 0 ? void 0 : outputCurrency.currency.symbol) ? ' ' + outputCurrency.currency.symbol : '';
    const formattedApproximateFee = approximateFee
        ? '~' +
            formatter.formatNumberOrString({
                value: approximateFee,
                type: NumberType.TokenTx,
            }) +
            feeSymbol
        : '-';
    return (_jsx(InfoRow, { label: t('transaction.details.uniswapFee', { feePercent: UNISWAP_FEE * 100 }), children: _jsx(Text, { variant: "body3", children: formattedApproximateFee }) }));
}
//# sourceMappingURL=TransactionDetailsInfoRows.js.map