/// <reference types="react" />
import { TradeType } from '@uniswap/sdk-core';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { SwapTypeTransactionInfo } from 'wallet/src/features/transactions/SummaryCards/DetailsModal/types';
export declare function SwapTransactionDetails({ typeInfo, onClose, disableClick, }: {
    typeInfo: SwapTypeTransactionInfo;
    onClose?: () => void;
    disableClick?: boolean;
}): JSX.Element;
export declare function SwapTransactionContent({ inputCurrency, outputCurrency, isConfirmed, inputCurrencyAmountRaw, outputCurrencyAmountRaw, tradeType, onClose, disableClick, }: {
    inputCurrency: Maybe<CurrencyInfo>;
    outputCurrency: Maybe<CurrencyInfo>;
    isConfirmed: boolean;
    inputCurrencyAmountRaw: string;
    outputCurrencyAmountRaw: string;
    tradeType?: TradeType;
    onClose?: () => void;
    disableClick?: boolean;
}): JSX.Element;
export declare function ValueText({ value }: {
    value: string;
}): JSX.Element;
//# sourceMappingURL=SwapTransactionDetails.d.ts.map