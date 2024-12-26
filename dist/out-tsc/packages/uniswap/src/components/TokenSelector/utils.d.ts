/// <reference types="react" />
import { TokenOption, TokenOptionSection, TokenSection, TokenSelectorFlow } from 'uniswap/src/components/TokenSelector/types';
import { SafetyLevel as GqlSafetyLevel } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { GetSwappableTokensResponse, SafetyLevel } from 'uniswap/src/data/tradingApi/__generated__';
import { CurrencyInfo, PortfolioBalance } from 'uniswap/src/features/dataApi/types';
import { ModalNameType } from 'uniswap/src/features/telemetry/constants';
export declare function createEmptyBalanceOption(currencyInfo: CurrencyInfo): TokenOption;
export declare function createEmptyTokenOptionFromBridgingToken(token: GetSwappableTokensResponse['tokens'][0]): TokenOption | undefined;
export declare function toGqlSafetyLevel(safetyLevel: SafetyLevel): GqlSafetyLevel | null;
export declare function tokenOptionDifference(currencies: TokenOption[] | undefined, without: TokenOption[] | undefined): TokenOption[] | undefined;
export declare function formatSearchResults(searchResultCurrencies: CurrencyInfo[] | undefined, portfolioBalancesById: Record<string, PortfolioBalance> | undefined, searchFilter: string | null): TokenOption[] | undefined;
/**
 * Utility to merge the search results with the bridging tokens.
 * Also updates the search results section name accordingly
 */
export declare function mergeSearchResultsWithBridgingTokens(searchResults: TokenSection[] | undefined, bridgingTokens: TokenOption[] | undefined, sectionHeaderString: string | undefined): TokenSection[] | undefined;
export declare function isTokenOptionArray(option: TokenOption | TokenOption[]): option is TokenOption[];
export declare function useTokenOptionsSection({ sectionKey, tokenOptions, rightElement, endElement, name, }: {
    sectionKey: TokenOptionSection;
    tokenOptions?: TokenOption[] | TokenOption[][];
    rightElement?: JSX.Element;
    endElement?: JSX.Element;
    name?: string;
}): TokenSection[] | undefined;
export declare function isSwapListLoading(loading: boolean, portfolioSection: TokenSection[] | undefined, popularSection: TokenSection[] | undefined): boolean;
export declare function flowToModalName(flow: TokenSelectorFlow): ModalNameType | undefined;
//# sourceMappingURL=utils.d.ts.map