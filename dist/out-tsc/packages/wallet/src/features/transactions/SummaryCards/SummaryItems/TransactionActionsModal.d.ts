/// <reference types="react" />
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
interface TransactionActionModalProps {
    onClose: () => void;
    onCancel: () => void;
    msTimestampAdded: number;
    showCancelButton?: boolean;
    transactionDetails: TransactionDetails;
}
/** Display options for transactions. */
export default function TransactionActionsModal({ msTimestampAdded, onCancel, onClose, showCancelButton, transactionDetails, }: TransactionActionModalProps): JSX.Element;
export declare function openSupportLink(transactionDetails: TransactionDetails): Promise<void>;
export declare function getTransactionId(transactionDetails: TransactionDetails): string | undefined;
export {};
//# sourceMappingURL=TransactionActionsModal.d.ts.map