import { TradeableAsset } from 'uniswap/src/entities/assets';
import { FrontendSupportedProtocol } from 'uniswap/src/features/transactions/swap/utils/protocols';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { CurrencyField, CurrencyId } from 'uniswap/src/types/currency';
import { FiatOffRampMetaData } from 'uniswap/src/features/fiatOnRamp/types';
export interface TransactionState {
    txId?: string;
    [CurrencyField.INPUT]: TradeableAsset | null;
    [CurrencyField.OUTPUT]: TradeableAsset | null;
    exactCurrencyField: CurrencyField;
    exactAmountToken: string;
    exactAmountFiat?: string;
    focusOnCurrencyField?: CurrencyField | null;
    recipient?: string;
    isFiatInput?: boolean;
    selectingCurrencyField?: CurrencyField;
    showRecipientSelector?: boolean;
    customSlippageTolerance?: number;
    customDeadline?: number;
    selectedProtocols?: FrontendSupportedProtocol[];
    fiatOffRampMetaData?: FiatOffRampMetaData;
}
export declare const prepareSwapFormState: ({ inputCurrencyId, defaultChainId, }: {
    inputCurrencyId?: string | undefined;
    defaultChainId: UniverseChainId;
}) => TransactionState | undefined;
//# sourceMappingURL=transactionState.d.ts.map