import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { Flex, Text, useColorSchemeFromSeed } from 'ui/src';
import { iconSizes } from 'ui/src/theme';
export function UnmemoizedDappIconPlaceholder({ name, iconSize }) {
    const { foreground: textColor, background: backgroundColor } = useColorSchemeFromSeed(name !== null && name !== void 0 ? name : '');
    return (_jsx(Flex, { centered: true, fill: true, row: true, backgroundColor: backgroundColor, borderRadius: "$roundedFull", maxHeight: iconSize, testID: "dapp-icon-placeholder", width: iconSize, aspectRatio: 1, children: _jsx(Text, { color: textColor, textAlign: "center", variant: iconSize >= iconSizes.icon40 ? 'subheading1' : 'body2', children: name && name.length > 0 ? name.charAt(0) : ' ' }) }));
}
export const DappIconPlaceholder = memo(UnmemoizedDappIconPlaceholder);
//# sourceMappingURL=DappIconPlaceholder.js.map