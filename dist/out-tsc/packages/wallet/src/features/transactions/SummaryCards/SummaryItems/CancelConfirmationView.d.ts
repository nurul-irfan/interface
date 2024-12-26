/// <reference types="react" />
import { providers } from 'ethers';
import { AuthTrigger } from 'uniswap/src/features/auth/types';
import { TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function CancelConfirmationView({ authTrigger, onBack, onCancel, transactionDetails, }: {
    authTrigger?: AuthTrigger;
    onBack: () => void;
    onCancel: (txRequest: providers.TransactionRequest) => void;
    transactionDetails: TransactionDetails;
}): JSX.Element;
//# sourceMappingURL=CancelConfirmationView.d.ts.map