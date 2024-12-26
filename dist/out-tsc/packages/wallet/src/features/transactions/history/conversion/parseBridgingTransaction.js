import { TokenStandard, TransactionDirection, } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { fromGraphQLChain } from 'uniswap/src/features/chains/utils';
import { ACROSS_DAPP_INFO } from 'uniswap/src/features/transactions/swap/utils/routing';
import { TransactionDetailsType, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { buildCurrencyId, buildNativeCurrencyId } from 'uniswap/src/utils/currencyId';
import { deriveCurrencyAmountFromAssetResponse } from 'wallet/src/features/transactions/history/utils';
export default function parseBridgingTransaction(transaction) {
    if (transaction.details && transaction.details.__typename !== TransactionDetailsType.Transaction) {
        return undefined;
    }
    const outTokenTransfer = findTokenTransfer(transaction.details.assetChanges, TransactionDirection.Out);
    const inTokenTransfer = findTokenTransfer(transaction.details.assetChanges, TransactionDirection.In);
    const outChainId = fromGraphQLChain(outTokenTransfer === null || outTokenTransfer === void 0 ? void 0 : outTokenTransfer.asset.chain);
    const inChainId = fromGraphQLChain(inTokenTransfer === null || inTokenTransfer === void 0 ? void 0 : inTokenTransfer.asset.chain);
    if (!outTokenTransfer || !outChainId || !inTokenTransfer || !inChainId) {
        return undefined;
    }
    const outCurrencyId = outTokenTransfer.tokenStandard === TokenStandard.Native
        ? buildNativeCurrencyId(outChainId)
        : outTokenTransfer.asset.address
            ? buildCurrencyId(outChainId, outTokenTransfer.asset.address)
            : undefined;
    const inCurrencyId = inTokenTransfer.tokenStandard === TokenStandard.Native
        ? buildNativeCurrencyId(inChainId)
        : inTokenTransfer.asset.address
            ? buildCurrencyId(inChainId, inTokenTransfer.asset.address)
            : undefined;
    if (!outCurrencyId || !inCurrencyId) {
        return undefined;
    }
    const outCurrencyAmountRaw = deriveCurrencyAmountFromAssetResponse(outTokenTransfer.tokenStandard, outTokenTransfer.asset.chain, outTokenTransfer.asset.address, outTokenTransfer.asset.decimals, outTokenTransfer.quantity);
    const inCurrencyAmountRaw = deriveCurrencyAmountFromAssetResponse(inTokenTransfer.tokenStandard, inTokenTransfer.asset.chain, inTokenTransfer.asset.address, inTokenTransfer.asset.decimals, inTokenTransfer.quantity);
    return {
        type: TransactionType.Bridge,
        inputCurrencyId: outCurrencyId,
        inputCurrencyAmountRaw: outCurrencyAmountRaw,
        outputCurrencyId: inCurrencyId,
        outputCurrencyAmountRaw: inCurrencyAmountRaw,
        routingDappInfo: ACROSS_DAPP_INFO,
    };
}
function findTokenTransfer(assetChanges, direction) {
    return assetChanges.find((t) => (t === null || t === void 0 ? void 0 : t.__typename) === 'TokenTransfer' && t.direction === direction);
}
//# sourceMappingURL=parseBridgingTransaction.js.map