import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { Flex, Text, TouchableArea } from 'ui/src';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { AddressDisplay } from 'wallet/src/components/accounts/AddressDisplay';
import { useAllTransactionsBetweenAddresses } from 'wallet/src/features/transactions/hooks/useAllTransactionsBetweenAddresses';
import { useActiveAccountAddressWithThrow } from 'wallet/src/features/wallet/hooks';
/**
 * Panel displaying currently selected recipient metadata as well as a toggle
 * to open the recipient selector modal.
 */
export function RecipientInputPanel({ recipientAddress, onShowRecipientSelector, }) {
    return (_jsx(TouchableArea, { px: "$spacing32", py: "$spacing16", testID: TestID.SelectRecipient, onPress: onShowRecipientSelector, children: _jsxs(Flex, { centered: true, gap: "$spacing4", py: "$spacing12", children: [_jsx(AddressDisplay, { hideAddressInSubtitle: true, address: recipientAddress, variant: "heading3" }), recipientAddress && _jsx(RecipientPrevTransfers, { recipient: recipientAddress })] }) }));
}
export function RecipientPrevTransfers({ recipient }) {
    var _a;
    const { t } = useTranslation();
    const activeAddress = useActiveAccountAddressWithThrow();
    const previousTransactions = useAllTransactionsBetweenAddresses(activeAddress, recipient);
    const prevTxnsCount = (_a = previousTransactions === null || previousTransactions === void 0 ? void 0 : previousTransactions.length) !== null && _a !== void 0 ? _a : 0;
    return (_jsx(Text, { color: "$neutral2", textAlign: "center", variant: "subheading2", children: t('send.recipient.previous', { count: prevTxnsCount }) }));
}
//# sourceMappingURL=RecipientInputPanel.js.map