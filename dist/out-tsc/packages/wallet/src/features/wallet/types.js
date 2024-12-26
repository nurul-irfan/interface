export var NFTViewType;
(function (NFTViewType) {
    NFTViewType[NFTViewType["Grid"] = 0] = "Grid";
    NFTViewType[NFTViewType["Collection"] = 1] = "Collection";
})(NFTViewType || (NFTViewType = {}));
/**
 * These types are not currently included in the protbufs generated types. For now will specifiy here
 * and remove when added to protobuf.
 * https://github.com/Uniswap/backend/blob/397033c6c63703f2dddfd5ae4bb95c54ecd0c23b/packages/services/explore/src/model/types.ts#L19-L30
 */
export var RankingType;
(function (RankingType) {
    RankingType["TotalValueLocked"] = "TOTAL_VALUE_LOCKED";
    RankingType["MarketCap"] = "MARKET_CAP";
    RankingType["Volume"] = "VOLUME";
    RankingType["Popularity"] = "POPULARITY";
})(RankingType || (RankingType = {}));
export var CustomRankingType;
(function (CustomRankingType) {
    CustomRankingType["PricePercentChange1DayAsc"] = "PRICE_PERCENT_CHANGE_1_DAY_ASC";
    CustomRankingType["PricePercentChange1DayDesc"] = "PRICE_PERCENT_CHANGE_1_DAY_DESC";
})(CustomRankingType || (CustomRankingType = {}));
export var TokenMetadataDisplayType;
(function (TokenMetadataDisplayType) {
    TokenMetadataDisplayType[TokenMetadataDisplayType["MarketCap"] = 0] = "MarketCap";
    TokenMetadataDisplayType[TokenMetadataDisplayType["Volume"] = 1] = "Volume";
    TokenMetadataDisplayType[TokenMetadataDisplayType["TVL"] = 2] = "TVL";
    TokenMetadataDisplayType[TokenMetadataDisplayType["Symbol"] = 3] = "Symbol";
})(TokenMetadataDisplayType || (TokenMetadataDisplayType = {}));
export var DisplayNameType;
(function (DisplayNameType) {
    DisplayNameType[DisplayNameType["Address"] = 0] = "Address";
    DisplayNameType[DisplayNameType["ENS"] = 1] = "ENS";
    DisplayNameType[DisplayNameType["Local"] = 2] = "Local";
    DisplayNameType[DisplayNameType["Unitag"] = 3] = "Unitag";
})(DisplayNameType || (DisplayNameType = {}));
//# sourceMappingURL=types.js.map