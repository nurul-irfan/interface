import { AddressStringFormat, normalizeAddress } from 'uniswap/src/utils/addresses';
export function getAccountId(address) {
    return normalizeAddress(address, AddressStringFormat.Lowercase);
}
//# sourceMappingURL=getAccountId.js.map