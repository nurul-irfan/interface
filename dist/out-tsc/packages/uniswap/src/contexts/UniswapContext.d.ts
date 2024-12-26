import { JsonRpcProvider } from '@ethersproject/providers';
import { Signer } from 'ethers/lib/ethers';
import { PropsWithChildren } from 'react';
import { AccountMeta } from 'uniswap/src/features/accounts/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { FiatOnRampCurrency } from 'uniswap/src/features/fiatOnRamp/types';
import { Connector } from 'wagmi';
/** Stores objects/utils that exist on all platforms, abstracting away app-level specifics for each, in order to allow usage in cross-platform code. */
interface UniswapContext {
    account?: AccountMeta;
    connector?: Connector;
    navigateToBuyOrReceiveWithEmptyWallet?: () => void;
    navigateToFiatOnRamp: (args: {
        prefilledCurrency?: FiatOnRampCurrency;
    }) => void;
    onSwapChainsChanged: (args: {
        chainId: UniverseChainId;
        prevChainId?: UniverseChainId;
        outputChainId?: UniverseChainId;
    }) => void;
    swapInputChainId?: UniverseChainId;
    signer: Signer | undefined;
    useProviderHook: (chainId: number) => JsonRpcProvider | undefined;
    onConnectWallet?: () => void;
    isSwapTokenSelectorOpen: boolean;
    setIsSwapTokenSelectorOpen: (open: boolean) => void;
}
export declare const UniswapContext: import("react").Context<UniswapContext | null>;
export declare function UniswapProvider({ children, account, connector, navigateToBuyOrReceiveWithEmptyWallet, navigateToFiatOnRamp, onSwapChainsChanged, signer, useProviderHook, onConnectWallet, }: PropsWithChildren<Omit<UniswapContext, 'isSwapTokenSelectorOpen' | 'setIsSwapTokenSelectorOpen'>>): JSX.Element;
/** Cross-platform util for getting items/utils that exist on all apps. */
export declare function useUniswapContext(): UniswapContext;
/** Cross-platform util for getting metadata for the active account/wallet, regardless of platform/environment. */
export declare function useAccountMeta(): AccountMeta | undefined;
/** Cross-platform util for getting connector for the active account/wallet, only applicable to web, other platforms are undefined. */
export declare function useConnector(): Connector | undefined;
/** Cross-platform util for getting an RPC provider for the given `chainId`, regardless of platform/environment. */
export declare function useProvider(chainId: number): JsonRpcProvider | undefined;
/** Cross-platform util for getting a signer for the active account/wallet, regardless of platform/environment. */
export declare function useSigner(): Signer | undefined;
export {};
//# sourceMappingURL=UniswapContext.d.ts.map