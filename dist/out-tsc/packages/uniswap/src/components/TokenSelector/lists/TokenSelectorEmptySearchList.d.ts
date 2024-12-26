/// <reference types="react" />
import { OnSelectCurrency } from 'uniswap/src/components/TokenSelector/types';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
declare function _TokenSelectorEmptySearchList({ chainFilter, onSelectCurrency, }: {
    onSelectCurrency: OnSelectCurrency;
    chainFilter: UniverseChainId | null;
    isKeyboardOpen?: boolean;
}): JSX.Element;
export declare const TokenSelectorEmptySearchList: import("react").MemoExoticComponent<typeof _TokenSelectorEmptySearchList>;
export {};
//# sourceMappingURL=TokenSelectorEmptySearchList.d.ts.map