import { GqlResult } from 'uniswap/src/data/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
export declare function useSearchTokens(searchQuery: string | null, chainFilter: UniverseChainId | null, skip: boolean): GqlResult<CurrencyInfo[]>;
//# sourceMappingURL=searchTokens.d.ts.map