import { NetworkStatus } from '@apollo/client';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { PortfolioBalance } from 'uniswap/src/features/dataApi/types';
type CurrencyId = string;
export declare const HIDDEN_TOKEN_BALANCES_ROW: "HIDDEN_TOKEN_BALANCES_ROW";
export type TokenBalanceListRow = CurrencyId | typeof HIDDEN_TOKEN_BALANCES_ROW;
type TokenBalanceListContextState = {
    balancesById: Record<string, PortfolioBalance> | undefined;
    networkStatus: NetworkStatus;
    refetch: (() => void) | undefined;
    hiddenTokensCount: number;
    hiddenTokensExpanded: boolean;
    isWarmLoading: boolean;
    rows: Array<TokenBalanceListRow>;
    setHiddenTokensExpanded: Dispatch<SetStateAction<boolean>>;
    onPressToken: (currencyId: CurrencyId) => void;
};
export declare const TokenBalanceListContext: import("react").Context<TokenBalanceListContextState | undefined>;
export declare function TokenBalanceListContextProvider({ owner, isExternalProfile, children, onPressToken, }: PropsWithChildren<{
    owner: Address;
    isExternalProfile: boolean;
    onPressToken: (currencyId: CurrencyId) => void;
}>): JSX.Element;
export declare const useTokenBalanceListContext: () => TokenBalanceListContextState;
export {};
//# sourceMappingURL=TokenBalanceListContext.d.ts.map