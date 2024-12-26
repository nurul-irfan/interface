import { ethers } from 'ethers';
import { Account } from 'wallet/src/features/wallet/accounts/types';
import { SignerManager } from 'wallet/src/features/wallet/signing/SignerManager';
export declare function signMessage(_message: string, _account: Account, _signerManager: SignerManager, _provider?: ethers.providers.JsonRpcProvider): Promise<string>;
export declare function signTypedDataMessage(_message: string, _account: Account, _signerManager: SignerManager, _provider?: ethers.providers.JsonRpcProvider): Promise<string>;
//# sourceMappingURL=signing.d.ts.map