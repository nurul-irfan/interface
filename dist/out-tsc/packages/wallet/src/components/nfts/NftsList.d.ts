import { FlashList } from '@shopify/flash-list';
import { ComponentProps, CSSProperties } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { AnimatedFlashList } from 'ui/src/components/AnimatedFlashList/AnimatedFlashList';
import { GQLQueries } from 'uniswap/src/data/graphql/uniswap-data-api/queries';
import { NFTItem } from 'wallet/src/features/nfts/types';
export declare const NFTS_TAB_DATA_DEPENDENCIES: GQLQueries[];
export declare const NUM_FIRST_NFTS = 30;
type NftsListProps = Omit<Omit<ComponentProps<typeof AnimatedFlashList> & {
    owner: Address;
    footerHeight?: SharedValue<number>;
    isExternalProfile?: boolean;
    renderedInModal?: boolean;
    renderNFTItem: (item: NFTItem, index: number) => JSX.Element;
    onPressEmptyState?: () => void;
    loadingStateStyle?: StyleProp<ViewStyle | CSSProperties | (ViewStyle & CSSProperties)>;
    errorStateStyle?: StyleProp<ViewStyle | CSSProperties | (ViewStyle & CSSProperties)>;
    emptyStateStyle?: StyleProp<ViewStyle | CSSProperties | (ViewStyle & CSSProperties)>;
}, 'renderItem'>, 'data'>;
export declare const NftsList: import("react").ForwardRefExoticComponent<Omit<NftsListProps, "ref"> & import("react").RefAttributes<FlashList<unknown>>>;
export {};
//# sourceMappingURL=NftsList.d.ts.map