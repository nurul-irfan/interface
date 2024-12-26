import { jsx as _jsx } from "react/jsx-runtime";
import { TransactionSettingsContextProvider } from 'uniswap/src/features/transactions/settings/contexts/TransactionSettingsContext';
import { TransactionSettingKey } from 'uniswap/src/features/transactions/settings/slice';
import { SwapFlow } from 'uniswap/src/features/transactions/swap/SwapFlow';
import { SwapFormContextProvider } from 'uniswap/src/features/transactions/swap/contexts/SwapFormContext';
import { ProtocolPreference } from 'uniswap/src/features/transactions/swap/settings/configs/ProtocolPreference';
import { Slippage } from 'uniswap/src/features/transactions/swap/settings/configs/Slippage';
import { useSwapCallback } from 'wallet/src/features/transactions/swap/hooks/useSwapCallback';
import { useWrapCallback } from 'wallet/src/features/transactions/swap/hooks/useWrapCallback';
import { SwapProtection } from 'wallet/src/features/transactions/swap/settings/SwapProtection';
export function WalletSwapFlow({ onSubmitSwap, ...props }) {
    const swapCallback = useSwapCallback();
    const wrapCallback = useWrapCallback();
    return (_jsx(TransactionSettingsContextProvider, { settingKey: TransactionSettingKey.Swap, children: _jsx(SwapFormContextProvider, { prefilledState: props.prefilledState, hideSettings: props.hideHeader, hideFooter: props.hideFooter, children: _jsx(SwapFlow, { ...props, settings: [Slippage, SwapProtection, ProtocolPreference], swapCallback: swapCallback, wrapCallback: wrapCallback, onSubmitSwap: onSubmitSwap }) }) }));
}
//# sourceMappingURL=WalletSwapFlow.js.map