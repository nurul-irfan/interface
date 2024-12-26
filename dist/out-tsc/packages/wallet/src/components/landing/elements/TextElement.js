import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, Text } from 'ui/src';
export const TextElement = ({ text }) => {
    return (_jsx(Flex, { borderRadius: "$rounded12", p: "$spacing12", transform: [{ rotateZ: '18deg' }], children: _jsx(Text, { color: "$neutral2", textAlign: "center", variant: "buttonLabel2", children: text }) }));
};
//# sourceMappingURL=TextElement.js.map