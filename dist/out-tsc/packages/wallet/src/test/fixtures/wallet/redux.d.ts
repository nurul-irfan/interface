import { PreloadedState } from 'redux';
import { Account } from 'wallet/src/features/wallet/accounts/types';
import { WalletSliceState } from 'wallet/src/features/wallet/slice';
import { WalletState as WalletPackageState } from 'wallet/src/state/walletReducer';
type WalletPreloadedStateOptions = {
    account: Account;
};
export declare const preloadedWalletReducerState: {
    <O extends Partial<WalletSliceState & WalletPreloadedStateOptions>>(overrides: O): Omit<{
        accounts: {
            [x: string]: Account;
        };
        activeAccountAddress: string;
        finishedOnboarding?: boolean | undefined;
        settings: {
            swapProtection: import("wallet/src/features/wallet/slice").SwapProtectionSetting;
            tokensOrderBy?: import("../../../features/wallet/types").ExploreOrderBy | undefined;
        };
        appRatingPromptedMs?: number | undefined;
        appRatingProvidedMs?: number | undefined;
        appRatingFeedbackProvidedMs?: number | undefined;
    }, Exclude<keyof O, keyof WalletSliceState>> & Omit<O, "account">;
    (): {
        accounts: {
            [x: string]: Account;
        };
        activeAccountAddress: string;
        finishedOnboarding?: boolean | undefined;
        settings: {
            swapProtection: import("wallet/src/features/wallet/slice").SwapProtectionSetting;
            tokensOrderBy?: import("../../../features/wallet/types").ExploreOrderBy | undefined;
        };
        appRatingPromptedMs?: number | undefined;
        appRatingProvidedMs?: number | undefined;
        appRatingFeedbackProvidedMs?: number | undefined;
    };
};
type PreloadedSharedStateOptions = {
    account: Account | undefined;
};
export declare const preloadedWalletPackageState: (options?: PreloadedSharedStateOptions) => PreloadedState<WalletPackageState>;
export {};
//# sourceMappingURL=redux.d.ts.map