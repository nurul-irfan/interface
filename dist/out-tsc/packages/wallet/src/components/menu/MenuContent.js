import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
import { Flex } from 'ui/src/components/layout';
import { Text } from 'ui/src/components/text';
import { TouchableArea } from 'ui/src/components/touchable';
import { useIsDarkMode } from 'ui/src/hooks/useIsDarkMode';
export function MenuContent({ items, onClose, ...rest }) {
    const isDarkMode = useIsDarkMode();
    const handleOnPress = useCallback((e, onPress) => {
        onPress(e);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    }, [onClose]);
    return (_jsx(Flex, { backgroundColor: isDarkMode ? '$surface2' : '$surface1', borderRadius: "$rounded16", gap: "$spacing4", p: "$spacing8", ...rest, children: items.map(({ label, onPress, Icon, textProps, iconProps, iconPlacement = 'right', iconTextGap = '$spacing16', destructive, ...touchableProps }, index) => (_jsx(TouchableArea, { hoverable: true, borderRadius: "$rounded12", disabledStyle: { opacity: 0.6, cursor: 'default' }, onPress: (e) => handleOnPress(e, onPress), ...touchableProps, children: _jsxs(Flex, { centered: true, row: true, gap: iconTextGap, justifyContent: "space-between", p: "$spacing8", children: [iconPlacement === 'left' && Icon && (_jsx(Icon, { color: destructive ? '$statusCritical' : '$neutral2', size: "$icon.20", ...iconProps })), _jsx(Text, { variant: "body2", ...(destructive ? { color: '$statusCritical' } : {}), ...textProps, children: label }), iconPlacement === 'right' && Icon && (_jsx(Icon, { color: destructive ? '$statusCritical' : '$neutral2', size: "$icon.20", ...iconProps }))] }, index) }, index))) }));
}
//# sourceMappingURL=MenuContent.js.map