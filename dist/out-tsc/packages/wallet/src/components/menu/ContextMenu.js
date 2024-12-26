import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Popover, Portal } from 'ui/src';
import { Flex } from 'ui/src/components/layout';
import { useSporeColors } from 'ui/src/hooks/useSporeColors';
import { zIndices } from 'ui/src/theme';
import { usePrevious } from 'utilities/src/react/hooks';
import { MenuContent } from 'wallet/src/components/menu/MenuContent';
const DEFAULT_OFFSET_TOKEN_BALANCE_HEIGHT = 60;
/**
 * Base component for a context menu shown on right click.
 * Expected use is to wrap a component that will trigger the context menu.
 *
 * Pass empty object to `offset` to place the modal below the trigger element.
 */
export function ContextMenu({ children, menuOptions, menuStyleProps, itemId, onLeftClick = false, closeOnClick = false, ...rest }) {
    var _a, _b, _c, _d;
    const lastItemId = usePrevious(itemId);
    const colors = useSporeColors();
    const [showMenu, setShowMenu] = useState(false);
    // Close the menu if this component was recycled to show a different item
    useEffect(() => {
        if (lastItemId && itemId !== lastItemId) {
            setShowMenu(false);
        }
    }, [itemId, lastItemId]);
    const onContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowMenu(true);
    };
    // Offset the content by the height of the trigger element, so its aligned to the top
    // Ignore if any values besides default are passed
    const triggerContainerRef = useRef(null);
    const { offset: customOffset, placement } = rest;
    const isOffsetProvided = customOffset || (placement !== 'bottom-end' && placement);
    const triggerOffsetHeight = (_b = (_a = triggerContainerRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight) !== null && _b !== void 0 ? _b : 0;
    const triggerBottomPosition = (_d = (_c = triggerContainerRef.current) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect().bottom) !== null && _d !== void 0 ? _d : 0;
    const isTriggerBelowViewport = window.innerHeight - triggerBottomPosition < 0;
    const fallbackOffset = -triggerOffsetHeight + (triggerOffsetHeight || DEFAULT_OFFSET_TOKEN_BALANCE_HEIGHT);
    const offset = isOffsetProvided ? customOffset : isTriggerBelowViewport ? fallbackOffset : -triggerOffsetHeight;
    const contentShadowProps = {
        shadowColor: colors.shadowColor.val,
        shadowRadius: 12,
        shadowOpacity: 0.1,
    };
    // Note: Overlay needs to be rendered in portal since parent transforms don't let fixed elements target the viewport
    // see: https://stackoverflow.com/a/15256339
    return (_jsxs(Popover, { allowFlip: true, offset: offset, open: showMenu, placement: "bottom-end", ...rest, children: [showMenu && (_jsx(Portal, { contain: "none", position: "unset", onPress: (e) => e.stopPropagation(), children: _jsx(Flex, { height: "100vh", left: 0, opacity: 1, pointerEvents: "auto", style: { position: 'fixed' }, top: 0, width: "100vh", zIndex: zIndices.modalBackdrop, onPress: () => setShowMenu(false) }) })), _jsx(Popover.Trigger, { children: _jsx("div", { ref: triggerContainerRef, onClick: onLeftClick ? onContextMenu : undefined, onContextMenu: onLeftClick ? undefined : onContextMenu, children: children }) }), _jsxs(Popover.Content, { animation: [
                    'quick',
                    {
                        opacity: {
                            overshootClamping: true,
                        },
                    },
                ], borderColor: "$surface3", borderRadius: "$rounded16", borderWidth: "$spacing1", disableRemoveScroll: false, enterStyle: { y: -10, opacity: 0 }, exitStyle: { y: -10, opacity: 0 }, p: "$none", ...contentShadowProps, children: [_jsx("div", { children: _jsx(MenuContent, { items: menuOptions, onClose: closeOnClick ? () => setShowMenu(false) : undefined, ...menuStyleProps }) }), _jsx(Popover.Arrow, { backgroundColor: "transparent" })] })] }));
}
//# sourceMappingURL=ContextMenu.js.map