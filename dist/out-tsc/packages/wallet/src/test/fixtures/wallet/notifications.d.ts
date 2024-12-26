import { AssetType } from 'uniswap/src/entities/assets';
import { AppErrorNotification, AppNotificationDefault, AppNotificationType, ApproveTxNotification, ChangeAssetVisibilityNotification, ChooseCountryNotification, CopyNotification, CopyNotificationType, NetworkChangedNotification, ReceiveCurrencyTxNotification, ReceiveNFTNotification, ScantasticCompleteNotification, SendCurrencyTxNotification, SendNFTNotification, SuccessNotification, SwapPendingNotification, SwapTxNotification, TransactionNotificationBase, TransferCurrencyPendingNotification, WalletConnectNotification, WrapTxNotification } from 'uniswap/src/features/notifications/types';
import { FinalizedTransactionStatus, TransactionStatus, TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import { WrapType } from 'uniswap/src/features/transactions/types/wrap';
import { WalletConnectEvent } from 'uniswap/src/types/walletConnect';
export declare const FINALIZED_TRANSACTION_STATUSES: FinalizedTransactionStatus[];
export declare const appNotificationDefault: {
    <O extends Partial<AppNotificationDefault>>(overrides: O): Omit<{
        type: AppNotificationType.Default;
        title: string;
    }, keyof O> & O;
    (): {
        type: AppNotificationType.Default;
        title: string;
    };
};
export declare const appErrorNotification: {
    <O extends Partial<AppErrorNotification>>(overrides: O): Omit<{
        type: AppNotificationType.Error;
        errorMessage: string;
    }, keyof O> & O;
    (): {
        type: AppNotificationType.Error;
        errorMessage: string;
    };
};
export declare const walletConnectNotification: {
    <O extends Partial<WalletConnectNotification>>(overrides: O): Omit<{
        type: AppNotificationType.WalletConnect;
        event: WalletConnectEvent;
        dappName: string;
        imageUrl: string;
    }, keyof O> & O;
    (): {
        type: AppNotificationType.WalletConnect;
        event: WalletConnectEvent;
        dappName: string;
        imageUrl: string;
    };
};
export declare const approveTxNotification: {
    <O extends Partial<ApproveTxNotification>>(overrides: O): Omit<{
        txType: TransactionType.Approve;
        tokenAddress: string;
        spender: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    }, keyof O> & O;
    (): {
        txType: TransactionType.Approve;
        tokenAddress: string;
        spender: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    };
};
export declare const swapTxNotification: {
    <O extends Partial<SwapTxNotification>>(overrides: O): Omit<{
        txType: TransactionType.Swap;
        inputCurrencyId: string;
        outputCurrencyId: string;
        inputCurrencyAmountRaw: string;
        outputCurrencyAmountRaw: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    }, keyof O> & O;
    (): {
        txType: TransactionType.Swap;
        inputCurrencyId: string;
        outputCurrencyId: string;
        inputCurrencyAmountRaw: string;
        outputCurrencyAmountRaw: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    };
};
export declare const wrapTxNotification: {
    <O extends Partial<WrapTxNotification>>(overrides: O): Omit<{
        txType: TransactionType.Wrap;
        currencyAmountRaw: string;
        unwrapped: boolean;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    }, keyof O> & O;
    (): {
        txType: TransactionType.Wrap;
        currencyAmountRaw: string;
        unwrapped: boolean;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    };
};
export declare const sendCurrencyTxNotification: {
    <O extends Partial<SendCurrencyTxNotification>>(overrides: O): Omit<{
        txType: TransactionType.Send;
        recipient: string;
        assetType: AssetType.Currency;
        tokenAddress: string;
        currencyAmountRaw: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    }, keyof O> & O;
    (): {
        txType: TransactionType.Send;
        recipient: string;
        assetType: AssetType.Currency;
        tokenAddress: string;
        currencyAmountRaw: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    };
};
export declare const receiveCurrencyTxNotification: {
    <O extends Partial<ReceiveCurrencyTxNotification>>(overrides: O): Omit<{
        txType: TransactionType.Receive;
        sender: string;
        assetType: AssetType.Currency;
        tokenAddress: string;
        currencyAmountRaw: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    }, keyof O> & O;
    (): {
        txType: TransactionType.Receive;
        sender: string;
        assetType: AssetType.Currency;
        tokenAddress: string;
        currencyAmountRaw: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    };
};
export declare const sendNFTTxNotification: {
    <O extends Partial<SendNFTNotification>>(overrides: O): Omit<{
        txType: TransactionType.Send;
        recipient: string;
        assetType: AssetType.ERC721 | AssetType.ERC1155;
        tokenAddress: string;
        tokenId: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    }, keyof O> & O;
    (): {
        txType: TransactionType.Send;
        recipient: string;
        assetType: AssetType.ERC721 | AssetType.ERC1155;
        tokenAddress: string;
        tokenId: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    };
};
export declare const receiveNFTNotification: {
    <O extends Partial<ReceiveNFTNotification>>(overrides: O): Omit<{
        txType: TransactionType.Receive;
        sender: string;
        assetType: AssetType.ERC721 | AssetType.ERC1155;
        tokenAddress: string;
        tokenId: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    }, keyof O> & O;
    (): {
        txType: TransactionType.Receive;
        sender: string;
        assetType: AssetType.ERC721 | AssetType.ERC1155;
        tokenAddress: string;
        tokenId: string;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    };
};
export declare const unknownTxNotification: {
    <O extends Partial<TransactionNotificationBase>>(overrides: O): Omit<{
        txType: TransactionType.Unknown;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    }, keyof O> & O;
    (): {
        txType: TransactionType.Unknown;
        type: AppNotificationType.Transaction;
        txStatus: TransactionStatus.Canceled | TransactionStatus.FailedCancel | TransactionStatus.Success | TransactionStatus.Failed | TransactionStatus.Expired;
        txId: string;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
    };
};
export declare const copyNotification: {
    <O extends Partial<CopyNotification>>(overrides: O): Omit<{
        type: AppNotificationType.Copied;
        copyType: CopyNotificationType;
    }, keyof O> & O;
    (): {
        type: AppNotificationType.Copied;
        copyType: CopyNotificationType;
    };
};
export declare const successNotification: {
    <O extends Partial<SuccessNotification>>(overrides: O): Omit<{
        type: AppNotificationType.Success;
        title: string;
    }, keyof O> & O;
    (): {
        type: AppNotificationType.Success;
        title: string;
    };
};
export declare const swapNetworkNotification: {
    <O extends Partial<NetworkChangedNotification>>(overrides: O): Omit<{
        type: AppNotificationType.NetworkChanged;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
        flow: "swap";
    }, keyof O> & O;
    (): {
        type: AppNotificationType.NetworkChanged;
        chainId: import("uniswap/src/features/chains/types").UniverseChainId;
        flow: "swap";
    };
};
export declare const chooseCountryNotification: {
    <O extends Partial<ChooseCountryNotification>>(overrides: O): Omit<{
        type: AppNotificationType.ChooseCountry;
        countryName: string;
        countryCode: string;
    }, keyof O> & O;
    (): {
        type: AppNotificationType.ChooseCountry;
        countryName: string;
        countryCode: string;
    };
};
export declare const changeAssetVisibilityNotifiation: {
    <O extends Partial<ChangeAssetVisibilityNotification>>(overrides: O): Omit<{
        type: AppNotificationType.AssetVisibility;
        visible: boolean;
        assetName: string;
    }, keyof O> & O;
    (): {
        type: AppNotificationType.AssetVisibility;
        visible: boolean;
        assetName: string;
    };
};
export declare const swapPendingNotification: {
    <O extends Partial<SwapPendingNotification>>(overrides: O): Omit<{
        type: AppNotificationType.SwapPending;
        wrapType: WrapType;
    }, keyof O> & O;
    (): {
        type: AppNotificationType.SwapPending;
        wrapType: WrapType;
    };
};
export declare const transferCurrencyPendingNotification: {
    <O extends Partial<TransferCurrencyPendingNotification>>(overrides: O): Omit<{
        type: AppNotificationType.TransferCurrencyPending;
        currencyInfo: {
            currencyId: string;
            currency: import("uniswap/src/features/tokens/NativeCurrency").NativeCurrency;
            logoUrl: string;
            safetyLevel: import("uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks").SafetyLevel.Verified;
            safetyInfo: {
                tokenList: import("uniswap/src/features/dataApi/types").TokenList;
                protectionResult: import("uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks").ProtectionResult;
            };
        };
    }, keyof O> & O;
    (): {
        type: AppNotificationType.TransferCurrencyPending;
        currencyInfo: {
            currencyId: string;
            currency: import("uniswap/src/features/tokens/NativeCurrency").NativeCurrency;
            logoUrl: string;
            safetyLevel: import("uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks").SafetyLevel.Verified;
            safetyInfo: {
                tokenList: import("uniswap/src/features/dataApi/types").TokenList;
                protectionResult: import("uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks").ProtectionResult;
            };
        };
    };
};
export declare const scantasticCompleteNotification: {
    <O extends Partial<ScantasticCompleteNotification>>(overrides: O): Omit<{
        type: AppNotificationType.ScantasticComplete;
    }, keyof O> & O;
    (): {
        type: AppNotificationType.ScantasticComplete;
    };
};
//# sourceMappingURL=notifications.d.ts.map