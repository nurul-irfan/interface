import { TransactionType as RemoteTransactionType } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks';
import { Routing } from 'uniswap/src/data/tradingApi/__generated__/index';
import { SpamCode } from 'uniswap/src/data/types';
import { DEFAULT_NATIVE_ADDRESS } from 'uniswap/src/features/chains/chainInfo';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { fromGraphQLChain } from 'uniswap/src/features/chains/utils';
import { TransactionDetailsType, TransactionOriginType, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
import parseApproveTransaction from 'wallet/src/features/transactions/history/conversion/parseApproveTransaction';
import parseBridgingTransaction from 'wallet/src/features/transactions/history/conversion/parseBridgingTransaction';
import parseNFTMintTransaction from 'wallet/src/features/transactions/history/conversion/parseMintTransaction';
import parseOnRampTransaction from 'wallet/src/features/transactions/history/conversion/parseOnRampTransaction';
import parseReceiveTransaction from 'wallet/src/features/transactions/history/conversion/parseReceiveTransaction';
import parseSendTransaction from 'wallet/src/features/transactions/history/conversion/parseSendTransaction';
import parseTradeTransaction from 'wallet/src/features/transactions/history/conversion/parseTradeTransaction';
import { remoteTxStatusToLocalTxStatus } from 'wallet/src/features/transactions/history/utils';
/**
 * Parses txn API response item and identifies known txn type. Helps strictly
 * type txn summary data to be used within UI.
 *
 * @param transaction Transaction api response item to parse.
 * @returns Formatted TransactionDetails object.
 */
export default function extractTransactionDetails(transaction) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if ((transaction === null || transaction === void 0 ? void 0 : transaction.details.__typename) !== TransactionDetailsType.Transaction) {
        return null;
    }
    let typeInfo;
    switch (transaction.details.type) {
        case RemoteTransactionType.Approve:
            typeInfo = parseApproveTransaction(transaction);
            break;
        case RemoteTransactionType.Send:
            typeInfo = parseSendTransaction(transaction);
            break;
        case RemoteTransactionType.Receive:
            typeInfo = parseReceiveTransaction(transaction);
            break;
        case RemoteTransactionType.Bridging:
            typeInfo = parseBridgingTransaction(transaction);
            break;
        case RemoteTransactionType.Swap:
        case RemoteTransactionType.SwapOrder:
            typeInfo = parseTradeTransaction(transaction);
            break;
        case RemoteTransactionType.Mint:
            typeInfo = parseNFTMintTransaction(transaction);
            break;
        case RemoteTransactionType.OnRamp:
            typeInfo = parseOnRampTransaction(transaction);
            break;
    }
    // No match found, default to unknown.
    if (!typeInfo) {
        // If a parsing util returns undefined type info, we still want to check if its spam
        const isSpam = (_b = (_a = transaction.details.assetChanges) === null || _a === void 0 ? void 0 : _a.some((change) => {
            var _a, _b, _c;
            switch (change === null || change === void 0 ? void 0 : change.__typename) {
                case 'NftTransfer':
                    return (_a = change.asset) === null || _a === void 0 ? void 0 : _a.isSpam;
                case 'TokenTransfer':
                    return ((_b = change.asset.project) === null || _b === void 0 ? void 0 : _b.isSpam) || ((_c = change.asset.project) === null || _c === void 0 ? void 0 : _c.spamCode) === SpamCode.HIGH;
                default:
                    return false;
            }
        })) !== null && _b !== void 0 ? _b : true;
        const dappInfo = ((_c = transaction.details.application) === null || _c === void 0 ? void 0 : _c.address)
            ? {
                name: (_d = transaction.details.application) === null || _d === void 0 ? void 0 : _d.name,
                address: (_e = transaction.details.application) === null || _e === void 0 ? void 0 : _e.address,
                icon: (_g = (_f = transaction.details.application) === null || _f === void 0 ? void 0 : _f.icon) === null || _g === void 0 ? void 0 : _g.url,
            }
            : undefined;
        typeInfo = {
            type: TransactionType.Unknown,
            tokenAddress: transaction.details.to,
            isSpam,
            dappInfo,
        };
    }
    const chainId = fromGraphQLChain(transaction.chain);
    const networkFee = chainId && ((_h = transaction.details.networkFee) === null || _h === void 0 ? void 0 : _h.quantity) && ((_j = transaction.details.networkFee) === null || _j === void 0 ? void 0 : _j.tokenSymbol)
        ? {
            quantity: transaction.details.networkFee.quantity,
            tokenSymbol: transaction.details.networkFee.tokenSymbol,
            // graphQL returns a null token address for native tokens like ETH
            tokenAddress: (_k = transaction.details.networkFee.tokenAddress) !== null && _k !== void 0 ? _k : DEFAULT_NATIVE_ADDRESS,
            chainId,
        }
        : undefined;
    return {
        routing: transaction.details.type === RemoteTransactionType.SwapOrder ? Routing.DUTCH_V2 : Routing.CLASSIC,
        id: transaction.details.hash,
        // TODO: WALL-4919: Remove hardcoded Mainnet
        // fallback to mainnet, although this should never happen
        chainId: chainId !== null && chainId !== void 0 ? chainId : UniverseChainId.Mainnet,
        hash: transaction.details.hash,
        addedTime: transaction.timestamp * 1000, // convert to ms
        status: remoteTxStatusToLocalTxStatus(transaction.details.type, transaction.details.status),
        from: transaction.details.from,
        typeInfo,
        options: { request: {} }, // Empty request is okay, gate re-submissions on txn type and status.
        networkFee,
        transactionOriginType: TransactionOriginType.Internal,
    };
}
//# sourceMappingURL=extractTransactionDetails.js.map