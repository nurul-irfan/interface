import type { RequestId } from './RequestId';
import type { TransactionRequest } from './TransactionRequest';
import { GasEstimate } from "../../types";
export type CreateSendResponse = {
    requestId: RequestId;
    send: TransactionRequest;
    gasFee?: string;
    gasFeeUSD?: number;
    gasEstimates?: GasEstimate[];
};
//# sourceMappingURL=CreateSendResponse.d.ts.map