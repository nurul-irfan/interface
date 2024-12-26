import { TransactionRequest } from '@ethersproject/providers';
import { UseQueryResult } from '@tanstack/react-query';
import { UseQueryWithImmediateGarbageCollectionApiHelperHookArgs } from 'uniswap/src/data/apiClients/types';
import { GasStrategy } from 'uniswap/src/data/tradingApi/types';
import { GasFeeResponse } from 'uniswap/src/features/gas/types';
export declare function useGasFeeQuery({ params, ...rest }: UseQueryWithImmediateGarbageCollectionApiHelperHookArgs<TransactionRequest & {
    gasStrategies: GasStrategy[];
}, GasFeeResponse>): UseQueryResult<GasFeeResponse>;
//# sourceMappingURL=useGasFeeQuery.d.ts.map