/// <reference types="react" />
import { AppTFunction } from 'ui/src/i18n/types';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { LoadingItem, SectionHeader } from 'wallet/src/features/activity/utils';
import { SwapSummaryCallbacks } from 'wallet/src/features/transactions/SummaryCards/types';
export declare const TXN_HISTORY_ICON_SIZE: number;
export declare const TXN_STATUS_ICON_SIZE: number;
export type ActivityItem = TransactionDetails | SectionHeader | LoadingItem;
export type ActivityItemRenderer = ({ item, index }: {
    item: ActivityItem;
    index: number;
}) => JSX.Element;
export declare function generateActivityItemRenderer(loadingItem: JSX.Element, sectionHeaderElement: React.FunctionComponent<{
    title: string;
    index?: number;
}>, swapCallbacks: SwapSummaryCallbacks | undefined, authTrigger: ((args: {
    successCallback: () => void;
    failureCallback: () => void;
}) => Promise<void>) | undefined): ActivityItemRenderer;
export declare function getTransactionSummaryTitle(tx: TransactionDetails, t: AppTFunction): string | undefined;
export declare function useFormattedTime(time: number): string;
export declare function useOnRetrySwap(transaction: TransactionDetails, swapCallbacks: SwapSummaryCallbacks | undefined): (() => void) | undefined;
//# sourceMappingURL=utils.d.ts.map