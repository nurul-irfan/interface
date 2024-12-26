import { jsx as _jsx } from "react/jsx-runtime";
import isEqual from 'lodash/isEqual';
import { createContext, useContext, useMemo, useRef, useState, } from 'react';
import { PollingInterval } from 'uniswap/src/constants/misc';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { sortPortfolioBalances, usePortfolioBalances, useTokenBalancesGroupedByVisibility, } from 'uniswap/src/features/dataApi/balances';
import { isWarmLoadingStatus } from 'wallet/src/data/utils';
export const HIDDEN_TOKEN_BALANCES_ROW = 'HIDDEN_TOKEN_BALANCES_ROW';
export const TokenBalanceListContext = createContext(undefined);
export function TokenBalanceListContextProvider({ owner, isExternalProfile, children, onPressToken, }) {
    const { data: balancesById, networkStatus, refetch, } = usePortfolioBalances({
        address: owner,
        pollInterval: PollingInterval.KindaFast,
        fetchPolicy: 'cache-and-network',
    });
    const { isTestnetModeEnabled } = useEnabledChains();
    // re-order token balances to visible and hidden
    const { shownTokens, hiddenTokens } = useTokenBalancesGroupedByVisibility({
        balancesById,
    });
    const shouldShowHiddenTokens = !(shownTokens === null || shownTokens === void 0 ? void 0 : shownTokens.length) && !!(hiddenTokens === null || hiddenTokens === void 0 ? void 0 : hiddenTokens.length);
    const [hiddenTokensExpanded, setHiddenTokensExpanded] = useState(shouldShowHiddenTokens);
    const rowsRef = useRef();
    const rows = useMemo(() => {
        const shownTokensArray = shownTokens !== null && shownTokens !== void 0 ? shownTokens : [];
        const newRowIds = [
            // already sorted when testnet mode is disabled;
            // api uses usd value, which is available for prod tokens
            ...(isTestnetModeEnabled
                ? sortPortfolioBalances({ balances: shownTokensArray, isTestnetModeEnabled })
                : shownTokensArray),
            ...((hiddenTokens === null || hiddenTokens === void 0 ? void 0 : hiddenTokens.length) ? [HIDDEN_TOKEN_BALANCES_ROW] : []),
            ...(hiddenTokensExpanded && hiddenTokens ? hiddenTokens : []),
        ].map((token) => {
            if (token === HIDDEN_TOKEN_BALANCES_ROW) {
                return token;
            }
            return token.currencyInfo.currencyId;
        });
        // We do this extra step to make sure we return the same array reference if the currency IDs for each row haven't changed.
        if (!rowsRef.current || !isEqual(rowsRef.current, newRowIds)) {
            rowsRef.current = newRowIds;
        }
        return rowsRef.current;
    }, [hiddenTokens, hiddenTokensExpanded, shownTokens, isTestnetModeEnabled]);
    const isWarmLoading = !!balancesById && isWarmLoadingStatus(networkStatus) && !isExternalProfile;
    const state = useMemo(() => {
        var _a;
        return ({
            balancesById,
            hiddenTokensCount: (_a = hiddenTokens === null || hiddenTokens === void 0 ? void 0 : hiddenTokens.length) !== null && _a !== void 0 ? _a : 0,
            hiddenTokensExpanded,
            isWarmLoading,
            networkStatus,
            onPressToken,
            refetch,
            rows,
            setHiddenTokensExpanded,
        });
    }, [
        balancesById,
        hiddenTokens === null || hiddenTokens === void 0 ? void 0 : hiddenTokens.length,
        hiddenTokensExpanded,
        isWarmLoading,
        networkStatus,
        onPressToken,
        refetch,
        rows,
    ]);
    return _jsx(TokenBalanceListContext.Provider, { value: state, children: children });
}
export const useTokenBalanceListContext = () => {
    const context = useContext(TokenBalanceListContext);
    if (context === undefined) {
        throw new Error('`useTokenBalanceListContext` must be used inside of `TokenBalanceListContextProvider`');
    }
    return context;
};
//# sourceMappingURL=TokenBalanceListContext.js.map