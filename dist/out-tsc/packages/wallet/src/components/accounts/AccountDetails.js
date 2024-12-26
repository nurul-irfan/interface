import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'ui/src';
import { RotatableChevron } from 'ui/src/components/icons';
import { shortenAddress } from 'utilities/src/addresses';
import { AddressDisplay } from 'wallet/src/components/accounts/AddressDisplay';
export function AccountDetails({ address, allowFontScaling = true, iconSize = 20, chevron = false, chevronColor = '$neutral2', }) {
    return (_jsxs(Flex, { row: true, shrink: true, alignItems: "center", gap: "$spacing16", justifyContent: "space-between", children: [_jsx(Flex, { fill: true, row: true, shrink: true, children: _jsx(AddressDisplay, { hideAddressInSubtitle: true, address: address, allowFontScaling: allowFontScaling, horizontalGap: "$spacing8", size: iconSize, variant: "body3" }) }), _jsxs(Flex, { fill: true, row: true, shrink: true, alignItems: "center", gap: "$spacing4", justifyContent: "flex-end", children: [_jsx(Text, { allowFontScaling: allowFontScaling, color: "$neutral2", variant: "body3", children: shortenAddress(address) }), chevron && _jsx(RotatableChevron, { color: chevronColor, direction: "end", height: iconSize, width: iconSize })] })] }));
}
//# sourceMappingURL=AccountDetails.js.map