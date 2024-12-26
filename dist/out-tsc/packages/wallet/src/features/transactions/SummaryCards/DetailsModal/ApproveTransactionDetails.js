import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SharedEventName } from '@uniswap/analytics-events';
import { useTranslation } from 'react-i18next';
import { Flex, Text, TouchableArea, isWeb } from 'ui/src';
import { iconSizes } from 'ui/src/theme';
import { CurrencyLogo } from 'uniswap/src/components/CurrencyLogo/CurrencyLogo';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { ElementName, ModalName } from 'uniswap/src/features/telemetry/constants';
import { sendAnalyticsEvent } from 'uniswap/src/features/telemetry/send';
import { useCurrencyInfo } from 'uniswap/src/features/tokens/useCurrencyInfo';
import { getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { NumberType } from 'utilities/src/format/types';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { buildCurrencyId } from 'wallet/src/utils/currencyId';
const INFINITE_AMOUNT = 'INF';
const ZERO_AMOUNT = '0.0';
export function ApproveTransactionDetails({ transactionDetails, typeInfo, onClose, }) {
    const { t } = useTranslation();
    const { formatNumberOrString } = useLocalizationContext();
    const { navigateToTokenDetails } = useWalletNavigation();
    const currencyInfo = useCurrencyInfo(buildCurrencyId(transactionDetails.chainId, typeInfo.tokenAddress));
    const { approvalAmount } = typeInfo;
    const amount = approvalAmount === INFINITE_AMOUNT
        ? t('transaction.amount.unlimited')
        : approvalAmount && approvalAmount !== ZERO_AMOUNT
            ? formatNumberOrString({ value: approvalAmount, type: NumberType.TokenNonTx })
            : '';
    const symbol = getSymbolDisplayText(currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency.symbol);
    const onPressToken = () => {
        if (currencyInfo) {
            sendAnalyticsEvent(SharedEventName.ELEMENT_CLICKED, {
                element: ElementName.TokenItem,
                modal: ModalName.TransactionDetails,
            });
            navigateToTokenDetails(currencyInfo.currencyId);
            if (!isWeb) {
                onClose();
            }
        }
    };
    return (_jsx(TouchableArea, { onPress: onPressToken, children: _jsxs(Flex, { centered: true, gap: "$spacing8", p: "$spacing32", children: [_jsx(Text, { variant: "heading3", children: amount }), _jsxs(Flex, { centered: true, row: true, gap: "$spacing8", children: [_jsx(CurrencyLogo, { currencyInfo: currencyInfo, size: iconSizes.icon20 }), _jsx(Text, { color: "$neutral2", variant: "body2", children: symbol })] })] }) }));
}
//# sourceMappingURL=ApproveTransactionDetails.js.map