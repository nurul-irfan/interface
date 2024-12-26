import { useMemo } from 'react';
import { useCheckApprovalQuery } from 'uniswap/src/data/apiClients/tradingApi/useCheckApprovalQuery';
import { Routing } from 'uniswap/src/data/tradingApi/__generated__/index';
import { convertGasFeeToDisplayValue, useActiveGasStrategy, useShadowGasStrategies, } from 'uniswap/src/features/gas/hooks';
import { areEqualGasStrategies } from 'uniswap/src/features/gas/types';
import { ApprovalAction } from 'uniswap/src/features/transactions/swap/types/trade';
import { isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { getTokenAddressForApi, toTradingApiSupportedChainId, } from 'uniswap/src/features/transactions/swap/utils/tradingApi';
import { WrapType } from 'uniswap/src/features/transactions/types/wrap';
import { logger } from 'utilities/src/logger/logger';
import { ONE_MINUTE_MS, ONE_SECOND_MS } from 'utilities/src/time/time';
export function useTokenApprovalInfo(params) {
    const { account, chainId, wrapType, currencyInAmount, currencyOutAmount, routing, skip } = params;
    const isWrap = wrapType !== WrapType.NotApplicable;
    const address = account === null || account === void 0 ? void 0 : account.address;
    const inputWillBeWrapped = routing && isUniswapX({ routing });
    // Off-chain orders must have wrapped currencies approved, rather than natives.
    const currencyIn = inputWillBeWrapped ? currencyInAmount === null || currencyInAmount === void 0 ? void 0 : currencyInAmount.currency.wrapped : currencyInAmount === null || currencyInAmount === void 0 ? void 0 : currencyInAmount.currency;
    const amount = currencyInAmount === null || currencyInAmount === void 0 ? void 0 : currencyInAmount.quotient.toString();
    const tokenInAddress = getTokenAddressForApi(currencyIn);
    // Only used for bridging
    const isBridge = routing === Routing.BRIDGE;
    const currencyOut = currencyOutAmount === null || currencyOutAmount === void 0 ? void 0 : currencyOutAmount.currency;
    const tokenOutAddress = getTokenAddressForApi(currencyOut);
    const activeGasStrategy = useActiveGasStrategy(chainId, 'general');
    const shadowGasStrategies = useShadowGasStrategies(chainId, 'general');
    const approvalRequestArgs = useMemo(() => {
        const tokenInChainId = toTradingApiSupportedChainId(chainId);
        const tokenOutChainId = toTradingApiSupportedChainId(currencyOut === null || currencyOut === void 0 ? void 0 : currencyOut.chainId);
        if (!address || !amount || !currencyIn || !tokenInAddress || !tokenInChainId) {
            return undefined;
        }
        if (isBridge && !tokenOutAddress && !tokenOutChainId) {
            return undefined;
        }
        return {
            walletAddress: address,
            token: tokenInAddress,
            amount,
            chainId: tokenInChainId,
            includeGasInfo: true,
            tokenOut: tokenOutAddress,
            tokenOutChainId,
            gasStrategies: [activeGasStrategy, ...(shadowGasStrategies !== null && shadowGasStrategies !== void 0 ? shadowGasStrategies : [])],
        };
    }, [
        activeGasStrategy,
        address,
        amount,
        chainId,
        currencyIn,
        currencyOut === null || currencyOut === void 0 ? void 0 : currencyOut.chainId,
        isBridge,
        tokenInAddress,
        tokenOutAddress,
        shadowGasStrategies,
    ]);
    const shouldSkip = skip || !approvalRequestArgs || isWrap || !address;
    const { data, isLoading, error } = useCheckApprovalQuery({
        params: shouldSkip ? undefined : approvalRequestArgs,
        staleTime: 15 * ONE_SECOND_MS,
        immediateGcTime: ONE_MINUTE_MS,
    });
    return useMemo(() => {
        var _a, _b;
        if (error) {
            logger.error(error, {
                tags: { file: 'useTokenApprovalInfo', function: 'useTokenApprovalInfo' },
                extra: {
                    approvalRequestArgs,
                },
            });
        }
        if (isWrap) {
            return {
                action: ApprovalAction.None,
                txRequest: null,
                cancelTxRequest: null,
                isLoading,
            };
        }
        if (data && !error) {
            // API returns null if no approval is required
            if (data.approval === null) {
                return {
                    action: ApprovalAction.None,
                    txRequest: null,
                    cancelTxRequest: null,
                    isLoading,
                };
            }
            if (data.approval) {
                const activeEstimate = (_a = data.gasEstimates) === null || _a === void 0 ? void 0 : _a.find((e) => areEqualGasStrategies(e.strategy, activeGasStrategy));
                let gasEstimates;
                if (activeEstimate) {
                    gasEstimates = {
                        activeEstimate,
                        shadowEstimates: (_b = data.gasEstimates) === null || _b === void 0 ? void 0 : _b.filter((e) => e !== activeEstimate),
                    };
                }
                if (data.cancel) {
                    return {
                        action: ApprovalAction.RevokeAndPermit2Approve,
                        txRequest: data.approval,
                        gasFee: data.gasFee,
                        displayGasFee: convertGasFeeToDisplayValue(data.gasFee, activeGasStrategy),
                        cancelTxRequest: data.cancel,
                        cancelGasFee: data.cancelGasFee,
                        displayCancelGasFee: convertGasFeeToDisplayValue(data.cancelGasFee, activeGasStrategy),
                        isLoading,
                        gasEstimates,
                    };
                }
                return {
                    action: ApprovalAction.Permit2Approve,
                    txRequest: data.approval,
                    gasFee: data.gasFee,
                    displayGasFee: convertGasFeeToDisplayValue(data.gasFee, activeGasStrategy),
                    gasEstimates,
                    cancelTxRequest: null,
                    isLoading,
                };
            }
        }
        // No valid approval type found
        return {
            action: ApprovalAction.Unknown,
            txRequest: null,
            cancelTxRequest: null,
            isLoading,
        };
    }, [activeGasStrategy, approvalRequestArgs, data, error, isWrap, isLoading]);
}
//# sourceMappingURL=useTokenApprovalInfo.js.map