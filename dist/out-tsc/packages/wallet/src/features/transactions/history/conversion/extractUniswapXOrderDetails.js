import { SwapOrderStatus, SwapOrderType, TokenStandard, } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { Routing } from 'uniswap/src/data/tradingApi/__generated__/index';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { fromGraphQLChain } from 'uniswap/src/features/chains/utils';
import { TransactionDetailsType, TransactionOriginType, TransactionStatus, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { buildCurrencyId } from 'uniswap/src/utils/currencyId';
import { deriveCurrencyAmountFromAssetResponse } from 'wallet/src/features/transactions/history/utils';
export function extractUniswapXOrderDetails(transaction) {
    var _a;
    if ((transaction === null || transaction === void 0 ? void 0 : transaction.details.__typename) !== TransactionDetailsType.UniswapXOrder) {
        return null;
    }
    const typeInfo = parseUniswapXOrderTransaction(transaction);
    // TODO: does not support parsing priority orders yet since priority orders are not supported in the trading API
    const routing = transaction.details.swapOrderType === SwapOrderType.Limit ? Routing.DUTCH_LIMIT : Routing.DUTCH_V2;
    // TODO (MOB-3609): Parse and show pending limit orders in Activity feed
    if (!typeInfo || transaction.details.swapOrderType === SwapOrderType.Limit) {
        return null;
    }
    return {
        routing,
        id: transaction.details.id,
        // TODO: WALL-4919: Remove hardcoded Mainnet
        chainId: (_a = fromGraphQLChain(transaction.chain)) !== null && _a !== void 0 ? _a : UniverseChainId.Mainnet,
        addedTime: transaction.timestamp * 1000, // convert to ms,
        status: remoteOrderStatusToLocalTxStatus(transaction.details.orderStatus),
        from: transaction.details.offerer, // This transaction is not on-chain, so use the offerer address as the from address
        orderHash: transaction.details.hash,
        typeInfo,
        transactionOriginType: TransactionOriginType.Internal,
    };
}
// eslint-disable-next-line consistent-return
function remoteOrderStatusToLocalTxStatus(orderStatus) {
    switch (orderStatus) {
        case SwapOrderStatus.Open:
            return TransactionStatus.Pending;
        case SwapOrderStatus.Expired:
            return TransactionStatus.Expired;
        case SwapOrderStatus.Error:
            return TransactionStatus.Failed;
        case SwapOrderStatus.InsufficientFunds:
            return TransactionStatus.InsufficientFunds;
        case SwapOrderStatus.Filled:
            return TransactionStatus.Success;
        case SwapOrderStatus.Cancelled:
            return TransactionStatus.Canceled;
    }
}
export default function parseUniswapXOrderTransaction(transaction) {
    var _a;
    if (((_a = transaction === null || transaction === void 0 ? void 0 : transaction.details) === null || _a === void 0 ? void 0 : _a.__typename) !== TransactionDetailsType.UniswapXOrder) {
        return null;
    }
    const chainId = fromGraphQLChain(transaction.chain);
    if (!chainId) {
        return null;
    }
    // Token swap
    const inputCurrencyId = transaction.details.inputToken.address
        ? buildCurrencyId(chainId, transaction.details.inputToken.address)
        : null;
    const outputCurrencyId = transaction.details.outputToken.address
        ? buildCurrencyId(chainId, transaction.details.outputToken.address)
        : null;
    const inputCurrencyAmountRaw = deriveCurrencyAmountFromAssetResponse(TokenStandard.Erc20, transaction.chain, transaction.details.inputToken.address, transaction.details.inputToken.decimals, transaction.details.inputTokenQuantity);
    const outputCurrencyAmountRaw = deriveCurrencyAmountFromAssetResponse(TokenStandard.Erc20, transaction.chain, transaction.details.outputToken.address, transaction.details.outputToken.decimals, transaction.details.outputTokenQuantity);
    if (!inputCurrencyId || !outputCurrencyId) {
        return null;
    }
    return {
        type: TransactionType.Swap,
        inputCurrencyId,
        outputCurrencyId,
        inputCurrencyAmountRaw,
        outputCurrencyAmountRaw,
    };
}
//# sourceMappingURL=extractUniswapXOrderDetails.js.map