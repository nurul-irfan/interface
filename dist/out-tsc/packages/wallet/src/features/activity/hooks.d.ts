import { ApolloError } from '@apollo/client';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { LoadingItem, SectionHeader } from 'wallet/src/features/activity/utils';
export declare function useFormattedTransactionDataForFeed(addresses: Address[], hideSpamTokens: boolean): {
    hasData: boolean;
    isLoading: boolean;
    isError: ApolloError | undefined;
    sectionData: Array<TransactionDetails | SectionHeader | LoadingItem> | undefined;
    keyExtractor: (item: TransactionDetails | SectionHeader | LoadingItem) => string;
    onRetry: () => void;
};
export declare function useFormattedTransactionDataForActivity({ address, hideSpamTokens, pageSize, }: {
    address: Address;
    hideSpamTokens: boolean;
    pageSize?: number;
}): {
    hasData: boolean;
    isLoading: boolean;
    isError: ApolloError | undefined;
    sectionData: Array<TransactionDetails | SectionHeader | LoadingItem> | undefined;
    keyExtractor: (item: TransactionDetails | SectionHeader | LoadingItem) => string;
    onRetry: () => void;
};
//# sourceMappingURL=hooks.d.ts.map