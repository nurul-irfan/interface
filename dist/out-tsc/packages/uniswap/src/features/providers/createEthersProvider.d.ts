import { Signer, providers as ethersProviders } from 'ethers/lib/ethers';
import { RPCType, UniverseChainId } from 'uniswap/src/features/chains/types';
export declare function createEthersProvider(chainId: UniverseChainId, rpcType?: RPCType, signer?: Signer): ethersProviders.JsonRpcProvider | null;
//# sourceMappingURL=createEthersProvider.d.ts.map