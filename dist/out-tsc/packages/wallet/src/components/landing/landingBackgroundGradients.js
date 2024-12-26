import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LinearGradient, Stop } from 'react-native-svg';
import { useIsDarkMode } from 'ui/src';
// Exported from figma
export function InnerCircleGradient({ id }) {
    const isDarkMode = useIsDarkMode();
    return isDarkMode ? (_jsxs(LinearGradient, { id: id, x1: "0.194", x2: "1", y1: "0.190", y2: "0.671", children: [_jsx(Stop, { stopColor: "#999999", stopOpacity: "0" }), _jsx(Stop, { offset: "0.47", stopColor: "#999999" }), _jsx(Stop, { offset: "1", stopColor: "#999999", stopOpacity: "0" })] })) : (_jsxs(LinearGradient, { id: id, x1: "0.722", x2: "0.318", y1: "0.0473", y2: "0.974", children: [_jsx(Stop, { stopColor: "#E1E1E1" }), _jsx(Stop, { offset: "0.239583", stopColor: "#FFFFFF" }), _jsx(Stop, { offset: "0.802083", stopColor: "#FFFFFF" }), _jsx(Stop, { offset: "1", stopColor: "#E1E1E1" })] }));
}
export function OuterCircleGradient({ id }) {
    const isDarkMode = useIsDarkMode();
    return isDarkMode ? (_jsxs(LinearGradient, { id: id, x1: "-0.0229", x2: "1.0686", y1: "0.525", y2: "0.599", children: [_jsx(Stop, { stopColor: "#999999", stopOpacity: "0" }), _jsx(Stop, { offset: "0.47", stopColor: "#999999" }), _jsx(Stop, { offset: "1", stopColor: "#999999", stopOpacity: "0" })] })) : (_jsxs(LinearGradient, { id: id, x1: "0.5", x2: "0.5", y1: "0", y2: "1", children: [_jsx(Stop, { stopColor: "#E1E1E1" }), _jsx(Stop, { offset: "0.119792", stopColor: "#FFFFFF" }), _jsx(Stop, { offset: "0.880208", stopColor: "#FFFFFF" }), _jsx(Stop, { offset: "1", stopColor: "#E1E1E1" })] }));
}
//# sourceMappingURL=landingBackgroundGradients.js.map