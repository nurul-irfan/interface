import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'ui/src';
export function ContentRow({ label, variant = 'body4', textColor = '$neutral2', children, }) {
    return (_jsxs(Flex, { centered: true, row: true, gap: "$spacing8", justifyContent: "space-between", children: [typeof label === 'string' ? (_jsx(Text, { color: textColor, variant: variant, children: label })) : (label), children] }));
}
//# sourceMappingURL=ContentRow.js.map