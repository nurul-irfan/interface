import { createSelector } from '@reduxjs/toolkit';
import { AccountType } from 'uniswap/src/features/accounts/types';
import { RankingType } from 'wallet/src/features/wallet/types';
const DEFAULT_TOKENS_ORDER_BY = RankingType.Volume;
export const selectAccounts = (state) => state.wallet.accounts;
export const selectSignerMnemonicAccounts = createSelector(selectAccounts, (accounts) => Object.values(accounts).filter((a) => a.type === AccountType.SignerMnemonic));
export const selectSortedSignerMnemonicAccounts = createSelector(selectSignerMnemonicAccounts, (accounts) => accounts.sort((a, b) => a.derivationIndex - b.derivationIndex));
export const selectSignerMnemonicAccountExists = createSelector(selectAccounts, (accounts) => Object.values(accounts).findIndex((value) => value.type === AccountType.SignerMnemonic) >= 0);
export const selectViewOnlyAccounts = createSelector(selectAccounts, (accounts) => Object.values(accounts).filter((a) => a.type === AccountType.Readonly));
export const selectSortedViewOnlyAccounts = createSelector(selectViewOnlyAccounts, (accounts) => accounts.sort((a, b) => a.timeImportedMs - b.timeImportedMs));
// Sorted signer accounts, then sorted view-only accounts
export const selectAllAccountsSorted = createSelector(selectSortedSignerMnemonicAccounts, selectSortedViewOnlyAccounts, (signerMnemonicAccounts, viewOnlyAccounts) => {
    return [...signerMnemonicAccounts, ...viewOnlyAccounts];
});
export const selectActiveAccountAddress = (state) => state.wallet.activeAccountAddress;
export const selectActiveAccount = createSelector(selectAccounts, selectActiveAccountAddress, (accounts, activeAccountAddress) => { var _a; return (_a = (activeAccountAddress ? accounts[activeAccountAddress] : null)) !== null && _a !== void 0 ? _a : null; });
export const selectFinishedOnboarding = (state) => state.wallet.finishedOnboarding;
export const selectTokensOrderBy = (state) => { var _a; return (_a = state.wallet.settings.tokensOrderBy) !== null && _a !== void 0 ? _a : DEFAULT_TOKENS_ORDER_BY; };
export const selectInactiveAccounts = createSelector(selectActiveAccountAddress, selectAccounts, (activeAddress, accounts) => Object.values(accounts).filter((account) => account.address !== activeAddress));
export const makeSelectAccountNotificationSetting = () => createSelector(selectAccounts, (_, address) => address, (accounts, address) => { var _a; return !!((_a = accounts[address]) === null || _a === void 0 ? void 0 : _a.pushNotificationsEnabled); });
export const selectAnyAddressHasNotificationsEnabled = createSelector(selectAccounts, (accounts) => Object.values(accounts).some((account) => account.pushNotificationsEnabled));
export const selectWalletSwapProtectionSetting = (state) => state.wallet.settings.swapProtection;
export const appRatingProvidedMsSelector = (state) => state.wallet.appRatingProvidedMs;
export const appRatingPromptedMsSelector = (state) => state.wallet.appRatingPromptedMs;
export const appRatingFeedbackProvidedMsSelector = (state) => state.wallet.appRatingFeedbackProvidedMs;
//# sourceMappingURL=selectors.js.map