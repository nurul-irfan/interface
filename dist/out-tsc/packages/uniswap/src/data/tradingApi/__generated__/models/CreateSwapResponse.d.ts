import type { RequestId } from './RequestId';
import type { TransactionRequest } from './TransactionRequest';
import { GasEstimate } from "../../types";
export type CreateSwapResponse = {
    requestId: RequestId;
    swap: TransactionRequest;
    gasFee?: string;
    gasEstimates?: GasEstimate[];
};
//# sourceMappingURL=CreateSwapResponse.d.ts.map