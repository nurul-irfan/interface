import { createSlice } from '@reduxjs/toolkit';
import { areAddressesEqual, getValidAddress } from 'uniswap/src/utils/addresses';
import { RankingType } from 'wallet/src/features/wallet/types';
export var SwapProtectionSetting;
(function (SwapProtectionSetting) {
    SwapProtectionSetting["On"] = "on";
    SwapProtectionSetting["Off"] = "off";
})(SwapProtectionSetting || (SwapProtectionSetting = {}));
export const initialWalletState = {
    accounts: {},
    activeAccountAddress: null,
    settings: {
        swapProtection: SwapProtectionSetting.On,
        tokensOrderBy: RankingType.Volume,
    },
};
const slice = createSlice({
    name: 'wallet',
    initialState: initialWalletState,
    reducers: {
        addAccount: (state, action) => {
            const { address } = action.payload;
            const id = getValidAddress(address, true);
            if (!id) {
                throw new Error(`Cannot add an account with an invalid address ${address}`);
            }
            state.accounts[id] = action.payload;
        },
        addAccounts: (state, action) => {
            const accounts = action.payload;
            accounts.forEach((account) => {
                const id = getValidAddress(account.address, true);
                if (!id) {
                    throw new Error(`Cannot add an account with an invalid address ${account.address}`);
                }
                state.accounts[id] = account;
            });
        },
        removeAccounts: (state, action) => {
            const addressesToRemove = action.payload;
            addressesToRemove.forEach((address) => {
                const id = getValidAddress(address, true);
                if (!id) {
                    throw new Error('Cannot remove an account with an invalid address');
                }
                if (!state.accounts[id]) {
                    throw new Error(`Cannot remove missing account ${id}`);
                }
                delete state.accounts[id];
            });
            // Reset active account to first account if currently active account is deleted
            if (state.activeAccountAddress &&
                addressesToRemove.some((addressToRemove) => areAddressesEqual(addressToRemove, state.activeAccountAddress))) {
                const firstAccountId = Object.keys(state.accounts)[0];
                state.activeAccountAddress = firstAccountId !== null && firstAccountId !== void 0 ? firstAccountId : null;
            }
        },
        editAccount: (state, action) => {
            const { address, updatedAccount } = action.payload;
            const id = getValidAddress(address, true);
            if (!id) {
                throw new Error('Cannot edit an account with an invalid address');
            }
            if (!state.accounts[id]) {
                throw new Error(`Cannot edit missing account ${id}`);
            }
            state.accounts[id] = updatedAccount;
        },
        setAccountAsActive: (state, action) => {
            const address = action.payload;
            const id = getValidAddress(address, true);
            if (!id) {
                throw new Error('Cannot activate an account with an invalid address');
            }
            if (!state.accounts[id]) {
                throw new Error(`Cannot activate missing account ${id}`);
            }
            state.activeAccountAddress = id;
        },
        setFinishedOnboarding: (state, { payload: { finishedOnboarding } }) => {
            state.finishedOnboarding = finishedOnboarding;
        },
        setTokensOrderBy: (state, { payload: { newTokensOrderBy } }) => {
            state.settings.tokensOrderBy = newTokensOrderBy;
        },
        setSwapProtectionSetting: (state, { payload: { newSwapProtectionSetting } }) => {
            state.settings.swapProtection = newSwapProtectionSetting;
        },
        setAppRating: (state, { payload: { ratingProvided, feedbackProvided }, }) => {
            state.appRatingPromptedMs = Date.now();
            if (ratingProvided) {
                state.appRatingProvidedMs = Date.now();
            }
            if (feedbackProvided) {
                state.appRatingFeedbackProvidedMs = Date.now();
            }
        },
        resetWallet: () => initialWalletState,
        restoreMnemonicComplete: (state) => state,
    },
});
export const { addAccount, addAccounts, removeAccounts, editAccount, setAccountAsActive, resetWallet, setFinishedOnboarding, setTokensOrderBy, restoreMnemonicComplete, setSwapProtectionSetting, setAppRating, } = slice.actions;
export const walletReducer = slice.reducer;
//# sourceMappingURL=slice.js.map