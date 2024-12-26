import type { RequestId } from './RequestId';
import type { TransactionRequest } from './TransactionRequest';
import { GasEstimate } from "../../types";
export type ApprovalResponse = {
    requestId: RequestId;
    approval: TransactionRequest;
    cancel: TransactionRequest;
    gasFee?: string;
    cancelGasFee?: string;
    gasEstimates?: GasEstimate[];
};
//# sourceMappingURL=ApprovalResponse.d.ts.map