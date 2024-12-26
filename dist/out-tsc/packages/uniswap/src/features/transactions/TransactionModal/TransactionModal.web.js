import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FadeIn } from 'react-native-reanimated';
import { Flex } from 'ui/src';
import { AnimatedFlex } from 'ui/src/components/layout/AnimatedFlex';
import { TransactionModalContextProvider, TransactionScreen, } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalContext';
import { TransactionModalUpdateLogger } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalUpdateLogger';
export function TransactionModal({ children, onClose, onCurrencyChange, openWalletRestoreModal, walletNeedsRestore, swapRedirectCallback, modalName, }) {
    const [screen, setScreen] = useState(TransactionScreen.Form);
    return (_jsx(Flex, { fill: true, justifyContent: "flex-end", children: _jsxs(TransactionModalContextProvider, { bottomSheetViewStyles: {}, openWalletRestoreModal: openWalletRestoreModal, walletNeedsRestore: walletNeedsRestore, screen: screen, setScreen: setScreen, swapRedirectCallback: swapRedirectCallback, onClose: onClose, onCurrencyChange: onCurrencyChange, children: [children, _jsx(TransactionModalUpdateLogger, { modalName: modalName })] }) }));
}
export function TransactionModalInnerContainer({ fullscreen, children, }) {
    return _jsx(Flex, { fill: fullscreen, children: children });
}
export function TransactionModalFooterContainer({ children }) {
    return (_jsx(AnimatedFlex, { entering: FadeIn, position: "relative", pt: "$spacing24", children: children }));
}
//# sourceMappingURL=TransactionModal.web.js.map