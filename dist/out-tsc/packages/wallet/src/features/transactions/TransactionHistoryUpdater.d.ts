/// <reference types="react" />
import { TransactionListQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { ReceiveCurrencyTxNotification, ReceiveNFTNotification } from 'uniswap/src/features/notifications/types';
/**
 * For all imported accounts, checks for new transactions and updates
 * the notification status in redux.
 */
export declare function TransactionHistoryUpdater(): JSX.Element | null;
export declare function useFetchAndDispatchReceiveNotification(): (address: string, lastTxNotificationUpdateTimestamp: number | undefined, hideSpamTokens: boolean) => Promise<void>;
export declare function getReceiveNotificationFromData(data: TransactionListQuery | undefined, address: Address, lastTxNotificationUpdateTimestamp: number | undefined, hideSpamTokens?: boolean): ReceiveCurrencyTxNotification | ReceiveNFTNotification | undefined;
//# sourceMappingURL=TransactionHistoryUpdater.d.ts.map