import { BigNumber } from 'ethers';
import { isBridge, isUniswapX } from 'uniswap/src/features/transactions/swap/utils/routing';
import { TransactionStatus, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
export function getSerializableTransactionRequest(request, chainId) {
    // prettier-ignore
    const { to, from, nonce, gasLimit, gasPrice, data, value, maxPriorityFeePerGas, maxFeePerGas, type } = request;
    // Manually restructure the txParams to ensure values going into store are serializable
    return {
        chainId,
        type,
        to,
        from,
        nonce: nonce ? BigNumber.from(nonce).toString() : undefined,
        gasLimit: gasLimit === null || gasLimit === void 0 ? void 0 : gasLimit.toString(),
        gasPrice: gasPrice === null || gasPrice === void 0 ? void 0 : gasPrice.toString(),
        data: data === null || data === void 0 ? void 0 : data.toString(),
        value: value === null || value === void 0 ? void 0 : value.toString(),
        maxPriorityFeePerGas: maxPriorityFeePerGas === null || maxPriorityFeePerGas === void 0 ? void 0 : maxPriorityFeePerGas.toString(),
        maxFeePerGas: maxFeePerGas === null || maxFeePerGas === void 0 ? void 0 : maxFeePerGas.toString(),
    };
}
export const ANIMATE_SPRING_CONFIG = {
    stiffness: 90,
    damping: 15,
    mass: 0.8,
};
// Based on the current status of the transaction, we determine the new status.
export function getFinalizedTransactionStatus(currentStatus, receiptStatus) {
    if (!receiptStatus) {
        return TransactionStatus.Failed;
    }
    if (currentStatus === TransactionStatus.Cancelling) {
        return TransactionStatus.Canceled;
    }
    return TransactionStatus.Success;
}
export function getIsCancelable(tx) {
    var _a;
    if (isBridge(tx) && tx.sendConfirmed) {
        return false;
    }
    if (tx.status === TransactionStatus.Pending && (isUniswapX(tx) || Object.keys((_a = tx.options) === null || _a === void 0 ? void 0 : _a.request).length > 0)) {
        return true;
    }
    return false;
}
export function receiptFromEthersReceipt(ethersReceipt) {
    var _a, _b;
    if (!ethersReceipt) {
        return undefined;
    }
    return {
        blockHash: ethersReceipt.blockHash,
        blockNumber: ethersReceipt.blockNumber,
        transactionIndex: ethersReceipt.transactionIndex,
        confirmations: ethersReceipt.confirmations,
        confirmedTime: Date.now(),
        gasUsed: (_a = ethersReceipt.gasUsed) === null || _a === void 0 ? void 0 : _a.toNumber(),
        effectiveGasPrice: (_b = ethersReceipt.effectiveGasPrice) === null || _b === void 0 ? void 0 : _b.toNumber(),
    };
}
export function isOnRampTransaction(tx) {
    return (tx.typeInfo.type === TransactionType.LocalOnRamp ||
        tx.typeInfo.type === TransactionType.OnRampPurchase ||
        tx.typeInfo.type === TransactionType.OnRampTransfer);
}
export function getDiff(value1, value2) {
    if (typeof value1 === 'string') {
        value1 = Number(value1);
    }
    return value1 !== undefined && value2 !== undefined ? value1 - value2 : undefined;
}
export function getPercentageError(diff, estimated) {
    if (typeof estimated === 'string') {
        estimated = Number(estimated);
    }
    return diff !== undefined && estimated !== undefined && estimated !== 0 ? (diff / estimated) * 100 : undefined;
}
//# sourceMappingURL=utils.js.map