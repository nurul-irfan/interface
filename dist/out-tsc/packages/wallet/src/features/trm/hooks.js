import { AccountType } from 'uniswap/src/features/accounts/types';
import { useIsBlocked } from 'uniswap/src/features/trm/hooks';
import { useActiveAccount } from 'wallet/src/features/wallet/hooks';
/** Returns TRM status for the active account. */
export function useIsBlockedActiveAddress() {
    const account = useActiveAccount();
    return useIsBlocked(account === null || account === void 0 ? void 0 : account.address, (account === null || account === void 0 ? void 0 : account.type) === AccountType.Readonly);
}
//# sourceMappingURL=hooks.js.map