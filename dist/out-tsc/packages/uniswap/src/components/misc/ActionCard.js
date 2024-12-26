import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text, TouchableArea } from 'ui/src';
import Trace from 'uniswap/src/features/telemetry/Trace';
export const ActionCard = ({ title, blurb, onPress, icon, elementName, containerProps, BackgroundImageWrapperCallback, }) => (_jsx(Trace, { logPress: true, element: elementName, children: _jsx(TouchableArea, { backgroundColor: BackgroundImageWrapperCallback ? undefined : '$surface1', borderColor: "$surface3", borderRadius: "$rounded24", borderWidth: 1, overflow: "hidden", onPress: onPress, children: _jsx(BackgroundWrapper, { BackgroundImageWrapper: BackgroundImageWrapperCallback, children: _jsxs(Flex, { centered: true, shrink: true, alignContent: "center", gap: "$spacing4", px: "$spacing20", py: "$spacing12", ...containerProps, children: [icon, _jsxs(Flex, { centered: true, shrink: true, alignContent: "center", children: [_jsx(Text, { textAlign: "center", variant: "buttonLabel2", children: title }), _jsx(Text, { color: "$neutral2", textAlign: "center", variant: "body3", children: blurb })] })] }) }) }) }));
const BackgroundWrapper = ({ children, BackgroundImageWrapper, }) => {
    return BackgroundImageWrapper !== undefined ? (_jsx(BackgroundImageWrapper, { children: children })) : (_jsx(Flex, { children: children }));
};
//# sourceMappingURL=ActionCard.js.map