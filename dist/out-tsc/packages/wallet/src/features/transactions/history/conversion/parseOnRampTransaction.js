import { fromGraphQLChain } from 'uniswap/src/features/chains/utils';
import { TransactionDetailsType, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { getAddressFromAsset } from 'wallet/src/features/transactions/history/utils';
export default function parseOnRampTransaction(transaction) {
    var _a;
    let change;
    if (transaction.details.__typename === TransactionDetailsType.Transaction) {
        change = (_a = transaction.details.assetChanges) === null || _a === void 0 ? void 0 : _a[0];
    }
    else if (transaction.details.__typename === TransactionDetailsType.OnRamp) {
        change = transaction.details.onRampTransfer;
    }
    else {
        return undefined;
    }
    if ((change === null || change === void 0 ? void 0 : change.__typename) !== 'OnRampTransfer') {
        return undefined;
    }
    const tokenSymbol = change.token.symbol;
    const tokenAddress = getAddressFromAsset({
        tokenStandard: change.tokenStandard,
        chain: change.token.chain,
        address: change.token.address,
    });
    const chainId = fromGraphQLChain(change.token.chain);
    if (!tokenSymbol || !tokenAddress || !chainId) {
        return undefined;
    }
    const transactionInfo = {
        type: TransactionType.OnRampPurchase,
        id: change.transactionReferenceId,
        destinationTokenSymbol: tokenSymbol,
        destinationTokenAddress: tokenAddress,
        destinationTokenAmount: change.amount,
        serviceProvider: {
            id: change.serviceProvider.serviceProvider,
            name: change.serviceProvider.name,
            url: change.serviceProvider.url,
            logoLightUrl: change.serviceProvider.logoLightUrl,
            logoDarkUrl: change.serviceProvider.logoDarkUrl,
            supportUrl: change.serviceProvider.supportUrl,
        },
        networkFee: change.networkFee,
        transactionFee: change.transactionFee,
        totalFee: change.totalFee,
    };
    const typeInfo = change.sourceCurrency && change.sourceAmount
        ? {
            ...transactionInfo,
            type: TransactionType.OnRampPurchase,
            sourceCurrency: change.sourceCurrency,
            sourceAmount: change.sourceAmount,
        }
        : {
            ...transactionInfo,
            type: TransactionType.OnRampTransfer,
        };
    return typeInfo;
}
//# sourceMappingURL=parseOnRampTransaction.js.map