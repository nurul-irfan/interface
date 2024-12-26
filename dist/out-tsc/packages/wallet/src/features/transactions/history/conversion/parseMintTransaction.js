import { fromGraphQLChain } from 'uniswap/src/features/chains/utils';
import { TransactionDetailsType, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { buildCurrencyId, buildNativeCurrencyId } from 'uniswap/src/utils/currencyId';
import { deriveCurrencyAmountFromAssetResponse, parseUSDValueFromAssetChange, } from 'wallet/src/features/transactions/history/utils';
export default function parseNFTMintTransaction(transaction) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (transaction.details.__typename !== TransactionDetailsType.Transaction) {
        return undefined;
    }
    const tokenChange = (_a = transaction.details.assetChanges) === null || _a === void 0 ? void 0 : _a.find((change) => (change === null || change === void 0 ? void 0 : change.__typename) === 'TokenTransfer');
    const nftChange = (_b = transaction.details.assetChanges) === null || _b === void 0 ? void 0 : _b.find((change) => (change === null || change === void 0 ? void 0 : change.__typename) === 'NftTransfer');
    // Mints must include the NFT minted
    if (!nftChange || nftChange.__typename !== 'NftTransfer') {
        return undefined;
    }
    const name = nftChange.asset.name;
    const collectionName = (_c = nftChange.asset.collection) === null || _c === void 0 ? void 0 : _c.name;
    const imageURL = (_d = nftChange.asset.image) === null || _d === void 0 ? void 0 : _d.url;
    const tokenId = nftChange.asset.tokenId;
    const chainId = fromGraphQLChain(transaction.chain);
    const isSpam = (_f = (_e = nftChange.asset) === null || _e === void 0 ? void 0 : _e.isSpam) !== null && _f !== void 0 ? _f : false;
    const address = (_g = nftChange.asset.nftContract) === null || _g === void 0 ? void 0 : _g.address;
    let transactedUSDValue;
    if (!name || !collectionName || !imageURL || !tokenId || !chainId || !address) {
        return undefined;
    }
    let purchaseCurrencyId;
    let purchaseCurrencyAmountRaw;
    if (tokenChange && tokenChange.__typename === 'TokenTransfer') {
        purchaseCurrencyId =
            tokenChange.tokenStandard === 'NATIVE'
                ? buildNativeCurrencyId(chainId)
                : ((_h = tokenChange.asset) === null || _h === void 0 ? void 0 : _h.address)
                    ? buildCurrencyId(chainId, tokenChange.asset.address)
                    : undefined;
        purchaseCurrencyAmountRaw = deriveCurrencyAmountFromAssetResponse(tokenChange.tokenStandard, tokenChange.asset.chain, tokenChange.asset.address, tokenChange.asset.decimals, tokenChange.quantity);
        transactedUSDValue = parseUSDValueFromAssetChange(tokenChange.transactedValue);
    }
    const dappInfo = ((_j = transaction.details.application) === null || _j === void 0 ? void 0 : _j.address)
        ? {
            name: (_k = transaction.details.application) === null || _k === void 0 ? void 0 : _k.name,
            address: transaction.details.application.address,
            icon: (_m = (_l = transaction.details.application) === null || _l === void 0 ? void 0 : _l.icon) === null || _m === void 0 ? void 0 : _m.url,
        }
        : undefined;
    return {
        type: TransactionType.NFTMint,
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
        isSpam,
        dappInfo,
    };
}
//# sourceMappingURL=parseMintTransaction.js.map