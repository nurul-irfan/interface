import { ReceiveCurrencyTxNotification, ReceiveNFTNotification } from 'uniswap/src/features/notifications/types';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
/**
 * Based on notification type info, returns an AppNotification object for either NFT or Currency receive.
 * Must be a 'Receive' type transaction.
 *
 * Returns undefined if not all data is found for either Currency or NFT case, or if transaction is not
 * the correct type.
 */
export declare function buildReceiveNotification(transactionDetails: TransactionDetails, receivingAddress: Address): ReceiveNFTNotification | ReceiveCurrencyTxNotification | undefined;
//# sourceMappingURL=buildReceiveNotification.d.ts.map