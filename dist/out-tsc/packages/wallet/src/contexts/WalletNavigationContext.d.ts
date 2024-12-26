import { ReactNode } from 'react';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { FiatOnRampCurrency } from 'uniswap/src/features/fiatOnRamp/types';
import { TransactionState } from 'uniswap/src/features/transactions/types/transactionState';
import { CurrencyField } from 'uniswap/src/types/currency';
import { NFTItem } from 'wallet/src/features/nfts/types';
type NavigateToTransactionFlowTransactionState = {
    initialState: TransactionState;
};
type NavigateToSwapFlowPartialState = {
    currencyField: CurrencyField;
    currencyAddress: Address;
    currencyChainId: UniverseChainId;
};
type NavigateToSwapFlowWithActions = {
    openTokenSelector: CurrencyField;
};
type NavigateToSendFlowPartialState = {
    chainId: UniverseChainId;
    currencyAddress?: Address;
};
export type NavigateToSwapFlowArgs = NavigateToTransactionFlowTransactionState | NavigateToSwapFlowPartialState | NavigateToSwapFlowWithActions | undefined;
export type NavigateToSendFlowArgs = NavigateToTransactionFlowTransactionState | NavigateToSendFlowPartialState | undefined;
export declare function isNavigateToSwapFlowArgsPartialState(args: NavigateToSwapFlowArgs): args is NavigateToSwapFlowPartialState;
export declare function getNavigateToSwapFlowArgsInitialState(args: NavigateToSwapFlowArgs, defaultChainId: UniverseChainId): TransactionState | undefined;
export declare function getNavigateToSendFlowArgsInitialState(args: NavigateToSendFlowArgs): TransactionState | undefined;
export type NavigateToNftItemArgs = {
    owner?: Address;
    address: Address;
    tokenId: string;
    chainId?: UniverseChainId;
    isSpam?: boolean;
    fallbackData?: NFTItem;
};
export type NavigateToNftCollectionArgs = {
    collectionAddress: Address;
};
export type NavigateToFiatOnRampArgs = {
    prefilledCurrency?: FiatOnRampCurrency;
};
export type NavigateToExternalProfileArgs = {
    address: Address;
};
export type ShareTokenArgs = {
    currencyId: string;
};
export type ShareNftArgs = {
    contractAddress: string;
    tokenId: string;
};
export type WalletNavigationContextState = {
    navigateToAccountActivityList: () => void;
    navigateToAccountTokenList: () => void;
    navigateToBuyOrReceiveWithEmptyWallet: () => void;
    navigateToExternalProfile: (args: NavigateToExternalProfileArgs) => void;
    navigateToFiatOnRamp: (args: NavigateToFiatOnRampArgs) => void;
    navigateToNftDetails: (args: NavigateToNftItemArgs) => void;
    navigateToNftCollection: (args: NavigateToNftCollectionArgs) => void;
    navigateToSwapFlow: (args: NavigateToSwapFlowArgs) => void;
    navigateToTokenDetails: (currencyId: string) => void;
    navigateToReceive: () => void;
    navigateToSend: (args: NavigateToSendFlowArgs) => void;
    handleShareNft: (args: ShareNftArgs) => void;
    handleShareToken: (args: ShareTokenArgs) => void;
};
export declare const WalletNavigationContext: import("react").Context<WalletNavigationContextState | undefined>;
export declare function WalletNavigationProvider({ children, ...props }: {
    children: ReactNode;
} & WalletNavigationContextState): JSX.Element;
export declare const useWalletNavigation: () => WalletNavigationContextState;
export {};
//# sourceMappingURL=WalletNavigationContext.d.ts.map