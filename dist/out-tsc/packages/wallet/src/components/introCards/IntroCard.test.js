import { jsx as _jsx } from "react/jsx-runtime";
import { Wallet } from 'ui/src/components/icons';
import { OnboardingCardLoggingName } from 'uniswap/src/features/telemetry/types';
import { CardType, IntroCard, IntroCardGraphicType } from 'wallet/src/components/introCards/IntroCard';
import { render, screen } from 'wallet/src/test/test-utils';
describe(IntroCard, () => {
    it('should render the passed values', () => {
        const props = {
            graphic: {
                type: IntroCardGraphicType.Icon,
                Icon: Wallet,
            },
            title: 'Test title',
            description: 'Test description',
            cardType: CardType.Required,
            loggingName: OnboardingCardLoggingName.BridgingBanner,
        };
        render(_jsx(IntroCard, { ...props }));
        expect(screen.findByText(props.title)).toBeTruthy();
        expect(screen.findByText(props.description)).toBeTruthy();
    });
});
//# sourceMappingURL=IntroCard.test.js.map