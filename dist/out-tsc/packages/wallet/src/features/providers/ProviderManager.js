import { RPCType } from 'uniswap/src/features/chains/types';
import { createEthersProvider } from 'uniswap/src/features/providers/createEthersProvider';
import { logger } from 'utilities/src/logger/logger';
var ProviderStatus;
(function (ProviderStatus) {
    ProviderStatus[ProviderStatus["Disconnected"] = 0] = "Disconnected";
    ProviderStatus[ProviderStatus["Connected"] = 1] = "Connected";
    ProviderStatus[ProviderStatus["Error"] = 2] = "Error";
})(ProviderStatus || (ProviderStatus = {}));
export class ProviderManager {
    constructor() {
        this._providers = {};
        this.onUpdate = null;
    }
    setOnUpdate(onUpdate) {
        this.onUpdate = onUpdate;
    }
    tryGetProvider(chainId) {
        try {
            return this.getProvider(chainId);
        }
        catch (error) {
            return null;
        }
    }
    getProvider(chainId) {
        var _a, _b;
        const cachedProviderDetails = (_a = this._providers[chainId]) === null || _a === void 0 ? void 0 : _a.public;
        if (!cachedProviderDetails || cachedProviderDetails.status !== ProviderStatus.Connected) {
            this.createProvider(chainId);
        }
        const providerDetails = (_b = this._providers[chainId]) === null || _b === void 0 ? void 0 : _b.public;
        if ((providerDetails === null || providerDetails === void 0 ? void 0 : providerDetails.status) !== ProviderStatus.Connected) {
            throw new Error(`Public provider not connected for chain: ${chainId}`);
        }
        return providerDetails.provider;
    }
    async getPrivateProvider(chainId, signer) {
        var _a, _b;
        const signerAddress = await (signer === null || signer === void 0 ? void 0 : signer.getAddress());
        const cachedProviderDetails = (_a = this._providers[chainId]) === null || _a === void 0 ? void 0 : _a.private;
        if (!cachedProviderDetails ||
            cachedProviderDetails.address !== signerAddress ||
            cachedProviderDetails.status !== ProviderStatus.Connected) {
            this.createPrivateProvider(chainId, signer, signerAddress);
        }
        const providerDetails = (_b = this._providers[chainId]) === null || _b === void 0 ? void 0 : _b.private;
        if ((providerDetails === null || providerDetails === void 0 ? void 0 : providerDetails.status) !== ProviderStatus.Connected || providerDetails.address !== signerAddress) {
            throw new Error(`Private provider not connected for chain ${chainId}, address ${signerAddress}`);
        }
        return providerDetails.provider;
    }
    createProvider(chainId) {
        var _a;
        const provider = createEthersProvider(chainId);
        if (!provider) {
            return;
        }
        this._providers[chainId] = {
            ...this._providers[chainId],
            public: { provider, status: ProviderStatus.Connected },
        };
        (_a = this.onUpdate) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    createPrivateProvider(chainId, signer, address) {
        var _a;
        const provider = createEthersProvider(chainId, RPCType.Private, signer);
        if (!provider) {
            return;
        }
        this._providers[chainId] = {
            ...this._providers[chainId],
            private: { provider, status: ProviderStatus.Connected, address },
        };
        (_a = this.onUpdate) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    removeProviders(chainId) {
        var _a;
        const providersInfo = this._providers[chainId];
        if (!providersInfo) {
            logger.warn('ProviderManager', 'removeProviders', `Attempting to remove non-existent provider: ${chainId}`);
            return;
        }
        Object.values(providersInfo).forEach((providerInfo) => {
            providerInfo.provider.removeAllListeners();
        });
        delete this._providers[chainId];
        (_a = this.onUpdate) === null || _a === void 0 ? void 0 : _a.call(this);
    }
}
//# sourceMappingURL=ProviderManager.js.map