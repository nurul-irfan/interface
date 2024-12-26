import { Contract, ContractInterface, providers } from 'ethers';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
export declare class ContractManager {
    private _contracts;
    createContract(chainId: UniverseChainId, address: Address, provider: providers.Provider, ABI: ContractInterface): Contract;
    removeContract(chainId: UniverseChainId, address: Address): void;
    reset(): void;
    getContract<T extends Contract>(chainId: UniverseChainId, address: Address): Nullable<T>;
    getOrCreateContract<T extends Contract = Contract>(chainId: UniverseChainId, address: Address, provider: providers.Provider, ABI: ContractInterface): T;
}
//# sourceMappingURL=ContractManager.d.ts.map