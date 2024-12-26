import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient as RadialGradientSVG, Rect, Stop } from 'react-native-svg';
import { Flex, Unicon } from 'ui/src';
import { Eye } from 'ui/src/components/icons';
import { RemoteImage } from 'wallet/src/features/images/RemoteImage';
// Determines view only icon size in relation to Account Icon size
const EYE_ICON_SCALING_FACTOR = 0.4;
export function AccountIcon({ size, showViewOnlyBadge, address, avatarUri, showBackground, showBorder, borderColor = '$surface1', borderWidth = 2, }) {
    // scale eye icon to be a portion of container size
    const eyeIconSize = size * EYE_ICON_SCALING_FACTOR;
    const uniconImage = (_jsx(_Fragment, { children: _jsx(Unicon, { address: address, size: size }) }));
    return (_jsxs(Flex, { backgroundColor: showBackground ? '$surface1' : '$transparent', borderColor: showBorder ? borderColor : '$transparent', borderRadius: "$roundedFull", borderWidth: showBorder ? borderWidth : 0, position: "relative", testID: "account-icon", children: [avatarUri ? (_jsx(RemoteImage, { borderRadius: size, fallback: uniconImage, height: size, resizeMode: "cover", uri: avatarUri, width: size })) : (uniconImage), showViewOnlyBadge && (_jsx(Flex, { alignItems: "center", backgroundColor: "$surface2", borderColor: "$surface1", borderRadius: "$roundedFull", borderWidth: 2, bottom: -4, justifyContent: "center", position: "absolute", right: -4, testID: "account-icon/view-only-badge", children: _jsx(Eye, { color: "$neutral2", size: eyeIconSize }) }))] }));
}
// Circle shaped gradient that follows Unicon colors.
export const UniconGradient = ({ color, size }) => {
    return (_jsxs(Svg, { height: size, style: UniconGradientStyles.svg, width: size, children: [_jsx(Defs, { children: _jsxs(RadialGradientSVG, { cy: "-0.1", id: "background", rx: "0.8", ry: "1.1", children: [_jsx(Stop, { offset: "0", stopColor: color, stopOpacity: "0.2" }), _jsx(Stop, { offset: "1", stopColor: color, stopOpacity: "0.2" })] }) }), _jsx(Rect, { fill: "url(#background)", height: "100%", opacity: 0.6, rx: size, width: "100%", x: "0", y: "0" })] }));
};
const UniconGradientStyles = StyleSheet.create({
    svg: {
        position: 'absolute',
    },
});
//# sourceMappingURL=AccountIcon.js.map