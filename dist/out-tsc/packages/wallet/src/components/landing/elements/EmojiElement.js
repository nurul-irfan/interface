import { jsx as _jsx } from "react/jsx-runtime";
import { Flex, Text } from 'ui/src';
import { colors, opacify } from 'ui/src/theme';
export const EmojiElement = ({ emoji }) => {
    return (_jsx(Flex, { backgroundColor: opacify(20, colors.yellowBase), borderRadius: "$roundedFull", p: "$spacing8", transform: [{ rotateZ: '5deg' }], children: _jsx(Text, { color: "$neutral2", textAlign: "center", variant: "buttonLabel2", children: emoji }) }));
};
//# sourceMappingURL=EmojiElement.js.map