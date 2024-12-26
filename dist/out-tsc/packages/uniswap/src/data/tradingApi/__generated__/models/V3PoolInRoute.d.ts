import type { Address } from './Address';
import type { TokenInRoute } from './TokenInRoute';
export type V3PoolInRoute = {
    type?: string;
    address?: Address;
    tokenIn?: TokenInRoute;
    tokenOut?: TokenInRoute;
    sqrtRatioX96?: string;
    liquidity?: string;
    tickCurrent?: string;
    fee?: string;
    amountIn?: string;
    amountOut?: string;
};
//# sourceMappingURL=V3PoolInRoute.d.ts.map