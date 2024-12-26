import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
// eslint-disable-next-line no-restricted-imports
import { AdaptiveWebModal, WebModalWithBottomAttachment } from 'ui/src/components/modal/AdaptiveWebModal';
import Trace from 'uniswap/src/features/telemetry/Trace';
import { INTERFACE_NAV_HEIGHT } from 'uniswap/src/theme/heights';
import { isExtension, isInterface } from 'utilities/src/platform';
const ANIMATION_MS = 200;
export function Modal({ children, name, onClose, fullScreen, backgroundColor, isModalOpen = true, alignment = 'center', maxWidth, maxHeight, height, padding, bottomAttachment, gap, paddingX, paddingY, analyticsProperties, skipLogImpression, flex, }) {
    const [fullyClosed, setFullyClosed] = useState(false);
    if (fullyClosed && isModalOpen) {
        setFullyClosed(false);
    }
    // Not the greatest, we are syncing 200 here to 200ms animation
    // TODO(EXT-745): Add Tamagui onFullyClosed callback and replace here
    useEffect(() => {
        if (!isModalOpen) {
            const tm = setTimeout(() => {
                setFullyClosed(true);
            }, ANIMATION_MS);
            return () => {
                clearTimeout(tm);
            };
        }
        return undefined;
    }, [isModalOpen]);
    const isTopAligned = alignment === 'top';
    const justifyContent = isTopAligned ? 'flex-start' : undefined;
    const ModalComponent = bottomAttachment ? WebModalWithBottomAttachment : AdaptiveWebModal;
    return (_jsx(Trace, { logImpression: skipLogImpression ? false : isModalOpen, modal: name, properties: analyticsProperties, children: (isModalOpen || !fullyClosed) && (_jsx(ModalComponent, { bottomAttachment: bottomAttachment, shadowOpacity: isExtension ? 0 : undefined, borderWidth: isExtension ? 0 : undefined, adaptToSheet: isInterface, alignment: alignment, backgroundColor: backgroundColor, height: height !== null && height !== void 0 ? height : (fullScreen ? '100%' : undefined), isOpen: isModalOpen, justifyContent: justifyContent, m: "$none", maxWidth: maxWidth, maxHeight: maxHeight, gap: gap, "$sm": {
                p: padding !== null && padding !== void 0 ? padding : '$spacing12',
                ...(isInterface && {
                    '$platform-web': {
                        height: height !== null && height !== void 0 ? height : `calc(100dvh - ${INTERFACE_NAV_HEIGHT}px)`,
                    },
                }),
            }, p: padding !== null && padding !== void 0 ? padding : '$spacing24', px: paddingX, py: paddingY, flex: flex, position: isTopAligned ? 'absolute' : undefined, top: isTopAligned ? '$spacing16' : undefined, onClose: onClose, children: fullyClosed ? null : children })) }));
}
//# sourceMappingURL=Modal.web.js.map