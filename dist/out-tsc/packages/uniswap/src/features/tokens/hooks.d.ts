import { SearchPopularTokensQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
export type TopToken = NonNullable<NonNullable<SearchPopularTokensQuery['topTokens']>[0]>;
export declare function usePopularTokens(): {
    popularTokens: TopToken[] | undefined;
    loading: boolean;
};
//# sourceMappingURL=hooks.d.ts.map