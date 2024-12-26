import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Separator, Text, TouchableArea, isWeb } from 'ui/src';
import { AnglesDownUp, Ellipsis, SortVertical, UniswapX } from 'ui/src/components/icons';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { Routing } from 'uniswap/src/data/tradingApi/__generated__/index';
import { AssetType } from 'uniswap/src/entities/assets';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { FORMAT_DATE_TIME_MEDIUM, useFormattedDateTime } from 'uniswap/src/features/language/localizedDayjs';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { ContextMenu } from 'wallet/src/components/menu/ContextMenu';
import { ApproveTransactionDetails } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/ApproveTransactionDetails';
import { BridgeTransactionDetails } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/BridgeTransactionDetails';
import { HeaderLogo } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/HeaderLogo';
import { NftTransactionDetails } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/NftTransactionDetails';
import { OnRampTransactionDetails } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/OnRampTransactionDetails';
import { SwapTransactionDetails } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/SwapTransactionDetails';
import { TransactionDetailsInfoRows } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/TransactionDetailsInfoRows';
import { TransferTransactionDetails } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/TransferTransactionDetails';
import { WrapTransactionDetails } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/WrapTransactionDetails';
import { isApproveTransactionInfo, isBridgeTransactionInfo, isNFTApproveTransactionInfo, isNFTMintTransactionInfo, isNFTTradeTransactionInfo, isOnRampPurchaseTransactionInfo, isOnRampTransferTransactionInfo, isReceiveTokenTransactionInfo, isSendTokenTransactionInfo, isSwapTransactionInfo, isUnknownTransactionInfo, isWCConfirmTransactionInfo, isWrapTransactionInfo, } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/types';
import { useTransactionActions } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/useTransactionActions';
import { getTransactionSummaryTitle } from 'wallet/src/features/transactions/SummaryCards/utils';
import { getIsCancelable } from 'wallet/src/features/transactions/utils';
import { useActiveAccountWithThrow } from 'wallet/src/features/wallet/hooks';
export function TransactionDetailsHeader({ transactionDetails, transactionActions, }) {
    const { t } = useTranslation();
    const dateString = useFormattedDateTime(dayjs(transactionDetails.addedTime), FORMAT_DATE_TIME_MEDIUM);
    const title = getTransactionSummaryTitle(transactionDetails, t);
    const { menuItems, openActionsModal } = transactionActions;
    return (_jsxs(Flex, { centered: true, row: true, justifyContent: "space-between", children: [_jsxs(Flex, { centered: true, row: true, gap: "$spacing12", children: [_jsx(HeaderLogo, { transactionDetails: transactionDetails }), _jsxs(Flex, { flexDirection: "column", children: [_jsxs(Flex, { centered: true, row: true, gap: "$spacing4", justifyContent: "flex-start", children: [(transactionDetails.routing === Routing.DUTCH_V2 ||
                                        transactionDetails.routing === Routing.DUTCH_LIMIT) && _jsx(UniswapX, { size: "$icon.16" }), _jsx(Text, { variant: "body2", children: title })] }), _jsx(Text, { color: "$neutral2", variant: "body4", children: dateString })] })] }), menuItems.length > 0 ? (isWeb ? (_jsx(ContextMenu, { closeOnClick: true, itemId: transactionDetails.id, menuOptions: menuItems, onLeftClick: true, children: _jsx(TouchableArea, { hoverable: true, borderRadius: "$roundedFull", p: "$spacing4", children: _jsx(Ellipsis, { color: "$neutral2", size: "$icon.20" }) }) })) : (_jsx(TouchableArea, { onPress: openActionsModal, children: _jsx(Ellipsis, { color: "$neutral2", size: "$icon.20" }) }))) : null] }));
}
export function TransactionDetailsContent({ transactionDetails, onClose, }) {
    const { typeInfo } = transactionDetails;
    const getContentComponent = () => {
        if (isApproveTransactionInfo(typeInfo)) {
            return _jsx(ApproveTransactionDetails, { transactionDetails: transactionDetails, typeInfo: typeInfo, onClose: onClose });
        }
        else if (isNFTApproveTransactionInfo(typeInfo)) {
            return _jsx(NftTransactionDetails, { transactionDetails: transactionDetails, typeInfo: typeInfo, onClose: onClose });
        }
        else if (isNFTMintTransactionInfo(typeInfo)) {
            return _jsx(NftTransactionDetails, { transactionDetails: transactionDetails, typeInfo: typeInfo, onClose: onClose });
        }
        else if (isNFTTradeTransactionInfo(typeInfo)) {
            return _jsx(NftTransactionDetails, { transactionDetails: transactionDetails, typeInfo: typeInfo, onClose: onClose });
        }
        else if (isReceiveTokenTransactionInfo(typeInfo) || isSendTokenTransactionInfo(typeInfo)) {
            return (_jsx(TransferTransactionDetails, { transactionDetails: transactionDetails, typeInfo: typeInfo, onClose: onClose }));
        }
        else if (isBridgeTransactionInfo(typeInfo)) {
            return _jsx(BridgeTransactionDetails, { typeInfo: typeInfo, onClose: onClose });
        }
        else if (isSwapTransactionInfo(typeInfo)) {
            return _jsx(SwapTransactionDetails, { typeInfo: typeInfo, onClose: onClose });
        }
        else if (isWCConfirmTransactionInfo(typeInfo)) {
            return _jsx(_Fragment, {});
        }
        else if (isWrapTransactionInfo(typeInfo)) {
            return _jsx(WrapTransactionDetails, { transactionDetails: transactionDetails, typeInfo: typeInfo, onClose: onClose });
        }
        else if (isOnRampPurchaseTransactionInfo(typeInfo) || isOnRampTransferTransactionInfo(typeInfo)) {
            return _jsx(OnRampTransactionDetails, { transactionDetails: transactionDetails, typeInfo: typeInfo, onClose: onClose });
        }
        else {
            return null;
        }
    };
    const contentComponent = getContentComponent();
    if (contentComponent === null) {
        return null;
    }
    return _jsx(Flex, { children: contentComponent });
}
const isNFTActivity = (typeInfo) => {
    const isTransferNft = (isReceiveTokenTransactionInfo(typeInfo) || isSendTokenTransactionInfo(typeInfo)) &&
        typeInfo.assetType !== AssetType.Currency;
    const isNft = isTransferNft ||
        isNFTApproveTransactionInfo(typeInfo) ||
        isNFTMintTransactionInfo(typeInfo) ||
        isNFTTradeTransactionInfo(typeInfo);
    return isNft;
};
export function TransactionDetailsModal({ authTrigger, onClose, transactionDetails, }) {
    const { t } = useTranslation();
    const { typeInfo } = transactionDetails;
    const [isShowingMore, setIsShowingMore] = useState(false);
    const hasMoreInfoRows = [TransactionType.Swap, TransactionType.Bridge].includes(transactionDetails.typeInfo.type);
    // Hide both separators if it's an Nft transaction. Hide top separator if it's an unknown type transaction.
    const isNftTransaction = isNFTActivity(typeInfo);
    const hideTopSeparator = isNftTransaction || isUnknownTransactionInfo(typeInfo);
    const hideBottomSeparator = isNftTransaction;
    const { type } = useActiveAccountWithThrow();
    const readonly = type === AccountType.Readonly;
    const isCancelable = !readonly && getIsCancelable(transactionDetails);
    const transactionActions = useTransactionActions({
        authTrigger,
        transaction: transactionDetails,
    });
    const { openCancelModal, renderModals } = transactionActions;
    const buttons = [];
    if (isCancelable) {
        buttons.push(_jsx(Button, { backgroundColor: "$DEP_accentCriticalSoft", color: "$statusCritical", size: "small", theme: "secondary", onPress: openCancelModal, children: t('transaction.action.cancel.button') }));
    }
    if (isWeb) {
        buttons.push(_jsx(Button, { size: "small", theme: "secondary", onPress: onClose, children: t('common.button.close') }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Modal, { isDismissible: true, alignment: "top", name: ModalName.TransactionDetails, onClose: onClose, children: _jsxs(Flex, { gap: "$spacing12", pb: isWeb ? '$none' : '$spacing12', px: isWeb ? '$none' : '$spacing24', children: [_jsx(TransactionDetailsHeader, { transactionActions: transactionActions, transactionDetails: transactionDetails }), !hideTopSeparator && _jsx(Separator, {}), _jsx(TransactionDetailsContent, { transactionDetails: transactionDetails, onClose: onClose }), !hideBottomSeparator && hasMoreInfoRows && (_jsx(ShowMoreSeparator, { isShowingMore: isShowingMore, setIsShowingMore: setIsShowingMore })), !hideBottomSeparator && !hasMoreInfoRows && _jsx(Separator, {}), _jsx(TransactionDetailsInfoRows, { isShowingMore: isShowingMore, transactionDetails: transactionDetails, onClose: onClose }), buttons.length > 0 && (_jsx(Flex, { gap: "$spacing8", pt: "$spacing8", children: buttons }))] }) }), renderModals()] }));
}
function ShowMoreSeparator({ isShowingMore, setIsShowingMore, }) {
    const { t } = useTranslation();
    const onPressShowMore = () => {
        setIsShowingMore(!isShowingMore);
    };
    return (_jsxs(Flex, { centered: true, row: true, gap: "$spacing16", children: [_jsx(Separator, {}), _jsx(TouchableArea, { onPress: onPressShowMore, children: _jsxs(Flex, { centered: true, row: true, gap: "$spacing4", children: [_jsx(Text, { color: "$neutral3", variant: "body4", children: isShowingMore ? t('common.button.showLess') : t('common.button.showMore') }), isShowingMore ? (_jsx(AnglesDownUp, { color: "$neutral3", size: "$icon.16" })) : (_jsx(SortVertical, { color: "$neutral3", size: "$icon.16" }))] }) }), _jsx(Separator, {})] }));
}
//# sourceMappingURL=TransactionDetailsModal.js.map