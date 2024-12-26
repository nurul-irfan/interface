import { Signer } from 'ethers';
import { PropsWithChildren } from 'react';
import { SignerMnemonicAccountMeta } from 'uniswap/src/features/accounts/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { ContractManager } from 'wallet/src/features/contracts/ContractManager';
import { ProviderManager } from 'wallet/src/features/providers/ProviderManager';
import { SignerManager } from 'wallet/src/features/wallet/signing/SignerManager';
export interface WalletContextValue {
    contracts: ContractManager;
    providers: ProviderManager;
    signers: SignerManager;
}
export declare const walletContextValue: WalletContextValue;
export declare const WalletContext: import("react").Context<{
    value: WalletContextValue;
    version: number;
}>;
export declare function WalletContextProvider({ children }: PropsWithChildren<unknown>): JSX.Element;
export declare function useWalletSigners(): SignerManager;
export declare function getSignerManager(): Generator<import("redux-saga/effects").GetContextEffect, SignerManager, unknown>;
export declare function useProviderManager(): ProviderManager;
export declare function useProvider(chainId: UniverseChainId): import("@ethersproject/providers").JsonRpcProvider | null;
export declare function getProviderManager(): Generator<import("redux-saga/effects").GetContextEffect, ProviderManager, unknown>;
export declare function getProvider(chainId: UniverseChainId): Generator<import("redux-saga/effects").CallEffect<ProviderManager>, import("@ethersproject/providers").JsonRpcProvider, unknown>;
export declare function getPrivateProvider(chainId: UniverseChainId, account?: SignerMnemonicAccountMeta): Generator<import("redux-saga/effects").CallEffect<ProviderManager> | import("redux-saga/effects").CallEffect<SignerManager> | import("redux-saga/effects").CallEffect<Signer> | import("redux-saga/effects").CallEffect<import("@ethersproject/providers").JsonRpcProvider>, import("@ethersproject/providers").JsonRpcProvider, unknown>;
/**
 * Non-generator version of getProvider
 */
export declare function getProviderSync(chainId: UniverseChainId): import("@ethersproject/providers").JsonRpcProvider;
export declare function useContractManager(): ContractManager;
export declare function getContractManager(): Generator<import("redux-saga/effects").GetContextEffect, ContractManager, unknown>;
//# sourceMappingURL=context.d.ts.map