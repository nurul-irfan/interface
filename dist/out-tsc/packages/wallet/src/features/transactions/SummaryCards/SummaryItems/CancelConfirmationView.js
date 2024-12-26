import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, FlexLoader, Separator, Skeleton, Text, isWeb } from 'ui/src';
import { SlashCircle } from 'ui/src/components/icons';
import { fonts } from 'ui/src/theme';
import { useUSDValueOfGasFee } from 'uniswap/src/features/gas/hooks';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { TransactionStatus } from 'uniswap/src/features/transactions/types/transactionDetails';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { NumberType } from 'utilities/src/format/types';
import { useCancelationGasFeeInfo } from 'wallet/src/features/gas/hooks';
import { useSelectTransaction } from 'wallet/src/features/transactions/hooks';
export function CancelConfirmationView({ authTrigger, onBack, onCancel, transactionDetails, }) {
    const { t } = useTranslation();
    const { convertFiatAmountFormatted } = useLocalizationContext();
    const cancelationGasFeeInfo = useCancelationGasFeeInfo(transactionDetails);
    const { value: gasFeeUSD } = useUSDValueOfGasFee(transactionDetails.chainId, cancelationGasFeeInfo === null || cancelationGasFeeInfo === void 0 ? void 0 : cancelationGasFeeInfo.cancelationGasFeeDisplayValue);
    const gasFee = convertFiatAmountFormatted(gasFeeUSD, NumberType.FiatGasPrice);
    const onCancelConfirm = useCallback(() => {
        if (!(cancelationGasFeeInfo === null || cancelationGasFeeInfo === void 0 ? void 0 : cancelationGasFeeInfo.cancelRequest)) {
            return;
        }
        onCancel(cancelationGasFeeInfo.cancelRequest);
    }, [cancelationGasFeeInfo, onCancel]);
    const onPressCancel = useCallback(async () => {
        if (authTrigger) {
            await authTrigger({ successCallback: onCancelConfirm, failureCallback: () => { } });
        }
        else {
            onCancelConfirm();
        }
    }, [authTrigger, onCancelConfirm]);
    // We don't currently support cancelling orders made from another device.
    const isRemoteOrder = useSelectTransaction(transactionDetails.from, transactionDetails.chainId, transactionDetails.id) === undefined &&
        isUniswapX(transactionDetails);
    const disableConfirmationButton = !(cancelationGasFeeInfo === null || cancelationGasFeeInfo === void 0 ? void 0 : cancelationGasFeeInfo.cancelRequest) || transactionDetails.status !== TransactionStatus.Pending || isRemoteOrder;
    return (_jsxs(Flex, { centered: true, grow: true, backgroundColor: "$surface1", borderRadius: "$rounded20", gap: "$spacing16", mt: isWeb ? '$spacing16' : '$none', px: isWeb ? '$none' : '$spacing24', py: isWeb ? '$none' : '$spacing12', children: [_jsx(Flex, { centered: true, backgroundColor: "$surface3", borderRadius: "$rounded12", p: "$spacing12", children: _jsx(SlashCircle, { color: "$neutral2", size: "$icon.20" }) }), _jsxs(Flex, { centered: true, gap: "$spacing8", children: [_jsx(Text, { variant: "buttonLabel2", children: t('transaction.action.cancel.title') }), _jsx(Text, { color: "$neutral2", textAlign: "center", variant: "body3", children: t('transaction.action.cancel.description') })] }), _jsx(Flex, { width: "100%", children: _jsx(Separator, {}) }), _jsxs(Flex, { row: true, justifyContent: "space-between", pb: "$spacing8", px: "$spacing12", width: "100%", children: [_jsx(Text, { color: "$neutral2", variant: "body3", children: t('transaction.networkCost.label') }), !gasFeeUSD ? (_jsx(Skeleton, { children: _jsx(FlexLoader, { borderRadius: "$rounded4", height: fonts.body3.lineHeight, opacity: 0.4, width: "$spacing48" }) })) : (_jsx(Text, { variant: "body3", children: gasFee }))] }), _jsxs(Flex, { row: true, gap: "$spacing8", width: "100%", children: [_jsx(Button, { fill: true, size: "small", theme: "tertiary", width: "50%", onPress: onBack, children: t('common.button.back') }), _jsx(Button, { fill: true, disabled: disableConfirmationButton, size: "small", testID: TestID.Cancel, theme: "detrimental", width: "50%", onPress: onPressCancel, children: t('common.button.confirm') })] })] }));
}
//# sourceMappingURL=CancelConfirmationView.js.map