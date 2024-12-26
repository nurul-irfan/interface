import { Routing, CreateSwapRequest, TransactionFailureReason } from "uniswap/src/data/tradingApi/__generated__/index";
import { GasFeeResult, ValidatedGasFeeResult } from "uniswap/src/features/gas/types";
import { BridgeTrade, ClassicTrade, IndicativeTrade, UniswapXTrade } from "uniswap/src/features/transactions/swap/types/trade";
import { ValidatedPermit, ValidatedTransactionRequest } from "uniswap/src/features/transactions/swap/utils/trade";
import { GasFeeEstimates } from "uniswap/src/features/transactions/types/transactionDetails";
export type SwapTxAndGasInfo = ClassicSwapTxAndGasInfo | UniswapXSwapTxAndGasInfo | BridgeSwapTxAndGasInfo;
export type ValidatedSwapTxContext = ValidatedClassicSwapTxAndGasInfo | ValidatedUniswapXSwapTxAndGasInfo | ValidatedBridgeSwapTxAndGasInfo;
export declare function isValidSwapTxContext(swapTxContext: SwapTxAndGasInfo | unknown): swapTxContext is ValidatedSwapTxContext;
export type SwapGasFeeEstimation = {
    swapEstimates?: GasFeeEstimates;
    approvalEstimates?: GasFeeEstimates;
    wrapEstimates?: GasFeeEstimates;
};
export type UniswapXGasBreakdown = {
    classicGasUseEstimateUSD?: string;
    approvalCost?: string;
    wrapCost?: string;
    inputTokenSymbol?: string;
};
interface BaseSwapTxAndGasInfo {
    routing: Routing;
    trade?: ClassicTrade | UniswapXTrade | BridgeTrade;
    indicativeTrade: IndicativeTrade | undefined;
    approveTxRequest: ValidatedTransactionRequest | undefined;
    permit: ValidatedPermit | undefined;
    revocationTxRequest: ValidatedTransactionRequest | undefined;
    gasFee: GasFeeResult;
    gasFeeEstimation: SwapGasFeeEstimation;
}
export interface ClassicSwapTxAndGasInfo extends BaseSwapTxAndGasInfo {
    routing: Routing.CLASSIC;
    trade?: ClassicTrade;
    swapRequestArgs: CreateSwapRequest | undefined;
    simulationErrors?: TransactionFailureReason[];
    /**
     * `unsigned` is true if `txRequest` is undefined due to a permit signature needing to be signed first.
     * This occurs on interface where the user must be prompted to sign a permit before txRequest can be fetched.
    */
    unsigned: boolean;
    txRequest: ValidatedTransactionRequest | undefined;
}
export interface UniswapXSwapTxAndGasInfo extends BaseSwapTxAndGasInfo {
    routing: Routing.DUTCH_V2 | Routing.PRIORITY;
    trade: UniswapXTrade;
    wrapTxRequest: ValidatedTransactionRequest | undefined;
    gasFeeBreakdown: UniswapXGasBreakdown;
}
export interface BridgeSwapTxAndGasInfo extends BaseSwapTxAndGasInfo {
    routing: Routing.BRIDGE;
    trade: BridgeTrade;
    indicativeTrade: undefined;
    swapRequestArgs: CreateSwapRequest | undefined;
    gasFeeEstimation: SwapGasFeeEstimation;
    /**
     * `unsigned` is true if `txRequest` is undefined due to a permit signature needing to be signed first.
     * This occurs on interface where the user must be prompted to sign a permit before txRequest can be fetched.
    */
    unsigned: boolean;
    txRequest: ValidatedTransactionRequest | undefined;
}
interface BaseRequiredSwapTxContextFields {
    gasFee: ValidatedGasFeeResult;
}
export type ValidatedClassicSwapTxAndGasInfo = Omit<Required<ClassicSwapTxAndGasInfo>, 'simulationErrors'> & {
    simulationErrors?: ClassicSwapTxAndGasInfo['simulationErrors'];
} & BaseRequiredSwapTxContextFields & ({
    unsigned: true;
    permit: ValidatedPermit;
    txRequest: undefined;
} | {
    unsigned: false;
    permit: undefined;
    txRequest: ValidatedTransactionRequest;
});
export type ValidatedBridgeSwapTxAndGasInfo = Required<BridgeSwapTxAndGasInfo> & BaseRequiredSwapTxContextFields & ({
    unsigned: true;
    permit: ValidatedPermit;
    txRequest: undefined;
} | {
    unsigned: false;
    permit: undefined;
    txRequest: ValidatedTransactionRequest;
});
export type ValidatedUniswapXSwapTxAndGasInfo = Required<UniswapXSwapTxAndGasInfo> & BaseRequiredSwapTxContextFields & {
    permit: ValidatedPermit;
};
export {};
//# sourceMappingURL=swapTxAndGasInfo.d.ts.map