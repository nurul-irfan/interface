import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable complexity */
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Flex, useSporeColors } from 'ui/src';
import WalletConnectLogo from 'ui/src/assets/icons/walletconnect.svg';
import { AlertTriangleFilled, Approve, ArrowDownInCircle, ArrowUpInCircle, QuestionInCircle, } from 'ui/src/components/icons';
import { borderRadii } from 'ui/src/theme';
import { CurrencyLogo, STATUS_RATIO } from 'uniswap/src/components/CurrencyLogo/CurrencyLogo';
import { TransactionSummaryNetworkLogo } from 'uniswap/src/components/CurrencyLogo/NetworkLogo';
import { AssetType } from 'uniswap/src/entities/assets';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { NFTTradeType, TransactionStatus, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { WalletConnectEvent } from 'uniswap/src/types/walletConnect';
import { logger } from 'utilities/src/logger/logger';
import { DappIconPlaceholder } from 'wallet/src/components/WalletConnect/DappIconPlaceholder';
import { ImageUri } from 'wallet/src/features/images/ImageUri';
import { NFTViewer } from 'wallet/src/features/images/NFTViewer';
import { RemoteImage } from 'wallet/src/features/images/RemoteImage';
function getLogo(props) {
    const { assetType, size } = props;
    return assetType === AssetType.Currency ? (_jsx(CurrencyLogo, { hideNetworkLogo: true, currencyInfo: props.currencyInfo, size: size })) : (_jsx(Flex, { centered: true, backgroundColor: "$surface2", borderRadius: "$rounded4", height: size, overflow: "hidden", testID: "nft-viewer", width: size, children: props.nftImageUrl && _jsx(NFTViewer, { uri: props.nftImageUrl }) }));
}
export function LogoWithTxStatus(props) {
    const { assetType, txType, txStatus, size, chainId } = props;
    const colors = useSporeColors();
    const statusSize = size / 2;
    const logo = getLogo(props);
    const fill = txStatus === TransactionStatus.Success ? colors.statusSuccess : colors.neutral2;
    const color = colors.surface2;
    let icon;
    if (chainId && chainId !== UniverseChainId.Mainnet) {
        icon = _jsx(TransactionSummaryNetworkLogo, { chainId: chainId, size: size * STATUS_RATIO });
    }
    else {
        let Icon;
        switch (txType) {
            case TransactionType.Approve:
            case TransactionType.NFTApprove:
                Icon = Approve;
                break;
            case TransactionType.Send:
                Icon = ArrowUpInCircle;
                break;
            case TransactionType.NFTTrade:
                if (assetType === AssetType.ERC721 || assetType === AssetType.ERC1155) {
                    if (props.nftTradeType === NFTTradeType.SELL) {
                        Icon = ArrowUpInCircle;
                    }
                    else {
                        Icon = ArrowDownInCircle;
                    }
                }
                break;
            // Fiat purchases use the same icon as receive
            case TransactionType.OnRampPurchase:
            case TransactionType.OnRampTransfer:
            case TransactionType.Receive:
            case TransactionType.NFTMint:
                Icon = ArrowDownInCircle;
                break;
            case TransactionType.Unknown:
                Icon = QuestionInCircle;
                break;
        }
        if (Icon) {
            icon = _jsx(Icon, { color: color.val, fill: fill.val, size: statusSize, testID: "status-icon" });
            // If logo is missing, we render the icon instead
            if (!logo) {
                icon = _jsx(Icon, { color: color.val, fill: fill.val, size: size, testID: "status-icon" });
            }
        }
    }
    useEffect(() => {
        if (!icon) {
            logger.warn('statusIcon', 'GenerateStatusIcon', 'Could not find icon for transaction type:', txType);
        }
    }, [icon, txType]);
    return (_jsxs(Flex, { centered: true, height: size, width: size, children: [logo !== null && logo !== void 0 ? logo : icon, logo && icon && (_jsx(Flex, { bottom: -4, position: "absolute", right: -4, children: icon }))] }));
}
export function DappLogoWithTxStatus({ dappName, dappImageUrl, event, size, chainId, }) {
    const colors = useSporeColors();
    const green = colors.statusSuccess.val;
    const yellow = colors.DEP_accentWarning.val;
    const fill = colors.surface1.val;
    const dappImageSize = size;
    const statusSize = dappImageSize * (1 / 2);
    const totalSize = dappImageSize + statusSize * (1 / 4);
    const getStatusIcon = () => {
        switch (event) {
            case WalletConnectEvent.NetworkChanged:
                return chainId ? _jsx(TransactionSummaryNetworkLogo, { chainId: chainId, size: statusSize }) : undefined;
            case WalletConnectEvent.TransactionConfirmed:
                return _jsx(Approve, { color: green, fill: fill, size: statusSize, testID: "icon-approve" });
            case WalletConnectEvent.TransactionFailed:
                return _jsx(AlertTriangleFilled, { color: yellow, fill: fill, size: statusSize, testID: "icon-alert" });
            default:
                return undefined;
        }
    };
    const statusIcon = getStatusIcon();
    const fallback = (_jsx(Flex, { height: dappImageSize, testID: "image-fallback", children: _jsx(DappIconPlaceholder, { iconSize: dappImageSize, name: dappName }) }));
    const style = StyleSheet.create({
        icon: {
            borderRadius: borderRadii.rounded4,
            height: dappImageSize,
            width: dappImageSize,
        },
        loaderContainer: {
            borderRadius: borderRadii.roundedFull,
            overflow: 'hidden',
        },
    });
    const dappImage = dappImageUrl ? (_jsx(ImageUri, { fallback: fallback, imageStyle: style.icon, loadingContainerStyle: { ...style.icon, ...style.loaderContainer }, testID: "dapp-image", uri: dappImageUrl })) : (fallback);
    return statusIcon ? (_jsxs(Flex, { height: totalSize, width: totalSize, children: [_jsx(Flex, { left: 0, position: "absolute", top: 0, children: dappImage }), _jsx(Flex, { bottom: 0, position: "absolute", right: 0, children: statusIcon })] })) : (dappImage);
}
/** For displaying Dapp logo with generic WC bade icon */
export function DappLogoWithWCBadge({ dappImageUrl, dappName, size, chainId, hideWCBadge = false, circular = false, }) {
    const dappImageSize = size;
    const statusSize = dappImageSize * STATUS_RATIO;
    const totalSize = dappImageSize + statusSize * (1 / 4);
    const dappImage = dappImageUrl ? (_jsx(RemoteImage, { borderRadius: circular ? borderRadii.roundedFull : borderRadii.rounded4, height: dappImageSize, testID: "dapp-image", uri: dappImageUrl, width: dappImageSize })) : (_jsx(DappIconPlaceholder, { iconSize: dappImageSize, name: dappName }));
    return (_jsxs(Flex, { centered: true, height: totalSize, width: totalSize, children: [_jsx(Flex, { left: 2, top: 0, children: dappImage }), chainId && chainId !== UniverseChainId.Mainnet ? (_jsx(Flex, { bottom: -2, position: "absolute", right: -2, children: _jsx(TransactionSummaryNetworkLogo, { chainId: chainId, size: size * STATUS_RATIO }) })) : !hideWCBadge ? (_jsx(Flex, { backgroundColor: "$surface2", borderColor: "$surface1", borderRadius: "$roundedFull", borderWidth: 2, bottom: -2, position: "absolute", right: -2, children: _jsx(WalletConnectLogo, { height: statusSize, testID: "wallet-connect-logo", width: statusSize }) })) : null] }));
}
//# sourceMappingURL=LogoWithTxStatus.js.map