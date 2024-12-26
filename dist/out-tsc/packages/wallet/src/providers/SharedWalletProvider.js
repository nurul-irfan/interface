import { jsx as _jsx } from "react/jsx-runtime";
import { Provider as ReduxProvider } from 'react-redux';
import { SharedPersistQueryClientProvider } from 'uniswap/src/data/apiClients/SharedPersistQueryClientProvider';
import { TamaguiProvider } from 'wallet/src/providers/tamagui-provider';
// A provider meant for sharing across all surfaces.
// Props should be defined as needed and clarified in name to improve readability
export function SharedWalletProvider({ reduxStore, children }) {
    return (_jsx(ReduxProvider, { store: reduxStore, children: _jsx(SharedPersistQueryClientProvider, { children: _jsx(TamaguiProvider, { children: children }) }) }));
}
//# sourceMappingURL=SharedWalletProvider.js.map