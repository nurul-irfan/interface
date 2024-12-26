import { Signer } from 'ethers';
import { AccountMeta } from 'uniswap/src/features/accounts/types';
/** Manages initialized ethers.Signers across the app */
export declare class SignerManager {
    private readonly signers;
    getSignerForAccount(account: AccountMeta): Promise<Signer>;
}
//# sourceMappingURL=SignerManager.d.ts.map