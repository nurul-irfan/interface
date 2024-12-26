import dayjs from 'dayjs';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { getValidAddress } from 'uniswap/src/utils/addresses';
export const createViewOnlyAccount = (address) => {
    const formattedAddress = getValidAddress(address, true);
    if (!formattedAddress) {
        throw new Error('Cannot import invalid view-only address');
    }
    const account = {
        type: AccountType.Readonly,
        address: formattedAddress,
        timeImportedMs: dayjs().valueOf(),
    };
    return account;
};
//# sourceMappingURL=createViewOnlyAccount.js.map