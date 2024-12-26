import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { UniswapProvider } from 'uniswap/src/contexts/UniswapContext';
import { logger } from 'utilities/src/logger/logger';
import { useWalletNavigation } from 'wallet/src/contexts/WalletNavigationContext';
import { useShowSwapNetworkNotification } from 'wallet/src/features/transactions/swap/hooks/useShowSwapNetworkNotification';
import { useProvider, useWalletSigners } from 'wallet/src/features/wallet/context';
import { useActiveAccount, useActiveSignerAccount } from 'wallet/src/features/wallet/hooks';
// Adapts useProvider to fit uniswap context requirement of returning undefined instead of null
function useWalletProvider(chainId) {
    var _a;
    return (_a = useProvider(chainId)) !== null && _a !== void 0 ? _a : undefined;
}
// Gets the signer for the active account
function useWalletSigner() {
    const account = useActiveSignerAccount();
    const signerManager = useWalletSigners();
    const [signer, setSigner] = useState(undefined);
    useEffect(() => {
        setSigner(undefined); // clear signer if account changes
        if (!account) {
            return;
        }
        signerManager
            .getSignerForAccount(account)
            .then(setSigner)
            .catch((error) => logger.error(error, { tags: { file: 'WalletUniswapContext', function: 'useWalletSigner' } }));
    }, [account, signerManager]);
    return signer;
}
// Abstracts wallet-specific transaction flow objects for usage in cross-platform flows in the `uniswap` package.
export function WalletUniswapProvider({ children }) {
    var _a;
    const account = (_a = useActiveAccount()) !== null && _a !== void 0 ? _a : undefined;
    const signer = useWalletSigner();
    const { navigateToBuyOrReceiveWithEmptyWallet, navigateToFiatOnRamp } = useWalletNavigation();
    const showSwapNetworkNotification = useShowSwapNetworkNotification();
    return (_jsx(UniswapProvider, { account: account, navigateToBuyOrReceiveWithEmptyWallet: navigateToBuyOrReceiveWithEmptyWallet, navigateToFiatOnRamp: navigateToFiatOnRamp, signer: signer, useProviderHook: useWalletProvider, onSwapChainsChanged: showSwapNetworkNotification, children: children }));
}
//# sourceMappingURL=WalletUniswapContext.js.map