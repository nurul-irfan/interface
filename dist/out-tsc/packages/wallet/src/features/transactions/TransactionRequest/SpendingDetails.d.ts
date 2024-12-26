/// <reference types="react" />
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
export declare function SpendingEthDetails({ value, chainId }: {
    value: string;
    chainId: UniverseChainId;
}): JSX.Element;
export declare function SpendingDetails({ currencyInfo, showLabel, tokenCount, }: {
    currencyInfo: CurrencyInfo;
    showLabel: boolean;
    tokenCount: number;
}): JSX.Element;
//# sourceMappingURL=SpendingDetails.d.ts.map