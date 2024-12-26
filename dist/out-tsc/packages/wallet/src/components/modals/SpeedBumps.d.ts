/// <reference types="react" />
import { PaginatedModalRenderer } from 'uniswap/src/components/modals/PaginatedModals';
export type ConditionalModalRenderer = {
    renderModal: PaginatedModalRenderer;
    condition: boolean;
};
type SpeedBumpsProps = {
    modalRenderers: ConditionalModalRenderer[];
    checkSpeedBumps: boolean;
    setCheckSpeedBumps: (value: boolean) => void;
    onConfirm: () => void;
};
export declare function SpeedBumps({ modalRenderers, checkSpeedBumps, setCheckSpeedBumps, onConfirm: onConfirmFinish, }: SpeedBumpsProps): JSX.Element;
export {};
//# sourceMappingURL=SpeedBumps.d.ts.map