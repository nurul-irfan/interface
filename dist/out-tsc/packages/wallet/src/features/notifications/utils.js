import { TradeType } from '@uniswap/sdk-core';
import { getChainLabel, toSupportedChainId } from 'uniswap/src/features/chains/utils';
import { TransactionStatus, TransactionType } from 'uniswap/src/features/transactions/types/transactionDetails';
import i18n from 'uniswap/src/i18n/i18n';
import { WalletConnectEvent } from 'uniswap/src/types/walletConnect';
import { getValidAddress } from 'uniswap/src/utils/addresses';
import { getCurrencyDisplayText, getFormattedCurrencyAmount, getSymbolDisplayText } from 'uniswap/src/utils/currency';
import { currencyIdToAddress } from 'uniswap/src/utils/currencyId';
import { shortenAddress } from 'utilities/src/addresses';
// eslint-disable-next-line consistent-return
export const formWCNotificationTitle = (appNotification) => {
    const { event, dappName, chainId } = appNotification;
    switch (event) {
        case WalletConnectEvent.Connected:
            return i18n.t('notification.walletConnect.connected');
        case WalletConnectEvent.Disconnected:
            return i18n.t('notification.walletConnect.disconnected');
        case WalletConnectEvent.NetworkChanged:
            {
                const supportedChainId = toSupportedChainId(chainId);
                if (supportedChainId) {
                    return i18n.t('notification.walletConnect.networkChanged.full', {
                        networkName: getChainLabel(supportedChainId),
                    });
                }
            }
            return i18n.t('notification.walletConnect.networkChanged.short');
        case WalletConnectEvent.TransactionConfirmed:
            return i18n.t('notification.walletConnect.confirmed', { dappName });
        case WalletConnectEvent.TransactionFailed:
            return i18n.t('notification.walletConnect.failed', { dappName });
    }
};
export const formApproveNotificationTitle = (txStatus, currency, tokenAddress, spender) => {
    const currencyDisplayText = getCurrencyDisplayText(currency, tokenAddress);
    const address = shortenAddress(spender);
    return txStatus === TransactionStatus.Success
        ? i18n.t('notification.transaction.approve.success', {
            currencySymbol: currencyDisplayText,
            address,
        })
        : txStatus === TransactionStatus.Canceled
            ? i18n.t('notification.transaction.approve.canceled', {
                currencySymbol: currencyDisplayText,
            })
            : i18n.t('notification.transaction.approve.fail', {
                currencySymbol: currencyDisplayText,
                address,
            });
};
export const formBridgeNotificationTitle = (txStatus) => {
    switch (txStatus) {
        case TransactionStatus.Success:
            return i18n.t('transaction.status.swap.success');
        case TransactionStatus.Canceled:
            return i18n.t('transaction.status.swap.canceled');
        default:
            return i18n.t('transaction.status.swap.failed');
    }
};
export const formSwapNotificationTitle = (formatter, txStatus, inputCurrency, outputCurrency, inputCurrencyId, outputCurrencyId, inputCurrencyAmountRaw, outputCurrencyAmountRaw, tradeType) => {
    const inputCurrencySymbol = getCurrencyDisplayText(inputCurrency, currencyIdToAddress(inputCurrencyId));
    const outputCurrencySymbol = getCurrencyDisplayText(outputCurrency, currencyIdToAddress(outputCurrencyId));
    const inputAmount = getFormattedCurrencyAmount(inputCurrency, inputCurrencyAmountRaw, formatter, tradeType === TradeType.EXACT_OUTPUT);
    const outputAmount = getFormattedCurrencyAmount(outputCurrency, outputCurrencyAmountRaw, formatter, tradeType === TradeType.EXACT_INPUT);
    const inputCurrencyAmountWithSymbol = `${inputAmount}${inputCurrencySymbol}`;
    const outputCurrencyAmountWithSymbol = `${outputAmount}${outputCurrencySymbol}`;
    switch (txStatus) {
        case TransactionStatus.Success:
            return i18n.t('notification.transaction.swap.success', {
                inputCurrencyAmountWithSymbol,
                outputCurrencyAmountWithSymbol,
            });
        case TransactionStatus.Canceled:
            return i18n.t('notification.transaction.swap.canceled', {
                inputCurrencySymbol,
                outputCurrencySymbol,
            });
        case TransactionStatus.Expired:
            return i18n.t('notification.transaction.swap.expired', {
                inputCurrencySymbol,
                outputCurrencySymbol,
            });
        default:
            return i18n.t('notification.transaction.swap.fail', {
                inputCurrencyAmountWithSymbol,
                outputCurrencyAmountWithSymbol,
            });
    }
};
export const formWrapNotificationTitle = (formatter, txStatus, inputCurrency, outputCurrency, currencyAmountRaw, unwrapped) => {
    const inputCurrencySymbol = getSymbolDisplayText(inputCurrency === null || inputCurrency === void 0 ? void 0 : inputCurrency.symbol);
    const outputCurrencySymbol = getSymbolDisplayText(outputCurrency === null || outputCurrency === void 0 ? void 0 : outputCurrency.symbol);
    const inputAmount = getFormattedCurrencyAmount(inputCurrency, currencyAmountRaw, formatter);
    const outputAmount = getFormattedCurrencyAmount(outputCurrency, currencyAmountRaw, formatter);
    const inputCurrencyAmountWithSymbol = `${inputAmount}${inputCurrencySymbol}`;
    const outputCurrencyAmountWithSymbol = `${outputAmount}${outputCurrencySymbol}`;
    if (unwrapped) {
        return txStatus === TransactionStatus.Success
            ? i18n.t('notification.transaction.unwrap.success', {
                inputCurrencyAmountWithSymbol,
                outputCurrencyAmountWithSymbol,
            })
            : txStatus === TransactionStatus.Canceled
                ? i18n.t('notification.transaction.unwrap.canceled', {
                    inputCurrencySymbol,
                })
                : i18n.t('notification.transaction.unwrap.fail', {
                    inputCurrencyAmountWithSymbol,
                });
    }
    return txStatus === TransactionStatus.Success
        ? i18n.t('notification.transaction.wrap.success', {
            inputCurrencyAmountWithSymbol,
            outputCurrencyAmountWithSymbol,
        })
        : txStatus === TransactionStatus.Canceled
            ? i18n.t('notification.transaction.wrap.canceled', {
                inputCurrencySymbol,
            })
            : i18n.t('notification.transaction.wrap.fail', {
                inputCurrencyAmountWithSymbol,
            });
};
export const formTransferCurrencyNotificationTitle = (formatter, txType, txStatus, currency, tokenAddress, currencyAmountRaw, senderOrRecipient) => {
    const currencySymbol = getCurrencyDisplayText(currency, tokenAddress);
    const amount = getFormattedCurrencyAmount(currency, currencyAmountRaw, formatter);
    const shortenedAddressOrENS = getShortenedAddressOrEns(senderOrRecipient);
    return formTransferTxTitle(txType, txStatus, `${amount}${currencySymbol}`, shortenedAddressOrENS);
};
export const formTransferNFTNotificationTitle = (txType, txStatus, nft, tokenAddress, tokenId, senderOrRecipient) => {
    var _a;
    const nftName = (_a = nft === null || nft === void 0 ? void 0 : nft.name) !== null && _a !== void 0 ? _a : `NFT ${shortenAddress(tokenAddress)} #${tokenId}`;
    const shortenedAddressOrENS = getShortenedAddressOrEns(senderOrRecipient);
    return formTransferTxTitle(txType, txStatus, nftName, shortenedAddressOrENS);
};
export const formUnknownTxTitle = (txStatus, tokenAddress, ensName) => {
    const address = tokenAddress && shortenAddress(tokenAddress);
    const target = ensName !== null && ensName !== void 0 ? ensName : address;
    if (txStatus === TransactionStatus.Success) {
        if (target) {
            return i18n.t('notification.transaction.unknown.success.full', { addressOrEnsName: target });
        }
        return i18n.t('notification.transaction.unknown.success.short');
    }
    if (target) {
        return i18n.t('notification.transaction.unknown.fail.full', { addressOrEnsName: target });
    }
    return i18n.t('notification.transaction.unknown.fail.short');
};
const formTransferTxTitle = (txType, txStatus, tokenNameOrAddress, walletNameOrAddress) => {
    if (txType === TransactionType.Send) {
        return txStatus === TransactionStatus.Success
            ? i18n.t('notification.transaction.transfer.success', {
                tokenNameOrAddress,
                walletNameOrAddress,
            })
            : txStatus === TransactionStatus.Canceled
                ? i18n.t('notification.transaction.transfer.canceled', {
                    tokenNameOrAddress,
                })
                : i18n.t('notification.transaction.transfer.fail', {
                    tokenNameOrAddress,
                    walletNameOrAddress,
                });
    }
    return i18n.t('notification.transaction.transfer.received', {
        tokenNameOrAddress,
        walletNameOrAddress,
    });
};
const getShortenedAddressOrEns = (addressOrENS) => {
    return getValidAddress(addressOrENS) ? shortenAddress(addressOrENS) : addressOrENS;
};
//# sourceMappingURL=utils.js.map