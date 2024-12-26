import { Account } from 'wallet/src/features/wallet/accounts/types';
import { ExploreOrderBy } from 'wallet/src/features/wallet/types';
export declare enum SwapProtectionSetting {
    On = "on",
    Off = "off"
}
export interface WalletSliceState {
    accounts: Record<Address, Account>;
    activeAccountAddress: Address | null;
    finishedOnboarding?: boolean;
    settings: {
        swapProtection: SwapProtectionSetting;
        tokensOrderBy?: ExploreOrderBy;
    };
    appRatingPromptedMs?: number;
    appRatingProvidedMs?: number;
    appRatingFeedbackProvidedMs?: number;
}
export declare const initialWalletState: WalletSliceState;
export declare const addAccount: import("@reduxjs/toolkit").ActionCreatorWithPayload<Account, "wallet/addAccount">, addAccounts: import("@reduxjs/toolkit").ActionCreatorWithPayload<Account[], "wallet/addAccounts">, removeAccounts: import("@reduxjs/toolkit").ActionCreatorWithPayload<string[], "wallet/removeAccounts">, editAccount: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    address: Address;
    updatedAccount: Account;
}, "wallet/editAccount">, setAccountAsActive: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "wallet/setAccountAsActive">, resetWallet: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"wallet/resetWallet">, setFinishedOnboarding: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    finishedOnboarding: boolean;
}, "wallet/setFinishedOnboarding">, setTokensOrderBy: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    newTokensOrderBy: ExploreOrderBy;
}, "wallet/setTokensOrderBy">, restoreMnemonicComplete: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"wallet/restoreMnemonicComplete">, setSwapProtectionSetting: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    newSwapProtectionSetting: SwapProtectionSetting;
}, "wallet/setSwapProtectionSetting">, setAppRating: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    ratingProvided?: boolean | undefined;
    feedbackProvided?: boolean | undefined;
}, "wallet/setAppRating">;
export declare const walletReducer: import("redux").Reducer<WalletSliceState>;
//# sourceMappingURL=slice.d.ts.map