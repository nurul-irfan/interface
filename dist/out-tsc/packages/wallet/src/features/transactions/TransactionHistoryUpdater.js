import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useApolloClient } from '@apollo/client';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { batch, useDispatch, useSelector } from 'react-redux';
import { PollingInterval } from 'uniswap/src/constants/misc';
import { useTransactionHistoryUpdaterQuery, useTransactionListLazyQuery, } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { selectLastTxNotificationUpdate } from 'uniswap/src/features/notifications/selectors';
import { pushNotification, setLastTxNotificationUpdate, setNotificationStatus, } from 'uniswap/src/features/notifications/slice';
import { useHideSpamTokensSetting } from 'uniswap/src/features/settings/hooks';
import { GQL_QUERIES_TO_REFETCH_ON_TXN_UPDATE } from 'uniswap/src/features/transactions/refetchGQLQueriesSaga';
import { useSelectAddressTransactions } from 'uniswap/src/features/transactions/selectors';
import { TransactionStatus, TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import { ONE_SECOND_MS } from 'utilities/src/time/time';
import { buildReceiveNotification } from 'wallet/src/features/notifications/buildReceiveNotification';
import { shouldSuppressNotification } from 'wallet/src/features/notifications/notificationWatcherSaga';
import { parseDataResponseToTransactionDetails } from 'wallet/src/features/transactions/history/utils';
import { useAccounts, useActiveAccountAddress } from 'wallet/src/features/wallet/hooks';
/**
 * For all imported accounts, checks for new transactions and updates
 * the notification status in redux.
 */
export function TransactionHistoryUpdater() {
    var _a, _b;
    const allAccounts = useAccounts();
    const activeAccountAddress = useActiveAccountAddress();
    const nonActiveAccountAddresses = useMemo(() => {
        return Object.keys(allAccounts).filter((address) => address !== activeAccountAddress);
    }, [activeAccountAddress, allAccounts]);
    const { gqlChains } = useEnabledChains();
    // Poll at different intervals to reduce requests made for non active accounts.
    const { data: activeAccountData } = useTransactionHistoryUpdaterQuery({
        variables: { addresses: activeAccountAddress !== null && activeAccountAddress !== void 0 ? activeAccountAddress : [], chains: gqlChains },
        pollInterval: PollingInterval.KindaFast,
        fetchPolicy: 'network-only', // Ensure latest data.
        skip: !activeAccountAddress,
    });
    const { data: nonActiveAccountData } = useTransactionHistoryUpdaterQuery({
        variables: { addresses: nonActiveAccountAddresses, chains: gqlChains },
        pollInterval: PollingInterval.Normal,
        fetchPolicy: 'network-only', // Ensure latest data.
        skip: nonActiveAccountAddresses.length === 0,
    });
    const combinedPortfoliosData = [...((_a = activeAccountData === null || activeAccountData === void 0 ? void 0 : activeAccountData.portfolios) !== null && _a !== void 0 ? _a : []), ...((_b = nonActiveAccountData === null || nonActiveAccountData === void 0 ? void 0 : nonActiveAccountData.portfolios) !== null && _b !== void 0 ? _b : [])];
    if (!combinedPortfoliosData.length) {
        return null;
    }
    return (_jsx(_Fragment, { children: combinedPortfoliosData.map((portfolio) => {
            if (!(portfolio === null || portfolio === void 0 ? void 0 : portfolio.ownerAddress) || !(portfolio === null || portfolio === void 0 ? void 0 : portfolio.assetActivities)) {
                return null;
            }
            return (_jsx(View, { testID: `AddressTransactionHistoryUpdater/${portfolio.ownerAddress}`, children: _jsx(AddressTransactionHistoryUpdater, { activities: portfolio.assetActivities, address: portfolio.ownerAddress }) }, portfolio.ownerAddress));
        }) }));
}
function AddressTransactionHistoryUpdater({ address, activities, }) {
    const dispatch = useDispatch();
    const apolloClient = useApolloClient();
    const activeAccountAddress = useActiveAccountAddress();
    // Current txn count for all addresses
    const lastTxNotificationUpdateTimestamp = useSelector(selectLastTxNotificationUpdate)[address];
    const fetchAndDispatchReceiveNotification = useFetchAndDispatchReceiveNotification();
    // don't show notifications on spam tokens if setting enabled
    const hideSpamTokens = useHideSpamTokensSetting();
    const localTransactions = useSelectAddressTransactions(address);
    useEffect(() => {
        batch(async () => {
            let newTransactionsFound = false;
            // Parse txns and address from portfolio.
            activities.forEach((activity) => {
                if (!activity) {
                    return;
                }
                if (!lastTxNotificationUpdateTimestamp) {
                    dispatch(setLastTxNotificationUpdate({ address, timestamp: dayjs().valueOf() })); // Note this is in ms
                    return;
                }
                const updatedTimestampMs = activity.timestamp * ONE_SECOND_MS; // convert api response from s -> ms
                const hasNewTxn = updatedTimestampMs > lastTxNotificationUpdateTimestamp;
                if (hasNewTxn) {
                    dispatch(setLastTxNotificationUpdate({ address, timestamp: updatedTimestampMs }));
                    // Dont flag notification status for txns submitted from app, this is handled in transactionWatcherSaga.
                    const confirmedLocally = localTransactions === null || localTransactions === void 0 ? void 0 : localTransactions.some(
                    // eslint-disable-next-line max-nested-callbacks
                    (localTx) => activity.details.__typename === 'TransactionDetails' && localTx.hash === activity.details.hash);
                    if (!confirmedLocally) {
                        dispatch(setNotificationStatus({ address, hasNotifications: true }));
                    }
                    // full send refetch all active (mounted) queries
                    newTransactionsFound = true;
                }
            });
            if (newTransactionsFound && address === activeAccountAddress) {
                // Fetch full recent txn history and dispatch receive notification if needed.
                await fetchAndDispatchReceiveNotification(address, lastTxNotificationUpdateTimestamp, hideSpamTokens);
                await apolloClient.refetchQueries({ include: GQL_QUERIES_TO_REFETCH_ON_TXN_UPDATE });
            }
        }).catch(() => undefined);
    }, [
        activeAccountAddress,
        activities,
        address,
        apolloClient,
        dispatch,
        fetchAndDispatchReceiveNotification,
        hideSpamTokens,
        lastTxNotificationUpdateTimestamp,
        localTransactions,
    ]);
    return null;
}
/*
 * Fetch and search recent transactions for receive txn. If confirmed since the last status update timestamp,
 * dispatch notification update. We special case here because receive is never initiated within app.
 *
 * Note: we opt for a waterfall request here because full transaction data is a large query that we dont
 * want to submit every polling interval - only fetch this data if new txn is detected. This ideally gets
 * replaced with a subscription to new transactions with more full txn data.
 */
export function useFetchAndDispatchReceiveNotification() {
    const [fetchFullTransactionData] = useTransactionListLazyQuery();
    const dispatch = useDispatch();
    const { gqlChains } = useEnabledChains();
    return async (address, lastTxNotificationUpdateTimestamp, hideSpamTokens = false) => {
        // Fetch full transaction history for user address.
        const { data: fullTransactionData } = await fetchFullTransactionData({
            variables: { address, chains: gqlChains },
            fetchPolicy: 'network-only', // Ensure latest data.
        });
        const notification = getReceiveNotificationFromData(fullTransactionData, address, lastTxNotificationUpdateTimestamp, hideSpamTokens);
        if (notification) {
            dispatch(pushNotification(notification));
        }
    };
}
export function getReceiveNotificationFromData(data, address, lastTxNotificationUpdateTimestamp, hideSpamTokens = false) {
    if (!data || !lastTxNotificationUpdateTimestamp) {
        return undefined;
    }
    const parsedTxHistory = parseDataResponseToTransactionDetails(data, hideSpamTokens);
    if (!parsedTxHistory) {
        return undefined;
    }
    const latestReceivedTx = parsedTxHistory
        .sort((a, b) => a.addedTime - b.addedTime)
        .find((tx) => tx.addedTime &&
        tx.addedTime >= lastTxNotificationUpdateTimestamp &&
        tx.typeInfo.type === TransactionType.Receive &&
        tx.status === TransactionStatus.Success);
    // Suppress notification if rules apply
    if (!latestReceivedTx || shouldSuppressNotification({ tx: latestReceivedTx })) {
        return undefined;
    }
    return buildReceiveNotification(latestReceivedTx, address);
}
//# sourceMappingURL=TransactionHistoryUpdater.js.map