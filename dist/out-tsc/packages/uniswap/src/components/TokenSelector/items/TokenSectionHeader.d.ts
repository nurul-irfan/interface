/// <reference types="react" />
import { TokenOptionSection } from 'uniswap/src/components/TokenSelector/types';
export type TokenSectionHeaderProps = {
    sectionKey: TokenOptionSection;
    rightElement?: JSX.Element;
    endElement?: JSX.Element;
    name?: string;
};
export declare const SectionHeader: import("react").NamedExoticComponent<TokenSectionHeaderProps>;
export declare function useTokenOptionsSectionTitle(section: TokenOptionSection): string;
//# sourceMappingURL=TokenSectionHeader.d.ts.map