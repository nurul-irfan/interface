/// <reference types="react" />
interface RecipientInputPanelProps {
    recipientAddress: string;
    onShowRecipientSelector: () => void;
}
/**
 * Panel displaying currently selected recipient metadata as well as a toggle
 * to open the recipient selector modal.
 */
export declare function RecipientInputPanel({ recipientAddress, onShowRecipientSelector, }: RecipientInputPanelProps): JSX.Element;
export declare function RecipientPrevTransfers({ recipient }: {
    recipient: string;
}): JSX.Element;
export {};
//# sourceMappingURL=RecipientInputPanel.d.ts.map