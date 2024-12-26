import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SharedEventName } from '@uniswap/analytics-events';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnimatePresence, Flex, Text, TouchableArea, getTokenValue } from 'ui/src';
import { CopyAlt, Unitag } from 'ui/src/components/icons';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType, CopyNotificationType } from 'uniswap/src/features/notifications/types';
import { ElementName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { UNITAG_SUFFIX } from 'uniswap/src/features/unitags/constants';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { ExtensionScreens } from 'uniswap/src/types/screens/extension';
import { MobileScreens } from 'uniswap/src/types/screens/mobile';
import { sanitizeAddressText } from 'uniswap/src/utils/addresses';
import { setClipboard } from 'uniswap/src/utils/clipboard';
import { shortenAddress } from 'utilities/src/addresses';
import { isExtension, isMobileApp } from 'utilities/src/platform';
import { DisplayNameType } from 'wallet/src/features/wallet/types';
/**
 * Used in the account header that displays the user's unitag and name if available and
 * address. The unitag is animated which shows the unitag suffix.
 */
function _AnimatedUnitagDisplayName({ displayName, unitagIconSize = '$icon.24', address, }) {
    const dispatch = useDispatch();
    const [showUnitagSuffix, setShowUnitagSuffix] = useState(false);
    const isUnitag = (displayName === null || displayName === void 0 ? void 0 : displayName.type) === DisplayNameType.Unitag;
    const { width: nameTextWidth, onLayout: onNameTextLayout } = useInitialLayoutWidth();
    const { width: unitagSuffixTextWidth, onLayout: onUnitagSuffixTextLayout } = useInitialLayoutWidth();
    const { width: viewWidth, onLayout: onViewWidthLayout } = useInitialLayoutWidth();
    const onPressUnitag = () => setShowUnitagSuffix(!showUnitagSuffix);
    const onPressCopyAddress = useCallback(async (e) => {
        if (!address) {
            return;
        }
        e.stopPropagation();
        await setClipboard(address);
        dispatch(pushNotification({
            type: AppNotificationType.Copied,
            copyType: CopyNotificationType.Address,
        }));
        sendAnalyticsEvent(SharedEventName.ELEMENT_CLICKED, {
            element: ElementName.CopyAddress,
            screen: isExtension ? ExtensionScreens.Home : isMobileApp ? MobileScreens.Home : undefined,
        });
    }, [address, dispatch]);
    const isLayoutReady = viewWidth > 0;
    /**
     * We have two animation modes. If the name is too long the animation replaces the
     * tail of the name with the unitag suffix. Otherwise it slides extends the unitag suffix.
     **/
    const shouldAnimateSlide = nameTextWidth + unitagSuffixTextWidth + getTokenValue(unitagIconSize) < viewWidth;
    const slideConfig = useMemo(() => {
        return shouldAnimateSlide
            ? {
                paddingRight: 0,
                widthAdjust: 0,
                unitagOffset: -unitagSuffixTextWidth,
                unitagSlideX: showUnitagSuffix ? unitagSuffixTextWidth : 0,
            }
            : {
                paddingRight: isUnitag ? (shouldAnimateSlide ? getTokenValue('$spacing16') : 0) : 0,
                widthAdjust: showUnitagSuffix ? unitagSuffixTextWidth : 0,
                unitagOffset: showUnitagSuffix ? 0 : -unitagSuffixTextWidth,
                unitagSlideX: 0,
            };
    }, [shouldAnimateSlide, unitagSuffixTextWidth, showUnitagSuffix, isUnitag]);
    return (_jsxs(Flex, { flexGrow: 1, cursor: "pointer", onPress: isUnitag ? onPressUnitag : undefined, onLayout: onViewWidthLayout, children: [_jsxs(Flex, { shrink: true, row: true, animation: "simple", opacity: isLayoutReady ? 1 : 0, children: [_jsx(Text, { zIndex: 2, backgroundColor: "$background", color: "$neutral1", numberOfLines: 1, variant: "subheading1", width: isLayoutReady
                            ? Math.min(nameTextWidth - slideConfig.paddingRight, viewWidth - slideConfig.paddingRight) -
                                slideConfig.widthAdjust
                            : undefined, onLayout: onNameTextLayout, children: displayName === null || displayName === void 0 ? void 0 : displayName.name }), isUnitag && (_jsx(AnimatePresence, { children: _jsxs(Flex, { row: true, zIndex: 1, animation: "semiBouncy", ml: slideConfig.unitagOffset, x: slideConfig.unitagSlideX, children: [_jsx(Flex, { position: isLayoutReady ? 'relative' : 'absolute', onLayout: onUnitagSuffixTextLayout, children: _jsx(Text, { animation: "semiBouncy", color: "$neutral3", opacity: showUnitagSuffix ? 1 : 0, variant: "subheading1", children: UNITAG_SUFFIX }) }), _jsx(Flex, { zIndex: 2, alignSelf: "center", backgroundColor: "$background", animation: "semiBouncy", pl: "$spacing4", children: _jsx(Unitag, { size: unitagIconSize }) })] }) }))] }), address && (_jsx(TouchableArea, { testID: TestID.AccountHeaderCopyAddress, onPress: onPressCopyAddress, children: _jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing4", children: [_jsx(Text, { color: "$neutral2", numberOfLines: 1, variant: "body2", children: sanitizeAddressText(shortenAddress(address)) }), _jsx(CopyAlt, { color: "$neutral3", size: "$icon.16" })] }) }))] }));
}
/**
 * Returns a width and a callback to be used in a `onLayout` handler.
 * The width is set to the initial width only once if it's not already set.
 */
export function useInitialLayoutWidth(initialWidth = 0) {
    const [width, setWidth] = useState(initialWidth);
    const isWidthSet = useRef(false);
    const onLayout = (event) => {
        if (!isWidthSet.current) {
            setWidth(event.nativeEvent.layout.width);
            isWidthSet.current = true;
        }
    };
    return { width, onLayout };
}
export const AnimatedUnitagDisplayName = memo(_AnimatedUnitagDisplayName);
//# sourceMappingURL=AnimatedUnitagDisplayName.native.js.map