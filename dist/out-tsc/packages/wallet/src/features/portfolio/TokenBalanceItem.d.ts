/// <reference types="react" />
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { CurrencyId } from 'uniswap/src/types/currency';
/**
 * IMPORTANT: if you modify the UI of this component, make sure to update the corresponding Skeleton component.
 */
interface TokenBalanceItemProps {
    portfolioBalanceId: string;
    currencyInfo: CurrencyInfo;
    onPressToken?: (currencyId: CurrencyId) => void;
    isLoading?: boolean;
    padded?: boolean;
}
/**
 * If you add any props to this component, make sure you use the react-devtools profiler to confirm that this doesn't break the memoization.
 * This component needs to be as fast as possible and shouldn't re-render often or else it causes performance issues.
 */
export declare const TokenBalanceItem: import("react").NamedExoticComponent<TokenBalanceItemProps>;
export {};
//# sourceMappingURL=TokenBalanceItem.d.ts.map