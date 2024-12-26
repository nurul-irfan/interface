import { PropsWithChildren } from 'react';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { DerivedSwapInfo } from 'uniswap/src/features/transactions/swap/types/derivedSwapInfo';
import { IndicativeTrade, TradeWithSlippage } from 'uniswap/src/features/transactions/swap/types/trade';
interface MaxSlippageRowProps {
    acceptedDerivedSwapInfo: DerivedSwapInfo<CurrencyInfo, CurrencyInfo>;
    autoSlippageTolerance?: number;
    customSlippageTolerance?: number;
}
export declare function MaxSlippageRow({ acceptedDerivedSwapInfo, autoSlippageTolerance, customSlippageTolerance, }: MaxSlippageRowProps): JSX.Element;
type SlippageWarningContentProps = PropsWithChildren<{
    trade: TradeWithSlippage | IndicativeTrade;
    isCustomSlippage: boolean;
    autoSlippageTolerance?: number;
}>;
export declare function SlippageWarningContent({ children, trade, isCustomSlippage, autoSlippageTolerance, }: SlippageWarningContentProps): JSX.Element;
export {};
//# sourceMappingURL=MaxSlippageRow.d.ts.map