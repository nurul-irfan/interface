import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Flex, TouchableArea } from 'ui/src';
import { RotatableChevron } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { SearchTextInput } from 'uniswap/src/features/search/SearchTextInput';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
// Use instead of SearchTextInput when you need back button functionality outside of nav stack (i.e., inside Modals)
export const SearchBar = forwardRef(function _SearchBar({ onBack, hideBackButton, ...rest }, ref) {
    return (_jsxs(Flex, { centered: true, row: true, gap: "$spacing12", children: [onBack && !hideBackButton && (_jsx(TouchableArea, { testID: TestID.Back, onPress: onBack, children: _jsx(RotatableChevron, { color: "$neutral2", height: iconSizes.icon24, width: iconSizes.icon24 }) })), _jsx(SearchTextInput, { ref: ref, ...rest })] }));
});
//# sourceMappingURL=SearchBar.js.map