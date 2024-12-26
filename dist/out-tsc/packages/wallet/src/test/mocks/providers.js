import { BigNumber, providers } from 'ethers';
import ERC20_ABI from 'uniswap/src/abis/erc20.json';
import WETH_ABI from 'uniswap/src/abis/weth.json';
import { getWrappedNativeAddress } from 'uniswap/src/constants/addresses';
import { DAI } from 'uniswap/src/constants/tokens';
import { UniverseChainId } from 'uniswap/src/features/chains/types';
import { ethersTransactionReceipt } from 'uniswap/src/test/fixtures';
import { ContractManager } from 'wallet/src/features/contracts/ContractManager';
import { SignerManager } from 'wallet/src/features/wallet/signing/SignerManager';
export const signerManager = new SignerManager();
export const provider = new providers.JsonRpcProvider();
export const providerManager = {
    getProvider: () => provider,
};
const mockFeeData = {
    maxFeePerPrice: BigNumber.from('1000'),
    maxPriorityFeePerGas: BigNumber.from('10000'),
    gasPrice: BigNumber.from('10000'),
};
export const getTxProvidersMocks = (txReceipt) => {
    const receipt = txReceipt !== null && txReceipt !== void 0 ? txReceipt : ethersTransactionReceipt();
    const mockProvider = {
        getBalance: () => BigNumber.from('1000000000000000000'),
        getGasPrice: () => BigNumber.from('100000000000'),
        getTransactionCount: () => 1000,
        estimateGas: () => BigNumber.from('30000'),
        sendTransaction: () => ({ hash: '0xabcdef' }),
        detectNetwork: () => ({
            name: 'mainnet',
            chainId: 1,
        }),
        getTransactionReceipt: () => receipt,
        waitForTransaction: () => receipt,
        getFeeData: () => mockFeeData,
    };
    const mockProviderManager = {
        getProvider: () => mockProvider,
    };
    return {
        mockProvider,
        mockProviderManager,
    };
};
export const contractManager = new ContractManager();
contractManager.getOrCreateContract(UniverseChainId.Mainnet, DAI.address, provider, ERC20_ABI);
contractManager.getOrCreateContract(UniverseChainId.Mainnet, getWrappedNativeAddress(UniverseChainId.Mainnet), provider, WETH_ABI);
export const tokenContract = contractManager.getContract(UniverseChainId.Mainnet, DAI.address);
export const mockTokenContract = {
    balanceOf: () => BigNumber.from('1000000000000000000'),
    populateTransaction: {},
};
export const mockContractManager = {
    getOrCreateContract: () => mockTokenContract,
};
//# sourceMappingURL=providers.js.map