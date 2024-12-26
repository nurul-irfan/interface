import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from 'react';
import { PaginatedModals } from 'uniswap/src/components/modals/PaginatedModals';
import { dismissNativeKeyboard } from 'utilities/src/device/keyboard';
export function SpeedBumps({ modalRenderers, checkSpeedBumps, setCheckSpeedBumps, onConfirm: onConfirmFinish, }) {
    const onConfirmRef = useRef(onConfirmFinish);
    onConfirmRef.current = onConfirmFinish;
    const [displayedModals, setDisplayedModals] = useState();
    const handleClose = useCallback(() => {
        setCheckSpeedBumps(false);
    }, [setCheckSpeedBumps]);
    const handleConfirm = useCallback(() => {
        onConfirmRef.current();
        handleClose();
    }, [handleClose]);
    useEffect(() => {
        if (!checkSpeedBumps) {
            setDisplayedModals(undefined);
            return;
        }
        const newModals = modalRenderers.filter(({ condition }) => condition).map(({ renderModal }) => renderModal);
        if (newModals.length > 0) {
            dismissNativeKeyboard();
            setDisplayedModals(newModals);
        }
        else {
            handleConfirm();
            setDisplayedModals(undefined);
        }
    }, [checkSpeedBumps, modalRenderers, handleConfirm]);
    return _jsx(PaginatedModals, { modals: displayedModals !== null && displayedModals !== void 0 ? displayedModals : [], onClose: handleClose, onFinish: handleConfirm });
}
//# sourceMappingURL=SpeedBumps.js.map