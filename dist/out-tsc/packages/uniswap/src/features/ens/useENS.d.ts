import { UniverseChainId } from 'uniswap/src/features/chains/types';
/**
 * Given a name or address, does a lookup to resolve to an address and name
 * @param nameOrAddress ENS name or address
 */
export declare function useENS(chainId: UniverseChainId, nameOrAddress?: string | null, autocompleteDomain?: boolean): {
    loading: boolean;
    address?: string | null;
    name: string | null;
};
export declare function getCompletedENSName(name: string | null): string | null;
//# sourceMappingURL=useENS.d.ts.map