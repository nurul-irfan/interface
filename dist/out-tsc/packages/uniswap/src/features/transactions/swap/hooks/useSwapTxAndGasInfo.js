import { useMemo } from 'react';
import { Routing } from 'uniswap/src/data/tradingApi/__generated__/index';
import { useTokenApprovalInfo } from 'uniswap/src/features/transactions/swap/hooks/useTokenApprovalInfo';
import { useTransactionRequestInfo } from 'uniswap/src/features/transactions/swap/hooks/useTransactionRequestInfo';
import { ApprovalAction } from 'uniswap/src/features/transactions/swap/types/trade';
import { sumGasFees } from 'uniswap/src/features/transactions/swap/utils/gas';
import { isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { validatePermit, validateTransactionRequest } from 'uniswap/src/features/transactions/swap/utils/trade';
import { CurrencyField } from 'uniswap/src/types/currency';
import { isInterface } from 'utilities/src/platform';
export function useSwapTxAndGasInfo({ derivedSwapInfo, account, }) {
    const { chainId, wrapType, currencyAmounts, trade: { trade, indicativeTrade }, } = derivedSwapInfo;
    const tokenApprovalInfo = useTokenApprovalInfo({
        account,
        chainId,
        wrapType,
        currencyInAmount: currencyAmounts[CurrencyField.INPUT],
        currencyOutAmount: currencyAmounts[CurrencyField.OUTPUT],
        routing: trade === null || trade === void 0 ? void 0 : trade.routing,
    });
    // TODO(MOB-3425) decouple wrap tx from swap tx to simplify UniswapX code
    const swapTxInfo = useTransactionRequestInfo({
        account,
        derivedSwapInfo,
        // Dont send transaction request if invalid or missing approval data
        skip: !(tokenApprovalInfo === null || tokenApprovalInfo === void 0 ? void 0 : tokenApprovalInfo.action) || tokenApprovalInfo.action === ApprovalAction.Unknown,
        tokenApprovalInfo,
    });
    return useMemo(() => {
        const gasFeeEstimation = {
            ...swapTxInfo.gasEstimate,
            approvalEstimates: tokenApprovalInfo === null || tokenApprovalInfo === void 0 ? void 0 : tokenApprovalInfo.gasEstimates,
        };
        // Gas fees for: swap from quote response directly, wrap from Gas Fee API, approvals from checkApprovalQuery
        const gasFee = getTotalGasFee(trade, swapTxInfo.gasFeeResult, tokenApprovalInfo, account);
        const approveTxRequest = validateTransactionRequest(tokenApprovalInfo === null || tokenApprovalInfo === void 0 ? void 0 : tokenApprovalInfo.txRequest);
        const revocationTxRequest = validateTransactionRequest(tokenApprovalInfo === null || tokenApprovalInfo === void 0 ? void 0 : tokenApprovalInfo.cancelTxRequest);
        const txRequest = validateTransactionRequest(swapTxInfo.transactionRequest);
        const permit = validatePermit(swapTxInfo.permitData);
        const unsigned = Boolean(isInterface && swapTxInfo.permitData);
        if ((trade === null || trade === void 0 ? void 0 : trade.routing) === Routing.DUTCH_V2 || (trade === null || trade === void 0 ? void 0 : trade.routing) === Routing.PRIORITY) {
            const signature = swapTxInfo.permitSignature;
            const orderParams = signature ? { signature, quote: trade.quote.quote, routing: Routing.DUTCH_V2 } : undefined;
            const gasFeeBreakdown = {
                classicGasUseEstimateUSD: trade.quote.quote.classicGasUseEstimateUSD,
                approvalCost: tokenApprovalInfo === null || tokenApprovalInfo === void 0 ? void 0 : tokenApprovalInfo.displayGasFee,
                wrapCost: swapTxInfo.gasFeeResult.displayValue,
                inputTokenSymbol: trade.inputAmount.currency.wrapped.symbol,
            };
            return {
                routing: trade.routing,
                trade,
                indicativeTrade,
                wrapTxRequest: txRequest,
                approveTxRequest,
                revocationTxRequest,
                orderParams,
                gasFee,
                gasFeeEstimation,
                gasFeeBreakdown,
                permit,
            };
        }
        else if ((trade === null || trade === void 0 ? void 0 : trade.routing) === Routing.BRIDGE) {
            return {
                routing: Routing.BRIDGE,
                trade,
                indicativeTrade: undefined, // Bridge trades don't have indicative trades
                txRequest,
                approveTxRequest,
                revocationTxRequest,
                gasFee,
                gasFeeEstimation,
                swapRequestArgs: swapTxInfo.swapRequestArgs,
                permit,
                unsigned,
            };
        }
        else {
            return {
                routing: Routing.CLASSIC,
                trade: trade !== null && trade !== void 0 ? trade : undefined,
                indicativeTrade,
                txRequest,
                approveTxRequest,
                revocationTxRequest,
                gasFee,
                gasFeeEstimation,
                swapRequestArgs: swapTxInfo.swapRequestArgs,
                permit,
                unsigned,
            };
        }
    }, [
        account,
        indicativeTrade,
        swapTxInfo.gasEstimate,
        swapTxInfo.gasFeeResult,
        swapTxInfo.permitSignature,
        swapTxInfo.transactionRequest,
        swapTxInfo.permitData,
        swapTxInfo.swapRequestArgs,
        tokenApprovalInfo,
        trade,
    ]);
}
function getTotalGasFee(trade, swapGasResult, tokenApprovalInfo, account) {
    var _a;
    const isConnected = !!(account === null || account === void 0 ? void 0 : account.address);
    const blockingUnknownApprovalStatus = isConnected && tokenApprovalInfo.action === ApprovalAction.Unknown;
    const isLoading = swapGasResult.isLoading || (blockingUnknownApprovalStatus && tokenApprovalInfo.isLoading);
    const approvalError = blockingUnknownApprovalStatus && !tokenApprovalInfo.isLoading ? new Error('Approval action unknown') : null;
    let error = (_a = swapGasResult.error) !== null && _a !== void 0 ? _a : approvalError;
    // If swap requires revocation we expect simulation error so set error to null
    if ((tokenApprovalInfo === null || tokenApprovalInfo === void 0 ? void 0 : tokenApprovalInfo.action) === ApprovalAction.RevokeAndPermit2Approve) {
        error = null;
    }
    const isGaslessSwap = trade && isUniswapX(trade) && !trade.needsWrap;
    const noApprovalNeeded = !isConnected || (tokenApprovalInfo === null || tokenApprovalInfo === void 0 ? void 0 : tokenApprovalInfo.action) === ApprovalAction.None;
    const approvalGasFeeMissing = !tokenApprovalInfo;
    const swapGasFeeMissing = !swapGasResult.value && !isGaslessSwap;
    // For UniswapX orders with no wrap and no approval, show total gas fee as 0.
    if (isGaslessSwap && noApprovalNeeded) {
        return { value: '0', displayValue: '0', error, isLoading };
    }
    // If user is disconnected, we don't have approval info, so use swapGasResult only for gas estimation
    if (!isConnected && !swapGasFeeMissing) {
        return swapGasResult;
    }
    // Do not populate gas fee:
    // - If errors exist on swap or approval requests.
    // - If we don't have both the approval and transaction gas fees.
    if (approvalGasFeeMissing || swapGasFeeMissing || blockingUnknownApprovalStatus || error) {
        return { value: undefined, displayValue: undefined, error, isLoading };
    }
    const value = sumGasFees([swapGasResult.value, tokenApprovalInfo.gasFee, tokenApprovalInfo.cancelGasFee]);
    const displayValue = sumGasFees([
        swapGasResult.displayValue,
        tokenApprovalInfo.displayGasFee,
        tokenApprovalInfo.displayCancelGasFee,
    ]);
    return { value, displayValue, error, isLoading };
}
//# sourceMappingURL=useSwapTxAndGasInfo.js.map