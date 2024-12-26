import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { isWeb } from 'ui/src';
import { Modal } from 'uniswap/src/components/modals/Modal';
import Trace from 'uniswap/src/features/telemetry/Trace';
import { ModalName, SectionName } from 'uniswap/src/features/telemetry/constants';
import { TransactionModal, TransactionModalFooterContainer, } from 'uniswap/src/features/transactions/TransactionModal/TransactionModal';
import { TransactionScreen, useTransactionModalContext, } from 'uniswap/src/features/transactions/TransactionModal/TransactionModalContext';
import { TransactionSettingsContext, useTransactionSettingsContext, } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
import { SwapFormContext, useSwapFormContext, } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { SwapTxContextProviderTradingApi } from 'uniswap/src/features/transactions/swap/contexts/SwapTxContext';
import { SwapFormButton } from 'uniswap/src/features/transactions/swap/form/SwapFormButton';
import { SwapFormScreen } from 'uniswap/src/features/transactions/swap/form/SwapFormScreen';
import { SwapReviewScreen } from 'uniswap/src/features/transactions/swap/review/SwapReviewScreen';
import { isInterface } from 'utilities/src/platform';
export function SwapFlow({ settings, swapCallback, wrapCallback, onSubmitSwap, ...transactionModalProps }) {
    const swapFormContext = useSwapFormContext();
    const transactionSettingsContext = useTransactionSettingsContext();
    return (_jsx(TransactionModal, { modalName: ModalName.Swap, ...transactionModalProps, children: _jsx(TransactionSettingsContext.Provider, { value: transactionSettingsContext, children: _jsx(SwapFormContext.Provider, { value: swapFormContext, children: _jsx(SwapTxContextProviderTradingApi, { children: _jsx(CurrentScreen, { settings: settings, swapCallback: swapCallback, wrapCallback: wrapCallback, onSubmitSwap: onSubmitSwap }) }) }) }) }));
}
function CurrentScreen({ settings, swapCallback, wrapCallback, onSubmitSwap, }) {
    const { screen, setScreen } = useTransactionModalContext();
    if (isWeb) {
        return (_jsxs(_Fragment, { children: [_jsx(Trace, { logImpression: true, section: SectionName.SwapForm, children: _jsx(SwapFormScreen, { settings: settings, hideContent: false, wrapCallback: wrapCallback }) }), _jsx(Modal, { height: "auto", alignment: isInterface ? 'center' : 'top', isModalOpen: screen === TransactionScreen.Review, name: ModalName.SwapReview, padding: "$spacing12", onClose: () => setScreen(TransactionScreen.Form), children: _jsx(Trace, { logImpression: true, section: SectionName.SwapReview, children: _jsx(SwapReviewScreen, { hideContent: false, swapCallback: swapCallback, wrapCallback: wrapCallback }) }) })] }));
    }
    switch (screen) {
        case TransactionScreen.Form:
            return (_jsxs(Trace, { logImpression: true, section: SectionName.SwapForm, children: [_jsx(SwapFormScreenDelayedRender, { settings: settings }), _jsx(TransactionModalFooterContainer, { children: _jsx(SwapFormButton, {}) })] }));
        case TransactionScreen.Review:
            return (_jsx(Trace, { logImpression: true, section: SectionName.SwapReview, children: _jsx(SwapReviewScreenDelayedRender, { swapCallback: swapCallback, wrapCallback: wrapCallback, onSubmitSwap: onSubmitSwap }) }));
    }
}
// Please verify this on both an Android and iOS physical device before changing these values.
const SWAP_FORM_SCREEN_TRANSITION_DELAY = isWeb ? 0 : 25;
const SWAP_REVIEW_SCREEN_TRANSITION_DELAY = isWeb ? 0 : 450;
// We add a short hardcoded delay to allow the sheet to animate quickly both on first render and when going back from Review -> Form.
function SwapFormScreenDelayedRender({ settings }) {
    const [hideContent, setHideContent] = useState(SWAP_FORM_SCREEN_TRANSITION_DELAY > 0);
    useEffect(() => {
        setTimeout(() => setHideContent(false), SWAP_FORM_SCREEN_TRANSITION_DELAY);
    }, []);
    return _jsx(SwapFormScreen, { settings: settings, hideContent: hideContent });
}
// We add a short hardcoded delay to allow the sheet to animate quickly when going from Form -> Review.
function SwapReviewScreenDelayedRender({ swapCallback, wrapCallback, onSubmitSwap, }) {
    const [hideContent, setHideContent] = useState(SWAP_REVIEW_SCREEN_TRANSITION_DELAY > 0);
    useEffect(() => {
        setTimeout(() => setHideContent(false), SWAP_REVIEW_SCREEN_TRANSITION_DELAY);
    }, []);
    return (_jsx(SwapReviewScreen, { hideContent: hideContent, swapCallback: swapCallback, wrapCallback: wrapCallback, onSubmitSwap: onSubmitSwap }));
}
//# sourceMappingURL=SwapFlow.js.map