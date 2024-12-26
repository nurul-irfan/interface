import { ApolloLink } from '@apollo/client';
import { Account } from 'wallet/src/features/wallet/accounts/types';
import { SignerManager } from 'wallet/src/features/wallet/signing/SignerManager';
export declare function getOnRampAuthLink(accounts: Record<string, Account>, signerManager: SignerManager): ApolloLink;
//# sourceMappingURL=onRampAuthLink.d.ts.map