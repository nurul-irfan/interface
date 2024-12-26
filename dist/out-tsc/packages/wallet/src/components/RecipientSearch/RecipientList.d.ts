/// <reference types="react" />
import { SectionListData } from 'react-native';
import { SearchableRecipient } from 'uniswap/src/features/address/types';
interface RecipientListProps {
    renderedInModal?: boolean;
    sections: SectionListData<SearchableRecipient>[];
    onPress: (recipient: string) => void;
}
export declare function RecipientList({ onPress, sections, renderedInModal }: RecipientListProps): JSX.Element;
interface RecipientProps {
    recipient: SearchableRecipient;
    onPress: (recipient: SearchableRecipient) => void;
}
export declare const RecipientRow: import("react").NamedExoticComponent<RecipientProps>;
export {};
//# sourceMappingURL=RecipientList.d.ts.map