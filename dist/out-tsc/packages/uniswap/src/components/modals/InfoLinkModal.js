import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Flex, Text, TouchableArea, isWeb, useSporeColors } from 'ui/src';
import { X } from 'ui/src/components/icons/X';
import { zIndices } from 'ui/src/theme';
import { Modal } from 'uniswap/src/components/modals/Modal';
import { openURL } from 'uniswap/src/utils/link';
import { logger } from 'utilities/src/logger/logger';
export function InfoLinkModal({ name, isOpen, showCloseButton, icon, title, description, buttonText, buttonTheme, linkText, linkUrl, onDismiss, onButtonPress, onAnalyticsEvent, height, }) {
    const colors = useSporeColors();
    const openUniswapURL = async () => {
        if (!linkUrl) {
            return;
        }
        try {
            await openURL(linkUrl);
            onAnalyticsEvent === null || onAnalyticsEvent === void 0 ? void 0 : onAnalyticsEvent();
        }
        catch (error) {
            logger.error(error, { tags: { file: 'InfoLinkModal.tsx', function: 'openUniswapURL' } });
        }
    };
    return (_jsxs(Modal, { backgroundColor: colors.surface1.val, isModalOpen: isOpen, name: name, height: height, onClose: onDismiss, children: [showCloseButton && (_jsx(TouchableArea, { p: "$spacing16", position: "absolute", right: 0, top: 0, zIndex: zIndices.default, onPress: onDismiss, children: isWeb && _jsx(X, { color: "$neutral2", size: "$icon.16" }) })), _jsxs(Flex, { alignItems: "center", gap: "$spacing8", mx: isWeb ? '$none' : '$spacing36', pt: "$spacing16", children: [icon, _jsxs(Flex, { centered: true, gap: "$spacing8", p: "$spacing16", children: [_jsx(Text, { color: "$neutral1", variant: isWeb ? 'subheading2' : 'subheading1', children: title }), _jsx(Text, { color: "$neutral2", textAlign: "center", variant: "body3", children: description })] }), _jsx(Button, { theme: buttonTheme, width: "100%", onPress: onButtonPress, children: buttonText }), linkText && linkUrl && (_jsx(Button, { alignSelf: "center", backgroundColor: "transparent", borderRadius: "$rounded12", color: "$neutral2", hoverStyle: {
                            backgroundColor: 'transparent',
                        }, px: "$spacing40", theme: "secondary", onPress: openUniswapURL, children: linkText }))] })] }));
}
//# sourceMappingURL=InfoLinkModal.js.map