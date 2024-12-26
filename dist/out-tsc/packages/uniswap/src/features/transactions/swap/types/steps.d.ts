import { TypedDataDomain, TypedDataField } from "@ethersproject/abstract-signer";
import { Currency, CurrencyAmount, Token } from "@uniswap/sdk-core";
import { DutchQuoteV2, PriorityQuote } from "uniswap/src/data/tradingApi/__generated__";
import { ValidatedTransactionRequest } from "uniswap/src/features/transactions/swap/utils/trade";
export declare enum TransactionStepType {
    TokenApprovalTransaction = "TokenApproval",
    TokenRevocationTransaction = "TokenRevocation",
    SwapTransaction = "SwapTransaction",
    WrapTransaction = "WrapTransaction",
    SwapTransactionAsync = "SwapTransactionAsync",
    Permit2Signature = "Permit2Signature",
    UniswapXSignature = "UniswapXSignature",
    IncreasePositionTransaction = "IncreasePositionTransaction",
    IncreasePositionTransactionAsync = "IncreasePositionTransactionAsync",
    DecreasePositionTransaction = "DecreasePositionTransaction",
    MigratePositionTransactionStep = "MigratePositionTransaction",
    MigratePositionTransactionStepAsync = "MigratePositionTransactionAsync",
    CollectFeesTransactionStep = "CollectFeesTransaction"
}
export type UniswapXSwapSteps = WrapTransactionStep | TokenApprovalTransactionStep | TokenRevocationTransactionStep | UniswapXSignatureStep;
export type ClassicSwapSteps = TokenApprovalTransactionStep | TokenRevocationTransactionStep | Permit2SignatureStep | SwapTransactionStep | SwapTransactionStepAsync;
export type IncreasePositionSteps = TokenApprovalTransactionStep | Permit2SignatureStep | IncreasePositionTransactionStep | IncreasePositionTransactionStepAsync;
export type DecreasePositionSteps = TokenApprovalTransactionStep | DecreasePositionTransactionStep;
export type MigratePositionSteps = Permit2SignatureStep | MigratePositionTransactionStep | MigratePositionTransactionStepAsync;
export type CollectFeesSteps = CollectFeesTransactionStep;
export type TransactionStep = ClassicSwapSteps | UniswapXSwapSteps | IncreasePositionSteps | DecreasePositionSteps | MigratePositionSteps | CollectFeesSteps;
export type OnChainTransactionStep = TransactionStep & OnChainTransactionFields;
export type SignatureTransactionStep = TransactionStep & SignTypedDataStepFields;
interface SignTypedDataStepFields {
    domain: TypedDataDomain;
    types: Record<string, TypedDataField[]>;
    values: Record<string, unknown>;
}
interface OnChainTransactionFields {
    txRequest: ValidatedTransactionRequest;
}
export interface WrapTransactionStep extends OnChainTransactionFields {
    type: TransactionStepType.WrapTransaction;
    amount: CurrencyAmount<Currency>;
}
export interface TokenApprovalTransactionStep extends OnChainTransactionFields {
    type: TransactionStepType.TokenApprovalTransaction;
    token: Token;
    spender: string;
    pair?: [Currency, Currency];
    amount: string;
}
export interface TokenRevocationTransactionStep extends Omit<TokenApprovalTransactionStep, 'type'> {
    type: TransactionStepType.TokenRevocationTransaction;
    amount: '0';
}
export interface Permit2SignatureStep extends SignTypedDataStepFields {
    type: TransactionStepType.Permit2Signature;
    token: Currency;
}
export interface SwapTransactionStep extends OnChainTransactionFields {
    type: TransactionStepType.SwapTransaction;
}
export interface SwapTransactionStepAsync {
    type: TransactionStepType.SwapTransactionAsync;
    getTxRequest(signature: string): Promise<ValidatedTransactionRequest | undefined>;
}
export interface IncreasePositionTransactionStep extends OnChainTransactionFields {
    type: TransactionStepType.IncreasePositionTransaction;
}
export interface IncreasePositionTransactionStepAsync {
    type: TransactionStepType.IncreasePositionTransactionAsync;
    getTxRequest(signature: string): Promise<ValidatedTransactionRequest | undefined>;
}
export interface DecreasePositionTransactionStep extends OnChainTransactionFields {
    type: TransactionStepType.DecreasePositionTransaction;
}
export interface MigratePositionTransactionStep extends OnChainTransactionFields {
    type: TransactionStepType.MigratePositionTransactionStep;
}
export interface MigratePositionTransactionStepAsync {
    type: TransactionStepType.MigratePositionTransactionStepAsync;
    getTxRequest(signature: string): Promise<ValidatedTransactionRequest | undefined>;
}
export interface CollectFeesTransactionStep extends OnChainTransactionFields {
    type: TransactionStepType.CollectFeesTransactionStep;
}
export type ClassicSwapFlow = {
    revocation?: TokenRevocationTransactionStep;
    approval?: TokenApprovalTransactionStep;
    permit: undefined;
    swap: SwapTransactionStep;
} | {
    revocation?: TokenRevocationTransactionStep;
    approval?: TokenApprovalTransactionStep;
    permit: Permit2SignatureStep;
    swap: SwapTransactionStepAsync;
};
export type IncreasePositionFlow = {
    wrap?: WrapTransactionStep;
    approvalToken0?: TokenApprovalTransactionStep;
    approvalToken1?: TokenApprovalTransactionStep;
    approvalPositionToken?: TokenApprovalTransactionStep;
    permit: undefined;
    increasePosition: IncreasePositionTransactionStep;
} | {
    wrap?: WrapTransactionStep;
    approvalToken0?: TokenApprovalTransactionStep;
    approvalToken1?: TokenApprovalTransactionStep;
    approvalPositionToken?: TokenApprovalTransactionStep;
    permit: Permit2SignatureStep;
    increasePosition: IncreasePositionTransactionStepAsync;
};
export type MigratePositionFlow = {
    permit: undefined;
    migrate: MigratePositionTransactionStep;
} | {
    permit: Permit2SignatureStep;
    migrate: MigratePositionTransactionStepAsync;
};
export type DecreasePositionFlow = {
    approvalPositionToken?: TokenApprovalTransactionStep;
    decreasePosition: DecreasePositionTransactionStep;
};
export interface UniswapXSignatureStep extends SignTypedDataStepFields {
    type: TransactionStepType.UniswapXSignature;
    deadline: number;
    quote: DutchQuoteV2 | PriorityQuote;
}
export type UniswapXSwapFlow = {
    wrap?: WrapTransactionStep;
    revocation?: TokenRevocationTransactionStep;
    approval?: TokenApprovalTransactionStep;
    signOrder: UniswapXSignatureStep;
};
export {};
//# sourceMappingURL=steps.d.ts.map