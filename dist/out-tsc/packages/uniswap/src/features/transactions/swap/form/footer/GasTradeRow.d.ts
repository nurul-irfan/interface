import { PropsWithChildren } from 'react';
import { Warning } from 'uniswap/src/components/modals/WarningModal/types';
import { FormattedUniswapXGasFeeInfo, GasFeeResult } from 'uniswap/src/features/gas/types';
type DebouncedGasInfo = {
    gasFee: GasFeeResult;
    fiatPriceFormatted?: string;
    uniswapXGasFeeInfo?: FormattedUniswapXGasFeeInfo;
    isHighRelativeToValue: boolean;
    isLoading: boolean;
};
export declare function useDebouncedGasInfo(): DebouncedGasInfo;
export declare function GasTradeRow({ gasInfo, warning, }: {
    gasInfo: DebouncedGasInfo;
    warning?: Warning;
}): JSX.Element | null;
export declare function TradeWarning({ children, warning }: PropsWithChildren<{
    warning: Warning;
}>): JSX.Element;
export {};
//# sourceMappingURL=GasTradeRow.d.ts.map