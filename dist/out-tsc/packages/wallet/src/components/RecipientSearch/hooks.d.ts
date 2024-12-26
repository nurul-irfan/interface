import { SearchableRecipient } from 'uniswap/src/features/address/types';
type RecipientSection = {
    title?: string;
    data: SearchableRecipient[];
};
export declare function useRecipients(pattern: string, debounceDelayMs?: number): {
    sections: RecipientSection[];
    searchableRecipientOptions: {
        data: SearchableRecipient;
        key: string;
    }[];
    loading: boolean;
    debouncedPattern: string;
};
export declare function useFilteredRecipientSections(searchPattern: string, debounceDelayMs?: number): {
    sections: RecipientSection[];
    loading: boolean;
};
export {};
//# sourceMappingURL=hooks.d.ts.map