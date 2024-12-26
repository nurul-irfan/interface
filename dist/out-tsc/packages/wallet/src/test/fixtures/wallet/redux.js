import { createFixture } from 'uniswap/src/test/utils';
import { initialWalletState } from 'wallet/src/features/wallet/slice';
import { signerMnemonicAccount } from 'wallet/src/test/fixtures/wallet/accounts';
export const preloadedWalletReducerState = createFixture(() => ({
    account: signerMnemonicAccount(),
}))(({ account }) => ({
    ...initialWalletState,
    accounts: { [account.address]: account },
    activeAccountAddress: account.address,
}));
export const preloadedWalletPackageState = createFixture({
    account: undefined,
})(({ account }) => ({
    wallet: preloadedWalletReducerState({ account }),
}));
//# sourceMappingURL=redux.js.map