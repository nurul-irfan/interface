import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WarningAction } from 'uniswap/src/components/modals/WarningModal/types';
import { getNativeAddress } from 'uniswap/src/constants/addresses';
import { AssetType } from 'uniswap/src/entities/assets';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { useTransactionGasFee, useTransactionGasWarning } from 'uniswap/src/features/gas/hooks';
import { useFormattedWarnings } from 'uniswap/src/features/transactions/hooks/useParsedTransactionWarnings';
import { CurrencyField } from 'uniswap/src/types/currency';
import { currencyAddress } from 'uniswap/src/utils/currencyId';
import { useDerivedSendInfo } from 'wallet/src/features/transactions/send/hooks/useDerivedSendInfo';
import { useSendTransactionRequest } from 'wallet/src/features/transactions/send/hooks/useSendTransactionRequest';
import { useSendWarnings } from 'wallet/src/features/transactions/send/hooks/useSendWarnings';
import { useActiveAccountWithThrow } from 'wallet/src/features/wallet/hooks';
export const getDefaultSendState = (defaultChainId) => ({
    [CurrencyField.INPUT]: {
        address: getNativeAddress(defaultChainId),
        chainId: defaultChainId,
        type: AssetType.Currency,
    },
    [CurrencyField.OUTPUT]: null,
    exactCurrencyField: CurrencyField.INPUT,
    focusOnCurrencyField: CurrencyField.INPUT,
    exactAmountToken: '',
    exactAmountFiat: '',
    isFiatInput: false,
    selectingCurrencyField: undefined,
    showRecipientSelector: true,
    customSlippageTolerance: undefined,
});
export const SendContext = createContext(undefined);
export function SendContextProvider({ prefilledTransactionState, children, }) {
    const { t } = useTranslation();
    const account = useActiveAccountWithThrow();
    const { defaultChainId } = useEnabledChains();
    const defaultSendState = getDefaultSendState(defaultChainId);
    // state
    const [sendForm, setSendForm] = useState(prefilledTransactionState || defaultSendState);
    const updateSendForm = useCallback((newState) => {
        setSendForm((prevState) => ({ ...prevState, ...newState }));
    }, [setSendForm]);
    // derived info based on transfer state
    const derivedSendInfo = useDerivedSendInfo(sendForm);
    const warnings = useSendWarnings(t, derivedSendInfo);
    const txRequest = useSendTransactionRequest(derivedSendInfo);
    const gasFee = useTransactionGasFee(txRequest, warnings.some((warning) => warning.action === WarningAction.DisableReview));
    const txRequestWithGasSettings = useMemo(() => ({ ...txRequest, ...gasFee.params }), [gasFee.params, txRequest]);
    const gasWarning = useTransactionGasWarning({
        account,
        derivedInfo: derivedSendInfo,
        gasFee: gasFee.value,
    });
    const allSendWarnings = useMemo(() => {
        return !gasWarning ? warnings : [...warnings, gasWarning];
    }, [warnings, gasWarning]);
    const parsedSendWarnings = useFormattedWarnings(allSendWarnings);
    // helper function for currency selection
    const onSelectCurrency = useCallback((currency, _currencyField, _isBridgePair) => {
        updateSendForm({
            [CurrencyField.INPUT]: {
                address: currencyAddress(currency),
                chainId: currency.chainId,
                type: AssetType.Currency,
            },
            selectingCurrencyField: undefined,
        });
    }, [updateSendForm]);
    const state = useMemo(() => {
        return {
            derivedSendInfo,
            gasFee,
            warnings: parsedSendWarnings,
            txRequest: txRequestWithGasSettings,
            onSelectCurrency,
            updateSendForm,
            txId: sendForm.txId,
            [CurrencyField.INPUT]: sendForm.input,
            [CurrencyField.OUTPUT]: sendForm.output,
            exactAmountToken: sendForm.exactAmountToken,
            exactAmountFiat: sendForm.exactAmountFiat,
            exactCurrencyField: sendForm.exactCurrencyField,
            focusOnCurrencyField: sendForm.focusOnCurrencyField,
            recipient: sendForm.recipient,
            isFiatInput: sendForm.isFiatInput,
            selectingCurrencyField: sendForm.selectingCurrencyField,
            showRecipientSelector: sendForm.showRecipientSelector,
            selectedProtocols: sendForm.selectedProtocols,
            customSlippageTolerance: sendForm.customSlippageTolerance,
            fiatOffRampMetaData: sendForm.fiatOffRampMetaData,
        };
    }, [
        derivedSendInfo,
        gasFee,
        parsedSendWarnings,
        txRequestWithGasSettings,
        onSelectCurrency,
        updateSendForm,
        sendForm.txId,
        sendForm.input,
        sendForm.output,
        sendForm.exactAmountToken,
        sendForm.exactAmountFiat,
        sendForm.exactCurrencyField,
        sendForm.focusOnCurrencyField,
        sendForm.recipient,
        sendForm.isFiatInput,
        sendForm.selectingCurrencyField,
        sendForm.showRecipientSelector,
        sendForm.customSlippageTolerance,
        sendForm.selectedProtocols,
        sendForm.fiatOffRampMetaData,
    ]);
    return _jsx(SendContext.Provider, { value: state, children: children });
}
export const useSendContext = () => {
    const sendContext = useContext(SendContext);
    if (sendContext === undefined) {
        throw new Error('`useSendContext` must be used inside of `SendContextProvider`');
    }
    return sendContext;
};
//# sourceMappingURL=SendContext.js.map