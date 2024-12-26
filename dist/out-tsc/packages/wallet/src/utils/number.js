import { BigNumber } from 'ethers';
export function isZero(n) {
    return BigNumber.from(n).isZero();
}
export function BigNumberMax(bn1, bn2) {
    return bn1.lte(bn2) ? bn2 : bn1;
}
export function toStringish(n) {
    if (n === undefined) {
        return undefined;
    }
    return BigNumber.from(n).toString();
}
//# sourceMappingURL=number.js.map