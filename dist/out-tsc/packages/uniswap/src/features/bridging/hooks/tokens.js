import { useCallback, useMemo } from 'react';
import { filter } from 'uniswap/src/components/TokenSelector/filter';
import { usePortfolioBalancesForAddressById } from 'uniswap/src/components/TokenSelector/hooks/usePortfolioBalancesForAddressById';
import { createEmptyTokenOptionFromBridgingToken } from 'uniswap/src/components/TokenSelector/utils';
import { useTradingApiSwappableTokensQuery } from 'uniswap/src/data/apiClients/tradingApi/useTradingApiSwappableTokensQuery';
import { tradingApiSwappableTokenToCurrencyInfo } from 'uniswap/src/data/apiClients/tradingApi/utils/tradingApiSwappableTokenToCurrencyInfo';
import { useCrossChainBalances } from 'uniswap/src/data/balances/hooks/useCrossChainBalances';
import { useTokenProjectsQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { ALL_CHAIN_IDS } from 'uniswap/src/features/chains/types';
import { toSupportedChainId } from 'uniswap/src/features/chains/utils';
import { currencyIdToContractInput } from 'uniswap/src/features/dataApi/utils';
import { NATIVE_ADDRESS_FOR_TRADING_API, getTokenAddressFromChainForTradingApi, toTradingApiSupportedChainId, } from 'uniswap/src/features/transactions/swap/utils/tradingApi';
import { buildCurrencyId, buildNativeCurrencyId } from 'uniswap/src/utils/currencyId';
import { logger } from 'utilities/src/logger/logger';
export function useBridgingTokenWithHighestBalance({ address, currencyAddress, currencyChainId, }) {
    var _a, _b;
    const currencyId = buildCurrencyId(currencyChainId, currencyAddress);
    const tokenIn = currencyAddress ? getTokenAddressFromChainForTradingApi(currencyAddress, currencyChainId) : undefined;
    const tokenInChainId = toTradingApiSupportedChainId(currencyChainId);
    const { data: tokenProjectsData } = useTokenProjectsQuery({
        variables: { contracts: [currencyIdToContractInput(currencyId)] },
    });
    const crossChainTokens = (_b = (_a = tokenProjectsData === null || tokenProjectsData === void 0 ? void 0 : tokenProjectsData.tokenProjects) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.tokens;
    const { otherChainBalances } = useCrossChainBalances({
        address,
        currencyId,
        crossChainTokens,
        fetchPolicy: 'cache-first',
    });
    const { data: bridgingTokens } = useTradingApiSwappableTokensQuery({
        params: otherChainBalances && (otherChainBalances === null || otherChainBalances === void 0 ? void 0 : otherChainBalances.length) > 0 && tokenIn && tokenInChainId
            ? {
                tokenIn,
                tokenInChainId,
            }
            : undefined,
    });
    return useMemo(() => {
        if (!otherChainBalances || !(bridgingTokens === null || bridgingTokens === void 0 ? void 0 : bridgingTokens.tokens)) {
            return undefined;
        }
        const tokenWithHighestBalance = bridgingTokens.tokens.reduce((currentHighest, token) => {
            const balance = otherChainBalances.find((b) => b.currencyInfo.currency.chainId === token.chainId);
            if (!(balance === null || balance === void 0 ? void 0 : balance.balanceUSD)) {
                return currentHighest;
            }
            if (!currentHighest ||
                !currentHighest.balance.balanceUSD ||
                balance.balanceUSD > currentHighest.balance.balanceUSD) {
                const currencyInfo = tradingApiSwappableTokenToCurrencyInfo(token);
                if (!currencyInfo) {
                    logger.error(new Error('Failed to convert swappable token to currency info'), {
                        tags: { file: 'bridging/hooks/tokens.ts', function: 'useBridgingTokenWithHighestBalance' },
                        extra: { token },
                    });
                    return currentHighest;
                }
                return {
                    token,
                    balance,
                    currencyInfo,
                };
            }
            return currentHighest;
        }, undefined);
        return tokenWithHighestBalance;
    }, [otherChainBalances, bridgingTokens]);
}
export function useBridgingTokensOptions({ input, walletAddress, chainFilter, }) {
    const tokenIn = (input === null || input === void 0 ? void 0 : input.address) ? getTokenAddressFromChainForTradingApi(input.address, input.chainId) : undefined;
    const tokenInChainId = toTradingApiSupportedChainId(input === null || input === void 0 ? void 0 : input.chainId);
    const { data: bridgingTokens, isLoading: loadingBridgingTokens, error: errorBridgingTokens, refetch: refetchBridgingTokens, } = useTradingApiSwappableTokensQuery({
        params: tokenIn && tokenInChainId
            ? {
                tokenIn,
                tokenInChainId,
            }
            : undefined,
    });
    // Get portfolio balance for returned tokens
    const { data: portfolioBalancesById, error: portfolioBalancesByIdError, refetch: portfolioBalancesByIdRefetch, loading: loadingPorfolioBalancesById, } = usePortfolioBalancesForAddressById(walletAddress);
    const tokenOptions = useBridgingTokensToTokenOptions(bridgingTokens === null || bridgingTokens === void 0 ? void 0 : bridgingTokens.tokens, portfolioBalancesById);
    // Filter out tokens that are not on the current chain, unless the input token is the same as the current chain
    const isSameChain = (input === null || input === void 0 ? void 0 : input.chainId) === chainFilter;
    const shouldFilterByChain = chainFilter !== null && !isSameChain;
    const filteredTokenOptions = useMemo(() => filter(tokenOptions !== null && tokenOptions !== void 0 ? tokenOptions : null, shouldFilterByChain ? chainFilter : null), [tokenOptions, shouldFilterByChain, chainFilter]);
    const error = (!portfolioBalancesById && portfolioBalancesByIdError) || (!tokenOptions && errorBridgingTokens);
    const refetch = useCallback(async () => {
        portfolioBalancesByIdRefetch === null || portfolioBalancesByIdRefetch === void 0 ? void 0 : portfolioBalancesByIdRefetch();
        await (refetchBridgingTokens === null || refetchBridgingTokens === void 0 ? void 0 : refetchBridgingTokens());
    }, [portfolioBalancesByIdRefetch, refetchBridgingTokens]);
    return {
        data: filteredTokenOptions,
        loading: loadingBridgingTokens || loadingPorfolioBalancesById,
        error: error || undefined,
        refetch,
        shouldNest: !shouldFilterByChain,
    };
}
function useBridgingTokensToTokenOptions(bridgingTokens, portfolioBalancesById) {
    return useMemo(() => {
        if (!bridgingTokens) {
            return undefined;
        }
        // We sort the tokens by chain in the same order chains in the network selector
        const chainOrder = ALL_CHAIN_IDS;
        const sortedBridgingTokens = [...bridgingTokens].sort((a, b) => {
            if (!a || !b) {
                return 0;
            }
            const chainIdA = toSupportedChainId(a.chainId);
            const chainIdB = toSupportedChainId(b.chainId);
            if (!chainIdA || !chainIdB) {
                return 0;
            }
            return chainOrder.indexOf(chainIdA) - chainOrder.indexOf(chainIdB);
        });
        return sortedBridgingTokens
            .map((token) => {
            var _a;
            const chainId = toSupportedChainId(token.chainId);
            const validInput = token.address && token.chainId;
            if (!chainId || !validInput) {
                return undefined;
            }
            const isNative = token.address === NATIVE_ADDRESS_FOR_TRADING_API;
            const currencyId = isNative ? buildNativeCurrencyId(chainId) : buildCurrencyId(chainId, token.address);
            return (_a = portfolioBalancesById === null || portfolioBalancesById === void 0 ? void 0 : portfolioBalancesById[currencyId]) !== null && _a !== void 0 ? _a : createEmptyTokenOptionFromBridgingToken(token);
        })
            .filter((tokenOption) => tokenOption !== undefined);
    }, [bridgingTokens, portfolioBalancesById]);
}
//# sourceMappingURL=tokens.js.map