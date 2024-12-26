import type { Address } from './Address';
import type { TokenInRoute } from './TokenInRoute';
import type { V2Reserve } from './V2Reserve';
export type V2PoolInRoute = {
    type?: string;
    address?: Address;
    tokenIn?: TokenInRoute;
    tokenOut?: TokenInRoute;
    reserve0?: V2Reserve;
    reserve1?: V2Reserve;
    amountIn?: string;
    amountOut?: string;
};
//# sourceMappingURL=V2PoolInRoute.d.ts.map