// TODO(MOB-203): reduce component complexity
/* eslint-disable complexity */
import { BigNumber } from 'ethers';
import { TokenStandard, TransactionDirection, } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { fromGraphQLChain } from 'uniswap/src/features/chains/utils';
import { NFTTradeType, TransactionDetailsType, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { buildCurrencyId, buildNativeCurrencyId, buildWrappedNativeCurrencyId } from 'uniswap/src/utils/currencyId';
import { deriveCurrencyAmountFromAssetResponse, parseUSDValueFromAssetChange, } from 'wallet/src/features/transactions/history/utils';
export default function parseTradeTransaction(transaction) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    // ignore UniswapX transactions for now
    if (((_a = transaction === null || transaction === void 0 ? void 0 : transaction.details) === null || _a === void 0 ? void 0 : _a.__typename) !== TransactionDetailsType.Transaction) {
        return undefined;
    }
    const chainId = fromGraphQLChain(transaction.chain);
    if (!chainId) {
        return undefined;
    }
    const txAssetChanges = (_c = (_b = transaction.details.assetChanges) === null || _b === void 0 ? void 0 : _b.filter((t) => (t === null || t === void 0 ? void 0 : t.__typename) === 'TokenTransfer' || (t === null || t === void 0 ? void 0 : t.__typename) === 'NftTransfer')) !== null && _c !== void 0 ? _c : [];
    // for detecting wraps
    const nativeCurrencyID = buildNativeCurrencyId(chainId).toLocaleLowerCase();
    const wrappedCurrencyID = buildWrappedNativeCurrencyId(chainId).toLocaleLowerCase();
    const sent = txAssetChanges.find((t) => t.direction === TransactionDirection.Out);
    const { received, refund } = txAssetChanges.reduce((acc, t) => {
        if (t.direction !== TransactionDirection.In) {
            return acc;
        }
        const isRefundInternalTx = (t === null || t === void 0 ? void 0 : t.__typename) === 'TokenTransfer' && t.asset.id === (sent === null || sent === void 0 ? void 0 : sent.asset.id) && t.tokenStandard === TokenStandard.Native;
        if (isRefundInternalTx) {
            acc.refund = t;
        }
        else {
            acc.received = t;
        }
        return acc;
    }, {
        refund: undefined,
        received: undefined,
    });
    // Invalid input/output info
    if (!sent || !received) {
        return undefined;
    }
    const onlyERC20Tokens = sent.__typename === 'TokenTransfer' && received.__typename === 'TokenTransfer';
    const containsNFT = sent.__typename === 'NftTransfer' || received.__typename === 'NftTransfer';
    if (!(onlyERC20Tokens || containsNFT)) {
        return undefined;
    }
    // Token swap
    if (onlyERC20Tokens) {
        const inputCurrencyId = sent.tokenStandard === TokenStandard.Native
            ? buildNativeCurrencyId(chainId)
            : sent.asset.address
                ? buildCurrencyId(chainId, sent.asset.address)
                : null;
        const outputCurrencyId = received.tokenStandard === TokenStandard.Native
            ? buildNativeCurrencyId(chainId)
            : received.asset.address
                ? buildCurrencyId(chainId, received.asset.address)
                : null;
        let inputCurrencyAmountRaw = deriveCurrencyAmountFromAssetResponse(sent.tokenStandard, sent.asset.chain, sent.asset.address, sent.asset.decimals, sent.quantity);
        if (refund && refund.tokenStandard === sent.tokenStandard) {
            const refundCurrencyAmountRaw = deriveCurrencyAmountFromAssetResponse(refund.tokenStandard, refund.asset.chain, refund.asset.address, refund.asset.decimals, refund.quantity);
            inputCurrencyAmountRaw = BigNumber.from(inputCurrencyAmountRaw).sub(refundCurrencyAmountRaw).toString();
        }
        const outputCurrencyAmountRaw = deriveCurrencyAmountFromAssetResponse(received.tokenStandard, received.asset.chain, received.asset.address, received.asset.decimals, received.quantity);
        const transactedUSDValue = parseUSDValueFromAssetChange(sent.transactedValue);
        // Data API marks wrap as a swap.
        if (((inputCurrencyId === null || inputCurrencyId === void 0 ? void 0 : inputCurrencyId.toLocaleLowerCase()) === nativeCurrencyID &&
            (outputCurrencyId === null || outputCurrencyId === void 0 ? void 0 : outputCurrencyId.toLocaleLowerCase()) === wrappedCurrencyID) ||
            ((inputCurrencyId === null || inputCurrencyId === void 0 ? void 0 : inputCurrencyId.toLocaleLowerCase()) === wrappedCurrencyID &&
                (outputCurrencyId === null || outputCurrencyId === void 0 ? void 0 : outputCurrencyId.toLocaleLowerCase()) === nativeCurrencyID)) {
            return {
                type: TransactionType.Wrap,
                unwrapped: outputCurrencyId.toLocaleLowerCase() === nativeCurrencyID.toLocaleLowerCase(),
                currencyAmountRaw: inputCurrencyAmountRaw,
            };
        }
        if (!inputCurrencyId || !outputCurrencyId) {
            return undefined;
        }
        return {
            type: TransactionType.Swap,
            inputCurrencyId,
            outputCurrencyId,
            transactedUSDValue,
            inputCurrencyAmountRaw,
            outputCurrencyAmountRaw,
        };
    }
    // NFT trade found
    if (containsNFT) {
        const nftChange = [received, sent].find((t) => t.__typename === 'NftTransfer');
        const tokenChange = [received, sent].find((t) => t.__typename === 'TokenTransfer');
        // TODO: [MOB-236] Monitor txns where we have only NFT swaps
        if ((nftChange === null || nftChange === void 0 ? void 0 : nftChange.__typename) !== 'NftTransfer' || (tokenChange === null || tokenChange === void 0 ? void 0 : tokenChange.__typename) !== 'TokenTransfer') {
            return undefined;
        }
        const name = (_d = nftChange.asset) === null || _d === void 0 ? void 0 : _d.name;
        const collectionName = (_f = (_e = nftChange.asset) === null || _e === void 0 ? void 0 : _e.collection) === null || _f === void 0 ? void 0 : _f.name;
        const imageURL = (_h = (_g = nftChange.asset) === null || _g === void 0 ? void 0 : _g.image) === null || _h === void 0 ? void 0 : _h.url;
        const tokenId = (_j = nftChange.asset) === null || _j === void 0 ? void 0 : _j.tokenId;
        const purchaseCurrencyId = tokenChange.tokenStandard === TokenStandard.Native
            ? buildNativeCurrencyId(chainId)
            : ((_k = tokenChange.asset) === null || _k === void 0 ? void 0 : _k.address)
                ? buildCurrencyId(chainId, tokenChange.asset.address)
                : undefined;
        const purchaseCurrencyAmountRaw = deriveCurrencyAmountFromAssetResponse(tokenChange.tokenStandard, tokenChange.asset.chain, tokenChange.asset.address, tokenChange.asset.decimals, tokenChange.quantity);
        const tradeType = nftChange.direction === 'IN' ? NFTTradeType.BUY : NFTTradeType.SELL;
        const transactedUSDValue = parseUSDValueFromAssetChange(tokenChange.transactedValue);
        const address = (_l = nftChange.asset.nftContract) === null || _l === void 0 ? void 0 : _l.address;
        if (!name ||
            !collectionName ||
            !imageURL ||
            !tokenId ||
            !purchaseCurrencyId ||
            !purchaseCurrencyAmountRaw ||
            !address) {
            return undefined;
        }
        return {
            type: TransactionType.NFTTrade,
            tradeType,
            nftSummaryInfo: {
                name,
                collectionName,
                imageURL,
                tokenId,
                address,
            },
            purchaseCurrencyId,
            purchaseCurrencyAmountRaw,
            transactedUSDValue,
        };
    }
    return undefined;
}
//# sourceMappingURL=parseTradeTransaction.js.map