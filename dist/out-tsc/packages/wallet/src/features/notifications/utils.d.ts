import { Currency, TradeType } from '@uniswap/sdk-core';
import { LocalizationContextState } from 'uniswap/src/features/language/LocalizationContext';
import { GQLNftAsset } from 'uniswap/src/features/nfts/types';
import { WalletConnectNotification } from 'uniswap/src/features/notifications/types';
import { TransactionStatus, TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
export declare const formWCNotificationTitle: (appNotification: WalletConnectNotification) => string;
export declare const formApproveNotificationTitle: (txStatus: TransactionStatus, currency: Maybe<Currency>, tokenAddress: Address, spender: Address) => string;
export declare const formBridgeNotificationTitle: (txStatus: TransactionStatus) => string;
export declare const formSwapNotificationTitle: (formatter: LocalizationContextState, txStatus: TransactionStatus, inputCurrency: Maybe<Currency>, outputCurrency: Maybe<Currency>, inputCurrencyId: string, outputCurrencyId: string, inputCurrencyAmountRaw: string, outputCurrencyAmountRaw: string, tradeType?: TradeType) => string;
export declare const formWrapNotificationTitle: (formatter: LocalizationContextState, txStatus: TransactionStatus, inputCurrency: Maybe<Currency>, outputCurrency: Maybe<Currency>, currencyAmountRaw: string, unwrapped: boolean) => string;
export declare const formTransferCurrencyNotificationTitle: (formatter: LocalizationContextState, txType: TransactionType, txStatus: TransactionStatus, currency: Maybe<Currency>, tokenAddress: string, currencyAmountRaw: string, senderOrRecipient: string) => string;
export declare const formTransferNFTNotificationTitle: (txType: TransactionType, txStatus: TransactionStatus, nft: GQLNftAsset | undefined, tokenAddress: Address, tokenId: string, senderOrRecipient: string) => string;
export declare const formUnknownTxTitle: (txStatus: TransactionStatus, tokenAddress: Address | undefined, ensName: string | null) => string;
//# sourceMappingURL=utils.d.ts.map