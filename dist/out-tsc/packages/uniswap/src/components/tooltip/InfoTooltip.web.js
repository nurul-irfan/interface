import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text, Tooltip, isWeb } from 'ui/src';
const TOOLTIP_REST_MS = 20;
const TOOLTIP_CLOSE_MS = 100;
export function InfoTooltip({ title, text, icon, button, trigger, triggerPlacement = 'end', children, maxWidth, placement, open, }) {
    return (_jsxs(Flex, { row: true, shrink: true, alignItems: "center", gap: "$spacing4", children: [triggerPlacement === 'end' && children, _jsxs(Tooltip, { ...(open !== undefined && { open }), delay: { close: TOOLTIP_CLOSE_MS, open: 0 }, placement: placement, restMs: TOOLTIP_REST_MS, children: [_jsx(Tooltip.Trigger, { children: trigger }), _jsxs(Tooltip.Content, { maxWidth: maxWidth !== null && maxWidth !== void 0 ? maxWidth : (isWeb ? 280 : '100%'), mx: "$spacing24", children: [_jsxs(Flex, { row: true, alignItems: "center", gap: "$spacing8", children: [_jsx(Flex, { grow: true, children: icon }), _jsxs(Flex, { shrink: true, gap: "$spacing4", children: [title && (_jsx(Text, { alignSelf: "flex-start", variant: "body4", children: title })), _jsx(Text, { color: "$neutral2", variant: "body4", children: text }), button && (_jsx(Flex, { alignSelf: "flex-start", width: "100%", children: button }))] })] }), _jsx(Tooltip.Arrow, {})] })] }), triggerPlacement === 'start' && children] }));
}
//# sourceMappingURL=InfoTooltip.web.js.map