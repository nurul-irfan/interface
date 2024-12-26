/// <reference types="react" />
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { BridgeTransactionInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function BridgeTransactionDetails({ typeInfo, onClose, disableClick, }: {
    typeInfo: BridgeTransactionInfo;
    onClose?: () => void;
    disableClick?: boolean;
}): JSX.Element;
export declare function CurrencyValueWithIcon({ currencyInfo, formattedFiatAmount, formattedTokenAmount, }: {
    currencyInfo: CurrencyInfo;
    formattedFiatAmount: string;
    formattedTokenAmount: string;
}): JSX.Element;
//# sourceMappingURL=BridgeTransactionDetails.d.ts.map