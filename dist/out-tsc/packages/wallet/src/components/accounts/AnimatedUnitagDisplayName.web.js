import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SharedEventName } from '@uniswap/analytics-events';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnimatePresence, Flex, Text, TouchableArea } from 'ui/src';
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
export function AnimatedUnitagDisplayName({ displayName, unitagIconSize = '$icon.24', address, }) {
    const dispatch = useDispatch();
    const [showUnitagSuffix, setShowUnitagSuffix] = useState(false);
    const [textWidth, setTextWidth] = useState(0);
    const isUnitag = (displayName === null || displayName === void 0 ? void 0 : displayName.type) === DisplayNameType.Unitag;
    const onTextLayout = (event) => {
        setTextWidth(event.nativeEvent.layout.width);
    };
    const onPressUnitag = () => {
        setShowUnitagSuffix(!showUnitagSuffix);
    };
    const onPressCopyAddress = async (e) => {
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
    };
    const isLayoutReady = textWidth > 0;
    return (_jsxs(Flex, { row: true, shrink: true, cursor: "pointer", onPress: isUnitag ? onPressUnitag : undefined, children: [_jsx(Text, { color: "$neutral1", numberOfLines: 1, variant: "subheading1", children: displayName.name }), _jsx(AnimatePresence, { children: _jsxs(Flex, { row: true, animation: "semiBouncy", ml: -textWidth, x: showUnitagSuffix ? textWidth : 0, children: [_jsx(Flex, { position: isLayoutReady ? 'relative' : 'absolute', onLayout: onTextLayout, children: _jsx(Text, { animation: "semiBouncy", color: "$neutral3", opacity: showUnitagSuffix ? 1 : 0, variant: "subheading1", children: UNITAG_SUFFIX }) }), isUnitag ? (_jsx(Flex, { animation: "semiBouncy", pl: "$spacing4", children: _jsx(Unitag, { size: unitagIconSize }) })) : null, address && (_jsx(TouchableArea, { hitSlop: 20, pl: "$spacing8", testID: TestID.AccountHeaderCopyAddress, onPress: onPressCopyAddress, children: _jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing4", children: [_jsx(Text, { color: "$neutral3", numberOfLines: 1, variant: "body2", children: sanitizeAddressText(shortenAddress(address)) }), _jsx(CopyAlt, { color: "$neutral3", size: "$icon.16" })] }) }))] }) })] }));
}
//# sourceMappingURL=AnimatedUnitagDisplayName.web.js.map