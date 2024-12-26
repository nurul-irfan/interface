import { BigNumber } from 'ethers/lib/ethers';
export function sumGasFees(gasFees) {
    if (gasFees.length === 0) {
        return undefined;
    }
    return gasFees.reduce((acc, gasFee) => {
        return BigNumber.from(acc)
            .add(BigNumber.from(gasFee || '0'))
            .toString();
    }, '0');
}
//# sourceMappingURL=gas.js.map