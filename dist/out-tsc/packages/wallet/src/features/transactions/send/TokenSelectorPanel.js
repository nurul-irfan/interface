import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Flex, Text, TouchableArea } from 'ui/src';
import { RotatableChevron } from 'ui/src/components/icons';
import { iconSizes } from 'ui/src/theme';
import { MaxAmountButton } from 'uniswap/src/components/CurrencyInputPanel/MaxAmountButton';
import { CurrencyLogo } from 'uniswap/src/components/CurrencyLogo/CurrencyLogo';
import { TokenSelectorModal, TokenSelectorVariation } from 'uniswap/src/components/TokenSelector/TokenSelector';
import { TokenSelectorFlow } from 'uniswap/src/components/TokenSelector/types';
import { useLocalizationContext } from 'uniswap/src/features/language/LocalizationContext';
import { TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import { CurrencyField } from 'uniswap/src/types/currency';
import { NumberType } from 'utilities/src/format/types';
import { useActiveAccountAddressWithThrow } from 'wallet/src/features/wallet/hooks';
export function TokenSelectorPanel({ currencyInfo, currencyBalance, currencyAmount, onSetMax, onSelectCurrency, onHideTokenSelector, onShowTokenSelector, showTokenSelector, }) {
    const { t } = useTranslation();
    const activeAccountAddress = useActiveAccountAddressWithThrow();
    const { formatCurrencyAmount } = useLocalizationContext();
    const showMaxButton = currencyBalance && !currencyBalance.equalTo(0);
    const formattedCurrencyBalance = formatCurrencyAmount({
        value: currencyBalance,
        type: NumberType.TokenNonTx,
    });
    return (_jsxs(_Fragment, { children: [_jsx(Flex, { fill: true, overflow: "hidden", children: _jsx(TokenSelectorModal, { activeAccountAddress: activeAccountAddress, currencyField: CurrencyField.INPUT, flow: TokenSelectorFlow.Send, isModalOpen: showTokenSelector, isSurfaceReady: true, variation: TokenSelectorVariation.BalancesOnly, onClose: onHideTokenSelector, onSelectCurrency: onSelectCurrency }) }), _jsx(TouchableArea, { onPress: onShowTokenSelector, children: _jsxs(Flex, { centered: true, row: true, justifyContent: "space-between", p: "$spacing16", children: [_jsxs(Flex, { centered: true, row: true, gap: "$spacing12", children: [_jsx(CurrencyLogo, { currencyInfo: currencyInfo, size: iconSizes.icon36 }), _jsxs(Flex, { gap: "$none", children: [_jsx(Text, { color: "$neutral1", variant: "body2", children: currencyInfo === null || currencyInfo === void 0 ? void 0 : currencyInfo.currency.name }), currencyInfo && (_jsx(Text, { color: "$neutral2", variant: "body3", children: t('send.input.token.balance.title', {
                                                balance: formattedCurrencyBalance,
                                                symbol: currencyInfo.currency.symbol,
                                            }) }))] })] }), _jsxs(Flex, { row: true, gap: "$spacing12", children: [showMaxButton && onSetMax && (_jsx(MaxAmountButton, { currencyAmount: currencyAmount, currencyBalance: currencyBalance, currencyField: CurrencyField.INPUT, transactionType: TransactionType.Send, onSetMax: onSetMax })), _jsx(RotatableChevron, { color: "$neutral3", direction: "down", height: iconSizes.icon20, width: iconSizes.icon20 })] })] }) })] }));
}
//# sourceMappingURL=TokenSelectorPanel.js.map