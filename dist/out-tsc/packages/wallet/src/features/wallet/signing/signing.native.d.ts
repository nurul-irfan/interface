import { ethers } from 'ethers';
import { Account } from 'wallet/src/features/wallet/accounts/types';
import { SignerManager } from 'wallet/src/features/wallet/signing/SignerManager';
export declare function signMessage(message: string, account: Account, signerManager: SignerManager): Promise<string>;
export declare function signTypedDataMessage(message: string, account: Account, signerManager: SignerManager, _provider?: ethers.providers.JsonRpcProvider): Promise<string>;
//# sourceMappingURL=signing.native.d.ts.map