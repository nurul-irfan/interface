import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { ClickableWithinGesture, ElementAfterText, Flex, Text, View, useIsDarkMode, useShadowPropsShort, } from 'ui/src';
import { X } from 'ui/src/components/icons';
import { CardImage, CardImageGraphicSizeInfo } from 'uniswap/src/components/cards/image';
import { NewTag } from 'uniswap/src/components/pill/NewTag';
import { WalletEventName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { DappRequestCardLoggingName, OnboardingCardLoggingName, } from 'uniswap/src/features/telemetry/types';
import { useTranslation } from 'uniswap/src/i18n';
import { isExtension } from 'utilities/src/platform';
export var CardType;
(function (CardType) {
    CardType[CardType["Default"] = 0] = "Default";
    CardType[CardType["Required"] = 1] = "Required";
    CardType[CardType["Dismissible"] = 2] = "Dismissible";
    CardType[CardType["Swipe"] = 3] = "Swipe";
})(CardType || (CardType = {}));
export var IntroCardGraphicType;
(function (IntroCardGraphicType) {
    IntroCardGraphicType[IntroCardGraphicType["Icon"] = 0] = "Icon";
    IntroCardGraphicType[IntroCardGraphicType["Image"] = 1] = "Image";
})(IntroCardGraphicType || (IntroCardGraphicType = {}));
function isIconGraphic(graphic) {
    return graphic.type === IntroCardGraphicType.Icon;
}
export function isOnboardingCardLoggingName(name) {
    return Object.values(OnboardingCardLoggingName).includes(name);
}
export function isDappRequestCardLoggingName(name) {
    return Object.values(DappRequestCardLoggingName).includes(name);
}
export function IntroCard({ graphic, title, description, cardType, isNew = false, containerProps, loggingName, onPress, onClose, }) {
    const isDarkMode = useIsDarkMode();
    const shadowProps = useShadowPropsShort();
    const { t } = useTranslation();
    const isIcon = isIconGraphic(graphic);
    const closeHandler = useCallback(() => {
        if (onClose) {
            onClose();
            if (isOnboardingCardLoggingName(loggingName)) {
                sendAnalyticsEvent(WalletEventName.OnboardingIntroCardClosed, {
                    card_name: loggingName,
                });
            }
            else if (isDappRequestCardLoggingName(loggingName)) {
                sendAnalyticsEvent(WalletEventName.DappRequestCardClosed, {
                    card_name: loggingName,
                });
            }
        }
    }, [loggingName, onClose]);
    const pressHandler = useCallback(() => {
        onPress === null || onPress === void 0 ? void 0 : onPress();
        if (isOnboardingCardLoggingName(loggingName)) {
            sendAnalyticsEvent(WalletEventName.OnboardingIntroCardPressed, {
                card_name: loggingName,
            });
        }
        else if (isDappRequestCardLoggingName(loggingName)) {
            sendAnalyticsEvent(WalletEventName.DappRequestCardPressed, {
                card_name: loggingName,
            });
        }
    }, [loggingName, onPress]);
    const GraphicElement = useMemo(() => {
        if (isIcon) {
            return (_jsx(Flex, { backgroundColor: isDarkMode ? '$surface3' : '$surface2', borderRadius: "$roundedFull", p: "$spacing8", ...graphic.iconContainerProps, children: _jsx(graphic.Icon, { color: "$neutral1", size: "$icon.20", ...graphic.iconProps }) }));
        }
        else {
            return (_jsx(Flex, { width: CardImageGraphicSizeInfo.containerWidth, children: _jsx(CardImage, { uri: graphic.image }) }));
        }
    }, [graphic, isDarkMode, isIcon]);
    const topRightElement = useMemo(() => {
        switch (cardType) {
            case CardType.Required:
                return (_jsx(Flex, { backgroundColor: isDarkMode ? '$surface3' : '$surface2', borderRadius: "$rounded8", px: "$spacing8", py: "$spacing4", children: _jsx(Text, { color: "$neutral2", variant: "buttonLabel4", children: t('onboarding.home.intro.label.required') }) }));
            case CardType.Dismissible:
                return (_jsx(ClickableWithinGesture, { onPress: closeHandler, children: _jsx(Flex, { p: "$spacing4", children: _jsx(X, { color: "$neutral3", size: "$icon.16" }) }) }));
            case CardType.Swipe:
                return (_jsx(Text, { color: "$neutral3", variant: "body4", children: t('onboarding.home.intro.label.swipe') }));
            default:
                return null;
        }
    }, [cardType, isDarkMode, closeHandler, t]);
    const cardPadding = isExtension ? '$spacing12' : '$spacing16';
    return (_jsx(ClickableWithinGesture, { onPress: pressHandler, children: _jsx(View, { ...shadowProps, backgroundColor: isDarkMode ? '$surface2' : '$surface1', borderColor: "$surface3", borderRadius: "$rounded20", borderWidth: 1, ...containerProps, children: _jsxs(Flex, { grow: true, row: true, alignItems: "flex-start", borderRadius: "$rounded20", gap: "$spacing12", pl: isIcon ? '$spacing12' : '$none', pr: cardPadding, overflow: "hidden", py: cardPadding, children: [GraphicElement, _jsxs(Flex, { fill: true, gap: "$spacing4", paddingStart: isIcon ? '$none' : '$spacing12', children: [_jsxs(Flex, { row: true, gap: "$spacing12", justifyContent: "space-between", children: [_jsx(Flex, { fill: true, children: _jsx(ElementAfterText, { text: title, textProps: { color: '$neutral1', variant: isExtension ? 'body3' : 'subheading2' }, element: isNew ? _jsx(NewTag, {}) : undefined }) }), _jsx(Flex, { alignContent: "flex-end", alignItems: "flex-end", children: topRightElement })] }), _jsx(Text, { color: "$neutral2", variant: isExtension ? 'body4' : 'body2', children: description })] })] }) }) }));
}
//# sourceMappingURL=IntroCard.js.map