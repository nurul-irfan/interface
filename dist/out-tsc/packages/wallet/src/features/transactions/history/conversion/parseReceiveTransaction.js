import { SpamCode } from 'uniswap/src/data/types';
import { AssetType } from 'uniswap/src/entities/assets';
import { TransactionDetailsType, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { deriveCurrencyAmountFromAssetResponse, getAddressFromAsset, parseUSDValueFromAssetChange, } from 'wallet/src/features/transactions/history/utils';
export default function parseReceiveTransaction(transaction) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (transaction.details.__typename !== TransactionDetailsType.Transaction) {
        return undefined;
    }
    const change = (_a = transaction.details.assetChanges) === null || _a === void 0 ? void 0 : _a[0];
    if (!change) {
        return undefined;
    }
    // Found NFT transfer
    if (change.__typename === 'NftTransfer') {
        if (change.nftStandard) {
            const assetType = change.nftStandard === 'ERC1155' ? AssetType.ERC1155 : AssetType.ERC721;
            const sender = change.sender;
            const name = (_b = change.asset) === null || _b === void 0 ? void 0 : _b.name;
            const tokenAddress = (_c = change.asset.nftContract) === null || _c === void 0 ? void 0 : _c.address;
            const collectionName = (_e = (_d = change.asset) === null || _d === void 0 ? void 0 : _d.collection) === null || _e === void 0 ? void 0 : _e.name;
            const imageURL = (_f = change.asset.image) === null || _f === void 0 ? void 0 : _f.url;
            const tokenId = change.asset.tokenId;
            const isSpam = (_h = (_g = change.asset) === null || _g === void 0 ? void 0 : _g.isSpam) !== null && _h !== void 0 ? _h : false;
            if (!(sender && tokenAddress && collectionName && imageURL && name && tokenId)) {
                return undefined;
            }
            return {
                type: TransactionType.Receive,
                assetType,
                tokenAddress,
                sender,
                nftSummaryInfo: {
                    name,
                    collectionName,
                    imageURL,
                    tokenId,
                    address: tokenAddress,
                },
                isSpam,
            };
        }
    }
    // Found ERC20 transfer
    if (change.__typename === 'TokenTransfer') {
        const sender = change.sender;
        const tokenAddress = getAddressFromAsset({
            chain: change.asset.chain,
            address: change.asset.address,
            tokenStandard: change.tokenStandard,
        });
        const currencyAmountRaw = deriveCurrencyAmountFromAssetResponse(change.tokenStandard, change.asset.chain, change.asset.address, change.asset.decimals, change.quantity);
        const transactedUSDValue = parseUSDValueFromAssetChange(change.transactedValue);
        // Filter out receive transactions with tokens that are either marked `isSpam` or with spam code 2 (token with URL name)
        const isSpam = Boolean(((_j = change.asset.project) === null || _j === void 0 ? void 0 : _j.isSpam) || ((_k = change.asset.project) === null || _k === void 0 ? void 0 : _k.spamCode) === SpamCode.HIGH);
        if (!(sender && tokenAddress)) {
            return undefined;
        }
        return {
            type: TransactionType.Receive,
            assetType: AssetType.Currency,
            tokenAddress,
            sender,
            currencyAmountRaw,
            transactedUSDValue,
            isSpam,
        };
    }
    return undefined;
}
//# sourceMappingURL=parseReceiveTransaction.js.map