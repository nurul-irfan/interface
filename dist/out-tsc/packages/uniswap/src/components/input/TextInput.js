import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Input, useSporeColors } from 'ui/src';
// TODO(MOB-1537): move this to ui/src and see if we can just use styled() or move entirely to Input
export const TextInput = forwardRef(function _TextInput({ onChangeText, onBlur, ...rest }, ref) {
    const colors = useSporeColors();
    return (_jsx(Input, { ref: ref, autoComplete: "off", backgroundColor: "$surface1", borderRadius: "$rounded12", color: "$neutral1", height: "auto", placeholderTextColor: "$neutral3", px: "$spacing16", py: "$spacing12", selectionColor: colors.neutral3.val, onBlur: onBlur, onChangeText: onChangeText, ...rest }));
});
//# sourceMappingURL=TextInput.js.map