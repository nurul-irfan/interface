import { useEffect } from 'react';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { useENSName } from 'uniswap/src/features/ens/api';
import { Statsig } from 'uniswap/src/features/gating/sdk/statsig';
import { useUnitagByAddress } from 'uniswap/src/features/unitags/hooks';
import { getValidAddress } from 'uniswap/src/utils/addresses';
import { logger } from 'utilities/src/logger/logger';
import { useActiveAccount } from 'wallet/src/features/wallet/hooks';
export function useGatingUserPropertyUsernames() {
    const activeAccount = useActiveAccount();
    const validatedAddress = getValidAddress(activeAccount === null || activeAccount === void 0 ? void 0 : activeAccount.address);
    const { data: ens } = useENSName(validatedAddress !== null && validatedAddress !== void 0 ? validatedAddress : undefined);
    const { unitag } = useUnitagByAddress(validatedAddress !== null && validatedAddress !== void 0 ? validatedAddress : undefined);
    useEffect(() => {
        if ((activeAccount === null || activeAccount === void 0 ? void 0 : activeAccount.type) === AccountType.SignerMnemonic) {
            const user = Statsig.getCurrentUser();
            Statsig.updateUser({
                ...user,
                privateAttributes: {
                    ...user === null || user === void 0 ? void 0 : user.privateAttributes,
                    unitag: unitag === null || unitag === void 0 ? void 0 : unitag.username,
                    ens: ens === null || ens === void 0 ? void 0 : ens.split('.')[0],
                },
            }).catch((error) => {
                logger.warn('userPropertyHooks', 'useGatingUserPropertyUsernames', 'Failed to set usernames for gating', error);
            });
        }
    }, [activeAccount, ens, unitag === null || unitag === void 0 ? void 0 : unitag.username]);
}
//# sourceMappingURL=userPropertyHooks.js.map