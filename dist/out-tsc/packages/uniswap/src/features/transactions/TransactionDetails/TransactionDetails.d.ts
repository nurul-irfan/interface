import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { PropsWithChildren, ReactNode } from 'react';
import { Warning } from 'uniswap/src/components/modals/WarningModal/types';
import { TransactionFailureReason } from 'uniswap/src/data/tradingApi/__generated__';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { GasFeeResult } from 'uniswap/src/features/gas/types';
import { FeeOnTransferFeeGroupProps, TokenWarningProps } from 'uniswap/src/features/transactions/TransactionDetails/types';
import { UniswapXGasBreakdown } from 'uniswap/src/features/transactions/swap/types/swapTxAndGasInfo';
import { SwapFee as SwapFeeType } from 'uniswap/src/features/transactions/swap/types/trade';
interface TransactionDetailsProps {
    banner?: ReactNode;
    chainId: UniverseChainId;
    gasFee: GasFeeResult;
    swapFee?: SwapFeeType;
    swapFeeUsd?: number;
    uniswapXGasBreakdown?: UniswapXGasBreakdown;
    showExpandedChildren?: boolean;
    showGasFeeError?: boolean;
    showWarning?: boolean;
    showSeparatorToggle?: boolean;
    warning?: Warning;
    feeOnTransferProps?: FeeOnTransferFeeGroupProps;
    tokenWarningProps?: TokenWarningProps;
    tokenWarningChecked?: boolean;
    setTokenWarningChecked?: (checked: boolean) => void;
    outputCurrency?: Currency;
    onShowWarning?: () => void;
    indicative?: boolean;
    isSwap?: boolean;
    isBridgeTrade?: boolean;
    estimatedBridgingTime?: number;
    AccountDetails?: JSX.Element;
    RoutingInfo?: JSX.Element;
    RateInfo?: JSX.Element;
    transactionUSDValue?: Maybe<CurrencyAmount<Currency>>;
    txSimulationErrors?: TransactionFailureReason[];
}
export declare function TransactionDetails({ banner, children, showExpandedChildren, chainId, gasFee, outputCurrency, uniswapXGasBreakdown, swapFee, swapFeeUsd, showGasFeeError, showSeparatorToggle, showWarning, warning, feeOnTransferProps, tokenWarningProps, tokenWarningChecked, setTokenWarningChecked, onShowWarning, indicative, isSwap, transactionUSDValue, txSimulationErrors, isBridgeTrade, AccountDetails, estimatedBridgingTime, RoutingInfo, RateInfo, }: PropsWithChildren<TransactionDetailsProps>): JSX.Element;
export declare const ListSeparatorToggle: ({ onPress, isOpen, openText, closedText, }: {
    onPress: (() => void) | null | undefined;
    isOpen?: boolean | undefined;
    openText: string;
    closedText: string;
}) => JSX.Element;
export {};
//# sourceMappingURL=TransactionDetails.d.ts.map