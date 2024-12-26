import { Account, SignerMnemonicAccount } from 'wallet/src/features/wallet/accounts/types';
import { SwapProtectionSetting } from 'wallet/src/features/wallet/slice';
import { DisplayName } from 'wallet/src/features/wallet/types';
export declare function useAccounts(): Record<string, Account>;
export declare function useAccount(address: Address): Account;
export declare function useSignerAccount(address: Address): SignerMnemonicAccount | undefined;
export declare function useSignerAccounts(): SignerMnemonicAccount[];
export declare function useViewOnlyAccounts(): Account[];
export declare function useActiveAccount(): Account | null;
export declare function useActiveSignerAccount(): SignerMnemonicAccount | null;
export declare function useActiveAccountAddress(): Address | null;
export declare function useNativeAccountExists(): boolean;
export declare function useActiveAccountAddressWithThrow(): Address;
export declare function useActiveAccountWithThrow(): Account;
export declare function useAccountAddressFromUrlWithThrow(): Address;
export declare function useSwapProtectionSetting(): SwapProtectionSetting;
export declare function useSelectAccountNotificationSetting(address: Address): boolean;
type DisplayNameOptions = {
    showShortenedEns?: boolean;
    includeUnitagSuffix?: boolean;
    showLocalName?: boolean;
    overrideDisplayName?: string;
};
/**
 * Displays the ENS name if one is available otherwise displays the local name and if neither are available it shows the address.
 *
 * @param address - The address to display
 * @param options.showShortenedEns - Whether to shorten the ENS name to ENS_TRIM_LENGTH characters
 * @param options.includeUnitagSuffix - Whether to include the unitag suffix (.uni.eth) in returned unitag name
 * @param options.showLocalName - Whether to show the local wallet name
 */
export declare function useDisplayName(address: Maybe<string>, options?: DisplayNameOptions): DisplayName | undefined;
export {};
//# sourceMappingURL=hooks.d.ts.map