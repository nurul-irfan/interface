import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, useIsDarkMode } from 'ui/src';
import { Plus } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
export function PlusCircle() {
    const isDarkMode = useIsDarkMode();
    return (_jsx(Flex, { centered: true, backgroundColor: "$surface1", borderColor: "$surface3", borderRadius: "$roundedFull", borderWidth: 1, height: iconSizes.icon40, p: "$spacing8", shadowColor: isDarkMode ? '$shadowColor' : '$surface3', shadowOffset: { width: 0, height: 0 }, shadowRadius: 10, width: iconSizes.icon40, children: _jsx(Plus, { color: "$neutral2", size: "$icon.16", strokeWidth: 2 }) }));
}
//# sourceMappingURL=PlusCircle.js.map