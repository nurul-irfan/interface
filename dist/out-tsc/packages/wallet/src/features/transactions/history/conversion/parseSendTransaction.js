import { SpamCode } from 'uniswap/src/data/types';
import { AssetType } from 'uniswap/src/entities/assets';
import { TransactionDetailsType, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { deriveCurrencyAmountFromAssetResponse, getAddressFromAsset, parseUSDValueFromAssetChange, } from 'wallet/src/features/transactions/history/utils';
export default function parseSendTransaction(transaction) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    if (transaction.details.__typename !== TransactionDetailsType.Transaction) {
        return undefined;
    }
    let change = (_a = transaction.details.assetChanges) === null || _a === void 0 ? void 0 : _a[0];
    // For some NFT transfers, the first assetChange is an NftApproval followed by an NftTransfer
    if ((change === null || change === void 0 ? void 0 : change.__typename) === 'NftApproval' &&
        ((_b = transaction.details.assetChanges) === null || _b === void 0 ? void 0 : _b.length) &&
        transaction.details.assetChanges.length > 1) {
        change = transaction.details.assetChanges[1];
    }
    if (!change) {
        return undefined;
    }
    // Found NFT transfer
    if (change.__typename === 'NftTransfer') {
        if (change.nftStandard) {
            const assetType = change.nftStandard === 'ERC1155' ? AssetType.ERC1155 : AssetType.ERC721;
            const recipient = change.recipient;
            const name = (_c = change.asset) === null || _c === void 0 ? void 0 : _c.name;
            const tokenAddress = (_e = (_d = change.asset) === null || _d === void 0 ? void 0 : _d.nftContract) === null || _e === void 0 ? void 0 : _e.address;
            const collectionName = (_g = (_f = change.asset) === null || _f === void 0 ? void 0 : _f.collection) === null || _g === void 0 ? void 0 : _g.name;
            const imageURL = (_j = (_h = change.asset) === null || _h === void 0 ? void 0 : _h.image) === null || _j === void 0 ? void 0 : _j.url;
            const tokenId = (_k = change.asset) === null || _k === void 0 ? void 0 : _k.tokenId;
            const isSpam = Boolean((_l = change.asset) === null || _l === void 0 ? void 0 : _l.isSpam);
            if (!(recipient && tokenAddress && collectionName && imageURL && name && tokenId)) {
                return undefined;
            }
            return {
                type: TransactionType.Send,
                assetType,
                tokenAddress,
                recipient,
                isSpam,
                nftSummaryInfo: {
                    name,
                    collectionName,
                    imageURL,
                    tokenId,
                    address: tokenAddress,
                },
            };
        }
    }
    // Found ERC20 transfer
    if (change.__typename === 'TokenTransfer') {
        const tokenAddress = getAddressFromAsset({
            chain: change.asset.chain,
            address: change.asset.address,
            tokenStandard: change.tokenStandard,
        });
        const recipient = change.recipient;
        const currencyAmountRaw = deriveCurrencyAmountFromAssetResponse(change.tokenStandard, change.asset.chain, change.asset.address, change.asset.decimals, change.quantity);
        const transactedUSDValue = parseUSDValueFromAssetChange(change.transactedValue);
        // Filter out send transactions with tokens that are either marked `isSpam` or with spam code 2 (token with URL name)
        // because send txs can be spoofed with spam tokens
        const isSpam = Boolean(((_m = change.asset.project) === null || _m === void 0 ? void 0 : _m.isSpam) || ((_o = change.asset.project) === null || _o === void 0 ? void 0 : _o.spamCode) === SpamCode.HIGH);
        if (!(recipient && tokenAddress)) {
            return undefined;
        }
        return {
            type: TransactionType.Send,
            assetType: AssetType.Currency,
            tokenAddress,
            recipient,
            currencyAmountRaw,
            transactedUSDValue,
            isSpam,
        };
    }
    return undefined;
}
//# sourceMappingURL=parseSendTransaction.js.map