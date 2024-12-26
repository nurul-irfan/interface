import { BridgeTransactionInfo, ConfirmedSwapTransactionInfo, ExactInputSwapTransactionInfo, ExactOutputSwapTransactionInfo, LocalOnRampTransactionInfo, OnRampPurchaseInfo, OnRampTransferInfo, UnknownTransactionInfo, WrapTransactionInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
export type SwapTypeTransactionInfo = ExactInputSwapTransactionInfo | ExactOutputSwapTransactionInfo | ConfirmedSwapTransactionInfo;
import { ApproveTransactionInfo, NFTApproveTransactionInfo, NFTMintTransactionInfo, NFTTradeTransactionInfo, ReceiveTokenTransactionInfo, SendTokenTransactionInfo, TransactionTypeInfo, WCConfirmInfo } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare function isApproveTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is ApproveTransactionInfo;
export declare function isOnRampPurchaseTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is OnRampPurchaseInfo;
export declare function isOnRampTransferTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is OnRampTransferInfo;
export declare function isLocalOnRampTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is LocalOnRampTransactionInfo;
export declare function isNFTApproveTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is NFTApproveTransactionInfo;
export declare function isNFTMintTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is NFTMintTransactionInfo;
export declare function isNFTTradeTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is NFTTradeTransactionInfo;
export declare function isReceiveTokenTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is ReceiveTokenTransactionInfo;
export declare function isSendTokenTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is SendTokenTransactionInfo;
export declare function isSwapTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is SwapTypeTransactionInfo;
export declare function isBridgeTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is BridgeTransactionInfo;
export declare function isWCConfirmTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is WCConfirmInfo;
export declare function isWrapTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is WrapTransactionInfo;
export declare function isUnknownTransactionInfo(typeInfo: TransactionTypeInfo): typeInfo is UnknownTransactionInfo;
export type TransactionParticipantRowProps = {
    onClose: () => void;
    address: string;
    isSend?: boolean;
};
//# sourceMappingURL=types.d.ts.map