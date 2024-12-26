import { useApolloClient } from '@apollo/client';
import { useCallback, useMemo, useState } from 'react';
import { SelectWalletScreenDocument, } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains';
import { useENSName } from 'uniswap/src/features/ens/api';
import { useAsyncData } from 'utilities/src/react/hooks';
import { NUMBER_OF_WALLETS_TO_GENERATE } from 'wallet/src/features/onboarding/OnboardingContext';
import { fetchUnitagByAddresses } from 'wallet/src/features/unitags/api';
export function hasBalanceOrName(a) {
    return Boolean((a.balance && a.balance > 0) || a.ensName || a.unitag);
}
export function useImportableAccounts(importedAddresses) {
    const isLoadingAddresses = (importedAddresses === null || importedAddresses === void 0 ? void 0 : importedAddresses.length) !== NUMBER_OF_WALLETS_TO_GENERATE;
    const { addressInfoMap, isLoading, showError, refetch } = useAddressesBalanceAndNames(isLoadingAddresses ? undefined : importedAddresses);
    const accountsWithBalanceOrName = Object.values(addressInfoMap !== null && addressInfoMap !== void 0 ? addressInfoMap : {}).filter(hasBalanceOrName);
    const importableAccounts = useMemo(() => {
        if (accountsWithBalanceOrName.length > 0) {
            // If there's accounts of significance, return them
            return accountsWithBalanceOrName;
        }
        else if (!isLoading && importedAddresses && importedAddresses[0]) {
            // if there's no significant accounts, return the first address
            return [{ address: importedAddresses[0] }];
        }
        else if (!isLoading && !(importedAddresses === null || importedAddresses === void 0 ? void 0 : importedAddresses.length)) {
            throw new Error('No imported addresses found');
        }
        else {
            // otherwise return undefined, still loading
            return undefined;
        }
    }, [accountsWithBalanceOrName, importedAddresses, isLoading]);
    return {
        importableAccounts,
        isLoading,
        showError,
        refetch,
    };
}
export function useAddressesBalanceAndNames(addresses) {
    const [refetchCount, setRefetchCount] = useState(0);
    const apolloClient = useApolloClient();
    const addressesArray = useMemo(() => (addresses ? addresses : []), [addresses]);
    const isLoadingAddresses = addressesArray.length === 0;
    const refetch = useCallback(async () => {
        setRefetchCount((count) => count + 1);
        return refetch();
    }, []);
    const { ensMap, loading: ensLoading } = useAddressesEnsNames(addressesArray);
    const { gqlChains } = useEnabledChains();
    const fetchBalanceAndUnitags = useCallback(async () => {
        var _a, _b, _c;
        if (addressesArray.length === 0) {
            return undefined;
        }
        const valueModifiers = addressesArray.map((addr) => ({
            ownerAddress: addr,
            includeSmallBalances: true,
            includeSpamTokens: false,
        }));
        const fetchBalances = apolloClient.query({
            query: SelectWalletScreenDocument,
            variables: { ownerAddresses: addressesArray, chains: gqlChains, valueModifiers },
        });
        const fetchUnitags = fetchUnitagByAddresses(addressesArray);
        const [balancesResponse, unitagsResponse] = await Promise.all([fetchBalances, fetchUnitags]);
        const unitagsByAddress = (_a = unitagsResponse === null || unitagsResponse === void 0 ? void 0 : unitagsResponse.data) !== null && _a !== void 0 ? _a : {};
        const balancesByAddress = ((_c = (_b = balancesResponse === null || balancesResponse === void 0 ? void 0 : balancesResponse.data) === null || _b === void 0 ? void 0 : _b.portfolios) !== null && _c !== void 0 ? _c : []).reduce((balances, portfolios) => {
            var _a;
            if (portfolios === null || portfolios === void 0 ? void 0 : portfolios.ownerAddress) {
                balances[portfolios.ownerAddress] = (_a = portfolios.tokensTotalDenominatedValue) === null || _a === void 0 ? void 0 : _a.value;
            }
            return balances;
        }, {});
        const dataMap = addressesArray.reduce((map, address) => {
            var _a;
            const entry = {
                address,
                balance: balancesByAddress[address],
                unitag: (_a = unitagsByAddress[address]) === null || _a === void 0 ? void 0 : _a.username,
            };
            map[entry.address] = entry;
            return map;
        }, {});
        return dataMap;
        // We use `refetchCount` as a dependency to manually trigger a refetch when calling the `refetch` function.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressesArray, apolloClient, refetchCount, gqlChains]);
    const { data: balanceAndUnitags, isLoading: balanceAndUnitagsLoading, error: fetchingError, } = useAsyncData(fetchBalanceAndUnitags);
    const addressInfoMap = useMemo(() => {
        if (balanceAndUnitags === undefined) {
            return undefined;
        }
        else {
            const res = {};
            Object.entries(balanceAndUnitags).forEach(([address, info]) => {
                res[address] = {
                    ...info,
                    ensName: ensMap && ensMap[address],
                };
            });
            return res;
        }
    }, [balanceAndUnitags, ensMap]);
    return useMemo(() => ({
        addressInfoMap,
        // This function is loading if we don't have addresses or are waiting on data. The first two are data, the
        // last two cases occur when we are waiting for addresses
        isLoading: balanceAndUnitagsLoading || ensLoading || isLoadingAddresses || addressInfoMap === undefined,
        error: fetchingError && !(balanceAndUnitags === null || balanceAndUnitags === void 0 ? void 0 : balanceAndUnitags.length),
        refetch,
    }), [
        addressInfoMap,
        balanceAndUnitags,
        balanceAndUnitagsLoading,
        ensLoading,
        fetchingError,
        isLoadingAddresses,
        refetch,
    ]);
}
export function useAddressesEnsNames(addresses) {
    // Need to fetch ENS names for each derivation index
    const ensNameStates = useMemo(() => Array(NUMBER_OF_WALLETS_TO_GENERATE), []);
    ensNameStates[0] = useENSName(addresses[0]);
    ensNameStates[1] = useENSName(addresses[1]);
    ensNameStates[2] = useENSName(addresses[2]);
    ensNameStates[3] = useENSName(addresses[3]);
    ensNameStates[4] = useENSName(addresses[4]);
    ensNameStates[5] = useENSName(addresses[5]);
    ensNameStates[6] = useENSName(addresses[6]);
    ensNameStates[7] = useENSName(addresses[7]);
    ensNameStates[8] = useENSName(addresses[8]);
    ensNameStates[9] = useENSName(addresses[9]);
    // Using these values to recalculate dependency array
    const ensLoading = ensNameStates.some((ensState) => ensState === null || ensState === void 0 ? void 0 : ensState.isLoading);
    const nameMap = useMemo(() => {
        // skip if not all loaded
        if (ensLoading) {
            return {};
        }
        return addresses.reduce((map, address, index) => {
            var _a;
            const nameData = (_a = ensNameStates[index]) === null || _a === void 0 ? void 0 : _a.data;
            if (nameData) {
                map[address] = nameData;
            }
            return map;
        }, {});
    }, [addresses, ensLoading, ensNameStates]);
    return {
        ensMap: ensLoading ? undefined : nameMap,
        loading: ensLoading,
    };
}
//# sourceMappingURL=useImportableAccounts.js.map