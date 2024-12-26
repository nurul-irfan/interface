import { getChainInfo } from 'uniswap/src/features/chains/chainInfo';
import { RPCType } from 'uniswap/src/features/chains/types';
export function isPrivateRpcSupportedOnChain(chainId) {
    var _a;
    return Boolean((_a = getChainInfo(chainId).rpcUrls) === null || _a === void 0 ? void 0 : _a[RPCType.Private]);
}
//# sourceMappingURL=utils.js.map