import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, useSporeColors } from 'ui/src';
import { ContractInteraction } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { BridgeIcon, SplitLogo } from 'uniswap/src/components/CurrencyLogo/SplitLogo';
import { AssetType } from 'uniswap/src/entities/assets';
import { useCurrencyInfo, useNativeCurrencyInfo, useWrappedNativeCurrencyInfo, } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { buildCurrencyId } from 'uniswap/src/utils/currencyId';
import { DappLogoWithWCBadge, LogoWithTxStatus } from 'wallet/src/components/CurrencyLogo/LogoWithTxStatus';
import { isApproveTransactionInfo, isBridgeTransactionInfo, isLocalOnRampTransactionInfo, isNFTApproveTransactionInfo, isNFTMintTransactionInfo, isNFTTradeTransactionInfo, isOnRampPurchaseTransactionInfo, isOnRampTransferTransactionInfo, isReceiveTokenTransactionInfo, isSendTokenTransactionInfo, isSwapTransactionInfo, isWCConfirmTransactionInfo, isWrapTransactionInfo, } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/types';
const TXN_DETAILS_ICON_SIZE = iconSizes.icon40;
const getLogoWithTxStatus = ({ assetType, currencyInfo, transactionDetails, institutionLogoUrl, serviceProviderLogoUrl, nftImageUrl, }) => (_jsx(LogoWithTxStatus, { assetType: assetType, chainId: transactionDetails.chainId, currencyInfo: currencyInfo, institutionLogoUrl: institutionLogoUrl, nftImageUrl: nftImageUrl, serviceProviderLogoUrl: serviceProviderLogoUrl, size: TXN_DETAILS_ICON_SIZE, txStatus: transactionDetails.status, txType: transactionDetails.typeInfo.type }));
export function HeaderLogo({ transactionDetails }) {
    const { typeInfo } = transactionDetails;
    const getHeaderLogoComponent = () => {
        if (isApproveTransactionInfo(typeInfo)) {
            return _jsx(ApproveHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
        else if (isNFTApproveTransactionInfo(typeInfo)) {
            return _jsx(NFTHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
        else if (isNFTMintTransactionInfo(typeInfo)) {
            return _jsx(NFTHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
        else if (isNFTTradeTransactionInfo(typeInfo)) {
            return _jsx(NFTHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
        else if (isReceiveTokenTransactionInfo(typeInfo)) {
            return _jsx(TokenTransferHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
        else if (isSendTokenTransactionInfo(typeInfo)) {
            return _jsx(TokenTransferHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
        else if (isSwapTransactionInfo(typeInfo)) {
            return _jsx(SwapHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
        else if (isBridgeTransactionInfo(typeInfo)) {
            return _jsx(BridgeHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
        else if (isWCConfirmTransactionInfo(typeInfo)) {
            return _jsx(WCConfirmHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
        else if (isWrapTransactionInfo(typeInfo)) {
            return _jsx(WrapHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
        else if (isOnRampPurchaseTransactionInfo(typeInfo) || isOnRampTransferTransactionInfo(typeInfo)) {
            return _jsx(OnRampHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
        else if (isLocalOnRampTransactionInfo(typeInfo)) {
            return null; // LocalOnRamp transactions are never visible
        }
        else {
            return _jsx(UnknownHeaderLogo, { transactionDetails: transactionDetails, typeInfo: typeInfo });
        }
    };
    return _jsx(Flex, { children: getHeaderLogoComponent() });
}
function BridgeHeaderLogo({ transactionDetails, typeInfo, }) {
    const inputCurrency = useCurrencyInfo(typeInfo.inputCurrencyId);
    const outputCurrency = useCurrencyInfo(typeInfo.outputCurrencyId);
    return (_jsx(SplitLogo, { inputCurrencyInfo: inputCurrency, outputCurrencyInfo: outputCurrency, size: TXN_DETAILS_ICON_SIZE, chainId: transactionDetails.chainId, customIcon: BridgeIcon }));
}
function SwapHeaderLogo({ transactionDetails, typeInfo, }) {
    const inputCurrency = useCurrencyInfo(typeInfo.inputCurrencyId);
    const outputCurrency = useCurrencyInfo(typeInfo.outputCurrencyId);
    return (_jsx(SplitLogo, { chainId: transactionDetails.chainId, inputCurrencyInfo: inputCurrency, outputCurrencyInfo: outputCurrency, size: TXN_DETAILS_ICON_SIZE }));
}
function ApproveHeaderLogo({ transactionDetails, typeInfo, }) {
    const currencyInfo = useCurrencyInfo(buildCurrencyId(transactionDetails.chainId, typeInfo.tokenAddress));
    return getLogoWithTxStatus({
        assetType: AssetType.Currency,
        currencyInfo,
        transactionDetails,
    });
}
function TokenTransferHeaderLogo({ transactionDetails, typeInfo, }) {
    var _a;
    const currencyInfo = useCurrencyInfo(typeInfo.assetType === AssetType.Currency
        ? buildCurrencyId(transactionDetails.chainId, typeInfo.tokenAddress)
        : undefined);
    return getLogoWithTxStatus({
        assetType: typeInfo.assetType,
        currencyInfo,
        transactionDetails,
        nftImageUrl: typeInfo.assetType !== AssetType.Currency ? (_a = typeInfo.nftSummaryInfo) === null || _a === void 0 ? void 0 : _a.imageURL : undefined,
    });
}
function OnRampHeaderLogo({ transactionDetails, typeInfo, }) {
    const currencyInfo = useCurrencyInfo(buildCurrencyId(transactionDetails.chainId, typeInfo.destinationTokenAddress));
    return getLogoWithTxStatus({
        assetType: AssetType.Currency,
        currencyInfo,
        transactionDetails,
    });
}
function NFTHeaderLogo({ transactionDetails, typeInfo, }) {
    return getLogoWithTxStatus({
        assetType: AssetType.ERC721,
        transactionDetails,
        nftImageUrl: typeInfo.nftSummaryInfo.imageURL,
    });
}
function WCConfirmHeaderLogo({ transactionDetails, typeInfo }) {
    return (_jsx(DappLogoWithWCBadge, { chainId: transactionDetails.chainId, dappImageUrl: typeInfo.dapp.icon, dappName: typeInfo.dapp.name, size: TXN_DETAILS_ICON_SIZE }));
}
function WrapHeaderLogo({ transactionDetails, typeInfo }) {
    const unwrapped = typeInfo.unwrapped;
    const nativeCurrencyInfo = useNativeCurrencyInfo(transactionDetails.chainId);
    const wrappedCurrencyInfo = useWrappedNativeCurrencyInfo(transactionDetails.chainId);
    return (_jsx(SplitLogo, { chainId: transactionDetails.chainId, inputCurrencyInfo: unwrapped ? wrappedCurrencyInfo : nativeCurrencyInfo, outputCurrencyInfo: unwrapped ? nativeCurrencyInfo : wrappedCurrencyInfo, size: TXN_DETAILS_ICON_SIZE }));
}
function UnknownHeaderLogo({ transactionDetails, typeInfo, }) {
    var _a, _b;
    const colors = useSporeColors();
    return ((_a = typeInfo.dappInfo) === null || _a === void 0 ? void 0 : _a.icon) ? (_jsx(DappLogoWithWCBadge, { circular: true, hideWCBadge: true, chainId: transactionDetails.chainId, dappImageUrl: typeInfo.dappInfo.icon, dappName: (_b = typeInfo.dappInfo.name) !== null && _b !== void 0 ? _b : '', size: iconSizes.icon40 })) : (_jsx(ContractInteraction, { color: "$neutral2", fill: colors.surface1.get(), size: "$icon.40" }));
}
//# sourceMappingURL=HeaderLogo.js.map