import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'ui/src';
import { Unitag } from 'ui/src/components/icons';
import { fonts, spacing } from 'ui/src/theme';
export function UnitagName({ name, fontSize, opacity = 1, animateIcon = false, displayIconInline = false, }) {
    const iconContainerProps = displayIconInline
        ? {}
        : {
            position: 'absolute',
            right: -spacing.spacing24,
            top: -spacing.spacing4,
        };
    return (_jsxs(Flex, { row: true, alignSelf: "center", animation: "lazy", enterStyle: { opacity: 0 }, exitStyle: { opacity: 0 }, opacity: opacity, alignItems: "center", gap: "$spacing4", children: [_jsx(Text, { color: "$neutral1", fontFamily: "$heading", fontSize: fontSize, fontWeight: fonts.heading2.fontWeight, lineHeight: fonts.heading2.lineHeight, children: name }), _jsx(Flex, { ...iconContainerProps, row: true, animation: "lazy", enterStyle: animateIcon ? { opacity: 0, scale: 0.8, x: 20 } : undefined, exitStyle: animateIcon ? { opacity: 0, scale: 0.8, x: -20 } : undefined, children: _jsx(Unitag, { size: "$icon.24" }) })] }));
}
//# sourceMappingURL=UnitagName.js.map