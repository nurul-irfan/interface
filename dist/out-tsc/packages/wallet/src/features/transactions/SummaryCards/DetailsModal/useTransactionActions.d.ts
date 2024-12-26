import { AuthTrigger } from 'uniswap/src/features/auth/types';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
import { MenuContentItem } from 'wallet/src/components/menu/types';
export declare const useTransactionActions: ({ authTrigger, transaction, }: {
    authTrigger?: AuthTrigger | undefined;
    transaction: TransactionDetails;
}) => {
    renderModals: () => JSX.Element;
    openActionsModal: () => void;
    openCancelModal: () => void;
    menuItems: MenuContentItem[];
};
//# sourceMappingURL=useTransactionActions.d.ts.map