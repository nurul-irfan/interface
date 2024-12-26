import { Amount, Chain, FeedTransactionListQuery, TransactionStatus as RemoteTransactionStatus, TransactionType as RemoteTransactionType, TokenStandard, TransactionListQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { CurrencyIdToVisibility, NFTKeyToVisibility } from 'uniswap/src/features/favorites/slice';
import { LocalizedDayjs } from 'uniswap/src/features/language/localizedDayjs';
import { TransactionDetails, TransactionStatus } from 'uniswap/src/features/transactions/types/transactionDetails';
export interface AllFormattedTransactions {
    last24hTransactionList: TransactionDetails[];
    priorByMonthTransactionList: Record<string, TransactionDetails[]>;
    pending: TransactionDetails[];
}
export declare function formatTransactionsByDate(transactions: TransactionDetails[] | undefined, localizedDayjs: LocalizedDayjs): AllFormattedTransactions;
/**
 * Transforms api txn data to formatted TransactionDetails array
 * @param data Transaction history data response
 */
export declare function parseDataResponseToTransactionDetails(data: TransactionListQuery, hideSpamTokens: boolean, nftVisibility?: NFTKeyToVisibility, tokenVisibilityOverrides?: CurrencyIdToVisibility): TransactionDetails[] | undefined;
/**
 * Transforms api txn data to formatted TransactionDetails array
 * @param data Feed transaction history data response
 */
export declare function parseDataResponseToFeedTransactionDetails(data: FeedTransactionListQuery, hideSpamTokens?: boolean): TransactionDetails[] | undefined;
/**
 * Constructs a CurrencyAmount based on asset details and quantity. Checks if token is native
 * or ERC20 to determine decimal amount.
 * @param tokenStandard token standard type from api query
 * @param quantity // formatted amount of asset transferred
 * @param decimals // decimals ((optional) if native token)
 * @returns
 */
export declare function deriveCurrencyAmountFromAssetResponse(tokenStandard: TokenStandard, chain: Chain, address: Maybe<string>, decimals: Maybe<number>, quantity: string): string;
/**
 * Parses an asset from API and returns either the token address or native currency address
 * for the involved asset.
 * @returns Token address, custom native address or null
 */
export declare function getAddressFromAsset({ tokenStandard, chain, address, }: {
    tokenStandard: TokenStandard;
    chain: Chain | undefined;
    address: Maybe<string>;
}): Maybe<string>;
/**
 *
 * @param transactedValue Transacted value amount from TokenTransfer API response
 * @returns parsed USD value as a number if currency is of type USD
 */
export declare function parseUSDValueFromAssetChange(transactedValue: Maybe<Partial<Amount>>): number | undefined;
export declare function remoteTxStatusToLocalTxStatus(type: RemoteTransactionType, status: RemoteTransactionStatus): TransactionStatus;
//# sourceMappingURL=utils.d.ts.map