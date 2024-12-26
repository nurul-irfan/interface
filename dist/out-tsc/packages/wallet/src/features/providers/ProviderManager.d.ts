import { Signer, providers as ethersProviders } from 'ethers';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
export declare class ProviderManager {
    private readonly _providers;
    private onUpdate;
    setOnUpdate(onUpdate: () => void): void;
    tryGetProvider(chainId: UniverseChainId): ethersProviders.JsonRpcProvider | null;
    getProvider(chainId: UniverseChainId): ethersProviders.JsonRpcProvider;
    getPrivateProvider(chainId: UniverseChainId, signer?: Signer): Promise<ethersProviders.JsonRpcProvider>;
    createProvider(chainId: UniverseChainId): undefined;
    createPrivateProvider(chainId: UniverseChainId, signer?: Signer, address?: Address): undefined;
    removeProviders(chainId: UniverseChainId): void;
}
//# sourceMappingURL=ProviderManager.d.ts.map