import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { Routing } from 'uniswap/src/data/tradingApi/__generated__/index';
import { AccountMeta } from 'uniswap/src/features/accounts/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { TokenApprovalInfo } from 'uniswap/src/features/transactions/swap/types/trade';
import { GasFeeEstimates } from 'uniswap/src/features/transactions/types/transactionDetails';
import { WrapType } from 'uniswap/src/features/transactions/types/wrap';
export interface TokenApprovalInfoParams {
    chainId: UniverseChainId;
    wrapType: WrapType;
    currencyInAmount: Maybe<CurrencyAmount<Currency>>;
    currencyOutAmount?: Maybe<CurrencyAmount<Currency>>;
    routing: Routing | undefined;
    account?: AccountMeta;
    skip?: boolean;
}
interface TokenApprovalGasInfo {
    gasFee?: string;
    displayGasFee?: string;
    cancelGasFee?: string;
    displayCancelGasFee?: string;
    gasEstimates?: GasFeeEstimates;
    isLoading: boolean;
}
export declare function useTokenApprovalInfo(params: TokenApprovalInfoParams): TokenApprovalInfo & TokenApprovalGasInfo;
export {};
//# sourceMappingURL=useTokenApprovalInfo.d.ts.map