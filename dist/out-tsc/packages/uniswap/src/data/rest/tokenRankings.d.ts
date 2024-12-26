import { PartialMessage } from '@bufbuild/protobuf';
import { ConnectError } from '@connectrpc/connect';
import { UseQueryResult } from '@tanstack/react-query';
import { TokenRankingsRequest, TokenRankingsResponse } from '@uniswap/client-explore/dist/uniswap/explore/v1/service_pb';
/**
 * Wrapper around Tanstack useQuery for the Uniswap REST BE service TokenRankings
 * This includes the top tokens pre-sorted by various filters
 * @param input { chainId: string } - string representation of the chain to query or `ALL_NETWORKS` for aggregated data
 * @returns UseQueryResult<TokenRankingsResponse, ConnectError>
 */
export declare function useTokenRankingsQuery(input?: PartialMessage<TokenRankingsRequest>): UseQueryResult<TokenRankingsResponse, ConnectError>;
//# sourceMappingURL=tokenRankings.d.ts.map