/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The routing preference determines which protocol to use for the swap. If the routing preference is `UNISWAPX`, then the swap will be routed through the UniswapX Dutch Auction Protocol. If the routing preference is `CLASSIC`, then the swap will be routed through the Classic Protocol. If the routing preference is `BEST_PRICE`, then the swap will be routed through the protocol that provides the best price. When `UNIXWAPX_V2` is passed, the swap will be routed through the UniswapX V2 Dutch Auction Protocol. When `V3_ONLY` is passed, the swap will be routed ONLY through the Uniswap V3 Protocol. When `V2_ONLY` is passed, the swap will be routed ONLY through the Uniswap V2 Protocol.
 */
export var RoutingPreference;
(function (RoutingPreference) {
    RoutingPreference["CLASSIC"] = "CLASSIC";
    RoutingPreference["UNISWAPX"] = "UNISWAPX";
    RoutingPreference["BEST_PRICE"] = "BEST_PRICE";
    RoutingPreference["BEST_PRICE_V2"] = "BEST_PRICE_V2";
    RoutingPreference["UNISWAPX_V2"] = "UNISWAPX_V2";
    RoutingPreference["V3_ONLY"] = "V3_ONLY";
    RoutingPreference["V2_ONLY"] = "V2_ONLY";
})(RoutingPreference || (RoutingPreference = {}));
//# sourceMappingURL=RoutingPreference.js.map