import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text, TouchableArea } from 'ui/src';
import { QuestionInCircleFilled } from 'ui/src/components/icons';
export function InformationBanner({ infoText, onPress }) {
    return (_jsx(TouchableArea, { backgroundColor: "$surface2", borderRadius: "$rounded16", my: "$padding8", onPress: onPress, children: _jsxs(Flex, { row: true, alignItems: "center", px: "$spacing12", py: "$spacing12", children: [_jsx(QuestionInCircleFilled, { color: "$neutral2", size: "$icon.20" }), _jsx(Flex, { pl: "$spacing8", children: _jsx(Text, { color: "$neutral2", variant: "body3", children: infoText }) })] }) }));
}
//# sourceMappingURL=InformationBanner.js.map