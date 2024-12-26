import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
/**
 * Gets all transactions from a given sender and to a given recipient
 * @param sender Get all transactions sent by this sender
 * @param recipient Then filter so that we only keep txns to this recipient
 */
export declare function useAllTransactionsBetweenAddresses(sender: Address, recipient: Maybe<Address>): TransactionDetails[] | undefined;
//# sourceMappingURL=useAllTransactionsBetweenAddresses.d.ts.map