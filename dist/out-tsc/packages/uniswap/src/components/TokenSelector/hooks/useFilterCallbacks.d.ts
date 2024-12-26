import { TokenSelectorFlow } from 'uniswap/src/components/TokenSelector/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
export declare function useFilterCallbacks(chainId: UniverseChainId | null, flow: TokenSelectorFlow): {
    chainFilter: UniverseChainId | null;
    parsedChainFilter: UniverseChainId | null;
    searchFilter: string | null;
    parsedSearchFilter: string | null;
    onChangeChainFilter: (newChainFilter: UniverseChainId | null) => void;
    onClearSearchFilter: () => void;
    onChangeText: (newSearchFilter: string) => void;
};
//# sourceMappingURL=useFilterCallbacks.d.ts.map