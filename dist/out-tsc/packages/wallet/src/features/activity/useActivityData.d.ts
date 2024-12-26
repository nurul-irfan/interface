/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { AuthTrigger } from 'uniswap/src/features/auth/types';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { LoadingItem, SectionHeader } from 'wallet/src/features/activity/utils';
import { ActivityItemRenderer } from 'wallet/src/features/transactions/SummaryCards/utils';
type ActivityDataProps = {
    owner: string;
    authTrigger?: AuthTrigger;
    isExternalProfile?: boolean;
    emptyComponentStyle?: StyleProp<ViewStyle>;
    onPressEmptyState?: () => void;
};
type ActivityData = {
    maybeEmptyComponent: JSX.Element | null;
    renderActivityItem: ActivityItemRenderer;
    sectionData: (TransactionDetails | SectionHeader | LoadingItem)[] | undefined;
    keyExtractor: (item: TransactionDetails | SectionHeader | LoadingItem) => string;
};
export declare function useActivityData({ owner, authTrigger, isExternalProfile, onPressEmptyState, }: ActivityDataProps): ActivityData;
export {};
//# sourceMappingURL=useActivityData.d.ts.map