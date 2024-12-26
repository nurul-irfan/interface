/// <reference types="react" />
import { TradeableAsset } from 'uniswap/src/entities/assets';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types';
import { FiatNumberType } from 'utilities/src/format/types';
export type TokenOption = {
    currencyInfo: CurrencyInfo;
    quantity: number | null;
    balanceUSD: Maybe<number>;
    isUnsupported?: boolean;
};
export type OnSelectCurrency = (currency: CurrencyInfo, section: TokenSection, index: number) => void;
export declare enum TokenOptionSection {
    YourTokens = "yourTokens",
    PopularTokens = "popularTokens",
    RecentTokens = "recentTokens",
    FavoriteTokens = "favoriteTokens",
    SearchResults = "searchResults",
    SuggestedTokens = "suggestedTokens",
    BridgingTokens = "bridgingTokens"
}
export type TokenSection = {
    data: TokenOption[] | TokenOption[][];
    sectionKey: TokenOptionSection;
    name?: string;
    rightElement?: JSX.Element;
    endElement?: JSX.Element;
};
export type TokenSectionsHookProps = {
    activeAccountAddress?: string;
    chainFilter: UniverseChainId | null;
    input?: TradeableAsset;
    isKeyboardOpen?: boolean;
};
export type ConvertFiatAmountFormattedCallback = (fromAmount: Maybe<string | number>, numberType: FiatNumberType, placeholder?: string | undefined) => string;
export declare enum TokenSelectorFlow {
    Swap = 0,
    Send = 1
}
//# sourceMappingURL=types.d.ts.map