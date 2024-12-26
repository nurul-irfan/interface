import { TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
export function isApproveTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.Approve;
}
export function isOnRampPurchaseTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.OnRampPurchase;
}
export function isOnRampTransferTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.OnRampTransfer;
}
export function isLocalOnRampTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.LocalOnRamp;
}
export function isNFTApproveTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.NFTApprove;
}
export function isNFTMintTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.NFTMint;
}
export function isNFTTradeTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.NFTTrade;
}
export function isReceiveTokenTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.Receive;
}
export function isSendTokenTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.Send;
}
export function isSwapTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.Swap;
}
export function isBridgeTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.Bridge;
}
export function isWCConfirmTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.WCConfirm;
}
export function isWrapTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.Wrap;
}
export function isUnknownTransactionInfo(typeInfo) {
    return typeInfo.type === TransactionType.Unknown;
}
//# sourceMappingURL=types.js.map