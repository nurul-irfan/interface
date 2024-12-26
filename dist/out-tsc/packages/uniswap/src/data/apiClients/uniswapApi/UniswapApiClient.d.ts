import { TransactionRequest } from '@ethersproject/providers';
import { GasFeeResponse } from 'uniswap/src/features/gas/types';
export declare const UNISWAP_API_CACHE_KEY = "UniswapApi";
export declare function fetchGasFee(params: TransactionRequest): Promise<GasFeeResponse>;
export type ScreenResponse = {
    block: boolean;
};
export type ScreenRequest = {
    address: string;
};
export declare function fetchTrmScreen(params: ScreenRequest): Promise<ScreenResponse>;
//# sourceMappingURL=UniswapApiClient.d.ts.map