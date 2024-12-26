/// <reference types="react" />
import { IntroCardProps } from 'wallet/src/components/introCards/IntroCard';
type IntroCardStackProps = {
    cards: IntroCardProps[];
    onSwiped?: (card: IntroCardProps, index: number) => void;
};
export declare const INTRO_CARD_MIN_HEIGHT: number;
export declare function IntroCardStack({ cards, onSwiped }: IntroCardStackProps): JSX.Element;
export {};
//# sourceMappingURL=IntroCardStack.d.ts.map