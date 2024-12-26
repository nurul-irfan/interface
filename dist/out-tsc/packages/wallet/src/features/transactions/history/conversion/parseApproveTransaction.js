import { TransactionDetailsType, TransactionType, } from 'uniswap/src/features/transactions/types/transactionDetails';
export default function parseApproveTransaction(transaction) {
    var _a, _b, _c, _d, _e, _f;
    if (transaction.details.__typename !== TransactionDetailsType.Transaction) {
        return undefined;
    }
    const change = (_a = transaction.details.assetChanges) === null || _a === void 0 ? void 0 : _a[0];
    if (!change) {
        return undefined;
    }
    if (change.__typename === 'TokenApproval' && change.tokenStandard === 'ERC20') {
        const tokenAddress = (_b = change.asset) === null || _b === void 0 ? void 0 : _b.address;
        const spender = change.approvedAddress;
        const approvalAmount = change.quantity;
        if (!(tokenAddress && spender)) {
            return undefined;
        }
        const dappInfo = ((_c = transaction.details.application) === null || _c === void 0 ? void 0 : _c.address)
            ? {
                name: (_d = transaction.details.application) === null || _d === void 0 ? void 0 : _d.name,
                address: transaction.details.application.address,
                icon: (_f = (_e = transaction.details.application) === null || _e === void 0 ? void 0 : _e.icon) === null || _f === void 0 ? void 0 : _f.url,
            }
            : undefined;
        return {
            type: TransactionType.Approve,
            tokenAddress,
            spender,
            approvalAmount,
            dappInfo,
        };
    }
    return undefined;
}
//# sourceMappingURL=parseApproveTransaction.js.map