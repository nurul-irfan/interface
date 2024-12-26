import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Loader, Text, isWeb } from 'ui/src';
import { NoTransactions } from 'ui/src/components/icons';
import { BaseCard } from 'uniswap/src/components/BaseCard/BaseCard';
import { useHideSpamTokensSetting } from 'uniswap/src/features/settings/hooks';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { useFormattedTransactionDataForActivity } from 'wallet/src/features/activity/hooks';
import { generateActivityItemRenderer } from 'wallet/src/features/transactions/SummaryCards/utils';
import { useCreateSwapFormState } from 'wallet/src/features/transactions/hooks';
import { useMostRecentSwapTx } from 'wallet/src/features/transactions/swap/hooks/useMostRecentSwapTx';
const SectionTitle = ({ title, index }) => (_jsx(Flex, { px: isWeb ? '$spacing8' : '$none', py: "$spacing8", children: _jsx(Text, { color: "$neutral2", testID: `activity-list-item-${index}`, variant: "subheading2", children: title }) }));
export function useActivityData({ owner, authTrigger, isExternalProfile, onPressEmptyState, }) {
    const { t } = useTranslation();
    const { navigateToSwapFlow } = useWalletNavigation();
    // Hide all spam transactions if active wallet has enabled setting.
    const hideSpamTokens = useHideSpamTokensSetting();
    const onRetryGenerator = useCallback((swapFormState) => {
        if (!swapFormState) {
            return () => { };
        }
        return () => {
            navigateToSwapFlow({ initialState: swapFormState });
        };
    }, [navigateToSwapFlow]);
    const swapCallbacks = useMemo(() => {
        return {
            useLatestSwapTransaction: useMostRecentSwapTx,
            useSwapFormTransactionState: useCreateSwapFormState,
            onRetryGenerator,
        };
    }, [onRetryGenerator]);
    const renderActivityItem = useMemo(() => {
        return generateActivityItemRenderer(_jsx(Loader.Transaction, {}), SectionTitle, swapCallbacks, authTrigger);
    }, [swapCallbacks, authTrigger]);
    const { onRetry, isError, sectionData, keyExtractor } = useFormattedTransactionDataForActivity({
        address: owner,
        hideSpamTokens,
    });
    const errorCard = useMemo(() => (_jsx(Flex, { grow: true, children: _jsx(BaseCard.ErrorState, { retryButtonLabel: t('common.button.retry'), title: t('home.activity.error.load'), onRetry: onRetry }) })), [onRetry, t]);
    const emptyListView = useMemo(() => (_jsx(Flex, { centered: true, pt: "$spacing48", px: "$spacing36", children: _jsx(BaseCard.EmptyState, { buttonLabel: isExternalProfile || !onPressEmptyState ? undefined : t('home.activity.empty.button'), description: isExternalProfile
                ? t('home.activity.empty.description.external')
                : t('home.activity.empty.description.default'), icon: _jsx(NoTransactions, { color: "$neutral3", size: "$icon.100" }), title: t('home.activity.empty.title'), onPress: onPressEmptyState }) })), [isExternalProfile, onPressEmptyState, t]);
    // We check `sectionData` instead of `hasData` because `sectionData` has either transactions or a loading skeleton.
    const maybeEmptyComponent = (sectionData === null || sectionData === void 0 ? void 0 : sectionData.length) ? null : isError ? errorCard : emptyListView;
    return {
        maybeEmptyComponent,
        renderActivityItem,
        sectionData,
        keyExtractor,
    };
}
//# sourceMappingURL=useActivityData.js.map