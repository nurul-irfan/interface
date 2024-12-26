import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSporeColors } from 'ui/src';
import { Eye } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { WarningModal } from 'uniswap/src/components/modals/WarningModal/WarningModal';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { ModalName } from 'uniswap/src/features/telemetry/constants';
import { isSameAddress } from 'utilities/src/addresses';
import { NewAddressWarningModal } from 'wallet/src/components/RecipientSearch/modals/NewAddressWarningModal';
import { SpeedBumps } from 'wallet/src/components/modals/SpeedBumps';
import { useIsErc20Contract } from 'wallet/src/features/contracts/hooks';
import { useAllTransactionsBetweenAddresses } from 'wallet/src/features/transactions/hooks/useAllTransactionsBetweenAddresses';
import { useIsSmartContractAddress } from 'wallet/src/features/transactions/send/hooks/useIsSmartContractAddress';
import { useActiveAccountAddressWithThrow, useSignerAccounts, useViewOnlyAccounts, } from 'wallet/src/features/wallet/hooks';
export function RecipientSelectSpeedBumps({ recipientAddress, checkSpeedBumps, chainId, ...rest }) {
    const { t } = useTranslation();
    const colors = useSporeColors();
    const { defaultChainId } = useEnabledChains();
    const activeAddress = useActiveAccountAddressWithThrow();
    const viewOnlyAccounts = useViewOnlyAccounts();
    const currentSignerAccounts = useSignerAccounts();
    const previousTransactions = useAllTransactionsBetweenAddresses(activeAddress, recipientAddress);
    const { isSmartContractAddress, loading: smartContractLoading } = useIsSmartContractAddress(recipientAddress, chainId !== null && chainId !== void 0 ? chainId : defaultChainId);
    const { isERC20ContractAddress, loading: erc20ContractLoading } = useIsErc20Contract(recipientAddress, chainId !== null && chainId !== void 0 ? chainId : defaultChainId);
    const renderViewOnlyWarning = useCallback((props) => (_jsx(WarningModal, { isOpen: true, backgroundIconColor: colors.surface2.val, caption: t('send.recipient.warning.viewOnly.message'), rejectText: t('common.button.goBack'), acknowledgeText: t('common.button.understand'), icon: _jsx(Eye, { color: "$neutral2", size: iconSizes.icon24 }), modalName: ModalName.RecipientSelectViewOnlyWarning, severity: WarningSeverity.High, title: t('send.recipient.warning.viewOnly.title'), ...props })), [t, colors.surface2.val]);
    const renderNewAddressWarning = useCallback((props) => (recipientAddress ? _jsx(NewAddressWarningModal, { address: recipientAddress, ...props }) : null), [recipientAddress]);
    const renderSelfSendWarning = useCallback((props) => (_jsx(WarningModal, { isOpen: true, caption: t('send.warning.self.message'), rejectText: t('common.button.cancel'), acknowledgeText: t('common.button.understand'), modalName: ModalName.RecipientSelectSelfSendWarning, severity: WarningSeverity.High, title: t('send.warning.self.title'), ...props })), [t]);
    const renderErc20Warning = useCallback((props) => (_jsx(WarningModal, { isOpen: true, caption: t('send.warning.erc20.message'), rejectText: t('common.button.cancel'), acknowledgeText: t('common.button.understand'), modalName: ModalName.RecipientSelectErc20Warning, severity: WarningSeverity.High, title: t('send.warning.erc20.title'), ...props })), [t]);
    const renderSmartContractWarning = useCallback((props) => (_jsx(WarningModal, { isOpen: true, caption: t('send.warning.smartContract.message'), rejectText: t('common.button.cancel'), acknowledgeText: t('common.button.understand'), modalName: ModalName.RecipientSelectSmartContractWarning, severity: WarningSeverity.None, title: t('send.warning.smartContract.title'), ...props })), [t]);
    const isActiveViewOnly = viewOnlyAccounts.some((a) => a.address === activeAddress);
    const isNewRecipient = !previousTransactions || previousTransactions.length === 0;
    const isSignerRecipient = useMemo(() => currentSignerAccounts.some((a) => a.address === recipientAddress), [currentSignerAccounts, recipientAddress]);
    const isViewOnlyRecipient = useMemo(() => viewOnlyAccounts.some((a) => a.address === recipientAddress), [viewOnlyAccounts, recipientAddress]);
    const shouldWarnViewOnly = isViewOnlyRecipient;
    const shouldWarnERC20 = isERC20ContractAddress;
    const shouldWarnSmartContract = isNewRecipient && !isSignerRecipient && isSmartContractAddress && !shouldWarnERC20;
    const shouldWarnNewAddress = isNewRecipient && !isSignerRecipient && !shouldWarnSmartContract && !shouldWarnERC20;
    const shouldWarnSelfSend = isSameAddress(activeAddress, recipientAddress);
    const modalRenderers = useMemo(() => [
        { renderModal: renderViewOnlyWarning, condition: shouldWarnViewOnly },
        { renderModal: renderNewAddressWarning, condition: shouldWarnNewAddress },
        { renderModal: renderSelfSendWarning, condition: shouldWarnSelfSend },
        { renderModal: renderErc20Warning, condition: shouldWarnERC20 },
        { renderModal: renderSmartContractWarning, condition: shouldWarnSmartContract },
    ], [
        renderViewOnlyWarning,
        renderNewAddressWarning,
        renderSelfSendWarning,
        renderErc20Warning,
        renderSmartContractWarning,
        shouldWarnViewOnly,
        shouldWarnNewAddress,
        shouldWarnSelfSend,
        shouldWarnERC20,
        shouldWarnSmartContract,
    ]);
    return (_jsx(SpeedBumps
    // Wait until the address is loaded before checking speed bumps
    , { 
        // Wait until the address is loaded before checking speed bumps
        checkSpeedBumps: checkSpeedBumps && !smartContractLoading && !erc20ContractLoading, 
        // Don't check speed bumps if the current account is view-only
        // (the user won't be able to complete the send anyway)
        modalRenderers: isActiveViewOnly ? [] : modalRenderers, ...rest }));
}
//# sourceMappingURL=RecipientSelectSpeedBumps.js.map