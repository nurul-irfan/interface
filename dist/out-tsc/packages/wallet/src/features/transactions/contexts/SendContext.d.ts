import { TransactionRequest } from '@ethersproject/providers';
import { Currency } from '@uniswap/sdk-core';
import { ReactNode } from 'react';
import { ParsedWarnings } from 'uniswap/src/components/modals/WarningModal/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { GasFeeResult } from 'uniswap/src/features/gas/types';
import { TransactionState } from 'uniswap/src/features/transactions/types/transactionState';
import { CurrencyField } from 'uniswap/src/types/currency';
import { useDerivedSendInfo } from 'wallet/src/features/transactions/send/hooks/useDerivedSendInfo';
export declare const getDefaultSendState: (defaultChainId: UniverseChainId) => Readonly<TransactionState>;
type SendContextState = {
    derivedSendInfo: ReturnType<typeof useDerivedSendInfo>;
    gasFee: GasFeeResult;
    warnings: ParsedWarnings;
    txRequest: TransactionRequest | undefined;
    onSelectCurrency: (currency: Currency, _currencyField: CurrencyField, _isBridgePair: boolean) => void;
    updateSendForm: (newState: Partial<TransactionState>) => void;
} & TransactionState;
export declare const SendContext: import("react").Context<SendContextState | undefined>;
export declare function SendContextProvider({ prefilledTransactionState, children, }: {
    prefilledTransactionState?: TransactionState;
    children: ReactNode;
}): JSX.Element;
export declare const useSendContext: () => SendContextState;
export {};
//# sourceMappingURL=SendContext.d.ts.map