import { TFunction } from 'i18next';
import { UnitagClaim, UnitagClaimContext, UnitagErrorCodes, UnitagGetAvatarUploadUrlResponse } from 'uniswap/src/features/unitags/types';
import { Account } from 'wallet/src/features/wallet/accounts/types';
import { SignerManager } from 'wallet/src/features/wallet/signing/SignerManager';
export declare const useCanActiveAddressClaimUnitag: (address?: Address) => {
    canClaimUnitag: boolean;
};
export declare const useCanAddressClaimUnitag: (address?: Address, isUsernameChange?: boolean) => {
    canClaimUnitag: boolean;
    errorCode?: UnitagErrorCodes;
};
export declare const getUnitagFormatError: (unitag: string, t: TFunction) => string | undefined;
export declare const useCanClaimUnitagName: (unitag: string | undefined) => {
    error: string | undefined;
    loading: boolean;
};
/**
 * A custom async hook that handles the process of claiming a Unitag
 * Hook must be used inside the OnboardingContext
 */
export declare const useClaimUnitag: () => (claim: UnitagClaim, context: UnitagClaimContext, account?: Account) => Promise<{
    claimError?: string;
}>;
export declare const useAvatarUploadCredsWithRefresh: ({ unitag, account, signerManager, }: {
    unitag: string;
    account: Account;
    signerManager: SignerManager;
}) => {
    avatarUploadUrlLoading: boolean;
    avatarUploadUrlResponse?: UnitagGetAvatarUploadUrlResponse | undefined;
};
export declare function useHasAnyAccountsWithUnitag(): boolean;
//# sourceMappingURL=hooks.d.ts.map