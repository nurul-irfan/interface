import { UseFragmentResult } from '@apollo/client';
import { TokenBalanceMainPartsFragment, TokenBalanceQuantityPartsFragment } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
export declare function useTokenBalanceMainPartsFragment({ id, }: {
    id: string;
}): UseFragmentResult<TokenBalanceMainPartsFragment>;
export declare function useTokenBalanceQuantityPartsFragment({ id, }: {
    id: string;
}): UseFragmentResult<TokenBalanceQuantityPartsFragment>;
//# sourceMappingURL=fragments.d.ts.map