import { ReactNode } from 'react';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
interface Props {
    inputCurrencyInfo: Maybe<CurrencyInfo>;
    outputCurrencyInfo: Maybe<CurrencyInfo>;
    size: number;
    chainId: UniverseChainId | null;
    customIcon?: ReactNode;
}
export declare function SplitLogo({ size, inputCurrencyInfo, outputCurrencyInfo, chainId, customIcon }: Props): JSX.Element;
export declare const BridgeIcon: JSX.Element;
export {};
//# sourceMappingURL=SplitLogo.d.ts.map