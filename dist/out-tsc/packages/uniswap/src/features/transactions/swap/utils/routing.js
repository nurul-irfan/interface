import { ADDRESS_ZERO } from '@uniswap/v3-sdk';
import { Routing } from 'uniswap/src/data/tradingApi/__generated__/index';
export function isUniswapX(obj) {
    return obj.routing === Routing.DUTCH_V2 || obj.routing === Routing.DUTCH_LIMIT || obj.routing === Routing.PRIORITY;
}
export function isClassic(obj) {
    return obj.routing === Routing.CLASSIC;
}
export function isBridge(obj) {
    return obj.routing === Routing.BRIDGE;
}
export const ACROSS_DAPP_INFO = {
    name: 'Across API',
    address: ADDRESS_ZERO,
    icon: 'https://protocol-icons.s3.amazonaws.com/icons/across.jpg',
};
//# sourceMappingURL=routing.js.map