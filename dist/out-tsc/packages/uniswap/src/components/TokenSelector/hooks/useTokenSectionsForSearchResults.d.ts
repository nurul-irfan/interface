import { TokenSection } from 'uniswap/src/components/TokenSelector/types';
import { GqlResult } from 'uniswap/src/data/types';
import { TradeableAsset } from 'uniswap/src/entities/assets';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
export declare function useTokenSectionsForSearchResults(address: string | undefined, chainFilter: UniverseChainId | null, searchFilter: string | null, isBalancesOnlySearch: boolean, input: TradeableAsset | undefined): GqlResult<TokenSection[]>;
//# sourceMappingURL=useTokenSectionsForSearchResults.d.ts.map