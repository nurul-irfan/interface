import { toGqlSafetyLevel } from 'uniswap/src/components/TokenSelector/utils';
import { getNativeAddress } from 'uniswap/src/constants/addresses';
import { toSupportedChainId } from 'uniswap/src/features/chains/utils';
import { buildCurrency } from 'uniswap/src/features/dataApi/utils';
import { NATIVE_ADDRESS_FOR_TRADING_API } from 'uniswap/src/features/transactions/swap/utils/tradingApi';
import { currencyId } from 'uniswap/src/utils/currencyId';
export function tradingApiSwappableTokenToCurrencyInfo(token) {
    var _a, _b, _c, _d;
    const isNative = token.address === NATIVE_ADDRESS_FOR_TRADING_API;
    const supportedChainId = toSupportedChainId(token.chainId);
    if (!supportedChainId) {
        return undefined;
    }
    const currency = buildCurrency({
        chainId: supportedChainId,
        address: isNative ? getNativeAddress(supportedChainId) : token.address,
        decimals: token.decimals,
        symbol: token.symbol,
        name: token.name,
    });
    if (!currency) {
        return undefined;
    }
    const currencyInfo = {
        currency,
        currencyId: currencyId(currency),
        logoUrl: (_b = (_a = token.project) === null || _a === void 0 ? void 0 : _a.logo) === null || _b === void 0 ? void 0 : _b.url,
        isSpam: (_c = token.project) === null || _c === void 0 ? void 0 : _c.isSpam,
        safetyLevel: toGqlSafetyLevel((_d = token.project) === null || _d === void 0 ? void 0 : _d.safetyLevel),
    };
    return currencyInfo;
}
//# sourceMappingURL=tradingApiSwappableTokenToCurrencyInfo.js.map