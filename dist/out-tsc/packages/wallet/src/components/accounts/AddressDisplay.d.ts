/// <reference types="react" />
import { FlexAlignType } from 'react-native';
import { ColorTokens, SpaceTokens, TextProps } from 'ui/src';
import { fonts } from 'ui/src/theme';
type AddressDisplayProps = {
    address: string;
    overrideDisplayName?: string;
    allowFontScaling?: boolean;
    lineHeight?: number;
    hideAddressInSubtitle?: boolean;
    size?: number;
    variant?: keyof typeof fonts;
    textColor?: ColorTokens;
    captionTextColor?: ColorTokens;
    captionVariant?: keyof typeof fonts;
    direction?: 'row' | 'column';
    showCopy?: boolean;
    showCopyWrapperButton?: boolean;
    showAccountIcon?: boolean;
    contentAlign?: FlexAlignType;
    showIconBackground?: boolean;
    showIconBorder?: boolean;
    includeUnitagSuffix?: boolean;
    textAlign?: FlexAlignType;
    horizontalGap?: SpaceTokens;
    notificationsBadgeContainer?: ({ children, address }: {
        children: JSX.Element;
        address: string;
    }) => JSX.Element;
    gapBetweenLines?: SpaceTokens;
    showViewOnlyLabel?: boolean;
    showViewOnlyBadge?: boolean;
    disableForcedWidth?: boolean;
    displayNameTextAlign?: TextProps['textAlign'];
};
/** Helper component to display identicon and formatted address */
export declare function AddressDisplay({ allowFontScaling, overrideDisplayName, lineHeight, address, size, variant, textColor, captionTextColor, captionVariant, hideAddressInSubtitle, direction, showCopy, showCopyWrapperButton, showAccountIcon, textAlign, contentAlign, // vertical alignment of all items
showIconBackground, showIconBorder, horizontalGap, showViewOnlyBadge, showViewOnlyLabel, notificationsBadgeContainer, includeUnitagSuffix, gapBetweenLines, disableForcedWidth, displayNameTextAlign, }: AddressDisplayProps): JSX.Element;
export {};
//# sourceMappingURL=AddressDisplay.d.ts.map