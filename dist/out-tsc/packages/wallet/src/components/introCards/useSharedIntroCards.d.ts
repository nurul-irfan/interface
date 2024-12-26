import { IntroCardProps } from 'wallet/src/components/introCards/IntroCard';
type SharedIntroCardsProps = {
    hasTokens: boolean;
    navigateToUnitagClaim: () => void;
    navigateToUnitagIntro: () => void;
};
type SharedIntroCardReturn = {
    cards: IntroCardProps[];
    shouldPromptUnitag: boolean;
    shouldShowBridgingBanner: boolean;
};
export declare function useSharedIntroCards({ navigateToUnitagClaim, navigateToUnitagIntro, hasTokens, }: SharedIntroCardsProps): SharedIntroCardReturn;
export {};
//# sourceMappingURL=useSharedIntroCards.d.ts.map