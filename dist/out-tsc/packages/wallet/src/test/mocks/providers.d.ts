import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumber, providers } from 'ethers';
import { Erc20 } from 'uniswap/src/abis/types';
import { ContractManager } from 'wallet/src/features/contracts/ContractManager';
import { SignerManager } from 'wallet/src/features/wallet/signing/SignerManager';
export declare const signerManager: SignerManager;
export declare const provider: providers.JsonRpcProvider;
export declare const providerManager: {
    getProvider: () => typeof provider;
};
type TxProvidersMocks = {
    mockProvider: typeof provider;
    mockProviderManager: typeof providerManager;
};
export declare const getTxProvidersMocks: (txReceipt?: TransactionReceipt) => TxProvidersMocks;
export declare const contractManager: ContractManager;
export declare const tokenContract: Erc20;
export declare const mockTokenContract: {
    balanceOf: () => BigNumber;
    populateTransaction: {};
};
export declare const mockContractManager: {
    getOrCreateContract: () => typeof mockTokenContract;
};
export {};
//# sourceMappingURL=providers.d.ts.map