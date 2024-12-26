import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, Flex, SpinningLoader, Text, TouchableArea, isWeb, useSporeColors } from 'ui/src';
import SlashCircleIcon from 'ui/src/assets/icons/slash-circle.svg';
import { AlertTriangleFilled, UniswapX } from 'ui/src/components/icons';
import { Routing } from 'uniswap/src/data/tradingApi/__generated__/index';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { TransactionStatus } from 'uniswap/src/features/transactions/types/transactionDetails';
import { DisplayNameText } from 'wallet/src/components/accounts/DisplayNameText';
import { TransactionDetailsModal } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/TransactionDetailsModal';
import { useTransactionActions } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/useTransactionActions';
import { TransactionSummaryTitle } from 'wallet/src/features/transactions/SummaryCards/SummaryItems/TransactionSummaryTitle';
import { TXN_HISTORY_ICON_SIZE, TXN_STATUS_ICON_SIZE, getTransactionSummaryTitle, useFormattedTime, } from 'wallet/src/features/transactions/SummaryCards/utils';
import { useIsQueuedTransaction } from 'wallet/src/features/transactions/hooks';
import { useActiveAccountWithThrow, useDisplayName } from 'wallet/src/features/wallet/hooks';
import { openTransactionLink } from 'wallet/src/utils/linking';
const LOADING_SPINNER_SIZE = 20;
export const TransactionSummaryLayout = memo(function _TransactionSummaryLayout(props) {
    // Monitor latest nonce to identify queued transactions.
    // We moved this outside of `TransactionSummaryLayoutContent` to avoid re-rendering the entire component when the nonce changes,
    // given that we do not care about the nonce itself but just about the `isQueued` boolean.
    const isQueued = useIsQueuedTransaction(props.transaction);
    return _jsx(TransactionSummaryLayoutContent, { ...props, isQueued: isQueued });
});
/**
 * IMPORTANT: If you add any new hooks to this component, make sure to profile the app using `react-devtools` to verify
 *            that the component is not re-rendering unnecessarily.
 */
const TransactionSummaryLayoutContent = memo(function _TransactionSummaryLayoutContent({ authTrigger, transaction, title, caption, icon, index, onRetry, isQueued, }) {
    var _a;
    const { t } = useTranslation();
    const colors = useSporeColors();
    const isTransactionDetailsModalEnabled = useFeatureFlag(FeatureFlags.TransactionDetailsSheet);
    const { type } = useActiveAccountWithThrow();
    const readonly = type === AccountType.Readonly;
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const { status, hash, chainId } = transaction;
    const walletDisplayName = useDisplayName(transaction.ownerAddress);
    title = (_a = title !== null && title !== void 0 ? title : getTransactionSummaryTitle(transaction, t)) !== null && _a !== void 0 ? _a : '';
    const inProgress = status === TransactionStatus.Cancelling || status === TransactionStatus.Pending;
    const isCancel = status === TransactionStatus.Canceled || status === TransactionStatus.Cancelling;
    const { openActionsModal, renderModals } = useTransactionActions({
        authTrigger,
        transaction,
    });
    const onPress = async () => {
        if (readonly) {
            await openTransactionLink(hash, chainId);
        }
        else {
            if (isTransactionDetailsModalEnabled) {
                setShowDetailsModal(true);
            }
            else {
                openActionsModal();
            }
        }
    };
    const formattedAddedTime = useFormattedTime(transaction.addedTime);
    const statusIconFill = colors.surface1.get();
    const rightBlock = isCancel ? (_jsx(SlashCircleIcon, { color: colors.statusCritical.val, fill: statusIconFill, fillOpacity: 1, height: TXN_STATUS_ICON_SIZE, width: TXN_STATUS_ICON_SIZE })) : status === TransactionStatus.Failed ? (_jsx(Flex, { grow: true, alignItems: "flex-end", justifyContent: "space-between", children: _jsx(AlertTriangleFilled, { color: colors.DEP_accentWarning.val, fill: colors.DEP_accentWarning.val, size: TXN_STATUS_ICON_SIZE }) })) : (_jsx(Text, { color: "$neutral3", variant: "body3", children: formattedAddedTime }));
    return (_jsxs(_Fragment, { children: [_jsx(TouchableArea, { mb: "$spacing4", overflow: "hidden", testID: `activity-list-item-${index !== null && index !== void 0 ? index : 0}`, onPress: onPress, children: _jsxs(Flex, { grow: true, row: true, backgroundColor: "$surface1", borderRadius: "$rounded16", gap: "$spacing12", hoverStyle: { backgroundColor: '$surface2' }, px: isWeb ? '$spacing8' : '$none', py: "$spacing8", children: [icon && (_jsx(Flex, { centered: true, width: TXN_HISTORY_ICON_SIZE, children: icon })), _jsx(Flex, { grow: true, shrink: true, children: _jsxs(Flex, { grow: true, gap: "$spacing2", children: [_jsxs(Flex, { grow: true, row: true, alignItems: "center", gap: "$spacing4", justifyContent: "space-between", children: [_jsxs(Flex, { row: true, shrink: true, alignItems: "center", gap: "$spacing4", children: [walletDisplayName ? (_jsx(DisplayNameText, { displayName: walletDisplayName, textProps: { color: '$accent1', variant: 'body1' } })) : null, (transaction.routing === Routing.DUTCH_V2 || transaction.routing === Routing.DUTCH_LIMIT) && (_jsx(UniswapX, { size: "$icon.16" })), _jsx(TransactionSummaryTitle, { title: title, transaction: transaction })] }), !inProgress && rightBlock] }), _jsxs(Flex, { grow: true, row: true, gap: "$spacing16", children: [typeof caption === 'string' ? _jsx(Text, { flex: 1, children: caption }) : caption, status === TransactionStatus.Failed && onRetry && (_jsx(Flex, { flexShrink: 0, children: _jsx(Text, { color: "$accent1", variant: "buttonLabel2", onPress: onRetry, children: t('common.button.retry') }) }))] })] }) }), inProgress && (_jsx(Flex, { justifyContent: "center", children: _jsx(SpinningLoader, { color: "$accent1", disabled: isQueued, size: LOADING_SPINNER_SIZE }) }))] }) }), _jsx(AnimatePresence, { children: showDetailsModal && (_jsx(TransactionDetailsModal, { authTrigger: authTrigger, transactionDetails: transaction, onClose: () => setShowDetailsModal(false) })) }), renderModals()] }));
});
//# sourceMappingURL=TransactionSummaryLayout.js.map