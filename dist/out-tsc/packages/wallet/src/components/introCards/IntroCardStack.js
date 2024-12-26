import { jsx as _jsx } from "react/jsx-runtime";
import { SwipeableCardStack } from 'ui/src';
import { isExtension } from 'utilities/src/platform';
import { IntroCard } from 'wallet/src/components/introCards/IntroCard';
export const INTRO_CARD_MIN_HEIGHT = isExtension ? 70 : 110;
export function IntroCardStack({ cards, onSwiped }) {
    return (_jsx(SwipeableCardStack, { cards: cards, keyExtractor: (card) => card.title, minCardHeight: INTRO_CARD_MIN_HEIGHT, renderCard: (card) => _jsx(IntroCard, { ...card }), onSwiped: onSwiped }));
}
//# sourceMappingURL=IntroCardStack.js.map