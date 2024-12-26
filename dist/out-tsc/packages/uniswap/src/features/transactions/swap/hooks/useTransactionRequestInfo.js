import { SwapEventName } from '@uniswap/analytics-events';
import { useEffect, useMemo, useRef } from 'react';
import { useTradingApiSwapQuery } from 'uniswap/src/data/apiClients/tradingApi/useTradingApiSwapQuery';
import { getTradeSettingsDeadline } from 'uniswap/src/data/apiClients/tradingApi/utils/getTradeSettingsDeadline';
import { Routing, TransactionFailureReason, } from 'uniswap/src/data/tradingApi/__generated__/index';
import { convertGasFeeToDisplayValue, useActiveGasStrategy, useShadowGasStrategies, useTransactionGasFee, } from 'uniswap/src/features/gas/hooks';
import { areEqualGasStrategies } from 'uniswap/src/features/gas/types';
import { DynamicConfigs, SwapConfigKey } from 'uniswap/src/features/gating/configs';
import { FeatureFlags } from 'uniswap/src/features/gating/flags';
import { useDynamicConfigValue, useFeatureFlag } from 'uniswap/src/features/gating/hooks';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { useTransactionSettingsContext } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
import { getBaseTradeAnalyticsPropertiesFromSwapInfo } from 'uniswap/src/features/transactions/swap/analytics';
import { usePermit2SignatureWithData } from 'uniswap/src/features/transactions/swap/hooks/usePermit2Signature';
import { useWrapTransactionRequest } from 'uniswap/src/features/transactions/swap/hooks/useWrapTransactionRequest';
import { ApprovalAction } from 'uniswap/src/features/transactions/swap/types/trade';
import { isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { SWAP_GAS_URGENCY_OVERRIDE, getBridgeQuoteFromResponse, getClassicQuoteFromResponse, isClassicQuote, } from 'uniswap/src/features/transactions/swap/utils/tradingApi';
import { WrapType } from 'uniswap/src/features/transactions/types/wrap';
import { isDetoxBuild } from 'utilities/src/environment/constants';
import { logger } from 'utilities/src/logger/logger';
import { isInterface, isMobileApp } from 'utilities/src/platform';
import { useTrace } from 'utilities/src/telemetry/trace/TraceContext';
import { ONE_SECOND_MS } from 'utilities/src/time/time';
export const UNKNOWN_SIM_ERROR = 'Unknown gas simulation error';
// TODO(UniswapX): add fallback gas limits per chain? l2s have higher costs
export const WRAP_FALLBACK_GAS_LIMIT_IN_GWEI = 45000;
const FALLBACK_SWAP_REQUEST_POLL_INTERVAL_MS = 1000;
export function useTransactionRequestInfo({ derivedSwapInfo, tokenApprovalInfo, account, skip, }) {
    var _a, _b, _c;
    const formatter = useLocalizationContext();
    const trace = useTrace();
    const activeGasStrategy = useActiveGasStrategy(derivedSwapInfo.chainId, 'general');
    const shadowGasStrategies = useShadowGasStrategies(derivedSwapInfo.chainId, 'general');
    const v4Enabled = useFeatureFlag(FeatureFlags.V4Swap);
    const transactionSettings = useTransactionSettingsContext();
    const { trade: tradeWithStatus } = derivedSwapInfo;
    const { trade } = tradeWithStatus || { trade: undefined };
    const isBridgeTrade = (trade === null || trade === void 0 ? void 0 : trade.routing) === Routing.BRIDGE;
    const permitData = (_a = trade === null || trade === void 0 ? void 0 : trade.quote) === null || _a === void 0 ? void 0 : _a.permitData;
    // checks within functions for type of trade
    const swapQuote = (_b = getClassicQuoteFromResponse(trade === null || trade === void 0 ? void 0 : trade.quote)) !== null && _b !== void 0 ? _b : getBridgeQuoteFromResponse(trade === null || trade === void 0 ? void 0 : trade.quote);
    // Quote indicates we need to include a signed permit message
    const requiresPermit2Sig = !!permitData;
    // On interface, we do not fetch signature until after swap is clicked, as it requires user interaction.
    const signatureInfo = usePermit2SignatureWithData({ permitData, skip: skip || isInterface });
    /**
     * Simulate transactions to ensure they will not fail on-chain.
     * Do not simulate for bridge transactions or txs that need an approval
     * as those require Tenderly to simulate and it is not currently integrated into the gas servic
     */
    const shouldSimulateTxn = isBridgeTrade ? false : (tokenApprovalInfo === null || tokenApprovalInfo === void 0 ? void 0 : tokenApprovalInfo.action) === ApprovalAction.None;
    const missingSig = requiresPermit2Sig && !signatureInfo.signature;
    // Format request args
    const swapRequestArgs = useMemo(() => {
        var _a;
        // TODO: MOB(2438) https://linear.app/uniswap/issue/MOB-2438/uniswap-x-clean-old-trading-api-code
        if (!swapQuote) {
            return undefined;
        }
        // We cant get correct calldata from /swap if we dont have a valid slippage tolerance
        if (((_a = tradeWithStatus.trade) === null || _a === void 0 ? void 0 : _a.slippageTolerance) === undefined && !isBridgeTrade) {
            return undefined;
        }
        const deadline = getTradeSettingsDeadline(transactionSettings.customDeadline);
        const swapArgs = {
            quote: swapQuote,
            permitData: permitData !== null && permitData !== void 0 ? permitData : undefined,
            signature: signatureInfo.signature,
            simulateTransaction: shouldSimulateTxn,
            deadline,
            refreshGasPrice: true,
            gasStrategies: [activeGasStrategy, ...(shadowGasStrategies !== null && shadowGasStrategies !== void 0 ? shadowGasStrategies : [])],
            urgency: SWAP_GAS_URGENCY_OVERRIDE,
            v4Enabled,
        };
        return swapArgs;
    }, [
        activeGasStrategy,
        transactionSettings.customDeadline,
        isBridgeTrade,
        permitData,
        shadowGasStrategies,
        shouldSimulateTxn,
        signatureInfo.signature,
        swapQuote,
        tradeWithStatus,
        v4Enabled,
    ]);
    // Wrap transaction request
    const isUniswapXWrap = trade && isUniswapX(trade) && trade.needsWrap;
    const isWrapApplicable = derivedSwapInfo.wrapType !== WrapType.NotApplicable || isUniswapXWrap;
    const wrapTxRequest = useWrapTransactionRequest(derivedSwapInfo, account);
    const currentWrapGasFee = useTransactionGasFee(wrapTxRequest, !isWrapApplicable, undefined, WRAP_FALLBACK_GAS_LIMIT_IN_GWEI * 10e9); // Skip Gas Fee API call on transactions that don't need wrapping
    const wrapGasFeeRef = useRef(currentWrapGasFee);
    if (currentWrapGasFee.value) {
        wrapGasFeeRef.current = currentWrapGasFee;
    }
    // Wrap gas cost should not change significantly between trades, so we can use the last value if current is unavailable.
    const wrapGasFee = useMemo(() => {
        var _a, _b;
        return ({
            ...currentWrapGasFee,
            value: (_a = currentWrapGasFee.value) !== null && _a !== void 0 ? _a : wrapGasFeeRef.current.value,
            displayValue: (_b = currentWrapGasFee.displayValue) !== null && _b !== void 0 ? _b : wrapGasFeeRef.current.displayValue,
        });
    }, [currentWrapGasFee]);
    const wrapTxRequestWithGasFee = useMemo(() => { var _a; return ({ ...wrapTxRequest, ...((_a = wrapGasFee.params) !== null && _a !== void 0 ? _a : {}) }); }, [wrapTxRequest, wrapGasFee]);
    const skipTransactionRequest = !swapRequestArgs || isWrapApplicable || skip || missingSig;
    const tradingApiSwapRequestMs = useDynamicConfigValue(DynamicConfigs.Swap, SwapConfigKey.TradingApiSwapRequestMs, FALLBACK_SWAP_REQUEST_POLL_INTERVAL_MS);
    const { data, error, isLoading: isSwapLoading, } = useTradingApiSwapQuery({
        params: skipTransactionRequest ? undefined : swapRequestArgs,
        // Disable polling during e2e testing because it was preventing js thread from going idle
        refetchInterval: isDetoxBuild ? undefined : tradingApiSwapRequestMs,
        staleTime: tradingApiSwapRequestMs,
        // We add a small buffer in case connection is too slow
        immediateGcTime: tradingApiSwapRequestMs + ONE_SECOND_MS * 5,
    });
    // We use the gasFee estimate from quote, as its more accurate
    const swapGasFee = useMemo(() => ({
        value: swapQuote === null || swapQuote === void 0 ? void 0 : swapQuote.gasFee,
        displayValue: convertGasFeeToDisplayValue(swapQuote === null || swapQuote === void 0 ? void 0 : swapQuote.gasFee, activeGasStrategy),
    }), [swapQuote === null || swapQuote === void 0 ? void 0 : swapQuote.gasFee, activeGasStrategy]);
    // This is a case where simulation fails on backend, meaning txn is expected to fail
    const simulationFailureReasons = isClassicQuote(swapQuote) ? swapQuote === null || swapQuote === void 0 ? void 0 : swapQuote.txFailureReasons : undefined;
    const simulationError = (simulationFailureReasons === null || simulationFailureReasons === void 0 ? void 0 : simulationFailureReasons.includes(TransactionFailureReason.SIMULATION_ERROR)) ||
        (simulationFailureReasons === null || simulationFailureReasons === void 0 ? void 0 : simulationFailureReasons.includes(TransactionFailureReason.SLIPPAGE_TOO_LOW));
    const gasEstimateError = useMemo(() => (simulationError ? new Error(UNKNOWN_SIM_ERROR) : error), [simulationError, error]);
    const gasFeeResult = useMemo(() => ({
        value: isWrapApplicable ? wrapGasFee.value : swapGasFee.value,
        displayValue: isWrapApplicable ? wrapGasFee.displayValue : swapGasFee.displayValue,
        isLoading: isWrapApplicable ? wrapGasFee.isLoading : isSwapLoading,
        error: isWrapApplicable ? wrapGasFee.error : gasEstimateError,
    }), [isWrapApplicable, wrapGasFee, swapGasFee, isSwapLoading, gasEstimateError]);
    // Only log analytics events once per request
    const previousRequestIdRef = useRef((_c = trade === null || trade === void 0 ? void 0 : trade.quote) === null || _c === void 0 ? void 0 : _c.requestId);
    useEffect(() => {
        // Only log errors if we have a valid quote with requestId
        if (!(trade === null || trade === void 0 ? void 0 : trade.quote) || !trade.quote.requestId) {
            return;
        }
        const currentRequestId = trade.quote.requestId;
        const isNewQuote = previousRequestIdRef.current !== currentRequestId;
        // reset request id
        previousRequestIdRef.current = currentRequestId;
        if (!isNewQuote) {
            return;
        }
        if (gasEstimateError) {
            logger.warn('useTransactionRequestInfo', 'useTransactionRequestInfo', UNKNOWN_SIM_ERROR, {
                ...getBaseTradeAnalyticsPropertiesFromSwapInfo({ derivedSwapInfo, transactionSettings, formatter, trace }),
                error: gasEstimateError,
                simulationFailureReasons: isClassicQuote(swapQuote) ? swapQuote === null || swapQuote === void 0 ? void 0 : swapQuote.txFailureReasons : undefined,
                txRequest: data === null || data === void 0 ? void 0 : data.swap,
            });
            if (!isMobileApp) {
                sendAnalyticsEvent(SwapEventName.SWAP_ESTIMATE_GAS_CALL_FAILED, {
                    ...getBaseTradeAnalyticsPropertiesFromSwapInfo({ derivedSwapInfo, transactionSettings, formatter, trace }),
                    error: gasEstimateError,
                    txRequest: data === null || data === void 0 ? void 0 : data.swap,
                    simulationFailureReasons: isClassicQuote(swapQuote) ? swapQuote === null || swapQuote === void 0 ? void 0 : swapQuote.txFailureReasons : undefined,
                });
            }
        }
    }, [
        data === null || data === void 0 ? void 0 : data.swap,
        transactionSettings,
        derivedSwapInfo,
        formatter,
        gasEstimateError,
        swapRequestArgs,
        trade,
        trace,
        swapQuote,
    ]);
    const gasEstimate = useMemo(() => {
        var _a, _b;
        const activeGasEstimate = (_a = data === null || data === void 0 ? void 0 : data.gasEstimates) === null || _a === void 0 ? void 0 : _a.find((e) => areEqualGasStrategies(e.strategy, activeGasStrategy));
        const swapGasEstimate = activeGasEstimate
            ? {
                activeEstimate: activeGasEstimate,
                shadowEstimates: (_b = data === null || data === void 0 ? void 0 : data.gasEstimates) === null || _b === void 0 ? void 0 : _b.filter((e) => e !== activeGasEstimate),
            }
            : undefined;
        return {
            swapEstimates: swapGasEstimate,
            wrapEstimates: wrapGasFee.gasEstimates,
        };
    }, [data === null || data === void 0 ? void 0 : data.gasEstimates, activeGasStrategy, wrapGasFee.gasEstimates]);
    return {
        gasFeeResult,
        transactionRequest: isWrapApplicable ? wrapTxRequestWithGasFee : data === null || data === void 0 ? void 0 : data.swap,
        permitSignature: signatureInfo.signature,
        permitDataLoading: signatureInfo.isLoading,
        permitData,
        gasEstimate,
        swapRequestArgs,
        simulationFailureReasons,
    };
}
//# sourceMappingURL=useTransactionRequestInfo.js.map