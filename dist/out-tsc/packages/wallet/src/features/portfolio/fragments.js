import { useFragment } from '@apollo/client';
import { TokenBalanceMainPartsFragmentDoc, TokenBalanceQuantityPartsFragmentDoc, } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
export function useTokenBalanceMainPartsFragment({ id, }) {
    return useFragment({
        fragment: TokenBalanceMainPartsFragmentDoc,
        fragmentName: 'TokenBalanceMainParts',
        from: {
            __typename: 'TokenBalance',
            id,
        },
    });
}
export function useTokenBalanceQuantityPartsFragment({ id, }) {
    return useFragment({
        fragment: TokenBalanceQuantityPartsFragmentDoc,
        fragmentName: 'TokenBalanceQuantityParts',
        from: {
            __typename: 'TokenBalance',
            id,
        },
    });
}
//# sourceMappingURL=fragments.js.map