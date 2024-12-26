/// <reference types="react" />
import { AuthTrigger } from 'uniswap/src/features/auth/types';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { useTransactionActions } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/useTransactionActions';
type TransactionDetailsModalProps = {
    authTrigger?: AuthTrigger;
    onClose: () => void;
    transactionDetails: TransactionDetails;
};
export declare function TransactionDetailsHeader({ transactionDetails, transactionActions, }: {
    transactionDetails: TransactionDetails;
    transactionActions: ReturnType<typeof useTransactionActions>;
}): JSX.Element;
export declare function TransactionDetailsContent({ transactionDetails, onClose, }: {
    transactionDetails: TransactionDetails;
    onClose: () => void;
}): JSX.Element | null;
export declare function TransactionDetailsModal({ authTrigger, onClose, transactionDetails, }: TransactionDetailsModalProps): JSX.Element;
export {};
//# sourceMappingURL=TransactionDetailsModal.d.ts.map