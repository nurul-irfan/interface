import { AssetType } from 'uniswap/src/entities/assets';
import { SUPPORTED_CHAIN_IDS } from 'uniswap/src/features/chains/types';
import { AppNotificationType, CopyNotificationType, } from 'uniswap/src/features/notifications/types';
import { TransactionStatus, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { WrapType } from 'uniswap/src/features/transactions/types/wrap';
import { currencyInfo } from 'uniswap/src/test/fixtures/wallet/currencies';
import { faker } from 'uniswap/src/test/shared';
import { createFixture, randomChoice, randomEnumValue } from 'uniswap/src/test/utils';
import { WalletConnectEvent } from 'uniswap/src/types/walletConnect';
export const FINALIZED_TRANSACTION_STATUSES = [
    TransactionStatus.Success,
    TransactionStatus.Failed,
    TransactionStatus.Canceled,
    TransactionStatus.FailedCancel,
];
const appNotificationBase = createFixture()(() => ({
    type: randomEnumValue(AppNotificationType),
}));
export const appNotificationDefault = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.Default,
    title: faker.lorem.words(),
}));
export const appErrorNotification = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.Error,
    errorMessage: faker.lorem.words(),
}));
export const walletConnectNotification = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.WalletConnect,
    event: randomEnumValue(WalletConnectEvent),
    dappName: faker.lorem.words(),
    imageUrl: faker.image.imageUrl(),
}));
const transactionNotificationBase = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.Transaction,
    txType: randomEnumValue(TransactionType),
    txStatus: randomChoice(FINALIZED_TRANSACTION_STATUSES),
    txId: faker.datatype.uuid(),
    chainId: randomChoice(SUPPORTED_CHAIN_IDS),
}));
export const approveTxNotification = createFixture()(() => ({
    ...transactionNotificationBase(),
    txType: TransactionType.Approve,
    tokenAddress: faker.finance.ethereumAddress(),
    spender: faker.finance.ethereumAddress(),
}));
export const swapTxNotification = createFixture()(() => ({
    ...transactionNotificationBase(),
    txType: TransactionType.Swap,
    inputCurrencyId: faker.datatype.uuid(),
    outputCurrencyId: faker.datatype.uuid(),
    inputCurrencyAmountRaw: faker.datatype.number().toString(),
    outputCurrencyAmountRaw: faker.datatype.number().toString(),
}));
export const wrapTxNotification = createFixture()(() => ({
    ...transactionNotificationBase(),
    txType: TransactionType.Wrap,
    currencyAmountRaw: faker.datatype.number().toString(),
    unwrapped: faker.datatype.boolean(),
}));
const transferCurrencyTxNotificationBase = createFixture()(() => ({
    ...transactionNotificationBase(),
    txType: randomChoice([TransactionType.Send, TransactionType.Receive]),
    assetType: AssetType.Currency,
    tokenAddress: faker.finance.ethereumAddress(),
    currencyAmountRaw: faker.datatype.number().toString(),
}));
export const sendCurrencyTxNotification = createFixture()(() => ({
    ...transferCurrencyTxNotificationBase(),
    txType: TransactionType.Send,
    recipient: faker.finance.ethereumAddress(),
}));
export const receiveCurrencyTxNotification = createFixture()(() => ({
    ...transferCurrencyTxNotificationBase(),
    txType: TransactionType.Receive,
    sender: faker.finance.ethereumAddress(),
}));
const transferNFTNotificationBase = createFixture()(() => ({
    ...transactionNotificationBase(),
    txType: randomChoice([TransactionType.Send, TransactionType.Receive]),
    assetType: randomChoice([AssetType.ERC1155, AssetType.ERC721]),
    tokenAddress: faker.finance.ethereumAddress(),
    tokenId: faker.datatype.uuid(),
}));
export const sendNFTTxNotification = createFixture()(() => ({
    ...transferNFTNotificationBase(),
    txType: TransactionType.Send,
    recipient: faker.finance.ethereumAddress(),
}));
export const receiveNFTNotification = createFixture()(() => ({
    ...transferNFTNotificationBase(),
    txType: TransactionType.Receive,
    sender: faker.finance.ethereumAddress(),
}));
export const unknownTxNotification = createFixture()(() => ({
    ...transactionNotificationBase(),
    txType: TransactionType.Unknown,
}));
export const copyNotification = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.Copied,
    copyType: randomEnumValue(CopyNotificationType),
}));
export const successNotification = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.Success,
    title: faker.lorem.words(),
}));
export const swapNetworkNotification = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.NetworkChanged,
    chainId: randomChoice(SUPPORTED_CHAIN_IDS),
    flow: 'swap',
}));
export const chooseCountryNotification = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.ChooseCountry,
    countryName: faker.address.country(),
    countryCode: faker.address.countryCode(),
}));
export const changeAssetVisibilityNotifiation = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.AssetVisibility,
    visible: faker.datatype.boolean(),
    assetName: faker.lorem.words(),
}));
export const swapPendingNotification = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.SwapPending,
    wrapType: randomEnumValue(WrapType),
}));
export const transferCurrencyPendingNotification = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.TransferCurrencyPending,
    currencyInfo: currencyInfo(),
}));
export const scantasticCompleteNotification = createFixture()(() => ({
    ...appNotificationBase(),
    type: AppNotificationType.ScantasticComplete,
}));
//# sourceMappingURL=notifications.js.map