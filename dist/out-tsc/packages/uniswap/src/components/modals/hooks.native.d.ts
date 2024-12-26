import { EffectCallback } from 'react';
/**
 * Hook to manage active scroll handler when BottomSheet Views or Lists are used inside a Modal.
 * Also addresses cases when the keyboard is shown or hidden.
 *
 * It should be passed to `focusHook` prop.
 *
 * @param cb - The callback function which sets the scroll handler to the component, to which this hook was passed.
 */
export declare function useBottomSheetFocusHook(cb: EffectCallback): () => void;
//# sourceMappingURL=hooks.native.d.ts.map