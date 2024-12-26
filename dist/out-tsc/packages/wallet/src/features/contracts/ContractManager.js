/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Contract } from 'ethers';
import { getValidAddress } from 'uniswap/src/utils/addresses';
import { isNativeCurrencyAddress } from 'uniswap/src/utils/currencyId';
import { logger } from 'utilities/src/logger/logger';
export class ContractManager {
    constructor() {
        this._contracts = {};
    }
    createContract(chainId, address, provider, ABI) {
        var _a, _b;
        var _c;
        if (isNativeCurrencyAddress(chainId, address) || !getValidAddress(address, true)) {
            throw Error(`Invalid address for contract: ${address}`);
        }
        (_a = (_c = this._contracts)[chainId]) !== null && _a !== void 0 ? _a : (_c[chainId] = {});
        if ((_b = this._contracts[chainId]) === null || _b === void 0 ? void 0 : _b[address]) {
            throw new Error(`Contract already exists for: ${chainId} ${address}`);
        }
        else {
            logger.debug('ContractManager', 'createContract', `Creating a new contract for: ${chainId} ${address}`);
            const contract = new Contract(address, ABI, provider);
            this._contracts[chainId][address] = contract;
            return contract;
        }
    }
    removeContract(chainId, address) {
        var _a;
        if (!((_a = this._contracts[chainId]) === null || _a === void 0 ? void 0 : _a[address])) {
            logger.warn('ContractManager', 'removeContract', `Attempting to remove non-existing contract for: ${chainId} ${address}`);
            return;
        }
        delete this._contracts[chainId][address];
    }
    reset() {
        this._contracts = {};
    }
    // Returns contract or null
    getContract(chainId, address) {
        var _a, _b;
        return (_b = (_a = this._contracts[chainId]) === null || _a === void 0 ? void 0 : _a[address]) !== null && _b !== void 0 ? _b : null;
    }
    getOrCreateContract(chainId, address, provider, ABI) {
        const cachedContract = this.getContract(chainId, address);
        return (cachedContract !== null && cachedContract !== void 0 ? cachedContract : this.createContract(chainId, address, provider, ABI));
    }
}
//# sourceMappingURL=ContractManager.js.map