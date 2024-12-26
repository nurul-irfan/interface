export interface AddressWithBalanceAndName {
    address: string;
    balance?: number;
    unitag?: string;
    ensName?: string;
}
export declare function hasBalanceOrName(a: AddressWithBalanceAndName): boolean;
export declare function useImportableAccounts(importedAddresses?: Address[]): {
    importableAccounts?: AddressWithBalanceAndName[];
    isLoading: boolean;
    showError?: boolean;
    refetch: () => void;
};
export declare function useAddressesBalanceAndNames(addresses?: Address[]): {
    addressInfoMap?: AddressTo<AddressWithBalanceAndName>;
    isLoading: boolean;
    showError?: boolean;
    refetch: () => void;
};
export declare function useAddressesEnsNames(addresses: Address[]): {
    loading: boolean;
    ensMap?: AddressTo<string>;
};
//# sourceMappingURL=useImportableAccounts.d.ts.map