import type { Address } from './Address';
import type { ChainId } from './ChainId';
import type { RequestId } from './RequestId';
import type { TokenProject } from './TokenProject';
export type GetSwappableTokensResponse = {
    requestId: RequestId;
    tokens: Array<{
        address: Address;
        chainId: ChainId;
        name: string;
        symbol: string;
        project: TokenProject;
        isSpam?: boolean;
        decimals: number;
    }>;
};
//# sourceMappingURL=GetSwappableTokensResponse.d.ts.map