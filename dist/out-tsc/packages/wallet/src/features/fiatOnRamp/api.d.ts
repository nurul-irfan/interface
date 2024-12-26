import { FiatOnRampTransactionDetails, OffRampTransferDetailsResponse } from 'uniswap/src/features/fiatOnRamp/types';
/**
 * Utility to fetch fiat onramp transactions
 */
export declare function fetchFiatOnRampTransaction(previousTransactionDetails: FiatOnRampTransactionDetails, forceFetch: boolean): Promise<FiatOnRampTransactionDetails | undefined>;
export declare function fetchOffRampTransferDetails(sessionId: string): Promise<OffRampTransferDetailsResponse>;
//# sourceMappingURL=api.d.ts.map