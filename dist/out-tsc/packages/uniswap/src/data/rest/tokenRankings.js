import { useQuery } from '@connectrpc/connect-query';
import { tokenRankings } from '@uniswap/client-explore/dist/uniswap/explore/v1/service-ExploreStatsService_connectquery';
import { uniswapGetTransport } from 'uniswap/src/data/rest/base';
/**
 * Wrapper around Tanstack useQuery for the Uniswap REST BE service TokenRankings
 * This includes the top tokens pre-sorted by various filters
 * @param input { chainId: string } - string representation of the chain to query or `ALL_NETWORKS` for aggregated data
 * @returns UseQueryResult<TokenRankingsResponse, ConnectError>
 */
export function useTokenRankingsQuery(input) {
    return useQuery(tokenRankings, input, { transport: uniswapGetTransport });
}
//# sourceMappingURL=tokenRankings.js.map