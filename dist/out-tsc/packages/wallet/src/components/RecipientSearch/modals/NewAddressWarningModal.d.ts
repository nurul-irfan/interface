/// <reference types="react" />
type NewAddressWarningModalProps = {
    address: string;
    onAcknowledge: () => void;
    onClose: () => void;
};
/**
 * Modal shown when trying to do a transaction with a that the user has not done a transaction
 * with before. The user can then confirm that they want to proceed or cancel the transaction.
 *
 * @param address Target address the user has not transacted with
 * @param onAcknowledge Callback when the user has confirmed they want to proceed
 * @param onConfirm Callback when the user does not want to proceed with the transaction for new address
 */
export declare function NewAddressWarningModal({ address, onAcknowledge, onClose }: NewAddressWarningModalProps): JSX.Element;
export {};
//# sourceMappingURL=NewAddressWarningModal.d.ts.map