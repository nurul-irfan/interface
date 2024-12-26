import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GQLQueries } from 'uniswap/src/data/graphql/uniswap-data-api/queries';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare const GQL_QUERIES_TO_REFETCH_ON_TXN_UPDATE: GQLQueries[];
export declare function refetchGQLQueries({ transaction, apolloClient, activeAddress, }: {
    transaction: TransactionDetails;
    apolloClient: ApolloClient<NormalizedCacheObject>;
    activeAddress: string | null;
}): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<true> | import("redux-saga/effects").CallEffect<unknown[]>, void, unknown>;
//# sourceMappingURL=refetchGQLQueriesSaga.d.ts.map