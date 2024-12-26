/// <reference types="react" />
import { IndicativeTrade, Trade } from 'uniswap/src/features/transactions/swap/types/trade';
type SwapRateRatioProps = {
    trade: Trade | IndicativeTrade | undefined | null;
    styling?: 'primary' | 'secondary';
    initialInverse?: boolean;
};
export declare function SwapRateRatio({ trade, styling, initialInverse, }: SwapRateRatioProps): JSX.Element | null;
export {};
//# sourceMappingURL=SwapRateRatio.d.ts.map