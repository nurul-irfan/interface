import { PropsWithChildren } from 'react';
export type PickedCardProps = Pick<SwipeableCardProps, 'onPress'>;
export type ClickableWithinGestureProps = PropsWithChildren<{
    onPress?: () => void;
}>;
export type SwipeableCardProps = PropsWithChildren<{
    stackIndex: number;
    cardHeight: number;
    disableSwipe: boolean;
    onPress?: () => void;
    onSwiped: () => void;
    onLayout: ({ height, yOffset }: {
        height: number;
        yOffset: number;
    }) => void;
}>;
export type SwipeableCardStackProps<T> = {
    cards: T[];
    minCardHeight?: number;
    keyExtractor: (card: T) => string;
    renderCard: (card: T, index: number) => JSX.Element;
    onSwiped?: (card: T, index: number) => void;
};
//# sourceMappingURL=props.d.ts.map