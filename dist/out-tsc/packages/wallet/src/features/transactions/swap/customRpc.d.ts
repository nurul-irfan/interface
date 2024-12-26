import { UniverseChainId } from 'uniswap/src/features/chains/types';
/**
 * Send txn through private RPC if following conditions are met:
 *
 * 1. Private RPC feature flag is enabled, aka they are in test group
 * 2. Swap protection setting is enabled (users sets this in swap settings)
 * 3. Private RPC is supported on chain
 *
 */
export declare function useShouldUsePrivateRpc(chainId: Maybe<UniverseChainId>): boolean;
//# sourceMappingURL=customRpc.d.ts.map