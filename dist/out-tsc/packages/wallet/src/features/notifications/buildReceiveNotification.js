import { AssetType } from 'uniswap/src/entities/assets';
import { AppNotificationType, } from 'uniswap/src/features/notifications/types';
import { TransactionStatus, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
/**
 * Based on notification type info, returns an AppNotification object for either NFT or Currency receive.
 * Must be a 'Receive' type transaction.
 *
 * Returns undefined if not all data is found for either Currency or NFT case, or if transaction is not
 * the correct type.
 */
export function buildReceiveNotification(transactionDetails, receivingAddress) {
    const { typeInfo, status, chainId, hash, id } = transactionDetails;
    // Only build notification object on successful receive transactions.
    if (status !== TransactionStatus.Success || typeInfo.type !== TransactionType.Receive || !hash) {
        return undefined;
    }
    const baseNotificationData = {
        txStatus: status,
        chainId,
        address: receivingAddress,
        txId: id,
    };
    // Currency receive txn.
    if ((typeInfo === null || typeInfo === void 0 ? void 0 : typeInfo.assetType) === AssetType.Currency && (typeInfo === null || typeInfo === void 0 ? void 0 : typeInfo.currencyAmountRaw) && (typeInfo === null || typeInfo === void 0 ? void 0 : typeInfo.sender)) {
        return {
            ...baseNotificationData,
            type: AppNotificationType.Transaction,
            txType: TransactionType.Receive,
            assetType: typeInfo.assetType,
            tokenAddress: typeInfo.tokenAddress,
            currencyAmountRaw: typeInfo.currencyAmountRaw,
            sender: typeInfo.sender,
        };
    }
    // NFT receive txn.
    if (((typeInfo === null || typeInfo === void 0 ? void 0 : typeInfo.assetType) === AssetType.ERC1155 || (typeInfo === null || typeInfo === void 0 ? void 0 : typeInfo.assetType) === AssetType.ERC721) && (typeInfo === null || typeInfo === void 0 ? void 0 : typeInfo.tokenId)) {
        return {
            ...baseNotificationData,
            type: AppNotificationType.Transaction,
            txType: TransactionType.Receive,
            assetType: typeInfo.assetType,
            tokenAddress: typeInfo.tokenAddress,
            tokenId: typeInfo.tokenId,
            sender: typeInfo.sender,
        };
    }
    return undefined;
}
//# sourceMappingURL=buildReceiveNotification.js.map