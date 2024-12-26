import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { AssetType } from 'uniswap/src/entities/assets';
import { DEFAULT_NATIVE_ADDRESS } from 'uniswap/src/features/chains/chainInfo';
import { getSwapPrefilledState } from 'uniswap/src/features/transactions/swap/hooks/useSwapPrefilledState';
import { CurrencyField } from 'uniswap/src/types/currency';
import { getSendPrefilledState } from 'wallet/src/features/transactions/send/getSendPrefilledState';
function isNavigateToTransactionFlowArgsInitialState(args) {
    return Boolean(args && args.initialState !== undefined);
}
export function isNavigateToSwapFlowArgsPartialState(args) {
    return Boolean(args && args.currencyAddress !== undefined);
}
function isNavigateToSwapFlowWithActions(args) {
    return Boolean(args && args.openTokenSelector !== undefined);
}
function isNavigateToSendFlowArgsPartialState(args) {
    return Boolean(args && args.chainId !== undefined);
}
export function getNavigateToSwapFlowArgsInitialState(args, defaultChainId) {
    if (isNavigateToTransactionFlowArgsInitialState(args)) {
        return args.initialState;
    }
    else if (isNavigateToSwapFlowArgsPartialState(args)) {
        return getSwapPrefilledState(args);
    }
    else if (isNavigateToSwapFlowWithActions(args)) {
        return {
            [CurrencyField.INPUT]: {
                address: DEFAULT_NATIVE_ADDRESS,
                chainId: defaultChainId,
                type: AssetType.Currency,
            },
            [CurrencyField.OUTPUT]: null,
            exactCurrencyField: CurrencyField.INPUT,
            exactAmountToken: '',
            selectingCurrencyField: CurrencyField.OUTPUT,
        };
    }
    else {
        return undefined;
    }
}
export function getNavigateToSendFlowArgsInitialState(args) {
    return isNavigateToTransactionFlowArgsInitialState(args)
        ? args.initialState
        : isNavigateToSendFlowArgsPartialState(args)
            ? getSendPrefilledState(args)
            : undefined;
}
export const WalletNavigationContext = createContext(undefined);
export function WalletNavigationProvider({ children, ...props }) {
    return _jsx(WalletNavigationContext.Provider, { value: props, children: children });
}
export const useWalletNavigation = () => {
    const walletNavigationContext = useContext(WalletNavigationContext);
    if (walletNavigationContext === undefined) {
        throw new Error('`useWalletNavigation` must be used inside of `WalletNavigationProvider`');
    }
    return walletNavigationContext;
};
//# sourceMappingURL=WalletNavigationContext.js.map