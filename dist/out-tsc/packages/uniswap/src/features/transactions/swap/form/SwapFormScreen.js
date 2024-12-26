import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable complexity */
/* eslint-disable max-lines */
import { SwapEventName } from '@uniswap/analytics-events';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, AnimatePresence, Flex, isWeb, Text, TouchableArea, useIsShortMobileDevice, useSporeColors, } from 'ui/src';
import { InfoCircleFilled } from 'ui/src/components/icons/InfoCircleFilled';
import { iconSizes, spacing } from 'ui/src/theme';
import { CurrencyInputPanel } from 'uniswap/src/components/CurrencyInputPanel/CurrencyInputPanel';
import { getAlertColor } from 'uniswap/src/components/modals/WarningModal/getAlertColor';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { MAX_FIAT_INPUT_DECIMALS } from 'uniswap/src/constants/transactions';
import { usePrefetchSwappableTokens } from 'uniswap/src/data/apiClients/tradingApi/useTradingApiSwappableTokensQuery';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { ElementName, SectionName } from 'uniswap/src/features/telemetry/constants';
import Trace from 'uniswap/src/features/telemetry/Trace';
import { getTokenWarningSeverity } from 'uniswap/src/features/tokens/safetyUtils';
import { DecimalPadCalculatedSpaceId, DecimalPadCalculateSpace, DecimalPadInput, } from 'uniswap/src/features/transactions/DecimalPadInput/DecimalPadInput';
import { useTransactionSettingsContext } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
import { useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { useSwapTxContext } from 'uniswap/src/features/transactions/swap/contexts/SwapTxContext';
import { GasAndWarningRows } from 'uniswap/src/features/transactions/swap/form/footer/GasAndWarningRows';
import { SwapArrowButton } from 'uniswap/src/features/transactions/swap/form/SwapArrowButton';
import { SwapFormButton } from 'uniswap/src/features/transactions/swap/form/SwapFormButton';
import { SwapFormHeader } from 'uniswap/src/features/transactions/swap/form/SwapFormHeader';
import { SwapFormSettings } from 'uniswap/src/features/transactions/swap/form/SwapFormSettings';
import { SwapTokenSelector } from 'uniswap/src/features/transactions/swap/form/SwapTokenSelector';
import { useExactOutputWillFail } from 'uniswap/src/features/transactions/swap/hooks/useExactOutputWillFail';
import { useFeeOnTransferAmounts } from 'uniswap/src/features/transactions/swap/hooks/useFeeOnTransferAmount';
import { useSwapNetworkNotification } from 'uniswap/src/features/transactions/swap/hooks/useSwapNetworkNotification';
import { useParsedSwapWarnings } from 'uniswap/src/features/transactions/swap/hooks/useSwapWarnings';
import { useSyncFiatAndTokenAmountUpdater } from 'uniswap/src/features/transactions/swap/hooks/useSyncFiatAndTokenAmountUpdater';
import { AcrossRoutingInfo } from 'uniswap/src/features/transactions/swap/modals/AcrossRoutingInfo';
import { MarketPriceImpactWarning } from 'uniswap/src/features/transactions/swap/modals/MarketPriceImpactWarning';
import { RoutingInfo } from 'uniswap/src/features/transactions/swap/modals/RoutingInfo';
import { MaxSlippageRow } from 'uniswap/src/features/transactions/swap/review/MaxSlippageRow';
import { SwapRateRatio } from 'uniswap/src/features/transactions/swap/review/SwapRateRatio';
import { ProtocolPreference } from 'uniswap/src/features/transactions/swap/settings/configs/ProtocolPreference';
import { Slippage } from 'uniswap/src/features/transactions/swap/settings/configs/Slippage';
import { BridgeTrade } from 'uniswap/src/features/transactions/swap/types/trade';
import { getSwapFeeUsdFromDerivedSwapInfo } from 'uniswap/src/features/transactions/swap/utils/getSwapFeeUsd';
import { maybeLogFirstSwapAction } from 'uniswap/src/features/transactions/swap/utils/maybeLogFirstSwapAction';
import { isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { isWrapAction } from 'uniswap/src/features/transactions/swap/utils/wrap';
import { TransactionDetails } from 'uniswap/src/features/transactions/TransactionDetails/TransactionDetails';
import { TransactionModalInnerContainer } from 'uniswap/src/features/transactions/TransactionModal/TransactionModal';
import { TransactionScreen, useTransactionModalContext, } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalContext';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { CurrencyField } from 'uniswap/src/types/currency';
// eslint-disable-next-line no-restricted-imports
import { formatCurrencyAmount } from 'utilities/src/format/localeBased';
import { normalizePriceImpact } from 'utilities/src/format/normalizePriceImpact';
import { truncateToMaxDecimals } from 'utilities/src/format/truncateToMaxDecimals';
import { NumberType } from 'utilities/src/format/types';
import { isExtension, isInterface, isMobileApp } from 'utilities/src/platform';
import { useTrace } from 'utilities/src/telemetry/trace/TraceContext';
const SWAP_DIRECTION_BUTTON_SIZE = {
    size: {
        regular: iconSizes.icon24,
        small: iconSizes.icon12,
    },
    innerPadding: {
        regular: spacing.spacing8 + spacing.spacing2,
        small: spacing.spacing8,
    },
    borderWidth: {
        regular: spacing.spacing4,
        small: spacing.spacing1,
    },
};
const ON_SELECTION_CHANGE_WAIT_TIME_MS = 500;
/**
 * IMPORTANT: In the Extension, this component remains mounted when the user moves to the `SwapReview` screen.
 *            Make sure you take this into consideration when adding/modifying any hooks that run on this component.
 */
export function SwapFormScreen({ hideContent, settings = [Slippage, ProtocolPreference], wrapCallback, }) {
    const { bottomSheetViewStyles } = useTransactionModalContext();
    const { selectingCurrencyField, hideSettings, derivedSwapInfo } = useSwapFormContext();
    const showTokenSelector = !hideContent && !!selectingCurrencyField;
    const isBridgeTrade = derivedSwapInfo.trade.trade instanceof BridgeTrade;
    return (_jsxs(TransactionModalInnerContainer, { fullscreen: true, bottomSheetViewStyles: bottomSheetViewStyles, children: [!isInterface && _jsx(SwapFormHeader, {}) /* Interface renders its own header with multiple tabs */, !hideSettings && _jsx(SwapFormSettings, { settings: settings, isBridgeTrade: isBridgeTrade }), !hideContent && _jsx(SwapFormContent, { wrapCallback: wrapCallback }), _jsx(SwapTokenSelector, { isModalOpen: showTokenSelector })] }));
}
function SwapFormContent({ wrapCallback }) {
    var _a, _b;
    const { t } = useTranslation();
    const colors = useSporeColors();
    const isShortMobileDevice = useIsShortMobileDevice();
    const { walletNeedsRestore, openWalletRestoreModal, screen } = useTransactionModalContext();
    const trace = useTrace();
    const { amountUpdatedTimeRef, derivedSwapInfo, exactAmountFiat, exactAmountFiatRef, exactAmountToken, exactAmountTokenRef, exactCurrencyField, focusOnCurrencyField, selectingCurrencyField, input, isFiatMode, output, hideFooter, updateSwapForm, } = useSwapFormContext();
    const { currencyAmounts, currencyBalances, currencies, currencyAmountsUSDValue, wrapType, trade } = derivedSwapInfo;
    // When using fiat input mode, this hook updates the token amount based on the latest fiat conversion rate (currently polled every 15s).
    // In the Extension, the `SwapForm` is not unmounted when the user moves to the `SwapReview` screen,
    // so we need to skip these updates because we don't want the amounts being reviewed to keep changing.
    // If we don't skip this, it also causes a cache-miss on `useTrade`, which would trigger a loading spinner because of a missing `trade`.
    useSyncFiatAndTokenAmountUpdater({ skip: screen !== TransactionScreen.Form });
    useSwapNetworkNotification({
        inputChainId: input === null || input === void 0 ? void 0 : input.chainId,
        outputChainId: output === null || output === void 0 ? void 0 : output.chainId,
    });
    usePrefetchSwappableTokens(input);
    const onRestorePress = () => {
        if (!openWalletRestoreModal) {
            throw new Error('Invalid call to `onRestorePress` with missing `openWalletRestoreModal`');
        }
        openWalletRestoreModal();
    };
    const { outputTokenHasBuyTax, exactOutputWillFail, exactOutputWouldFailIfCurrenciesSwitched } = useExactOutputWillFail({ currencies });
    useEffect(() => {
        if (exactOutputWillFail) {
            updateSwapForm({
                exactCurrencyField: CurrencyField.INPUT,
                focusOnCurrencyField: CurrencyField.INPUT,
            });
        }
        // Since we only want to run this on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { updateTransactionSettings } = useTransactionSettingsContext();
    useEffect(() => {
        if (derivedSwapInfo.chainId === UniverseChainId.MonadTestnet) {
            updateTransactionSettings({ isOnlyV2Allowed: true });
        }
        else {
            updateTransactionSettings({ isOnlyV2Allowed: false });
        }
    }, [derivedSwapInfo.chainId, updateTransactionSettings]);
    const exactFieldIsInput = exactCurrencyField === CurrencyField.INPUT;
    const exactFieldIsOutput = exactCurrencyField === CurrencyField.OUTPUT;
    const derivedCurrencyField = exactFieldIsInput ? CurrencyField.OUTPUT : CurrencyField.INPUT;
    // We want the `DecimalPad` to always control one of the 2 inputs even when no input is focused,
    // which can happen after the user hits `Max`.
    const decimalPadControlledField = focusOnCurrencyField !== null && focusOnCurrencyField !== void 0 ? focusOnCurrencyField : exactCurrencyField;
    // Quote is being fetched for first time or refetching
    const isSwapDataLoading = !isWrapAction(wrapType) && trade.isFetching;
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const decimalPadRef = useRef(null);
    const inputSelectionRef = useRef();
    const outputSelectionRef = useRef();
    const selection = useMemo(() => ({
        [CurrencyField.INPUT]: inputSelectionRef,
        [CurrencyField.OUTPUT]: outputSelectionRef,
    }), [inputSelectionRef, outputSelectionRef]);
    const resetSelection = useCallback(({ start, end, currencyField }) => {
        // Update refs first to have the latest selection state available in the DecimalPadInput
        // component and properly update disabled keys of the decimal pad.
        // We reset the native selection on the next tick because we need to wait for the native input to be updated.
        // This is needed because of the combination of state (delayed update) + ref (instant update) to improve performance.
        var _a, _b;
        const _currencyField = currencyField !== null && currencyField !== void 0 ? currencyField : decimalPadControlledField;
        const selectionRef = _currencyField === CurrencyField.INPUT ? inputSelectionRef : outputSelectionRef;
        const inputFieldRef = _currencyField === CurrencyField.INPUT ? (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.textInputRef : (_b = outputRef.current) === null || _b === void 0 ? void 0 : _b.textInputRef;
        selectionRef.current = { start, end };
        if (!isWeb && inputFieldRef) {
            setTimeout(() => {
                var _a, _b;
                (_b = (_a = inputFieldRef.current) === null || _a === void 0 ? void 0 : _a.setNativeProps) === null || _b === void 0 ? void 0 : _b.call(_a, { selection: { start, end } });
            }, 0);
        }
    }, [decimalPadControlledField]);
    const moveCursorToEnd = useCallback((args) => {
        var _a;
        const _isFiatMode = (_a = args === null || args === void 0 ? void 0 : args.overrideIsFiatMode) !== null && _a !== void 0 ? _a : isFiatMode;
        const amountRef = decimalPadControlledField === derivedCurrencyField
            ? formattedDerivedValueRef
            : _isFiatMode
                ? exactAmountFiatRef
                : exactAmountTokenRef;
        resetSelection({
            start: amountRef.current.length,
            end: amountRef.current.length,
        });
    }, [
        decimalPadControlledField,
        derivedCurrencyField,
        exactAmountFiatRef,
        exactAmountTokenRef,
        isFiatMode,
        resetSelection,
    ]);
    const maxDecimals = isFiatMode
        ? MAX_FIAT_INPUT_DECIMALS
        : (_b = (_a = currencies[decimalPadControlledField]) === null || _a === void 0 ? void 0 : _a.currency.decimals) !== null && _b !== void 0 ? _b : 0;
    const decimalPadSetValue = useCallback((value) => {
        // We disable the `DecimalPad` when the input reaches the max number of decimals,
        // but we still need to truncate in case the user moves the cursor and adds a decimal separator in the middle of the input.
        const truncatedValue = truncateToMaxDecimals({
            value,
            maxDecimals,
        });
        updateSwapForm({
            exactAmountFiat: isFiatMode ? truncatedValue : undefined,
            exactAmountToken: !isFiatMode ? truncatedValue : undefined,
            exactCurrencyField: decimalPadControlledField,
            focusOnCurrencyField: decimalPadControlledField,
        });
        maybeLogFirstSwapAction(trace);
    }, [decimalPadControlledField, isFiatMode, maxDecimals, trace, updateSwapForm]);
    const [decimalPadReady, setDecimalPadReady] = useState(false);
    const onDecimalPadReady = useCallback(() => setDecimalPadReady(true), []);
    const onDecimalPadTriggerInputShake = useCallback(() => {
        var _a, _b;
        switch (decimalPadControlledField) {
            case CurrencyField.INPUT:
                (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.triggerShakeAnimation();
                break;
            case CurrencyField.OUTPUT:
                (_b = outputRef.current) === null || _b === void 0 ? void 0 : _b.triggerShakeAnimation();
                break;
        }
    }, [decimalPadControlledField, inputRef, outputRef]);
    const onInputSelectionChange = useCallback((start, end) => {
        var _a;
        if (Date.now() - amountUpdatedTimeRef.current < ON_SELECTION_CHANGE_WAIT_TIME_MS) {
            // We only want to trigger this callback when the user is manually moving the cursor,
            // but this function is also triggered when the input value is updated,
            // which causes issues on Android.
            // We use `amountUpdatedTimeRef` to check if the input value was updated recently,
            // and if so, we assume that the user is actually typing and not manually moving the cursor.
            return;
        }
        inputSelectionRef.current = { start, end };
        (_a = decimalPadRef.current) === null || _a === void 0 ? void 0 : _a.updateDisabledKeys();
    }, [amountUpdatedTimeRef]);
    const onOutputSelectionChange = useCallback((start, end) => {
        var _a;
        if (Date.now() - amountUpdatedTimeRef.current < ON_SELECTION_CHANGE_WAIT_TIME_MS) {
            // See explanation in `onInputSelectionChange`.
            return;
        }
        outputSelectionRef.current = { start, end };
        (_a = decimalPadRef.current) === null || _a === void 0 ? void 0 : _a.updateDisabledKeys();
    }, [amountUpdatedTimeRef]);
    const onFocusInput = useCallback(() => updateSwapForm({
        focusOnCurrencyField: CurrencyField.INPUT,
    }), [updateSwapForm]);
    const onFocusOutput = useCallback(() => updateSwapForm({
        focusOnCurrencyField: CurrencyField.OUTPUT,
    }), [updateSwapForm]);
    const onShowTokenSelectorInput = useCallback(() => {
        updateSwapForm({
            selectingCurrencyField: CurrencyField.INPUT,
        });
    }, [updateSwapForm]);
    const onShowTokenSelectorOutput = useCallback(() => {
        updateSwapForm({
            selectingCurrencyField: CurrencyField.OUTPUT,
        });
    }, [updateSwapForm]);
    const onSetExactAmountInput = useCallback((amount) => {
        isFiatMode
            ? updateSwapForm({
                exactAmountFiat: amount,
                exactAmountToken: undefined,
                exactCurrencyField: CurrencyField.INPUT,
            })
            : updateSwapForm({
                exactAmountFiat: undefined,
                exactAmountToken: amount,
                exactCurrencyField: CurrencyField.INPUT,
            });
        maybeLogFirstSwapAction(trace);
    }, [isFiatMode, trace, updateSwapForm]);
    const onSetExactAmountOutput = useCallback((amount) => {
        isFiatMode
            ? updateSwapForm({
                exactAmountFiat: amount,
                exactAmountToken: undefined,
                exactCurrencyField: CurrencyField.OUTPUT,
            })
            : updateSwapForm({
                exactAmountFiat: undefined,
                exactAmountToken: amount,
                exactCurrencyField: CurrencyField.OUTPUT,
            });
        maybeLogFirstSwapAction(trace);
    }, [isFiatMode, trace, updateSwapForm]);
    const onSetMax = useCallback((amount) => {
        updateSwapForm({
            exactAmountFiat: undefined,
            exactAmountToken: amount,
            exactCurrencyField: CurrencyField.INPUT,
            focusOnCurrencyField: undefined,
        });
        // We want this update to happen on the next tick, after the input value is updated.
        setTimeout(() => {
            var _a;
            moveCursorToEnd();
            (_a = decimalPadRef.current) === null || _a === void 0 ? void 0 : _a.updateDisabledKeys();
        }, 0);
        maybeLogFirstSwapAction(trace);
    }, [moveCursorToEnd, trace, updateSwapForm]);
    // Reset selection based the new input value (token, or fiat), and toggle fiat mode
    const onToggleIsFiatMode = useCallback((currencyField) => {
        const newIsFiatMode = !isFiatMode;
        // When fiat mode is active, clicking on the toggle should keep the fiat mode on, but toggle the exact field.
        if (currencyField !== exactCurrencyField && isFiatMode) {
            updateSwapForm({
                exactCurrencyField: currencyField,
                focusOnCurrencyField: currencyField,
            });
        }
        else {
            updateSwapForm({
                isFiatMode: newIsFiatMode,
                focusOnCurrencyField: currencyField,
            });
        }
        // We want this update to happen on the next tick, after the input value is updated.
        setTimeout(() => moveCursorToEnd({ overrideIsFiatMode: newIsFiatMode }), 0);
    }, [exactCurrencyField, isFiatMode, moveCursorToEnd, updateSwapForm]);
    // If exact output will fail due to FoT tokens, the field should be disabled and un-focusable.
    // Also, for bridging, the output field should be disabled since Across does not have exact in vs. exact out.
    const isBridge = input && output && (input === null || input === void 0 ? void 0 : input.chainId) !== (output === null || output === void 0 ? void 0 : output.chainId);
    const exactOutputDisabled = isBridge || exactOutputWillFail;
    const onSwitchCurrencies = useCallback(() => {
        // If exact output would fail if currencies switch, we never want to have OUTPUT as exact field / focused field
        const newExactCurrencyField = isBridge
            ? CurrencyField.INPUT
            : exactOutputWouldFailIfCurrenciesSwitched
                ? CurrencyField.INPUT
                : exactFieldIsInput
                    ? CurrencyField.OUTPUT
                    : CurrencyField.INPUT;
        updateSwapForm({
            exactCurrencyField: newExactCurrencyField,
            focusOnCurrencyField: newExactCurrencyField,
            input: output,
            output: input,
            // Preserve the derived output amount if we force exact field to be input to keep USD value of the trade constant after switching
            ...(exactOutputWouldFailIfCurrenciesSwitched && exactFieldIsInput && !isFiatMode
                ? { exactAmountToken: formattedDerivedValueRef.current }
                : undefined),
        });
        // When we have FOT disable exact output logic, the cursor gets out of sync when switching currencies
        setTimeout(() => moveCursorToEnd(), 0);
        maybeLogFirstSwapAction(trace);
    }, [
        exactOutputWouldFailIfCurrenciesSwitched,
        exactFieldIsInput,
        updateSwapForm,
        output,
        input,
        isFiatMode,
        trace,
        moveCursorToEnd,
        isBridge,
    ]);
    // Swap input requires numeric values, not localized ones
    const formattedDerivedValue = formatCurrencyAmount({
        amount: currencyAmounts[derivedCurrencyField],
        locale: 'en-US',
        type: NumberType.SwapTradeAmount,
        placeholder: '',
    });
    const formattedDerivedValueRef = useRef(formattedDerivedValue);
    formattedDerivedValueRef.current = formattedDerivedValue;
    useEffect(() => {
        if (decimalPadControlledField === exactCurrencyField) {
            return;
        }
        // When the `formattedDerivedValue` changes while the field that is not set as the `exactCurrencyField` is focused, we want to reset the cursor selection to the end of the input.
        // This to prevent an issue that happens with the cursor selection getting out of sync when a user changes focus from one input to another while a quote request in in flight.
        moveCursorToEnd();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formattedDerivedValue]);
    const exactValue = isFiatMode ? exactAmountFiat : exactAmountToken;
    const exactValueRef = isFiatMode ? exactAmountFiatRef : exactAmountTokenRef;
    const decimalPadValueRef = decimalPadControlledField === exactCurrencyField ? exactValueRef : formattedDerivedValueRef;
    const [showWarning, setShowWarning] = useState(false);
    const timeoutRef = useRef(null);
    const showTemporaryFoTWarning = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowWarning(true);
        timeoutRef.current = setTimeout(() => {
            setShowWarning(false);
            timeoutRef.current = null;
        }, 3000);
    }, []);
    const hoverStyles = useMemo(() => ({
        input: {
            borderColor: focusOnCurrencyField === CurrencyField.INPUT ? '$surface3Hovered' : '$transparent',
            backgroundColor: focusOnCurrencyField === CurrencyField.INPUT ? '$surface1' : '$surface2Hovered',
        },
        output: {
            borderColor: focusOnCurrencyField === CurrencyField.OUTPUT ? '$surface3Hovered' : '$transparent',
            backgroundColor: focusOnCurrencyField === CurrencyField.OUTPUT ? '$surface1' : '$surface2Hovered',
        },
    }), [focusOnCurrencyField]);
    const isBlockedTokens = getTokenWarningSeverity(currencies.input) === WarningSeverity.Blocked ||
        getTokenWarningSeverity(currencies.output) === WarningSeverity.Blocked;
    // We *always* want to show the footer on native mobile because it's used to calculate the available space for the `DecimalPad`.
    const showFooter = Boolean(!hideFooter && (isMobileApp || (!isBlockedTokens && input && output)));
    return (_jsxs(Flex, { grow: true, gap: "$spacing8", justifyContent: "space-between", children: [_jsxs(Flex, { animation: "quick", enterStyle: { opacity: 0 }, exitStyle: { opacity: 0 }, gap: "$spacing2", grow: isExtension, children: [_jsx(Trace, { section: SectionName.CurrencyInputPanel, children: _jsx(Flex, { animation: "simple", borderColor: focusOnCurrencyField === CurrencyField.INPUT ? '$surface3' : '$transparent', borderRadius: "$rounded20", backgroundColor: focusOnCurrencyField === CurrencyField.INPUT ? '$surface1' : '$surface2', borderWidth: 1, overflow: "hidden", pb: currencies[CurrencyField.INPUT] ? '$spacing4' : '$none', hoverStyle: hoverStyles.input, children: _jsx(CurrencyInputPanel, { ref: inputRef, headerLabel: isInterface ? t('common.button.sell') : undefined, currencyAmount: currencyAmounts[CurrencyField.INPUT], currencyBalance: currencyBalances[CurrencyField.INPUT], currencyField: CurrencyField.INPUT, currencyInfo: currencies[CurrencyField.INPUT], 
                                // We do not want to force-focus the input when the token selector is open.
                                focus: selectingCurrencyField ? undefined : focusOnCurrencyField === CurrencyField.INPUT, isFiatMode: isFiatMode && exactFieldIsInput, isIndicativeLoading: trade.isIndicativeLoading, isLoading: !exactFieldIsInput && isSwapDataLoading, resetSelection: resetSelection, showSoftInputOnFocus: false, usdValue: currencyAmountsUSDValue[CurrencyField.INPUT], value: exactFieldIsInput ? exactValue : formattedDerivedValue, valueIsIndicative: !exactFieldIsInput && trade.indicativeTrade && !trade.trade, onPressIn: onFocusInput, onSelectionChange: onInputSelectionChange, onSetExactAmount: onSetExactAmountInput, onSetMax: onSetMax, onShowTokenSelector: onShowTokenSelectorInput, onToggleIsFiatMode: onToggleIsFiatMode }) }) }), _jsx(SwitchCurrenciesButton, { onSwitchCurrencies: onSwitchCurrencies }), _jsx(Trace, { section: SectionName.CurrencyOutputPanel, children: _jsxs(Flex, { borderRadius: "$rounded20", borderWidth: 1, borderColor: focusOnCurrencyField === CurrencyField.OUTPUT ? '$surface3' : '$transparent', backgroundColor: focusOnCurrencyField === CurrencyField.OUTPUT ? '$surface1' : '$surface2', pt: currencies[CurrencyField.OUTPUT] ? '$spacing4' : '$none', hoverStyle: hoverStyles.output, children: [_jsx(CurrencyInputPanel, { ref: outputRef, headerLabel: isInterface ? t('common.button.buy') : undefined, currencyAmount: currencyAmounts[CurrencyField.OUTPUT], currencyBalance: currencyBalances[CurrencyField.OUTPUT], currencyField: CurrencyField.OUTPUT, currencyInfo: currencies[CurrencyField.OUTPUT], disabled: exactOutputDisabled, 
                                    // We do not want to force-focus the input when the token selector is open.
                                    focus: selectingCurrencyField ? undefined : focusOnCurrencyField === CurrencyField.OUTPUT, isFiatMode: isFiatMode && exactFieldIsOutput, isLoading: !exactFieldIsOutput && isSwapDataLoading, resetSelection: resetSelection, showSoftInputOnFocus: false, usdValue: currencyAmountsUSDValue[CurrencyField.OUTPUT], value: exactFieldIsOutput ? exactValue : formattedDerivedValue, valueIsIndicative: !exactFieldIsOutput && trade.indicativeTrade && !trade.trade, onPressDisabled: isBridge ? undefined : showTemporaryFoTWarning, onPressIn: onFocusOutput, onSelectionChange: onOutputSelectionChange, onSetExactAmount: onSetExactAmountOutput, onSetMax: onSetMax, onShowTokenSelector: onShowTokenSelectorOutput, onToggleIsFiatMode: onToggleIsFiatMode }), walletNeedsRestore && (_jsx(TouchableArea, { onPress: onRestorePress, children: _jsxs(Flex, { grow: true, row: true, alignItems: "center", alignSelf: "stretch", backgroundColor: "$surface2", borderBottomLeftRadius: "$rounded16", borderBottomRightRadius: "$rounded16", borderTopColor: "$surface1", borderTopWidth: 1, gap: "$spacing8", px: "$spacing12", py: "$spacing12", children: [_jsx(InfoCircleFilled, { color: colors.DEP_accentWarning.val, size: "$icon.20" }), _jsx(Text, { color: "$DEP_accentWarning", variant: "subheading2", children: t('swap.form.warning.restore') })] }) }))] }) }), _jsx(Accordion, { collapsible: true, type: "single", overflow: "hidden", children: _jsxs(Accordion.Item, { value: "a1", className: "gas-container", children: [isWeb && (_jsx("style", { children: `
              .gas-container > div > div {
                width: 100%;
              }
            ` })), _jsxs(Flex, { children: [isWeb && (_jsx(Flex, { pt: "$spacing4", children: _jsx(SwapFormButton, { wrapCallback: wrapCallback }) })), showFooter && (_jsxs(Flex, { minHeight: "$spacing40", pt: isShortMobileDevice ? '$spacing8' : '$spacing12', children: [_jsx(AnimatePresence, { children: showWarning && (_jsx(FoTWarningRow, { currencies: currencies, outputTokenHasBuyTax: outputTokenHasBuyTax })) }), exactAmountToken && !showWarning && _jsx(GasAndWarningRows, {})] }))] }), isWeb && showFooter ? _jsx(ExpandableRows, { isBridge: isBridge }) : null] }) })] }), !isWeb && (_jsxs(_Fragment, { children: [_jsx(DecimalPadCalculateSpace, { id: DecimalPadCalculatedSpaceId.Swap, decimalPadRef: decimalPadRef }), _jsx(Flex, { "$short": { gap: '$none' }, animation: "quick", bottom: 0, gap: "$spacing8", left: 0, opacity: decimalPadReady ? 1 : 0, position: "absolute", right: 0, children: _jsx(Flex, { grow: true, justifyContent: "flex-end", children: _jsx(DecimalPadInput, { ref: decimalPadRef, maxDecimals: maxDecimals, resetSelection: resetSelection, selectionRef: selection[decimalPadControlledField], setValue: decimalPadSetValue, valueRef: decimalPadValueRef, onReady: onDecimalPadReady, onTriggerInputShakeAnimation: onDecimalPadTriggerInputShake }) }) })] }))] }));
}
const SwitchCurrenciesButton = memo(function _SwitchCurrenciesButton({ onSwitchCurrencies, }) {
    const isShortMobileDevice = useIsShortMobileDevice();
    const smallOrRegular = isShortMobileDevice ? 'small' : 'regular';
    return (_jsx(Flex, { zIndex: "$popover", children: _jsx(Flex, { alignItems: "center", height: 0, children: _jsx(Flex, { alignItems: "center", bottom: -(
                // (icon size + (top + bottom padding) + (top + bottom border)) / 2
                // to center the swap direction button vertically
                (SWAP_DIRECTION_BUTTON_SIZE.size[smallOrRegular] +
                    SWAP_DIRECTION_BUTTON_SIZE.innerPadding[smallOrRegular] * 2 +
                    SWAP_DIRECTION_BUTTON_SIZE.borderWidth[smallOrRegular] * 2)) / 2, position: "absolute", children: _jsx(Trace, { logPress: true, element: ElementName.SwitchCurrenciesButton, eventOnTrigger: SwapEventName.SWAP_TOKENS_REVERSED, children: _jsx(SwapArrowButton, { backgroundColor: "$surface2", size: SWAP_DIRECTION_BUTTON_SIZE.size[smallOrRegular], testID: TestID.SwitchCurrenciesButton, onPress: onSwitchCurrencies }) }) }) }) }));
});
function FoTWarningRow({ currencies, outputTokenHasBuyTax }) {
    var _a, _b;
    const { t } = useTranslation();
    const fotCurrencySymbol = outputTokenHasBuyTax
        ? (_a = currencies[CurrencyField.OUTPUT]) === null || _a === void 0 ? void 0 : _a.currency.symbol
        : (_b = currencies[CurrencyField.INPUT]) === null || _b === void 0 ? void 0 : _b.currency.symbol;
    return (_jsx(Flex, { animation: "quick", enterStyle: { opacity: 0 }, exitStyle: { opacity: 0 }, children: _jsx(Text, { color: "$statusCritical", textAlign: "center", variant: "body3", children: fotCurrencySymbol
                ? t('swap.form.warning.output.fotFees', {
                    fotCurrencySymbol,
                })
                : t('swap.form.warning.output.fotFees.fallback') }) }));
}
function ExpandableRows({ isBridge }) {
    const { t } = useTranslation();
    const swapTxContext = useSwapTxContext();
    const { gasFee } = swapTxContext;
    const uniswapXGasBreakdown = isUniswapX(swapTxContext) ? swapTxContext.gasFeeBreakdown : undefined;
    const { derivedSwapInfo } = useSwapFormContext();
    const { priceImpactWarning } = useParsedSwapWarnings();
    const showPriceImpactWarning = Boolean(priceImpactWarning);
    const warningColor = getAlertColor(priceImpactWarning === null || priceImpactWarning === void 0 ? void 0 : priceImpactWarning.severity);
    const { autoSlippageTolerance, customSlippageTolerance } = useTransactionSettingsContext();
    const { chainId, trade } = derivedSwapInfo;
    const swapFeeUsd = getSwapFeeUsdFromDerivedSwapInfo(derivedSwapInfo);
    const feeOnTransferProps = useFeeOnTransferAmounts(derivedSwapInfo);
    if (!trade.trade) {
        return null;
    }
    return (_jsx(Accordion.HeightAnimator, { animation: "fast", mt: "$spacing8", children: _jsx(Accordion.Content, { animation: "fast", p: "$none", exitStyle: { opacity: 0 }, children: _jsxs(TransactionDetails, { isSwap: true, showExpandedChildren: true, chainId: trade.trade.inputAmount.currency.chainId, gasFee: gasFee, swapFee: trade.trade.swapFee, swapFeeUsd: swapFeeUsd, indicative: trade.trade.indicative, feeOnTransferProps: feeOnTransferProps, showGasFeeError: false, showSeparatorToggle: false, outputCurrency: trade.trade.outputAmount.currency, transactionUSDValue: derivedSwapInfo.currencyAmountsUSDValue[CurrencyField.OUTPUT], uniswapXGasBreakdown: uniswapXGasBreakdown, RoutingInfo: isBridge ? _jsx(AcrossRoutingInfo, {}) : _jsx(RoutingInfo, { gasFee: gasFee, chainId: chainId }), RateInfo: showPriceImpactWarning && trade.trade ? (_jsxs(Flex, { row: true, alignItems: "center", justifyContent: "space-between", children: [_jsx(Text, { color: "$neutral2", variant: "body3", children: t('swap.details.rate') }), _jsx(Flex, { row: true, shrink: true, justifyContent: "flex-end", children: _jsx(SwapRateRatio, { trade: trade.trade }) })] })) : undefined, children: [trade.trade.priceImpact && !showPriceImpactWarning ? (_jsxs(Flex, { row: true, alignItems: "center", justifyContent: "space-between", children: [_jsx(MarketPriceImpactWarning, { children: _jsx(Flex, { centered: true, row: true, gap: "$spacing4", children: _jsx(Text, { color: "$neutral2", variant: "body3", children: t('swap.priceImpact') }) }) }), _jsx(Flex, { row: true, shrink: true, justifyContent: "flex-end", children: _jsxs(Text, { adjustsFontSizeToFit: true, color: warningColor.text, variant: "body3", children: [normalizePriceImpact(trade.trade.priceImpact), "%"] }) })] })) : null, !isBridge && (_jsx(MaxSlippageRow, { acceptedDerivedSwapInfo: derivedSwapInfo, autoSlippageTolerance: autoSlippageTolerance, customSlippageTolerance: customSlippageTolerance }))] }) }) }));
}
//# sourceMappingURL=SwapFormScreen.js.map