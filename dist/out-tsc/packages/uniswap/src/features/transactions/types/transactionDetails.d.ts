import { Protocol } from '@uniswap/router-sdk';
import { Currency, CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import { providers } from 'ethers/lib/ethers';
import { TransactionListQuery } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { Routing, TransactionFailureReason } from 'uniswap/src/data/tradingApi/__generated__/index';
import { GasEstimate } from 'uniswap/src/data/tradingApi/types';
import { AssetType } from 'uniswap/src/entities/assets';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { DappInfo } from 'uniswap/src/types/walletConnect';
export type ChainIdToTxIdToDetails = Partial<Record<UniverseChainId, {
    [txId: string]: TransactionDetails;
}>>;
export interface TransactionId {
    chainId: UniverseChainId;
    id: string;
}
export type TransactionListQueryResponse = NonNullable<NonNullable<NonNullable<TransactionListQuery['portfolios']>[0]>['assetActivities']>[0];
/**
 * Marks if a transaction was initiated natively within app, or from external source.
 * External transactions are initiated from dapps, WC, uwulink, etc.
 */
export declare enum TransactionOriginType {
    Internal = "internal",
    External = "external"
}
interface BaseTransactionDetails extends TransactionId {
    ownerAddress?: Address;
    from: Address;
    transactionOriginType: TransactionOriginType;
    typeInfo: TransactionTypeInfo;
    status: TransactionStatus;
    addedTime: number;
    hash?: string;
    receipt?: TransactionReceipt;
    cancelRequest?: providers.TransactionRequest;
    networkFee?: TransactionNetworkFee;
}
export type TransactionNetworkFee = {
    quantity: string;
    tokenSymbol: string;
    tokenAddress: string;
    chainId: UniverseChainId;
};
export type GasFeeEstimates = {
    activeEstimate: GasEstimate;
    shadowEstimates?: GasEstimate[];
    blockSubmitted?: number;
};
export interface UniswapXOrderDetails extends BaseTransactionDetails {
    routing: Routing.DUTCH_V2 | Routing.DUTCH_LIMIT | Routing.PRIORITY;
    orderHash?: string;
    queueStatus?: QueuedOrderStatus;
}
export interface ClassicTransactionDetails extends BaseTransactionDetails {
    routing: Routing.CLASSIC;
    options: TransactionOptions;
}
export interface BridgeTransactionDetails extends BaseTransactionDetails {
    routing: Routing.BRIDGE;
    options: TransactionOptions;
    sendConfirmed?: boolean;
}
export type OnChainTransactionDetails = ClassicTransactionDetails | BridgeTransactionDetails;
export type TransactionDetails = UniswapXOrderDetails | OnChainTransactionDetails;
export declare enum TransactionStatus {
    Canceled = "cancelled",
    Cancelling = "cancelling",
    FailedCancel = "failedCancel",
    Success = "confirmed",
    Failed = "failed",
    Pending = "pending",
    Replacing = "replacing",
    Expired = "expired",
    InsufficientFunds = "insufficientFunds",
    Unknown = "unknown"
}
export declare enum QueuedOrderStatus {
    Waiting = "waiting",
    ApprovalFailed = "approvalFailed",
    WrapFailed = "wrapFailed",
    AppClosed = "appClosed",
    Stale = "stale",
    SubmissionFailed = "submissionFailed",
    Submitted = "submitted"
}
declare const FINAL_STATUSES: readonly [TransactionStatus.Success, TransactionStatus.Failed, TransactionStatus.Canceled, TransactionStatus.FailedCancel, TransactionStatus.Expired];
export type FinalizedTransactionStatus = (typeof FINAL_STATUSES)[number];
export type FinalizedTransactionDetails = TransactionDetails & ({
    status: TransactionStatus.Success;
    hash: string;
} | {
    status: Exclude<FinalizedTransactionStatus, TransactionStatus.Success>;
    hash?: string;
});
export type TransactionOptions = {
    request: providers.TransactionRequest;
    submittedTimestampMs?: number;
    timeoutTimestampMs?: number;
    submitViaPrivateRpc?: boolean;
};
export interface TransactionReceipt {
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    confirmedTime: number;
    confirmations: number;
    gasUsed: number;
    effectiveGasPrice: number;
}
export interface NFTSummaryInfo {
    tokenId: string;
    name: string;
    collectionName: string;
    imageURL: string;
    address: string;
}
export declare enum NFTTradeType {
    BUY = "buy",
    SELL = "sell"
}
/**
 * Be careful adding to this enum, always assign a unique value (typescript will not prevent duplicate values).
 * These values are persisted in state and if you change the value it will cause errors
 */
export declare enum TransactionType {
    Approve = "approve",
    Bridge = "bridge",
    Swap = "swap",
    Wrap = "wrap",
    NFTApprove = "nft-approve",
    NFTTrade = "nft-trade",
    NFTMint = "nft-mint",
    Send = "send",
    Receive = "receive",
    FiatPurchaseDeprecated = "fiat-purchase",// Deprecated, still here for use in migrations.
    LocalOnRamp = "local-onramp",
    OnRampPurchase = "onramp-purchase",
    OnRampTransfer = "onramp-transfer",
    WCConfirm = "wc-confirm",
    Unknown = "unknown"
}
export interface BaseTransactionInfo {
    type: TransactionType;
    transactedUSDValue?: number;
    isSpam?: boolean;
    externalDappInfo?: DappInfo;
    gasEstimates?: GasFeeEstimates;
}
export interface ApproveTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.Approve;
    tokenAddress: string;
    spender: string;
    approvalAmount?: string;
    dappInfo?: DappInfoTransactionDetails;
    swapTxId?: string;
}
export interface BaseSwapTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.Swap;
    tradeType?: TradeType;
    inputCurrencyId: string;
    outputCurrencyId: string;
    slippageTolerance?: number;
    quoteId?: string;
    routeString?: string;
    gasUseEstimate?: string;
    protocol?: Protocol;
    simulationFailureReasons?: TransactionFailureReason[];
}
export interface BridgeTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.Bridge;
    inputCurrencyId: string;
    inputCurrencyAmountRaw: string;
    outputCurrencyId: string;
    outputCurrencyAmountRaw: string;
    quoteId?: string;
    gasUseEstimate?: string;
    routingDappInfo?: DappInfoTransactionDetails;
}
export interface ExactInputSwapTransactionInfo extends BaseSwapTransactionInfo {
    tradeType: TradeType.EXACT_INPUT;
    inputCurrencyAmountRaw: string;
    expectedOutputCurrencyAmountRaw: string;
    minimumOutputCurrencyAmountRaw: string;
}
export interface ExactOutputSwapTransactionInfo extends BaseSwapTransactionInfo {
    tradeType: TradeType.EXACT_OUTPUT;
    outputCurrencyAmountRaw: string;
    expectedInputCurrencyAmountRaw: string;
    maximumInputCurrencyAmountRaw: string;
}
export interface ConfirmedSwapTransactionInfo extends BaseSwapTransactionInfo {
    inputCurrencyAmountRaw: string;
    outputCurrencyAmountRaw: string;
}
export interface WrapTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.Wrap;
    unwrapped: boolean;
    currencyAmountRaw: string;
    swapTxId?: string;
}
export interface SendTokenTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.Send;
    assetType: AssetType;
    recipient: string;
    tokenAddress: string;
    currencyAmountRaw?: string;
    tokenId?: string;
    nftSummaryInfo?: NFTSummaryInfo;
    currencyAmountUSD?: Maybe<CurrencyAmount<Currency>>;
}
export interface ReceiveTokenTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.Receive;
    assetType: AssetType;
    currencyAmountRaw?: string;
    sender: string;
    tokenAddress: string;
    tokenId?: string;
    nftSummaryInfo?: NFTSummaryInfo;
}
export interface LocalOnRampTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.LocalOnRamp;
}
export interface OnRampTransactionInfo extends BaseTransactionInfo {
    type: TransactionType;
    id: string;
    destinationTokenSymbol: string;
    destinationTokenAddress: string;
    destinationTokenAmount?: number;
    serviceProvider: ServiceProviderInfo;
    networkFee?: number;
    transactionFee?: number;
    totalFee?: number;
}
export interface OnRampPurchaseInfo extends OnRampTransactionInfo {
    type: TransactionType.OnRampPurchase;
    sourceCurrency: string;
    sourceAmount?: number;
}
export interface OnRampTransferInfo extends OnRampTransactionInfo {
    type: TransactionType.OnRampTransfer;
}
export interface ServiceProviderInfo {
    id: string;
    name: string;
    url: string;
    logoLightUrl: string;
    logoDarkUrl: string;
    supportUrl?: string;
}
export interface NFTMintTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.NFTMint;
    nftSummaryInfo: NFTSummaryInfo;
    purchaseCurrencyId?: string;
    purchaseCurrencyAmountRaw?: string;
    dappInfo?: DappInfoTransactionDetails;
}
export interface NFTTradeTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.NFTTrade;
    nftSummaryInfo: NFTSummaryInfo;
    purchaseCurrencyId: string;
    purchaseCurrencyAmountRaw: string;
    tradeType: NFTTradeType;
}
export interface NFTApproveTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.NFTApprove;
    nftSummaryInfo: NFTSummaryInfo;
    spender: string;
    dappInfo?: DappInfoTransactionDetails;
}
export interface WCConfirmInfo extends BaseTransactionInfo {
    type: TransactionType.WCConfirm;
    dapp: DappInfo;
}
export interface DappInfoTransactionDetails {
    name?: string;
    address: string;
    icon?: string;
}
export interface UnknownTransactionInfo extends BaseTransactionInfo {
    type: TransactionType.Unknown;
    tokenAddress?: string;
    dappInfo?: DappInfoTransactionDetails;
}
export type TransactionTypeInfo = ApproveTransactionInfo | BridgeTransactionInfo | ExactOutputSwapTransactionInfo | ExactInputSwapTransactionInfo | ConfirmedSwapTransactionInfo | WrapTransactionInfo | SendTokenTransactionInfo | ReceiveTokenTransactionInfo | NFTTradeTransactionInfo | NFTApproveTransactionInfo | NFTMintTransactionInfo | WCConfirmInfo | UnknownTransactionInfo | OnRampPurchaseInfo | OnRampTransferInfo | LocalOnRampTransactionInfo;
export declare function isConfirmedSwapTypeInfo(typeInfo: TransactionTypeInfo): typeInfo is ConfirmedSwapTransactionInfo;
export declare function isBridgeTypeInfo(typeInfo: TransactionTypeInfo): typeInfo is BridgeTransactionInfo;
export declare function isFinalizedTxStatus(status: TransactionStatus): status is FinalizedTransactionStatus;
export declare function isFinalizedTx(tx: TransactionDetails | FinalizedTransactionDetails): tx is FinalizedTransactionDetails;
export declare enum TransactionDetailsType {
    Transaction = "TransactionDetails",
    OnRamp = "OnRampTransactionDetails",
    UniswapXOrder = "SwapOrderDetails"
}
export {};
//# sourceMappingURL=transactionDetails.d.ts.map