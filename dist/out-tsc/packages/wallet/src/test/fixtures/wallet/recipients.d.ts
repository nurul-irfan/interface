import { SearchableRecipient } from 'uniswap/src/features/address/types';
export declare const searchableRecipient: {
    <O extends Partial<SearchableRecipient>>(overrides: O): Omit<{
        address: string;
        name: string;
    }, keyof O> & O;
    (): {
        address: string;
        name: string;
    };
};
type RecipientSectionOptions = {
    addresses: string[];
};
export declare const recipientSection: {
    <O extends Partial<import("react-native").SectionBase<SearchableRecipient, import("react-native").DefaultSectionT> & import("react-native").DefaultSectionT & RecipientSectionOptions>>(overrides: O): Omit<{
        title: string;
        data: (Omit<{
            address: string;
            name: string;
        }, "address"> & {
            address: string;
        })[];
    }, Exclude<keyof O, string | number>> & Omit<O, "addresses">;
    (): {
        title: string;
        data: (Omit<{
            address: string;
            name: string;
        }, "address"> & {
            address: string;
        })[];
    };
};
export {};
//# sourceMappingURL=recipients.d.ts.map