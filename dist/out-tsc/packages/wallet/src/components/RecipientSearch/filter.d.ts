import { SearchableRecipient } from 'uniswap/src/features/address/types';
export type AutocompleteOption<T> = {
    data: T;
    key: string;
};
export declare function filterRecipientsByName(searchPattern: string | null, list: AutocompleteOption<SearchableRecipient>[]): AutocompleteOption<SearchableRecipient>[];
export declare function filterRecipientsByAddress(searchPattern: string | null, list: AutocompleteOption<SearchableRecipient>[]): AutocompleteOption<SearchableRecipient>[];
export declare function filterRecipientByNameAndAddress(searchPattern: string | null, list: AutocompleteOption<SearchableRecipient>[]): AutocompleteOption<SearchableRecipient>[];
//# sourceMappingURL=filter.d.ts.map