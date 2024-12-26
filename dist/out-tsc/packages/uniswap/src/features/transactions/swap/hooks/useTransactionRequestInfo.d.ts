import { providers } from 'ethers/lib/ethers';
import { CreateSwapRequest, NullablePermit, TransactionFailureReason } from 'uniswap/src/data/tradingApi/__generated__/index';
import { AccountMeta } from 'uniswap/src/features/accounts/types';
import { GasFeeResult } from 'uniswap/src/features/gas/types';
import { DerivedSwapInfo } from 'uniswap/src/features/transactions/swap/types/derivedSwapInfo';
import { SwapGasFeeEstimation } from 'uniswap/src/features/transactions/swap/types/swapTxAndGasInfo';
import { TokenApprovalInfo } from 'uniswap/src/features/transactions/swap/types/trade';
export declare const UNKNOWN_SIM_ERROR = "Unknown gas simulation error";
export declare const WRAP_FALLBACK_GAS_LIMIT_IN_GWEI = 45000;
export interface TransactionRequestInfo {
    transactionRequest: providers.TransactionRequest | undefined;
    permitSignature: string | undefined;
    permitData?: NullablePermit;
    permitDataLoading?: boolean;
    gasFeeResult: GasFeeResult;
    gasEstimate: SwapGasFeeEstimation;
    swapRequestArgs: CreateSwapRequest | undefined;
    simulationFailureReasons?: TransactionFailureReason[];
}
export declare function useTransactionRequestInfo({ derivedSwapInfo, tokenApprovalInfo, account, skip, }: {
    derivedSwapInfo: DerivedSwapInfo;
    tokenApprovalInfo: TokenApprovalInfo | undefined;
    account?: AccountMeta;
    skip: boolean;
}): TransactionRequestInfo;
//# sourceMappingURL=useTransactionRequestInfo.d.ts.map