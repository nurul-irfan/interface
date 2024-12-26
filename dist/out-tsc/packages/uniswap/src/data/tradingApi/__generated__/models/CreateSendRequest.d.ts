import type { Address } from './Address';
import type { ChainId } from './ChainId';
import type { TokenAmount } from './TokenAmount';
import type { Urgency } from './Urgency';
import { GasStrategy } from "../../types";
export type CreateSendRequest = {
    sender: Address;
    recipient: Address;
    token: Address;
    amount: TokenAmount;
    chainId?: ChainId;
    urgency?: Urgency;
    gasStrategies?: GasStrategy[];
};
//# sourceMappingURL=CreateSendRequest.d.ts.map