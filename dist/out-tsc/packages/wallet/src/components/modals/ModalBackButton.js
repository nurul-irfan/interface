import { jsx as _jsx } from "react/jsx-runtime";
import { TouchableArea } from 'ui/src';
import { BackArrow } from 'ui/src/components/icons';
import { zIndices } from 'ui/src/theme';
export function ModalBackButton({ onBack }) {
    return (_jsx(TouchableArea, { hoverable: true, borderRadius: "$roundedFull", p: "$spacing4", position: "absolute", zIndex: zIndices.default, onPress: onBack, children: _jsx(BackArrow, { color: "$neutral2", size: "$icon.24" }) }));
}
//# sourceMappingURL=ModalBackButton.js.map