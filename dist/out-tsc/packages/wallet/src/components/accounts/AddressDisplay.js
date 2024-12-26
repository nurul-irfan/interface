import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { SharedEventName } from '@uniswap/analytics-events';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { Flex, Text, TouchableArea } from 'ui/src';
import { CopySheets } from 'ui/src/components/icons';
import { fonts } from 'ui/src/theme';
import { useAvatar } from 'uniswap/src/features/address/avatar';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType, CopyNotificationType } from 'uniswap/src/features/notifications/types';
import { ElementName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { sanitizeAddressText } from 'uniswap/src/utils/addresses';
import { setClipboard } from 'uniswap/src/utils/clipboard';
import { shortenAddress } from 'utilities/src/addresses';
import { AccountIcon } from 'wallet/src/components/accounts/AccountIcon';
import { DisplayNameText } from 'wallet/src/components/accounts/DisplayNameText';
import { useDisplayName } from 'wallet/src/features/wallet/hooks';
import { DisplayNameType } from 'wallet/src/features/wallet/types';
function CopyButtonWrapper({ children, onPress }) {
    if (onPress) {
        return (_jsx(TouchableArea, { hitSlop: 16, testID: TestID.Copy, onPress: onPress, children: children }));
    }
    return _jsx(_Fragment, { children: children });
}
/** Helper component to display identicon and formatted address */
export function AddressDisplay({ allowFontScaling = true, overrideDisplayName, lineHeight, address, size = 24, variant = 'body1', textColor = '$neutral1', captionTextColor = '$neutral2', captionVariant = 'subheading2', hideAddressInSubtitle, direction = 'row', showCopy = false, showCopyWrapperButton = false, showAccountIcon = true, textAlign, contentAlign = 'center', // vertical alignment of all items
showIconBackground, showIconBorder, horizontalGap = '$spacing12', showViewOnlyBadge = false, showViewOnlyLabel = false, notificationsBadgeContainer, includeUnitagSuffix = false, gapBetweenLines = '$none', disableForcedWidth = false, displayNameTextAlign, }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const displayName = useDisplayName(address, { includeUnitagSuffix, overrideDisplayName });
    const { avatar } = useAvatar(address);
    const [wrapperWidth, setWrapperWidth] = useState();
    const showAddressAsSubtitle = !hideAddressInSubtitle && (displayName === null || displayName === void 0 ? void 0 : displayName.type) !== DisplayNameType.Address;
    const onPressCopyAddress = async () => {
        if (!address) {
            return;
        }
        await setClipboard(address);
        dispatch(pushNotification({
            type: AppNotificationType.Copied,
            copyType: CopyNotificationType.Address,
        }));
        sendAnalyticsEvent(SharedEventName.ELEMENT_CLICKED, {
            element: ElementName.CopyAddress,
        });
    };
    // Extract sizes so copy icon can match font variants
    const mainSize = fonts[variant].fontSize;
    const captionSize = fonts[captionVariant].fontSize;
    const itemAlignment = textAlign || (!showAccountIcon || direction === 'column' ? 'center' : 'flex-start');
    const icon = useMemo(() => {
        return (_jsx(AccountIcon, { address: address, avatarUri: avatar, showBackground: showIconBackground, showBorder: showIconBorder, showViewOnlyBadge: showViewOnlyBadge, size: size }));
    }, [address, avatar, showIconBackground, showIconBorder, showViewOnlyBadge, size]);
    return (_jsxs(Flex, { shrink: true, alignItems: contentAlign, flexDirection: direction, gap: horizontalGap, onLayout: (e) => {
            Platform.OS === 'web' && setWrapperWidth(e.nativeEvent.layout.width);
        }, children: [showAccountIcon &&
                (notificationsBadgeContainer ? notificationsBadgeContainer({ children: icon, address }) : icon), _jsxs(Flex, { shrink: true, alignItems: itemAlignment, gap: gapBetweenLines, children: [_jsx(CopyButtonWrapper, { onPress: showCopy && !showAddressAsSubtitle ? onPressCopyAddress : undefined, children: _jsxs(Flex, { centered: true, row: true, gap: "$spacing12", children: [_jsx(DisplayNameText, { disableForcedWidth: disableForcedWidth, displayName: displayName, forcedWidth: wrapperWidth, gap: "$spacing4", includeUnitagSuffix: includeUnitagSuffix, textProps: {
                                        adjustsFontSizeToFit: true,
                                        allowFontScaling,
                                        color: textColor,
                                        ellipsizeMode: 'tail',
                                        fontFamily: '$heading',
                                        fontSize: mainSize,
                                        lineHeight: lineHeight !== null && lineHeight !== void 0 ? lineHeight : fonts[variant].lineHeight,
                                        numberOfLines: 1,
                                        testID: `address-display/name/${displayName === null || displayName === void 0 ? void 0 : displayName.name}`,
                                        textAlign: displayNameTextAlign,
                                    }, unitagIconSize: mainSize }), showCopy && !showAddressAsSubtitle && _jsx(CopySheets, { color: "$neutral1", size: mainSize })] }) }), showAddressAsSubtitle && (_jsx(AddressSubtitle, { address: address, captionSize: captionSize, captionTextColor: captionTextColor, captionVariant: captionVariant, showCopy: showCopy, showCopyWrapperButton: showCopyWrapperButton, onPressCopyAddress: onPressCopyAddress }))] }), showViewOnlyLabel && (_jsx(Flex, { grow: true, alignItems: "flex-end", mr: "$spacing8", children: _jsx(Flex, { backgroundColor: "$surface2", borderRadius: "$rounded12", px: "$spacing8", py: "$spacing4", children: _jsx(Text, { color: "$neutral2", variant: "body4", children: t('settings.section.wallet.label.viewOnly') }) }) }))] }));
}
const AddressSubtitle = ({ address, captionTextColor, captionVariant, captionSize, showCopy, showCopyWrapperButton, onPressCopyAddress, }) => (_jsx(CopyButtonWrapper, { onPress: showCopy ? onPressCopyAddress : undefined, children: _jsxs(Flex, { centered: true, row: true, backgroundColor: showCopyWrapperButton ? '$surface2' : '$transparent', borderRadius: "$roundedFull", gap: "$spacing4", mt: showCopyWrapperButton ? '$spacing8' : '$none', px: showCopyWrapperButton ? '$spacing8' : '$none', py: showCopyWrapperButton ? '$spacing4' : '$none', children: [_jsx(Text, { color: captionTextColor, variant: captionVariant, children: sanitizeAddressText(shortenAddress(address, 6)) }), showCopy && _jsx(CopySheets, { color: captionTextColor, size: captionSize })] }) }));
//# sourceMappingURL=AddressDisplay.js.map