import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Flex, TouchableArea, isWeb } from 'ui/src';
import { InfoCircle } from 'ui/src/components/icons/InfoCircle';
import { WarningModal } from 'uniswap/src/components/modals/WarningModal/WarningModal';
import { InfoTooltip } from 'uniswap/src/components/tooltip/InfoTooltip';
/**
 * Platform wrapper component used to display additional info either as a tooltip on web
 * or a modal on mobile
 */
export function WarningInfo({ tooltipProps, modalProps, infoButton, children, trigger = _jsx(InfoCircle, { color: "$neutral3", size: "$icon.16" }), triggerPlacement = 'end', }) {
    const [showModal, setShowModal] = useState(false);
    if (isWeb) {
        return (_jsx(InfoTooltip, { ...tooltipProps, button: infoButton, trigger: trigger, triggerPlacement: triggerPlacement, children: children }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(TouchableArea, { flexShrink: 1, onPress: () => setShowModal(true), children: _jsxs(Flex, { row: true, shrink: true, alignItems: "center", gap: "$spacing4", children: [triggerPlacement === 'start' && trigger, children, triggerPlacement === 'end' && trigger] }) }), _jsx(WarningModal, { isOpen: showModal, ...modalProps, onClose: () => setShowModal(false), children: infoButton })] }));
}
//# sourceMappingURL=WarningInfo.js.map