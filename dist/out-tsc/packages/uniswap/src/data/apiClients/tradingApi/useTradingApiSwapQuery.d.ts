import { UseQueryResult } from '@tanstack/react-query';
import { WithV4Flag } from 'uniswap/src/data/apiClients/tradingApi/TradingApiClient';
import { UseQueryWithImmediateGarbageCollectionApiHelperHookArgs } from 'uniswap/src/data/apiClients/types';
import { CreateSwapRequest, CreateSwapResponse } from 'uniswap/src/data/tradingApi/__generated__';
export declare function useTradingApiSwapQuery({ params, ...rest }: UseQueryWithImmediateGarbageCollectionApiHelperHookArgs<WithV4Flag<CreateSwapRequest>, CreateSwapResponse>): UseQueryResult<CreateSwapResponse>;
//# sourceMappingURL=useTradingApiSwapQuery.d.ts.map