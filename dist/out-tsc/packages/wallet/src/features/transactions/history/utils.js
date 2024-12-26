import { Token } from '@uniswap/sdk-core';
import dayjs from 'dayjs';
import { getNativeAddress } from 'uniswap/src/constants/addresses';
import { Currency, TransactionStatus as RemoteTransactionStatus, TransactionType as RemoteTransactionType, TokenStandard, } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { fromGraphQLChain } from 'uniswap/src/features/chains/utils';
import { FORMAT_DATE_MONTH, FORMAT_DATE_MONTH_YEAR } from 'uniswap/src/features/language/localizedDayjs';
import { NativeCurrency } from 'uniswap/src/features/tokens/NativeCurrency';
import { ValueType, getCurrencyAmount } from 'uniswap/src/features/tokens/getCurrencyAmount';
import { isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { TransactionDetailsType, TransactionStatus, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import { buildCurrencyId } from 'uniswap/src/utils/currencyId';
import { getIsNftHidden } from 'wallet/src/features/nfts/utils';
import { extractOnRampTransactionDetails } from 'wallet/src/features/transactions/history/conversion/extractFiatOnRampTransactionDetails';
import extractTransactionDetails from 'wallet/src/features/transactions/history/conversion/extractTransactionDetails';
import { extractUniswapXOrderDetails } from 'wallet/src/features/transactions/history/conversion/extractUniswapXOrderDetails';
export function formatTransactionsByDate(transactions, localizedDayjs) {
    // timestamp in ms for start of time periods
    const msTimestampCutoff24h = dayjs().subtract(24, 'hour').valueOf();
    const msTimestampCutoffYear = dayjs().startOf('year').valueOf();
    // Segment by time periods.
    const [pending, last24hTransactionList, olderThan24HTransactionList] = (transactions !== null && transactions !== void 0 ? transactions : []).reduce((accum, item) => {
        if (
        // Want all incomplete transactions
        item.status === TransactionStatus.Pending ||
            item.status === TransactionStatus.Cancelling ||
            item.status === TransactionStatus.Replacing) {
            accum[0].push(item);
        }
        else if (item.addedTime > msTimestampCutoff24h) {
            accum[1].push(item);
        }
        else {
            accum[2].push(item);
        }
        return accum;
    }, [[], [], []]);
    const pendingSorted = pending.sort((a, b) => {
        var _a, _b, _c, _d;
        // sort based on timestamp if a UniswapxX order is present, since pending UniswapX orders do not have a nonce.
        if (isUniswapX(a) || isUniswapX(b)) {
            return b.addedTime - a.addedTime;
        }
        // sort based on nonce if available, highest nonce first for reverse chronological order.
        const nonceA = (_b = (_a = a.options) === null || _a === void 0 ? void 0 : _a.request) === null || _b === void 0 ? void 0 : _b.nonce;
        const nonceB = (_d = (_c = b.options) === null || _c === void 0 ? void 0 : _c.request) === null || _d === void 0 ? void 0 : _d.nonce;
        return nonceA && nonceB ? (nonceA < nonceB ? 1 : -1) : 1;
    });
    // For all transactions before last 24 hours, group by month
    const priorByMonthTransactionList = olderThan24HTransactionList.reduce((accum, item) => {
        var _a;
        const isPreviousYear = item.addedTime < msTimestampCutoffYear;
        const key = localizedDayjs(item.addedTime)
            // If in a previous year, append year to key string, else just use month
            // This key is used as the section title in TransactionList
            .format(isPreviousYear ? FORMAT_DATE_MONTH_YEAR : FORMAT_DATE_MONTH)
            .toString();
        const currentMonthList = (_a = accum[key]) !== null && _a !== void 0 ? _a : [];
        currentMonthList.push(item);
        accum[key] = currentMonthList;
        return accum;
    }, {});
    return {
        pending: pendingSorted,
        last24hTransactionList,
        priorByMonthTransactionList,
    };
}
function isNftTransactionHidden(parsed, nftVisibility, isSpam) {
    if ((parsed === null || parsed === void 0 ? void 0 : parsed.typeInfo) && 'nftSummaryInfo' in parsed.typeInfo && nftVisibility) {
        const nftSummaryInfo = parsed.typeInfo.nftSummaryInfo;
        return nftSummaryInfo
            ? getIsNftHidden({
                contractAddress: nftSummaryInfo.address,
                tokenId: nftSummaryInfo.tokenId,
                isSpam,
                nftVisibility,
            })
            : false;
    }
    return false;
}
/**
 * Transforms api txn data to formatted TransactionDetails array
 * @param data Transaction history data response
 */
export function parseDataResponseToTransactionDetails(data, hideSpamTokens, nftVisibility, tokenVisibilityOverrides) {
    var _a, _b;
    if ((_b = (_a = data.portfolios) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.assetActivities) {
        return data.portfolios[0].assetActivities.reduce((accum, t) => {
            var _a, _b, _c, _d;
            if (((_a = t === null || t === void 0 ? void 0 : t.details) === null || _a === void 0 ? void 0 : _a.__typename) === TransactionDetailsType.Transaction) {
                const parsed = extractTransactionDetails(t);
                const isSpam = parsed === null || parsed === void 0 ? void 0 : parsed.typeInfo.isSpam;
                const currencyId = extractCurrencyIdFromTx(parsed);
                const spamOverride = currencyId ? (_b = tokenVisibilityOverrides === null || tokenVisibilityOverrides === void 0 ? void 0 : tokenVisibilityOverrides[currencyId]) === null || _b === void 0 ? void 0 : _b.isVisible : false;
                const isNFTSpam = isNftTransactionHidden(parsed, nftVisibility, isSpam);
                if (parsed && !(hideSpamTokens && isSpam && !spamOverride) && !isNFTSpam) {
                    accum.push(parsed);
                }
            }
            else if (((_c = t === null || t === void 0 ? void 0 : t.details) === null || _c === void 0 ? void 0 : _c.__typename) === TransactionDetailsType.OnRamp) {
                const parsed = extractOnRampTransactionDetails(t);
                if (parsed) {
                    accum.push(parsed);
                }
            }
            else if (((_d = t === null || t === void 0 ? void 0 : t.details) === null || _d === void 0 ? void 0 : _d.__typename) === TransactionDetailsType.UniswapXOrder) {
                const parsed = extractUniswapXOrderDetails(t);
                if (parsed) {
                    accum.push(parsed);
                }
            }
            return accum;
        }, []);
    }
    return undefined;
}
/**
 * Transforms api txn data to formatted TransactionDetails array
 * @param data Feed transaction history data response
 */
export function parseDataResponseToFeedTransactionDetails(data, hideSpamTokens) {
    var _a;
    const allTransactions = [];
    for (const portfolio of (_a = data.portfolios) !== null && _a !== void 0 ? _a : []) {
        if (portfolio === null || portfolio === void 0 ? void 0 : portfolio.assetActivities) {
            const transactions = portfolio.assetActivities.reduce((accum, t) => {
                var _a;
                if (((_a = t === null || t === void 0 ? void 0 : t.details) === null || _a === void 0 ? void 0 : _a.__typename) === TransactionDetailsType.Transaction) {
                    const parsed = extractTransactionDetails(t);
                    const isSpam = parsed === null || parsed === void 0 ? void 0 : parsed.typeInfo.isSpam;
                    if (parsed && !(hideSpamTokens && isSpam)) {
                        accum.push({ ...parsed, ownerAddress: portfolio.ownerAddress });
                    }
                }
                return accum;
            }, []);
            allTransactions.push(...transactions);
        }
    }
    const sortedTransactions = allTransactions.sort((a, b) => b.addedTime - a.addedTime);
    return sortedTransactions;
}
/**
 * Constructs a CurrencyAmount based on asset details and quantity. Checks if token is native
 * or ERC20 to determine decimal amount.
 * @param tokenStandard token standard type from api query
 * @param quantity // formatted amount of asset transferred
 * @param decimals // decimals ((optional) if native token)
 * @returns
 */
export function deriveCurrencyAmountFromAssetResponse(tokenStandard, chain, address, decimals, quantity) {
    var _a;
    const chainId = fromGraphQLChain(chain);
    if (!chainId) {
        return '';
    }
    const currency = tokenStandard === TokenStandard.Native
        ? NativeCurrency.onChain(chainId)
        : address && decimals
            ? new Token(chainId, address, decimals)
            : undefined;
    const currencyAmount = getCurrencyAmount({
        value: quantity,
        valueType: ValueType.Exact,
        currency,
    });
    return (_a = currencyAmount === null || currencyAmount === void 0 ? void 0 : currencyAmount.quotient.toString()) !== null && _a !== void 0 ? _a : '';
}
/**
 * Parses an asset from API and returns either the token address or native currency address
 * for the involved asset.
 * @returns Token address, custom native address or null
 */
export function getAddressFromAsset({ tokenStandard, chain, address, }) {
    const supportedChainId = fromGraphQLChain(chain);
    if (!supportedChainId) {
        return null;
    }
    if (tokenStandard === TokenStandard.Native) {
        return getNativeAddress(supportedChainId);
    }
    return address;
}
/**
 *
 * @param transactedValue Transacted value amount from TokenTransfer API response
 * @returns parsed USD value as a number if currency is of type USD
 */
export function parseUSDValueFromAssetChange(transactedValue) {
    var _a;
    return (transactedValue === null || transactedValue === void 0 ? void 0 : transactedValue.currency) === Currency.Usd ? (_a = transactedValue.value) !== null && _a !== void 0 ? _a : undefined : undefined;
}
function extractCurrencyIdFromTx(transaction) {
    if (!transaction) {
        return undefined;
    }
    if (transaction.typeInfo.type === TransactionType.Approve ||
        transaction.typeInfo.type === TransactionType.Send ||
        transaction.typeInfo.type === TransactionType.Receive) {
        return buildCurrencyId(transaction.chainId, transaction.typeInfo.tokenAddress);
    }
    if (transaction.typeInfo.type === TransactionType.Swap) {
        // We only care about output currency because that's the net new asset
        return transaction.typeInfo.outputCurrencyId;
    }
    return undefined;
}
// eslint-disable-next-line consistent-return
export function remoteTxStatusToLocalTxStatus(type, status) {
    switch (status) {
        case RemoteTransactionStatus.Failed:
            if (type === RemoteTransactionType.Cancel) {
                return TransactionStatus.FailedCancel;
            }
            return TransactionStatus.Failed;
        case RemoteTransactionStatus.Pending:
            if (type === RemoteTransactionType.Cancel) {
                return TransactionStatus.Cancelling;
            }
            return TransactionStatus.Pending;
        case RemoteTransactionStatus.Confirmed:
            if (type === RemoteTransactionType.Cancel) {
                return TransactionStatus.Canceled;
            }
            return TransactionStatus.Success;
    }
}
//# sourceMappingURL=utils.js.map