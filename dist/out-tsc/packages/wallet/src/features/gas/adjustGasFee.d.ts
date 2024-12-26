import { providers } from 'ethers';
import { FeeType } from 'uniswap/src/data/tradingApi/types';
import { GasFeeResult } from 'uniswap/src/features/gas/types';
export type FeeDetails = {
    type: FeeType.LEGACY;
    params: {
        gasPrice: string;
    };
} | {
    type: FeeType.EIP1559;
    params: {
        maxFeePerGas: string;
        maxPriorityFeePerGas: string;
    };
};
/**
 * Returns gas prices params adjusted by provided factor.
 *
 * If the current gas param type doesn't match what was submitted on chain, transform the gas params to match.
 * Without this, cancelations would be blocked as no adjusted gas fee would be returned.
 *
 * This happens if gas service returns different gas param type than what ethers expects for the chain.
 */
export declare function getAdjustedGasFeeDetails(request: providers.TransactionRequest, currentGasFeeParams: NonNullable<GasFeeResult['params']>, adjustmentFactor: number): FeeDetails;
//# sourceMappingURL=adjustGasFee.d.ts.map