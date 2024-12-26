/// <reference types="react" />
import { OnSelectCurrency, TokenOption, TokenSection } from 'uniswap/src/components/TokenSelector/types';
export type HorizontalTokenListProps = {
    tokens: TokenOption[];
    onSelectCurrency: OnSelectCurrency;
    index: number;
    section: TokenSection;
    expanded?: boolean;
    onExpand?: () => void;
};
export declare const HorizontalTokenList: import("react").NamedExoticComponent<HorizontalTokenListProps>;
//# sourceMappingURL=HorizontalTokenList.d.ts.map