/// <reference types="react" />
import { FlexProps, GeneratedIcon, IconProps, ViewProps } from 'ui/src';
import { CardLoggingName, DappRequestCardLoggingName, OnboardingCardLoggingName } from 'uniswap/src/features/telemetry/types';
export declare enum CardType {
    Default = 0,
    Required = 1,
    Dismissible = 2,
    Swipe = 3
}
export declare enum IntroCardGraphicType {
    Icon = 0,
    Image = 1
}
type IconGraphic = {
    type: IntroCardGraphicType.Icon;
    Icon: GeneratedIcon;
    iconProps?: IconProps;
    iconContainerProps?: ViewProps;
};
export type ImageGraphic = {
    type: IntroCardGraphicType.Image;
    image: any;
};
type IntroCardGraphic = IconGraphic | ImageGraphic;
export type IntroCardProps = {
    graphic: IntroCardGraphic;
    title: string;
    description: string;
    cardType: CardType;
    isNew?: boolean;
    loggingName: CardLoggingName;
    containerProps?: FlexProps;
    onPress?: () => void;
    onClose?: () => void;
};
export declare function isOnboardingCardLoggingName(name: OnboardingCardLoggingName | DappRequestCardLoggingName): name is OnboardingCardLoggingName;
export declare function isDappRequestCardLoggingName(name: OnboardingCardLoggingName | DappRequestCardLoggingName): name is DappRequestCardLoggingName;
export declare function IntroCard({ graphic, title, description, cardType, isNew, containerProps, loggingName, onPress, onClose, }: IntroCardProps): JSX.Element;
export {};
//# sourceMappingURL=IntroCard.d.ts.map