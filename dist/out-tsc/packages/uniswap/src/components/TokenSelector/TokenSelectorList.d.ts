/// <reference types="react" />
import { OnSelectCurrency, TokenSection } from 'uniswap/src/components/TokenSelector/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
interface TokenSelectorListProps {
    onSelectCurrency: OnSelectCurrency;
    sections?: TokenSection[];
    chainFilter?: UniverseChainId | null;
    showTokenWarnings: boolean;
    refetch?: () => void;
    loading?: boolean;
    hasError?: boolean;
    emptyElement?: JSX.Element;
    errorText?: string;
    showTokenAddress?: boolean;
    isKeyboardOpen?: boolean;
}
declare function _TokenSelectorList({ onSelectCurrency, sections, chainFilter, showTokenWarnings, isKeyboardOpen, refetch, loading, hasError, emptyElement, errorText, showTokenAddress, }: TokenSelectorListProps): JSX.Element;
export declare const TokenSelectorList: import("react").MemoExoticComponent<typeof _TokenSelectorList>;
export {};
//# sourceMappingURL=TokenSelectorList.d.ts.map