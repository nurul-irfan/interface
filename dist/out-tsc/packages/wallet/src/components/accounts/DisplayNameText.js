import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'ui/src';
import { Unitag } from 'ui/src/components/icons';
import { UNITAG_SUFFIX } from 'uniswap/src/features/unitags/constants';
import { DisplayNameType } from 'wallet/src/features/wallet/types';
export function DisplayNameText({ displayName, unitagIconSize = '$icon.24', textProps, includeUnitagSuffix, forcedWidth, disableForcedWidth, ...rest }) {
    var _a;
    const isUnitag = (displayName === null || displayName === void 0 ? void 0 : displayName.type) === DisplayNameType.Unitag;
    const name = isUnitag ? displayName === null || displayName === void 0 ? void 0 : displayName.name.replaceAll(UNITAG_SUFFIX, '') : displayName === null || displayName === void 0 ? void 0 : displayName.name;
    return (_jsxs(Flex, { centered: true, row: true, ...rest, children: [_jsxs(Text, { ellipsizeMode: "tail", ...textProps, color: (_a = textProps === null || textProps === void 0 ? void 0 : textProps.color) !== null && _a !== void 0 ? _a : '$neutral1', flexShrink: 1, numberOfLines: 1, overflow: "hidden", width: isUnitag || disableForcedWidth ? undefined : forcedWidth, children: [name, isUnitag && includeUnitagSuffix && (_jsx(Text, { ...textProps, color: "$neutral2", flexShrink: 1, numberOfLines: 1, children: UNITAG_SUFFIX }))] }), isUnitag ? (_jsx(Flex, { children: _jsx(Unitag, { size: unitagIconSize }) })) : null] }));
}
//# sourceMappingURL=DisplayNameText.js.map