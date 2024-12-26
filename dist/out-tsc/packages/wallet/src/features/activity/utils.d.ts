import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export type LoadingItem = {
    itemType: 'LOADING';
    id: number;
};
export declare function isLoadingItem(x: TransactionDetails | SectionHeader | LoadingItem): x is LoadingItem;
export type SectionHeader = {
    itemType: 'HEADER';
    title: string;
};
export declare function isSectionHeader(x: TransactionDetails | SectionHeader | LoadingItem): x is SectionHeader;
export declare function getActivityItemType(item: TransactionDetails | SectionHeader | LoadingItem): string;
//# sourceMappingURL=utils.d.ts.map