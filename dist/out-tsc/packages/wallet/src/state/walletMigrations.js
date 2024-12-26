/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccountType } from 'uniswap/src/features/accounts/types';
import { FiatCurrency } from 'uniswap/src/features/fiatCurrency/constants';
import { Language } from 'uniswap/src/features/language/constants';
import { areAddressesEqual } from 'uniswap/src/utils/addresses';
import { currencyIdToAddress, currencyIdToChain } from 'uniswap/src/utils/currencyId';
import { RankingType } from 'wallet/src/features/wallet/types';
// Mobile: 63
// Extension: 0
export function removeWalletIsUnlockedState(state) {
    var _a;
    const newState = { ...state };
    (_a = newState === null || newState === void 0 ? void 0 : newState.wallet) === null || _a === void 0 ? true : delete _a.isUnlocked;
    return newState;
}
// Mobile: 64
// Extension: 1
export function removeUniconV2BehaviorState(state) {
    var _a;
    const newState = { ...state };
    (_a = newState === null || newState === void 0 ? void 0 : newState.behaviorHistory) === null || _a === void 0 ? true : delete _a.hasViewedUniconV2IntroModal;
    return newState;
}
// Mobile: 65
// Extension: 2
export function addRoutingFieldToTransactions(state) {
    var _a, _b, _c, _d;
    var _e;
    const oldTransactionState = state === null || state === void 0 ? void 0 : state.transactions;
    const newTransactionState = {};
    const addresses = Object.keys(oldTransactionState !== null && oldTransactionState !== void 0 ? oldTransactionState : {});
    for (const address of addresses) {
        const chainIds = Object.keys((_a = oldTransactionState[address]) !== null && _a !== void 0 ? _a : {});
        for (const chainId of chainIds) {
            const transactions = oldTransactionState[address][chainId];
            const txIds = Object.keys(transactions !== null && transactions !== void 0 ? transactions : {});
            for (const txId of txIds) {
                const txDetails = transactions[txId];
                if (!txDetails) {
                    // we iterate over every chain, need to no-op on some combinations
                    continue;
                }
                (_b = txDetails.options) !== null && _b !== void 0 ? _b : (txDetails.options = { request: {} });
                (_c = newTransactionState[address]) !== null && _c !== void 0 ? _c : (newTransactionState[address] = {});
                (_d = (_e = newTransactionState[address])[chainId]) !== null && _d !== void 0 ? _d : (_e[chainId] = {});
                // 'CLASSIC' comes from trading API Routing.Classic enum. It is hardcoded here as a string for safety incase the enum changes.
                newTransactionState[address][chainId][txId] = { routing: 'CLASSIC', ...txDetails };
            }
        }
    }
    return { ...state, transactions: newTransactionState };
}
// Mobile: 66
// Extension: 3
// Activates redux pending accounts as a result of migration to OnbardingContext.tsx. Migration rulses:
// 1. if there’s a view only pending account, always activate it
// 2. if there’s a signer pending account and it
//     a. has the same mnemonic id as the active account, always activate it unless:
//         1. if there’s more than 6, only activate the oldest/newest 3. delete the rest
//     b. has a different mnemonic id as the active account, always delete it
export function activatePendingAccounts(state) {
    if (!state.wallet) {
        return state;
    }
    const MAX_WALLET_IMPORT = 6;
    const { accounts } = state.wallet;
    const { activeAccountAddress } = state.wallet;
    const activeAccount = accounts[activeAccountAddress];
    const getActiveSignerAccountWalletsForActivation = () => {
        if (!activeAccountAddress || !activeAccount || activeAccount.type === AccountType.Readonly) {
            return [];
        }
        const activeSignerAccountPendingWallets = Object.values(accounts).filter((account) => account.type === AccountType.SignerMnemonic &&
            account.mnemonicId === activeAccount.mnemonicId &&
            account.pending === true);
        if (activeSignerAccountPendingWallets.length > MAX_WALLET_IMPORT) {
            // sorted active signer account pending addresses from the oldest to the newest
            const sortedActiveSignerAccountPendingWallets = activeSignerAccountPendingWallets
                .sort((a, b) => a.timeImportedMs - b.timeImportedMs)
                .map((account) => account.address);
            const firstThreeAndLastThreeAddresses = [
                ...sortedActiveSignerAccountPendingWallets.slice(0, MAX_WALLET_IMPORT / 2),
                ...sortedActiveSignerAccountPendingWallets.slice(-MAX_WALLET_IMPORT / 2),
            ];
            return firstThreeAndLastThreeAddresses;
        }
        else {
            return activeSignerAccountPendingWallets.map((account) => account.address);
        }
    };
    const pendingSignerAccountsForActivation = getActiveSignerAccountWalletsForActivation();
    const isActiveSignerAccountPendingWalletForActivation = (account) => pendingSignerAccountsForActivation.includes(account.address);
    const isNonPendingSignerAccount = (account) => account.type === AccountType.SignerMnemonic && !account.pending;
    const isReadOnlyAccount = (account) => account.type === AccountType.Readonly;
    const isCurrentlyActive = (account) => account.address === activeAccountAddress;
    const filteredNonPendingAccounts = {};
    Object.values(accounts).forEach((account) => {
        if (isActiveSignerAccountPendingWalletForActivation(account) ||
            isNonPendingSignerAccount(account) ||
            isReadOnlyAccount(account) ||
            isCurrentlyActive(account)) {
            delete account.pending;
            filteredNonPendingAccounts[account.address] = account;
        }
    });
    const firstActiveWalletAddress = Object.keys(filteredNonPendingAccounts)[0];
    const isAnyWallet = Object.keys(filteredNonPendingAccounts).length > 0;
    return {
        ...state,
        wallet: {
            ...state.wallet,
            activeAccountAddress: isAnyWallet ? activeAccountAddress || firstActiveWalletAddress : null,
            accounts: filteredNonPendingAccounts,
        },
    };
}
// Mobile: 68
// Extension: 5
export function deleteBetaOnboardingState(state) {
    var _a;
    const newState = { ...state };
    (_a = newState === null || newState === void 0 ? void 0 : newState.behaviorHistory) === null || _a === void 0 ? true : delete _a.extensionBetaFeedbackState;
    return newState;
}
export function deleteExtensionOnboardingState(state) {
    var _a;
    const newState = { ...state };
    (_a = newState === null || newState === void 0 ? void 0 : newState.behaviorHistory) === null || _a === void 0 ? true : delete _a.extensionOnboardingState;
    return newState;
}
// default watched wallets that were removed as defaults
const VITALIK_ETH_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
export const HAYDEN_ETH_ADDRESS = '0x50EC05ADe8280758E2077fcBC08D878D4aef79C3';
// Mobile: 70
// Extension: 7
export function deleteDefaultFavoritesFromFavoritesState(state) {
    var _a, _b;
    const newState = { ...state };
    const filteredWatchedAddresses = (_b = (_a = newState.favorites) === null || _a === void 0 ? void 0 : _a.watchedAddresses) === null || _b === void 0 ? void 0 : _b.filter((address) => !areAddressesEqual(address, VITALIK_ETH_ADDRESS) && !areAddressesEqual(address, HAYDEN_ETH_ADDRESS));
    return {
        ...newState,
        favorites: {
            ...newState.favorites,
            watchedAddresses: filteredWatchedAddresses,
        },
    };
}
// Mobile: 71
// Extension: 8
export function addHapticSetting(state) {
    const newState = { ...state };
    newState.appearanceSettings = {
        ...newState.appearanceSettings,
        hapticsEnabled: true,
    };
    return newState;
}
// Mobile: 72
// Extension: 9
export function addExploreAndWelcomeBehaviorHistory(state) {
    return {
        ...state,
        behaviorHistory: { ...state.behaviorHistory, hasViewedWelcomeWalletCard: false, hasUsedExplore: false },
    };
}
// Mobile: 73
// Extension: 10
export function moveUserSettings(state) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const newState = {
        ...state,
        userSettings: {
            hideSmallBalances: ((_b = (_a = state.wallet) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.hideSmallBalances) === false ? false : true,
            hideSpamTokens: ((_d = (_c = state.wallet) === null || _c === void 0 ? void 0 : _c.settings) === null || _d === void 0 ? void 0 : _d.hideSpamTokens) === false ? false : true,
        },
    };
    // Delete migrated settings
    (_f = (_e = newState.wallet) === null || _e === void 0 ? void 0 : _e.settings) === null || _f === void 0 ? true : delete _f.hideSmallBalances;
    (_h = (_g = newState.wallet) === null || _g === void 0 ? void 0 : _g.settings) === null || _h === void 0 ? true : delete _h.hideSpamTokens;
    // Delete unused settings
    (_k = (_j = newState.wallet) === null || _j === void 0 ? void 0 : _j.settings) === null || _k === void 0 ? true : delete _k.nftViewType;
    return newState;
}
// Mobile: 75
// Extension: 11
export function deleteHoldToSwapBehaviorHistory(state) {
    var _a, _b;
    const newState = { ...state };
    (_a = newState.behaviorHistory) === null || _a === void 0 ? true : delete _a.hasViewedReviewScreen;
    (_b = newState.behaviorHistory) === null || _b === void 0 ? true : delete _b.hasSubmittedHoldToSwap;
    return newState;
}
// Mobile: 76
// Extension: 12
export function addCreatedOnboardingRedesignAccountBehaviorHistory(state) {
    const newState = {
        ...state,
        behaviorHistory: {
            ...state.behaviorHistory,
            createdOnboardingRedesignAccount: false,
        },
    };
    return newState;
}
export function moveDismissedTokenWarnings(state) {
    var _a;
    // Don't migrate if the state doesn't exist
    if (typeof ((_a = state.tokens) === null || _a === void 0 ? void 0 : _a.dismissedWarningTokens) !== 'object') {
        return state;
    }
    // Translate old warning
    const newWarnings = {};
    Object.keys(state.tokens.dismissedWarningTokens).forEach((currencyId) => {
        const chainId = currencyIdToChain(currencyId);
        const address = currencyIdToAddress(currencyId);
        if (chainId) {
            const serializedToken = {
                chainId,
                address,
            };
            newWarnings[chainId] = newWarnings[chainId] || {};
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            newWarnings[chainId][address] = serializedToken;
        }
    });
    // Replace old warnings with new warnings
    const newState = {
        ...state,
        tokens: {
            dismissedTokenWarnings: newWarnings,
        },
    };
    return newState;
}
export function moveLanguageSetting(state) {
    var _a, _b;
    const newState = {
        ...state,
        languageSettings: undefined,
        userSettings: {
            ...state.userSettings,
            currentLanguage: (_b = (_a = state.languageSettings) === null || _a === void 0 ? void 0 : _a.currentLanguage) !== null && _b !== void 0 ? _b : Language.English,
        },
    };
    delete newState.languageSettings;
    return newState;
}
export function moveCurrencySetting(state) {
    var _a, _b;
    const newState = {
        ...state,
        fiatCurrencySettings: undefined,
        userSettings: {
            ...state.userSettings,
            currentCurrency: (_b = (_a = state.fiatCurrencySettings) === null || _a === void 0 ? void 0 : _a.currentCurrency) !== null && _b !== void 0 ? _b : FiatCurrency.UnitedStatesDollar,
        },
    };
    delete newState.fiatCurrencySettings;
    return newState;
}
export function updateExploreOrderByType(state) {
    var _a;
    const newState = { ...state };
    return {
        ...newState,
        wallet: {
            ...newState.wallet,
            settings: {
                ...(_a = newState.wallet) === null || _a === void 0 ? void 0 : _a.settings,
                tokensOrderBy: RankingType.Volume,
            },
        },
    };
}
// Mobile: 81
// Extension: 17
export function removeCreatedOnboardingRedesignAccountBehaviorHistory(state) {
    const newState = {
        ...state,
        behaviorHistory: {
            ...state.behaviorHistory,
            createdOnboardingRedesignAccount: undefined,
        },
    };
    delete newState.behaviorHistory.createdOnboardingRedesignAccount;
    return newState;
}
//# sourceMappingURL=walletMigrations.js.map