import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable complexity */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Flex, Separator, Text, TouchableArea, isWeb, useSporeColors } from 'ui/src';
import { Arrow } from 'ui/src/components/arrow/Arrow';
import { BackArrow, X } from 'ui/src/components/icons';
import { useDeviceDimensions } from 'ui/src/hooks/useDeviceDimensions';
import { iconSizes } from 'ui/src/theme';
import { CurrencyLogo } from 'uniswap/src/components/CurrencyLogo/CurrencyLogo';
import { WarningModal } from 'uniswap/src/components/modals/WarningModal/WarningModal';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { useAvatar } from 'uniswap/src/features/address/avatar';
import { useAppFiatCurrencyInfo } from 'uniswap/src/features/fiatCurrency/hooks';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { pushNotification } from 'uniswap/src/features/notifications/slice';
import { AppNotificationType } from 'uniswap/src/features/notifications/types';
import Trace from 'uniswap/src/features/telemetry/Trace';
import { ElementName, ModalName, SectionName } from 'uniswap/src/features/telemetry/constants';
import { TransactionDetails } from 'uniswap/src/features/transactions/TransactionDetails/TransactionDetails';
import { TransactionModalFooterContainer } from 'uniswap/src/features/transactions/TransactionModal/TransactionModal';
import { TransactionScreen, useTransactionModalContext, } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalContext';
import { useUSDCValue } from 'uniswap/src/features/transactions/swap/hooks/useUSDCPrice';
import { CurrencyField } from 'uniswap/src/types/currency';
import { currencyAddress } from 'uniswap/src/utils/currencyId';
import { shortenAddress } from 'utilities/src/addresses';
import { NumberType } from 'utilities/src/format/types';
import { logger } from 'utilities/src/logger/logger';
import { AccountIcon } from 'wallet/src/components/accounts/AccountIcon';
import { AddressDisplay } from 'wallet/src/components/accounts/AddressDisplay';
import { NFTTransfer } from 'wallet/src/components/nfts/NFTTransfer';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { useSendContext } from 'wallet/src/features/transactions/contexts/SendContext';
import { useSendERC20Callback, useSendNFTCallback } from 'wallet/src/features/transactions/send/hooks/useSendCallback';
import { useActiveAccountWithThrow } from 'wallet/src/features/wallet/hooks';
export function SendReviewDetails({ authTrigger, ButtonAuthIcon, onCloseModal, onSubmitSend, }) {
    var _a, _b;
    const { t } = useTranslation();
    const colors = useSporeColors();
    const dispatch = useDispatch();
    const { fullHeight } = useDeviceDimensions();
    const account = useActiveAccountWithThrow();
    const { formatCurrencyAmount, formatNumberOrString, convertFiatAmountFormatted } = useLocalizationContext();
    const { navigateToAccountActivityList } = useWalletNavigation();
    const { setScreen } = useTransactionModalContext();
    const { derivedSendInfo, warnings, txRequest, gasFee, isFiatInput, fiatOffRampMetaData } = useSendContext();
    const { txId, chainId, recipient, currencyInInfo, currencyAmounts, nftIn, exactAmountFiat } = derivedSendInfo;
    const { avatar } = useAvatar(recipient);
    const currency = useAppFiatCurrencyInfo();
    const inputCurrencyUSDValue = useUSDCValue(currencyAmounts[CurrencyField.INPUT]);
    const currencyAmountUSD = useUSDCValue(currencyAmounts[CurrencyField.INPUT]);
    const triggerTransferPendingNotification = useCallback(() => {
        if (!currencyInInfo) {
            // This should never happen. Just keeping TS happy.
            logger.error(new Error('Missing `currencyInInfo` when triggering transfer pending notification'), {
                tags: { file: 'SendReviewDetails.tsx', function: 'triggerTransferPendingNotification' },
            });
        }
        else {
            dispatch(pushNotification({
                type: AppNotificationType.TransferCurrencyPending,
                currencyInfo: currencyInInfo,
            }));
        }
    }, [currencyInInfo, dispatch]);
    const onNext = useCallback(() => {
        onCloseModal === null || onCloseModal === void 0 ? void 0 : onCloseModal();
        triggerTransferPendingNotification();
        navigateToAccountActivityList();
    }, [navigateToAccountActivityList, onCloseModal, triggerTransferPendingNotification]);
    const transferERC20Callback = useSendERC20Callback(txId, chainId, recipient, currencyInInfo ? currencyAddress(currencyInInfo.currency) : undefined, (_a = currencyAmounts[CurrencyField.INPUT]) === null || _a === void 0 ? void 0 : _a.quotient.toString(), txRequest, onNext, currencyAmountUSD, gasFee.gasEstimates);
    const transferNFTCallback = useSendNFTCallback(txId, chainId, recipient, (_b = nftIn === null || nftIn === void 0 ? void 0 : nftIn.nftContract) === null || _b === void 0 ? void 0 : _b.address, nftIn === null || nftIn === void 0 ? void 0 : nftIn.tokenId, txRequest, onNext, gasFee.gasEstimates);
    const submitTranaction = useCallback(() => {
        if (nftIn) {
            transferNFTCallback === null || transferNFTCallback === void 0 ? void 0 : transferNFTCallback();
        }
        else {
            transferERC20Callback === null || transferERC20Callback === void 0 ? void 0 : transferERC20Callback();
        }
    }, [nftIn, transferERC20Callback, transferNFTCallback]);
    const onSubmitButtonPress = useCallback(async () => {
        if (authTrigger) {
            await authTrigger({
                successCallback: submitTranaction,
                failureCallback: () => {
                    setScreen(TransactionScreen.Form);
                },
            });
        }
        else {
            submitTranaction();
        }
        await (onSubmitSend === null || onSubmitSend === void 0 ? void 0 : onSubmitSend());
    }, [authTrigger, setScreen, submitTranaction, onSubmitSend]);
    const { blockingWarning } = warnings;
    const transferWarning = warnings.warnings.find((warning) => warning.severity >= WarningSeverity.Medium);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const onShowWarning = () => {
        setShowWarningModal(true);
    };
    const onCloseWarning = () => {
        setShowWarningModal(false);
    };
    const actionButtonDisabled = !!blockingWarning || !gasFee.value || !!gasFee.error || !txRequest || account.type === AccountType.Readonly;
    const actionButtonProps = {
        disabled: actionButtonDisabled,
        label: t('send.review.summary.button.title'),
        name: ElementName.Send,
        onPress: onSubmitButtonPress,
    };
    const formattedCurrencyAmount = formatCurrencyAmount({
        value: currencyAmounts[CurrencyField.INPUT],
        type: NumberType.TokenTx,
    });
    const formattedAmountIn = isFiatInput
        ? formatNumberOrString({
            value: exactAmountFiat,
            type: NumberType.FiatTokenQuantity,
            currencyCode: currency.code,
        })
        : formattedCurrencyAmount;
    const formattedInputFiatValue = convertFiatAmountFormatted(inputCurrencyUSDValue === null || inputCurrencyUSDValue === void 0 ? void 0 : inputCurrencyUSDValue.toExact(), NumberType.FiatTokenQuantity);
    const { navigateToFiatOnRamp } = useWalletNavigation();
    const onPrev = () => {
        if (fiatOffRampMetaData) {
            onCloseModal === null || onCloseModal === void 0 ? void 0 : onCloseModal();
            navigateToFiatOnRamp({
                prefilledCurrency: {
                    currencyInfo: currencyInInfo,
                    moonpayCurrencyCode: fiatOffRampMetaData.moonpayCurrencyCode,
                    meldCurrencyCode: fiatOffRampMetaData.meldCurrencyCode,
                },
            });
        }
        setScreen(TransactionScreen.Form);
    };
    if (!recipient) {
        throw new Error('Invalid render of SendDetails with no recipient');
    }
    return (_jsxs(Trace, { logImpression: true, section: SectionName.SendReview, children: [(transferWarning === null || transferWarning === void 0 ? void 0 : transferWarning.title) && (_jsx(WarningModal, { caption: transferWarning.message, rejectText: blockingWarning ? undefined : t('send.warning.modal.button.cta.cancel'), acknowledgeText: blockingWarning ? t('send.warning.modal.button.cta.blocking') : t('send.warning.modal.button.cta.confirm'), isOpen: showWarningModal, modalName: ModalName.SendWarning, severity: transferWarning.severity, title: transferWarning.title, onReject: onCloseWarning, onClose: onCloseWarning, onAcknowledge: onCloseWarning })), _jsxs(Flex, { gap: "$spacing16", px: "$spacing8", children: [_jsxs(Flex, { centered: true, row: true, justifyContent: "space-between", children: [_jsx(Text, { color: "$neutral2", variant: "body2", children: t('send.review.modal.title') }), isWeb && (_jsx(TouchableArea, { onPress: onPrev, children: _jsx(X, { color: "$neutral2", size: "$icon.20" }) }))] }), currencyInInfo ? (_jsxs(Flex, { row: true, alignItems: "center", children: [_jsxs(Flex, { fill: true, children: [_jsx(Flex, { centered: true, row: true, justifyContent: "space-between", children: _jsxs(Text, { color: "$neutral1", variant: "heading3", children: [formattedAmountIn, " ", !isFiatInput ? currencyInInfo.currency.symbol : ''] }) }), isFiatInput ? (_jsxs(Text, { color: "$neutral2", variant: "body3", children: [formattedCurrencyAmount, " ", currencyInInfo.currency.symbol] })) : (inputCurrencyUSDValue && (_jsx(Text, { color: "$neutral2", variant: "body3", children: formattedInputFiatValue })))] }), _jsx(CurrencyLogo, { currencyInfo: currencyInInfo, size: iconSizes.icon40 })] })) : (nftIn && (_jsx(Flex, { mt: "$spacing60", children: _jsx(NFTTransfer, { asset: nftIn, nftSize: fullHeight / 5 }) }))), _jsx(Flex, { alignItems: "flex-start", children: _jsx(Arrow, { color: colors.neutral3.val, direction: "s" }) }), recipient && (_jsxs(Flex, { centered: true, row: true, justifyContent: "space-between", children: [fiatOffRampMetaData ? (_jsxs(Flex, { children: [_jsx(Text, { color: "$neutral1", variant: "heading3", children: fiatOffRampMetaData.name }), _jsx(Text, { color: "$neutral2", variant: "body4", children: shortenAddress(recipient) })] })) : (_jsx(AddressDisplay, { address: recipient, captionVariant: "body3", showAccountIcon: false, textAlign: "flex-start", variant: "heading3" })), _jsx(AccountIcon, { address: recipient, avatarUri: (fiatOffRampMetaData === null || fiatOffRampMetaData === void 0 ? void 0 : fiatOffRampMetaData.logoUrl) || avatar, size: iconSizes.icon40 })] }))] }), _jsx(Separator, { backgroundColor: "$surface3", mx: "$spacing8", my: "$spacing16" }), _jsx(TransactionDetails, { AccountDetails: _jsxs(Flex, { row: true, alignItems: "center", justifyContent: "space-between", children: [_jsx(Text, { color: "$neutral2", variant: "body3", children: t('common.wallet.label') }), _jsx(AddressDisplay, { disableForcedWidth: true, address: account.address, hideAddressInSubtitle: true, horizontalGap: "$spacing4", size: iconSizes.icon16, variant: "body3" })] }), chainId: chainId, gasFee: gasFee, showWarning: Boolean(transferWarning), warning: transferWarning, onShowWarning: onShowWarning }), _jsx(TransactionModalFooterContainer, { children: _jsxs(Flex, { row: true, gap: "$spacing8", children: [!isWeb && _jsx(Button, { icon: _jsx(BackArrow, {}), size: "large", theme: "tertiary", onPress: onPrev }), _jsx(Button, { fill: true, disabled: actionButtonProps.disabled, icon: ButtonAuthIcon, size: "medium", testID: actionButtonProps.name, onPress: actionButtonProps.onPress, children: actionButtonProps.label })] }) })] }));
}
//# sourceMappingURL=SendReviewDetails.js.map