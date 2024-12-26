import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, Button, Flex, SpinningLoader, Text, isWeb, useIsShortMobileDevice } from 'ui/src';
import { iconSizes } from 'ui/src/theme';
import { WarningSeverity } from 'uniswap/src/components/modals/WarningModal/types';
import { useTransactionModalContext } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalContext';
import { useSwapFormContext } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { useSwapTxContext } from 'uniswap/src/features/transactions/swap/contexts/SwapTxContext';
import { SWAP_BUTTON_TEXT_VARIANT } from 'uniswap/src/features/transactions/swap/form/SwapFormButton';
import { isClassic } from 'uniswap/src/features/transactions/swap/utils/routing';
import { WrapType } from 'uniswap/src/features/transactions/types/wrap';
import { TestID } from 'uniswap/src/test/fixtures/testIDs';
import { isInterface } from 'utilities/src/platform';
import { ONE_SECOND_MS } from 'utilities/src/time/time';
const KEEP_OPEN_MSG_DELAY = 3 * ONE_SECOND_MS;
export function SubmitSwapButton({ disabled, onSubmit, showUniswapXSubmittingUI, warning, }) {
    const { t } = useTranslation();
    const { renderBiometricsIcon } = useTransactionModalContext();
    const { isSubmitting, derivedSwapInfo } = useSwapFormContext();
    const { wrapType, trade: { trade, indicativeTrade }, } = derivedSwapInfo;
    const indicative = Boolean(!trade && indicativeTrade);
    const swapTxContext = useSwapTxContext();
    const actionText = getActionName(t, wrapType, swapTxContext);
    const isShortMobileDevice = useIsShortMobileDevice();
    const size = isShortMobileDevice ? 'small' : 'large';
    switch (true) {
        case indicative: {
            return (_jsx(Button, { fill: true, animation: "fast", backgroundColor: "$surface2", disabled: true, pressStyle: { scale: 0.98 }, icon: _jsx(SpinningLoader, { color: "$neutral2", size: isWeb ? iconSizes.icon20 : iconSizes.icon24 }), opacity: 1, size: size, children: _jsx(Text, { color: "$neutral2", flex: 1, textAlign: "center", variant: SWAP_BUTTON_TEXT_VARIANT, children: t('swap.finalizingQuote') }) }));
        }
        case showUniswapXSubmittingUI: {
            return (_jsx(Button, { fill: true, animation: "fast", backgroundColor: "$accent2", color: "$accent1", disabled: true, pressStyle: { scale: 0.98 }, hoverStyle: { opacity: 1 }, icon: _jsx(SpinningLoader, { color: "$accent1", size: isWeb ? iconSizes.icon20 : iconSizes.icon24 }), opacity: 1, size: size, children: _jsx(UniswapXSubmittingText, {}) }));
        }
        case isInterface && isSubmitting: {
            return (_jsx(Button, { fill: true, disabled: true, animation: "fast", backgroundColor: "$surface2", color: "$neutral2", pressStyle: { scale: 0.98 }, hoverStyle: { opacity: 1 }, icon: _jsx(SpinningLoader, { color: "$neutral2", size: isWeb ? iconSizes.icon20 : iconSizes.icon24 }), opacity: 1, size: size, children: _jsx(ConfirmInWalletText, {}) }));
        }
        case (warning === null || warning === void 0 ? void 0 : warning.severity) === WarningSeverity.High: {
            return (_jsx(Button, { fill: true, animation: "fast", backgroundColor: "$statusCritical", color: "$accent1", disabled: disabled, pressStyle: { scale: 0.98 }, hoverStyle: { opacity: 1, backgroundColor: '$statusCritical' }, opacity: disabled ? 0.5 : 0.9, icon: renderBiometricsIcon === null || renderBiometricsIcon === void 0 ? void 0 : renderBiometricsIcon({ color: 'white' }), size: size, testID: TestID.Swap, onPress: onSubmit, children: _jsx(Text, { color: "$white", variant: SWAP_BUTTON_TEXT_VARIANT, children: actionText }) }));
        }
        default: {
            const backgroundColor = disabled ? '$surface2' : '$accent1';
            const textColor = disabled ? '$neutral2' : '$white';
            const biometricIcon = renderBiometricsIcon === null || renderBiometricsIcon === void 0 ? void 0 : renderBiometricsIcon({ color: disabled ? '$neutral2' : '$white' });
            return (_jsx(Button, { fill: true, animation: "fast", backgroundColor: backgroundColor, disabled: disabled, pressStyle: { scale: 0.98 }, hoverStyle: { opacity: 1 }, opacity: 0.9, icon: biometricIcon, size: size, testID: TestID.Swap, onPress: onSubmit, children: _jsx(Text, { color: textColor, variant: SWAP_BUTTON_TEXT_VARIANT, children: actionText }) }));
        }
    }
}
export const getActionName = (t, wrapType, swapTxContext, warning) => {
    switch (true) {
        case wrapType === WrapType.Wrap:
            return t('swap.button.wrap');
        case wrapType === WrapType.Unwrap:
            return t('swap.button.unwrap');
        case isInterface && Boolean(swapTxContext === null || swapTxContext === void 0 ? void 0 : swapTxContext.approveTxRequest):
            return t('swap.approveAndSwap');
        case isInterface && swapTxContext && isClassic(swapTxContext) && swapTxContext.unsigned:
            return t('swap.signAndSwap');
        case (warning === null || warning === void 0 ? void 0 : warning.severity) === WarningSeverity.High:
            return t('swap.button.swapAnyways');
        default:
            return t('swap.button.swap');
    }
};
function UniswapXSubmittingText() {
    const { t } = useTranslation();
    const [showKeepOpenMessage, setShowKeepOpenMessage] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setShowKeepOpenMessage(true), KEEP_OPEN_MSG_DELAY);
        return () => clearTimeout(timeout);
    }, []);
    // Use different key to re-trigger animation when message changes
    const key = showKeepOpenMessage ? 'submitting-text-msg1' : 'submitting-text-msg2';
    return (_jsx(AnimatePresence, { children: _jsx(Flex, { animateEnterExit: "fadeInDownOutDown", animation: "quicker", children: _jsx(Text, { color: "$accent1", flex: 1, textAlign: "center", variant: SWAP_BUTTON_TEXT_VARIANT, children: showKeepOpenMessage ? t('swap.button.submitting.keep.open') : t('swap.button.submitting') }) }) }, key));
}
function ConfirmInWalletText() {
    const { t } = useTranslation();
    return (_jsx(AnimatePresence, { children: _jsx(Flex, { animateEnterExit: "fadeInDownOutDown", animation: "quicker", children: _jsx(Text, { color: "$neutral2", flex: 1, textAlign: "center", variant: SWAP_BUTTON_TEXT_VARIANT, children: t('common.confirmWallet') }) }) }));
}
//# sourceMappingURL=SubmitSwapButton.js.map