/// <reference types="react" />
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { ReceiveTokenTransactionInfo, SendTokenTransactionInfo, TransactionDetails } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function TransferTransactionDetails({ transactionDetails, typeInfo, onClose, }: {
    transactionDetails: TransactionDetails;
    typeInfo: ReceiveTokenTransactionInfo | SendTokenTransactionInfo;
    onClose: () => void;
}): JSX.Element;
export declare function CurrencyTransferContent({ tokenAmountWithSymbol, currencyInfo, value, onClose, showValueAsHeading, }: {
    tokenAmountWithSymbol: string | undefined;
    currencyInfo: Maybe<CurrencyInfo>;
    value: string;
    onClose: () => void;
    showValueAsHeading?: boolean;
}): JSX.Element;
//# sourceMappingURL=TransferTransactionDetails.d.ts.map