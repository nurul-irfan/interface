import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Flex, TouchableArea, useIsShortMobileDevice, useSporeColors } from 'ui/src';
import { Arrow } from 'ui/src/components/arrow/Arrow';
import { iconSizes } from 'ui/src/theme';
export function SwapArrowButton(props) {
    const colors = useSporeColors();
    const { testID, onPress, disabled, backgroundColor = '$surface2', size = iconSizes.icon24, ...rest } = props;
    const isShortMobileDevice = useIsShortMobileDevice();
    const hoverStyle = useMemo(() => ({ backgroundColor: '$surface2Hovered' }), []);
    return useMemo(() => (_jsx(TouchableArea, { alignItems: "center", alignSelf: "center", backgroundColor: backgroundColor, borderColor: "$surface1", borderRadius: isShortMobileDevice ? '$rounded12' : '$rounded16', borderWidth: isShortMobileDevice ? 2 : 4, disabled: disabled, justifyContent: "center", p: isShortMobileDevice ? '$spacing4' : '$spacing8', testID: testID, scaleTo: 0.98, hoverStyle: hoverStyle, onPress: onPress, ...rest, children: _jsx(Flex, { centered: true, p: "$spacing2", children: _jsx(Arrow, { color: colors.neutral1.val, direction: "s", size: size }) }) })), [backgroundColor, isShortMobileDevice, disabled, testID, onPress, rest, colors.neutral1.val, size, hoverStyle]);
}
//# sourceMappingURL=SwapArrowButton.js.map