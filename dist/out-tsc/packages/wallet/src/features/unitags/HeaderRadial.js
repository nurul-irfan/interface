import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import Svg, { ClipPath, Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
const HEADER_SOLID_COLOR_OPACITY = 0.1;
export const solidHeaderProps = {
    minOpacity: HEADER_SOLID_COLOR_OPACITY,
    maxOpacity: HEADER_SOLID_COLOR_OPACITY,
};
export const HeaderRadial = memo(function HeaderRadial({ color, borderRadius, minOpacity, maxOpacity, }) {
    return (_jsxs(Svg, { height: "100%", width: "100%", children: [_jsxs(Defs, { children: [_jsx(ClipPath, { id: "clip", children: _jsx(Rect, { height: "100%", rx: borderRadius, width: "100%" }) }), _jsxs(RadialGradient, { cy: "-0.1", id: "background", rx: "0.8", ry: "1.1", children: [_jsx(Stop, { offset: "0", stopColor: color, stopOpacity: maxOpacity !== null && maxOpacity !== void 0 ? maxOpacity : '0.6' }), _jsx(Stop, { offset: "1", stopColor: color, stopOpacity: minOpacity !== null && minOpacity !== void 0 ? minOpacity : '0' })] })] }), _jsx(Rect, { clipPath: borderRadius ? 'url(#clip)' : undefined, fill: "url(#background)", height: "100%", width: "100%", x: "0", y: "0" })] }));
});
//# sourceMappingURL=HeaderRadial.js.map